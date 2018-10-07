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

    // visual map
    this.loader.loadFBX('map').then((map) => {
      this.scene.add(map);
      this.conformGroups(map);
      this.checkLoaded();
    }, (err) => { console.log(err); });

    // collision map
    this.loader.loadOBJ('collision').then((map) => {
      this.addCollisionMap(map);
      this.checkLoaded();
    }, (err) => { console.log(err); });

    // peripherals (doesn't affect loading)
    this.loader.loadFBX('props').then((map) => {
      this.scene.add(map);
      this.conformGroups(map);
    });

    // revolving display
    this.makeBox();
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

  makeBox() {
    /*
    this.box = new THREE.Group();
    const w = 2.0;
    const r = 0.1;
    const o = w/2 - r/2;
    const arr = [
      [w, r, r, 0, o, o], [w, r, r, 0, o, -o], [w, r, r, 0, -o, o], [w, r, r, 0, -o, -o],
      [r, w, r, o, 0, o], [r, w, r, o, 0, -o], [r, w, r, -o, 0, o], [r, w, r, -o, 0, -o],
      [r, r, w, o, o, 0], [r, r, w, -o, o, 0], [r, r, w, -o, -o, 0], [r, r, w, o, -o, 0]
    ];
    arr.forEach(e => {
      const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(e[0], e[1], e[2]), this.materials.mat.neon);
      mesh.position.set(e[3], e[4], e[5]);
      this.box.add(mesh);
    });
    this.box.position.set(0, 17, 19.5);
    this.scene.add(this.box);
    */

    // neon lights
    const size = 0.1;
    const rodSize = 4;
    for (var x=-16; x<=16; x+=8) {
      const y = 19;
      const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(size, size, rodSize), this.materials.mat.neon);
      const holster = new THREE.Mesh(new THREE.BoxBufferGeometry(size, size * 4, rodSize), this.materials.mat.dark);
      const rod1 = new THREE.Mesh(new THREE.BoxBufferGeometry(size, 1, size), this.materials.mat.dark);
      const rod2 = rod1.clone();
      mesh.position.set(x, y, 6);
      holster.position.set(x, y + size*2.5, 6);
      rod1.position.set(x, y + size*4.5 + 0.5, 6 + rodSize / 3);
      rod2.position.set(x, y + size*4.5 + 0.5, 6 - rodSize / 3);
      rod1.rotation.y = Math.PI / 4;
      rod2.rotation.y = Math.PI / 4;
      this.scene.add(mesh, holster, rod1, rod2);
    }
  }

  update(delta) {
    this.materials.update(delta);
    //this.box.rotation.y += delta * Math.PI / 12;
  }
}

export { Map };
