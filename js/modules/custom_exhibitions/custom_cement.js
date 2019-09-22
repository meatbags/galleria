/** Custom exhibition */

import Loader from '../../loader/loader';

class CustomCement {
  constructor(root) {
    this.ref = {
      materials: root.ref.materials,
      scene: root.ref.scene,
    };
  }

  load() {
    return new Promise((resolve, reject) => {
      this.loadModels();
      resolve();
    });
  }

  makeSquare(width, t) {
    const group = new THREE.Group();
    const mesh1 = new THREE.Mesh(new THREE.BoxBufferGeometry(t, t, width), this.ref.materials.mat.neon);
    const mesh2 = new THREE.Mesh(new THREE.BoxBufferGeometry(t, t, width), this.ref.materials.mat.neon);
    const mesh3 = new THREE.Mesh(new THREE.BoxBufferGeometry(t, width, t), this.ref.materials.mat.neon);
    const mesh4 = new THREE.Mesh(new THREE.BoxBufferGeometry(t, width, t), this.ref.materials.mat.neon);
    mesh1.position.set(0, width/2 - t/2, 0);
    mesh2.position.set(0, -width/2 + t/2, 0);
    mesh3.position.set(0, 0, width/2 - t/2);
    mesh4.position.set(0, 0, -width/2 + t/2);
    group.add(mesh1);
    group.add(mesh2);
    group.add(mesh3);
    group.add(mesh4);
    return group;
  }

  loadModels() {
    // const loader = new Loader('assets');
    this.toUnload = [];
    this.meshes = [];
    this.age = 0;
    for (let x=-16; x<=16; x+=0.5) {
      const group = this.makeSquare(4, 0.05);
      group.position.set(x, 13, 6);
      group.rotation.x = -Math.PI / 4;
      group.refX = x;
      group.rotation.x = x / 16;
      this.ref.scene.scene.add(group);
      this.meshes.push(group);
      this.toUnload.push(group);
    }
  }

  unload() {
    this.toUnload.forEach(obj => {
      this.ref.scene.scene.remove(obj);
    });
  }

  update(delta) {
    this.age += delta / 2;
    let i = 0;
    this.meshes.forEach(mesh => {
      mesh.rotation.x += delta / 4;
    });
  }
}

export default CustomCement;
