/**
 * Load models.
 **/

import { Materials } from './materials';
import { Loader } from '../loaders';

class Map {
  constructor(root) {
    this.root = root;
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

    // onloads
    this.toLoad = 2;
    this.checkLoaded = () => {
      this.toLoad -= 1;
      if (this.toLoad == 0) {
        const target = document.querySelector('#open-gallery');
        target.classList.remove('is-loading');
        target.classList.add('flash');
        target.innerHTML = 'Open Gallery';
      }
    };

    // main maps
    this.loader.loadFBX('map').then((map) => {
      this.scene.add(map);
      this.conformGroups(map);
      this.checkLoaded();
    }, (err) => { console.log(err); });

    this.loader.loadOBJ('collision').then((map) => {
      this.addCollisionMap(map);
      this.checkLoaded();
    }, (err) => { console.log(err); });

    // peripherals
    this.loader.loadFBX('props').then((map) => {
      this.scene.add(map);
      this.conformGroups(map);
    });

    //const mat = this.materials.getCustomMaterial('warp');
    /*
    const mat = this.materials.mat.metal.clone();
    mat.roughness = 0.3;
    this.group = [];
    for (var x=-15; x<16; ++x) {
      const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(0.125, 5, 1), mat);
      mesh.position.set(x, 6, 6);
      this.scene.add(mesh);
      this.group.push(mesh);
    }
    */
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
    this.materials.update(delta);
    if (this.group) {
      /*
      if (this.root.player.position.y > 4) {
        const x = this.root.player.position.x;
        this.group.forEach(child => {
          const dist = 1.0 - Math.min(1.0, Math.abs(child.position.x - x) / 12.0);
          const target = 5 + dist * 6;
          const rot = (1 - dist) * Math.PI / 2;
          child.position.y += (target - child.position.y) * 0.04;
          child.rotation.y += (rot - child.rotation.y) * 0.03;
        });
      }
      */
    }
  }
}

export { Map };
