/** Scene */

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.colliderSystem = new Collider.System();
  }

  bind(root) {
    this.ref = {};
  }

  onReload() {
    this.colliderSystem = new Collider.System();
  }
}

export default Scene;
