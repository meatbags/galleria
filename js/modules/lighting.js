/** Lighting handler */

import IsMobileDevice from '../utils/is_mobile_device';

class Lighting {
  constructor() {
    this.lightingModel = IsMobileDevice() ? 1 : 2;

    // lights
    this.lights = {point: {}, ambient: {}, directional: {}, hemisphere: {}, spot: {}};
    this.lights.point.a = new THREE.PointLight(0xffffff, 1, 24, this.lightingModel);
    this.lights.point.b = new THREE.PointLight(0xffffff, 1, 32, this.lightingModel);
    this.lights.point.c = new THREE.PointLight(0xffffff, 1, 20, this.lightingModel);
    this.lights.ambient.a = new THREE.AmbientLight(0xffffff, 0.3);
    this.lights.directional.a = new THREE.DirectionalLight(0xffffff, 0.5);
    this.lights.hemisphere.a = new THREE.HemisphereLight(0x0, 0x0000ff, 0.25);
    this.lights.spot.a = new THREE.SpotLight(0xffffff, 1, 32, Math.PI / 3, 0.25);
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene.scene;
  }

  load(data) {
    // default positions
    this.lights.point.a.position.set(-8, 10, 14);
    this.lights.point.b.position.set(0, 10, -4);
    this.lights.point.c.position.set(26, 10, 6);
    this.lights.directional.a.position.set(-1, 1.5, -1);
    this.lights.spot.a.position.set(0, 10, 14);
    this.lights.spot.a.target.position.set(-4, 0, 6);

    // default settings
    this.lights.point.a.distance = 24;
    this.lights.hemisphere.a.intensity = 0.25;
    this.lights.ambient.a.intensity = 0.3;
    this.lights.spot.a.intensity = 1;
    this.lights.spot.a.distance = 32;
    this.lights.spot.a.angle = Math.PI / 3;
    this.lights.spot.a.penumbra = 0.25;

    // add lights
    Object.keys(this.lights).forEach(type => {
      Object.keys(this.lights[type]).forEach(key => {
        const light = this.lights[type][key];
        this.ref.scene.add(light);
        if (light.isSpotLight) {
          this.ref.scene.add(light.target);
        }
      });
    });

    // remove fog
    this.ref.scene.fog = new THREE.FogExp2(0x000000, 0);

    // custom exhibition lighting
    switch (data.customValue) {
      case 'XAVIER':
        // placeholder
        break;
      case 'TIYAN':
        // remove lights outside temp exhibition region
        this.ref.scene.remove(this.lights.directional.a);
        this.ref.scene.remove(this.lights.point.b);

        // reposition & colour lights
        this.lights.ambient.a.intensity = 0.1;
        this.lights.point.b.position.set(6, 10, 14);
        this.lights.point.a.position.set(2, 9, 18);
        this.lights.point.a.distance = 26;
        this.lights.point.c.position.set(-22, 8, 18);
        this.lights.hemisphere.a.intensity = 0.01;
        break;
      case 'BRENTON':
        // spotlight for car
        this.lights.spot.a.position.set(-26, 10, 1);
        this.lights.spot.a.target.position.set(-22, 0, 1);
        this.lights.spot.a.angle = Math.PI / 6;
        this.lights.spot.a.penumbra = 0.1;
        break;
      case 'JACK_DE_LACY':
      default:
        this.ref.scene.remove(this.lights.spot.a);
        this.ref.scene.remove(this.lights.spot.a.target);
        break;
    }
  }
}

export default Lighting;
