/**
 * Load models.
 **/

import { Materials } from './materials';
import { LoadFBX } from '../loaders';

class Map {
  constructor(root) {
    this.scene = root.scene;
    this.colliderSystem = root.colliderSystem;
    this.loadScene();
  }

  loadScene() {
    this.floor = new THREE.Mesh(new THREE.BoxBufferGeometry(10, 1, 10), new THREE.MeshPhongMaterial({}));
    this.floor.position.y = 1;
    //this.scene.add(this.floor);
    this.colliderSystem.add(this.floor);
  }

  update(delta) {
    // ..
  }
}

export { Map };
