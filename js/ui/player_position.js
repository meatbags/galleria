/** Position and angle for player */

class PlayerPosition {
  constructor(player, position, target) {
    this.position = position;
    this.target = target;
    this.ref = { player: player };

    // calc rotation
    this.rotation = new THREE.Vector2();
    this.rotation.x = Math.atan2(this.target.x - this.position.x, this.target.z - this.position.z);
    this.rotation.y = Math.atan2(
      this.target.y - (this.position.y + this.ref.player.height) - 0.125,
      Math.hypot(this.target.x - this.position.x, this.target.z - this.position.z)
    );
  }

  apply() {
    // set player automove to position, rotation
    if (this.ref.player.position.distanceTo(this.position) > this.ref.player.automove.threshold.position.outer) {
      this.ref.player.automove.position.copy(this.position);
      this.ref.player.automove.rotation.copy(this.rotation);
      this.ref.player.automove.active.position = true;
      this.ref.player.automove.active.rotation = true;
    }
  }
}

export default PlayerPosition;
