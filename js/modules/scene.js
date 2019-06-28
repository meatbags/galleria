/** Scene */

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
  }

  bind(root) {
    this.ref = {};
  }

  reset() {
    this.colliderSystem = new Collider.System();
  }
}

export default Scene;
