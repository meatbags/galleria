/** Custom exhibition */

import Loader from '../../loader/loader';

class CustomTiyan {
  constructor(root) {
    this.ref = {
      scene: root.ref.scene,
      materials: root.ref.materials,
    };
    this.load();
  }

  load() {
    // load models
    this.assets = [];
    const loader = new Loader('assets');
    loader.loadFBX('tiyan/separators').then(obj => {
      this.ref.materials.conformGroup(obj);
      this.ref.scene.scene.add(obj);
      this.assets.push(obj);
    });

    // add separator collisions
    const mesh1 = new THREE.Mesh(new THREE.BoxBufferGeometry(14, 4, 1.5), new THREE.MeshStandardMaterial({}));
    const mesh2 = new THREE.Mesh(new THREE.BoxBufferGeometry(1.5, 4, 16), new THREE.MeshStandardMaterial({}));
    mesh1.position.set(-23, 1, 6);
    mesh2.position.set(17.25, 1, 15.5);
    this.ref.scene.colliderSystem.add(mesh1);
    this.ref.scene.colliderSystem.add(mesh2);
  }

  unload() {
    this.unloadCallback = () => {
      this.assets.forEach(obj => {
        this.ref.scene.scene.remove(obj);
      });
    };
  }
}

export default CustomTiyan;
