/**
 * Base UI node. Converts world space to screen space.
 **/

class InteractionNodeBase {
  constructor(position, clipping) {
    this.onscreen = true;
    this.position = position;
    this.clipping = clipping || null;
    this.coords = new THREE.Vector2();
    this.helper = new THREE.Vector3();
  }

  calculateNodePosition(camera, worldVec, centre) {
    this.helper.copy(camera.position);
    this.helper.sub(this.position);
    this.helper.normalize();
    if (this.helper.dot(worldVec) <= 0) {
      this.onscreen = true;
      this.helper.copy(this.position);
      this.helper.project(camera);
      this.coords.x = (this.helper.x + 1) * centre.x;
      this.coords.y = (-this.helper.y + 1) * centre.y;
    } else {
      this.onscreen = false;
    }

    // clip plane
    if (this.clipping && this.onscreen) {
      this.helper.copy(camera.position);
      this.helper.sub(this.position);
      if (this.helper.dot(this.clipping) < 0) {
        this.onscreen = false;
      }
    }
  }
}

export { InteractionNodeBase };
