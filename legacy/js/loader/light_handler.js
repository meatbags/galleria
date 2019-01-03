class LightHandler {
  constructor(scene, player) {
    // load scene lighting

    this.scene = scene;
    this.player = player;
  }

  load(isMonday) {
    // load lighting

    if (!isMonday) {
      // load gallery open lights

      this.lights = {
        //ambient: new THREE.AmbientLight(0xffffff, 0.1),
        hemisphere: new THREE.HemisphereLight(0xffbbcc, 0x0f0f40, 0.09),
        point1: new THREE.PointLight(0xaaaaff, 0.5, 13, 1),
        point2: new THREE.PointLight(0xaaaaff, 0.4, 7, 1),
        ball1: new THREE.PointLight(0xaaaaff, 0.7, 9, 1),
        ball2: new THREE.PointLight(0xaaaaff, 0.7, 9, 1),
        ball3: new THREE.PointLight(0xaaaaff, 0.9, 16, 1),
        billboard: new THREE.PointLight(0xffffff, 0.2, 25, 1),
        neonSign: new THREE.PointLight(0xff0000, 0.9, 20, 1)
      };
      this.lights.point1.position.set(0, 5, -10);
      this.lights.point2.position.set(-0.25, 11.75, 37);
      this.lights.ball1.position.set(19.75, 0.9, 28);
      this.lights.ball2.position.set(26, 0.9, 32.5);
      this.lights.ball3.position.set(37.25, 1.567, 30.75);
      this.lights.billboard.position.set(-30.5, 23, 42);
      this.lights.neonSign.position.set(0, 14, -32);

      // add player object/ light

      this.scene.add(this.player.object);

      // add lights

      for (let prop in this.lights) {
        if (this.lights.hasOwnProperty(prop)) {
          this.scene.add(this.lights[prop]);
        }
      }
    } else {
      // load gallery closed lights

      const ambient = new THREE.AmbientLight(0xffffff, .08);
      const hemisphere = new THREE.HemisphereLight(0xffaabb, 0x080820, 0.1);

      this.scene.add(
        ambient,
        hemisphere,
        this.player.object
      );
    }
  }
}

export default LightHandler;
