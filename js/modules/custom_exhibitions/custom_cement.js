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

  loadModels() {
    this.toUnload = [];
    this.meshes = [];
    this.age = 0;
    const n = 40;
    const step = 1 / n;

    for (let t=0; t<=1; t+=step) {
      const door = this.makeDoor(5, 6, 0.07);
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
    const matL = new THREE.MeshStandardMaterial({color: 0xbc13fe, emissive: 0x0, metalness: 0.5, roughness: 0.4});
    const matR = new THREE.MeshStandardMaterial({color: 0xfe019a, emissive: 0x0, metalness: 0.5, roughness: 0.4});

    // static frame
    const frameLeft = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, height, thickness), matL);
    const frameRight = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, height, thickness), matR);
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
    const angle1 = Math.atan2(int1.y - centre.y, int1.x - centre.x);
    const angle2 = Math.atan2(int2.y - centre.y, int2.x - centre.x);
    const arc1 = CreateArc(radius, thickness, angle2, angle1);
    const arc2 = arc1.clone();
    arc1.position.set(0, centre.y, centre.x + 0.25 + radius * 1.75);
    arc2.position.set(0, centre.y, centre.x - 0.25 + radius * 1.75);
    arc1.material = matL;
    arc2.material = matR;
    group.add(arc1, arc2);

    // create frame meshes
    const frameTop1 = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, thickness, 1), matL);
    const frameTop2 = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, thickness, 1), matR);
    const frameBottom1 = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, thickness, 1), matL);
    const frameBottom2 = new THREE.Mesh(new THREE.BoxBufferGeometry(thickness, thickness, 1), matR);
    frameTop1.position.y = h;
    frameTop2.position.y = h;
    frameBottom1.position.y = -h;
    frameBottom2.position.y = -h;
    group.add(frameTop1, frameTop2, frameBottom1, frameBottom2);

    // animation
    const anim = {
      arc1: {z: arc1.position.z},
      arc2: {z: arc2.position.z},
      T: {L: int1.x + arc1.position.z - centre.x, R: int1.x + arc2.position.z - centre.x},
      B: {L: int2.x + arc1.position.z - centre.x, R: int2.x + arc2.position.z - centre.x},
      left: w,
      right: -w,
      age: 0,
      step: Math.PI / 12,
    };
    anim.update = (delta, i) => {
      anim.age += delta;

      // calc arc position
      const offset = Math.sin(anim.age + i * anim.step);
      arc1.position.z = anim.arc1.z + offset;
      arc2.position.z = anim.arc2.z + offset;

      // calc frame position & scale
      const TL = anim.T.L + offset;
      const TR = anim.T.R + offset;
      const BL = anim.B.L + offset;
      const BR = anim.B.R + offset;
      frameTop1.position.z = anim.left + (TL - anim.left) / 2;
      frameTop2.position.z = anim.right + (TR - anim.right) / 2;
      frameBottom1.position.z = anim.left + (BL - anim.left) / 2;
      frameBottom2.position.z = anim.right + (BR - anim.right) / 2;
      frameTop1.scale.z = Math.abs(TL - anim.left);
      frameTop2.scale.z = Math.abs(TR - anim.right);
      frameBottom1.scale.z = Math.abs(BL - anim.left);
      frameBottom2.scale.z = Math.abs(BR - anim.right);

      // colour
      const t = anim.age / 2 + i * 0.25;
      if (t % 6 <= 2) {
        const f = Math.sin((t % 6) / 2 * Math.PI);
        matL.emissive.setScalar(f);
        matR.emissive.setScalar(f);
      }
    };
    group.anim = anim;

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
    this.meshes.forEach(mesh => {
      mesh.anim.update(delta, i++);
    });
  }
}

export default CustomCement;
