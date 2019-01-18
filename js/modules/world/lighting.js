/**
 ** Handle all lighting.
 **/

import '../../lib/glsl/SkyShader.js';

class Lighting {
  constructor(root) {
    this.scene = root.scene;

    // skybox
    this.sky = new THREE.Sky();
    this.sky.scale.setScalar(450000);
    const d = 400000;
    const azimuth = 0.25;
    const inclination = 0.4875;
    const theta = Math.PI * (inclination - 0.5);
    const phi = Math.PI * 2 * (azimuth - 0.5);
    const sunPos = new THREE.Vector3(d * Math.cos(phi), d * Math.sin(phi) * Math.sin(theta), d * Math.sin(phi) * Math.cos(theta));
    this.sky.material.uniforms.sunPosition.value.copy(sunPos);
    this.scene.add(this.sky);

    // lights [6]
    this.lights = {point: {}, ambient: {}, directional: {}, hemisphere: {}, spot: {}};
    this.lights.point.a = new THREE.PointLight(0xffffff, 1, 24, 2);
    this.lights.point.b = new THREE.PointLight(0xffffff, 1, 32, 2);
    this.lights.point.c = new THREE.PointLight(0xffffff, 1, 20, 2);
    this.lights.ambient.a = new THREE.AmbientLight(0xffffff, 0.3);
    this.lights.directional.a = new THREE.DirectionalLight(0xffffff, 0.5);
    this.lights.hemisphere.a = new THREE.HemisphereLight(0x0, 0x0000ff, 0.25);
    this.lights.spot.a = new THREE.SpotLight(0xffffff, 1, 32, Math.PI / 3, 0.25);

    // apply exhibition settings
    this.reloadExhibition();
  }

  reloadExhibition() {
    // default light positions
    this.lights.point.a.position.set(-8, 10, 14);
    this.lights.point.b.position.set(0, 10, -4);
    this.lights.point.c.position.set(26, 10, 6);
    this.lights.directional.a.position.set(-1, 1.5, -1);
    this.lights.spot.a.position.set(0, 10, 14);
    this.lights.spot.a.target.position.set(-4, 0, 6);

    // default light settings
    this.lights.point.a.distance = 24;
    this.lights.hemisphere.a.intensity = 0.25;
    this.lights.ambient.a.intensity = 0.3;
    
    // add all lights
    Object.keys(this.lights).forEach(type => {
      Object.keys(this.lights[type]).forEach(key => {
        const light = this.lights[type][key];
        this.scene.add(light);
        if (light.isSpotLight) {
          this.scene.add(light.target);
        }
      });
    });

    // alter lighting
    const target = document.querySelector('.active-exhibition-data .custom-exhibition-installation');
    if (target) {
      switch (target.dataset.value) {
        case 'TIYAN':
          // remove lights outside temp exhibition region
          this.scene.remove(this.lights.directional.a);
          this.scene.remove(this.lights.point.b);

          // reposition & colour lights
          this.lights.ambient.a.intensity = 0.1;
          this.lights.point.b.position.set(6, 10, 14);
          this.lights.point.a.position.set(2, 9, 18);
          this.lights.point.a.distance = 26;
          this.lights.point.c.position.set(-22, 8, 18);
          this.lights.hemisphere.a.intensity = 0.01;
          break;
        case 'JACK_DE_LACY':
        default:
          this.scene.remove(this.lights.spot.a);
          this.scene.remove(this.lights.spot.a.target);
          break;
      }
    }
  }
}

export { Lighting };
