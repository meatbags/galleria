class Player extends Collider.Player {
  constructor(domElement) {
    super(domElement);

    // player props

    this._override();
  }

  _override() {
    // override inheritance

    this.config.height = 3;
    this.camera.far = 500000;
    this.camera.updateProjectionMatrix();
    this.position.z = this.target.position.z = -40;
    this.position.x = this.target.position.x = -15;
    this.rotation.yaw = this.target.rotation.yaw = Math.PI / 8;
    this.rotation.pitch = this.target.rotation.pitch = Math.PI / 12;
    this.config.adjust = {
      verySlow: 0.01,
      slow: 0.018,
      normal: 0.035,
      fast: 0.06,
      rapid: 0.09,
      veryFast: 0.18,
    }
  }

  updatePlayer(delta, collider) {
    // update collider player

    this.update(delta, collider);
  }
}

export default Player;
