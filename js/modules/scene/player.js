class Player extends Collider.Player {
  constructor(domElement) {
    super(domElement);
    this._events();
    this._override();
  }

  _events() {
    $(this.domElement).on('click', (e) => {
      //console.log(e);
    });
  }

  _override() {
    // override inheritance

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

  updatePlayer(delta, collider, artworks) {
    this.update(delta, collider);
  }
}

export default Player;
