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
    const n = 40;
    const step = 1 / n;

    for (let t=0; t<=1; t+=step) {
      const door = this.makeDoor(5, 6, 0.05);
      const x = -15 + 30 * (t<.5 ? 2*t*t : -1+(4-2*t)*t);
      door.position.set(x, 11, -7.25);
      this.ref.scene.scene.add(door);
      this.toUnload.push(door);
    }
  }

  makeDoor(width, height, thickness) {
    const w = width/2 - thickness/2;
    const h = height/2 - thickness/2;
    const group = new THREE.Group();
    const red = new THREE.MeshStandardMaterial({color: 0xff0000, emissive: 0x0, metalness: 0.75, roughness: 0.25});
    const blue = new THREE.MeshStandardMaterial({color: 0x0000ff, emissive: 0x0, metalness: 0.75, roughness: 0.25});

    // static frame
    const frameLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, height, thickness), red);
    const frameRight = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, height, thickness), blue);
    frameLeft.position.z = w;
    frameRight.position.z = -w;
    group.add(frameLeft, frameRight);

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
      arc1.position.set(0, centre.y, centre.x + 0.25 + radius * 1.75);
      arc2.position.set(0, centre.y, centre.x - 0.25 + radius * 1.75);
      arc1.material = red;
      arc2.material = blue;
      group.add(arc1, arc2);

      // create frame meshes
      const frameTop1 = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, thickness, 1), red);
      const frameTop2 = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, thickness, 1), blue);
      const frameBottom1 = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, thickness, 1), red);
      const frameBottom2 = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, thickness, 1), blue);
      frameTop1.position.y = h;
      frameTop2.position.y = h;
      frameBottom1.position.y = -h;
      frameBottom2.position.y = -h;
      group.add(frameTop1, frameTop2, frameBottom1, frameBottom2);

      // animation
      group.anim = {
        arc1: {z: arc1.position.z},
        arc2: {z: arc2.position.z},
        T: {L: int1.x + arc1.position.z - centre.x, R: int1.x + arc2.position.z - centre.x},
        B: {L: int2.x + arc1.position.z - centre.x, R: int2.x + arc2.position.z - centre.x},
        left: w,
        right: -w,
        update: (t) => {
          // calc arc position
          const offset = Math.sin(t);
          arc1.position.z = group.anim.arc1.z + offset;
          arc2.position.z = group.anim.arc2.z + offset;

          // calc frame position & scale
          const TL = group.anim.T.L + offset;
          const TR = group.anim.T.R + offset;
          const BL = group.anim.B.L + offset;
          const BR = group.anim.B.R + offset;
          frameTop1.position.z = group.anim.left + (TL - group.anim.left) / 2;
          frameTop2.position.z = group.anim.right + (TR - group.anim.right) / 2;
          frameBottom1.position.z = group.anim.left + (BL - group.anim.left) / 2;
          frameBottom2.position.z = group.anim.right + (BR - group.anim.right) / 2;
          frameTop1.scale.z = Math.abs(TL - group.anim.left);
          frameTop2.scale.z = Math.abs(TR - group.anim.right);
          frameBottom1.scale.z = Math.abs(BL - group.anim.left);
          frameBottom2.scale.z = Math.abs(BR - group.anim.right);
        }
      };
    }

    this.toUnload.push(group);
    this.meshes.push(group);
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
    const step = Math.PI / 12;
    this.meshes.forEach(mesh => {
      mesh.anim.update(this.age + (i++) * step);
    });
  }
}

export default CustomCement;
