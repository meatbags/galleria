/**
 * Load models.
 **/

import { Materials } from './materials';
import { Loader } from '../loaders';

class Map {
  constructor(root) {
    this.scene = root.scene;
    this.colliderSystem = root.colliderSystem;
    this.materials = new Materials('assets');
    this.loader = new Loader('assets');
    this.loadScene();
  }

  loadScene() {
    // invisible floor
    this.floor = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 1, 100), new THREE.MeshPhongMaterial({}));
    this.floor.position.y = -0.25;
    this.colliderSystem.add(this.floor);

    this.loader.loadFBX('map').then((map) => {
      this.scene.add(map);
      this.conformGroups(map);
    }, (err) => { console.log(err); });

    this.loader.loadOBJ('collision').then((map) => {
      this.addCollisionMap(map);
    }, (err) => { console.log(err); });
  }

  addCollisionMap(obj) {
    // recursively add object group to collider
    if (obj.type === 'Mesh') {
      this.colliderSystem.add(obj);
    } else if (obj.children && obj.children.length) {
      obj.children.forEach(child => { this.addCollisionMap(child); });
    }
  }

  conformGroups(obj) {
    // recursively conform object groups
    if (obj.type === 'Mesh') {
      this.materials.conform(obj.material);
    } else if (obj.children && obj.children.length) {
      obj.children.forEach(child => { this.conformGroups(child); });
    }
  }

  update(delta) {
    // ..
  }
}

export { Map };
