/** Custom exhibition */

import Loader from '../../loader/loader';
import CreateArc from '../../maths/create_arc';
import CircleLineIntersect from '../../maths/circle_line_intersect';

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
    this.toUnload = [];
    this.meshes = [];
    this.age = 0;

    for (let x=-15; x<=15; x+=1) {
      const door = this.makeDoor(5, 6, 0.03);
      door.position.set(x, 11, -7.25);
      this.ref.scene.scene.add(door);
      this.toUnload.push(door);
    }
  }

  makeDoor(width, height, thickness) {
    const w = width/2 - thickness/2;
    const h = height/2 - thickness/2;
    const group = new THREE.Group();
    const frameTop = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, thickness, width), this.ref.materials.mat.neon);
    const frameBottom = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, thickness, width), this.ref.materials.mat.neon);
    const frameLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, height, thickness), this.ref.materials.mat.neon);
    const frameRight = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, height, thickness), this.ref.materials.mat.neon);
    frameTop.position.y = h
    frameBottom.position.y = -h;
    frameLeft.position.z = w;
    frameRight.position.z = -w;

    // create arc
    const p1 = new THREE.Vector2(-w, h);
    const p2 = new THREE.Vector2(w, h);
    const p3 = new THREE.Vector2(-w, -h);
    const p4 = new THREE.Vector2(w, -h);
    const centre = new THREE.Vector2(-w * 2, 0.5);
    const radius = width * 1.25;
    const int1 = CircleLineIntersect(centre, radius, p1, p2);
    const int2 = CircleLineIntersect(centre, radius, p3, p4);

    if (int1 && int2) {
      const angle1 = Math.atan2(int1.y - centre.y, int1.x - centre.x);
      const angle2 = Math.atan2(int2.y - centre.y, int2.x - centre.x);
      const arc1 = CreateArc(radius, thickness, angle2, angle1);
      const arc2 = arc1.clone();
      arc1.position.set(0, centre.y, centre.x - 0.125 + radius * 2);
      arc2.position.set(0, centre.y, centre.x + 0.125 + radius * 2);
      group.add(arc1, arc2);
      const marker1 = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, 0.5, thickness), this.ref.materials.mat.neon);
      const marker2 = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, 0.5, thickness), this.ref.materials.mat.neon);
      marker1.position.set(0, int1.y, int1.x);
      marker2.position.set(0, int2.y, int2.x);
      group.add(marker1, marker2);
    }

    //group.add(arc);
    group.add(frameTop, frameBottom, frameLeft, frameRight);
    return group;
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
