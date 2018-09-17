/**
 * Load lighting.
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

    // lighting
    this.lights = {point: {}, ambient: {}, directional: {}, hemisphere: {}};
    this.lights.point.a = new THREE.PointLight(0xff0000, 1, 20, 2);
    this.lights.point.b = new THREE.PointLight(0xffffff, 1, 32, 2);
    this.lights.point.c = new THREE.PointLight(0xffffff, 1, 20, 2);
    this.lights.ambient.a = new THREE.AmbientLight(0xffffff, 0.3);
    this.lights.directional.a = new THREE.DirectionalLight(0xffffff, 0.5);
    this.lights.hemisphere.a = new THREE.HemisphereLight(0x0, 0x0000ff, 0.25);

    // light placement
    this.lights.point.a.position.set(-8, 10, 22);
    this.lights.point.b.position.set(0, 10, -4);
    this.lights.point.c.position.set(26, 10, 6);
    this.lights.directional.a.position.set(-1, 1.5, -1);

    // add to scene
    Object.keys(this.lights).forEach(type => {
      Object.keys(this.lights[type]).forEach(light => {
        this.scene.add(this.lights[type][light]);
      });
    });
  }
}

export { Lighting };
