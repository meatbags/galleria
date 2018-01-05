
class LightHandler {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
  }

  load(isMonday) {
    // load the lights

    if (!isMonday) {
      const ambient = new THREE.AmbientLight(0xffffff, .08);
      const hemisphere = new THREE.HemisphereLight(0xffaabb, 0x080820, 0.1);
      const point1 = new THREE.PointLight(0xffffff, 0.5, 13, 1);
      //const point2 = new THREE.PointLight(0xfeff87, 0.5, 12, 1);
      this.neonSign = new THREE.PointLight(0xff0000, 0.8, 15, 1);

      point1.position.set(0, 5, -10);
      point2.position.set(-19, 8, 5);
      this.neonSign.position.set(0, 14, -32);

      this.scene.add(
        ambient,
        point1,
        //point2,
        hemisphere,
        this.neonSign,
        this.player.object
      );
    } else {
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
