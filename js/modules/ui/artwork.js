/**
 ** Handle individual artwork.
 **/

import { InteractionNodeView } from './interaction_nodes';

class Artwork {
  constructor(id, e) {
    this.id = id;
    this.active = false;
    this.position = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.element = e;
    this.nearRadius = 5;
    this.thickness = 0.125;
    this.upstairs = false;
    this.data = {
      url: e.dataset.url,
      title: e.dataset.title || '',
      subtitle: e.dataset.subtitle || '',
      desc: e.dataset.desc || '',
      link: e.dataset.link || '',
      width: parseFloat(e.dataset.width),
      offset: {
        horizontal: parseFloat(e.dataset.hoff),
        vertical: parseFloat(e.dataset.voff)
      },
      index: (parseInt(e.dataset.location) - 1) || e.dataset.location
    };
  }

  init(scene, p, v) {
    const planeOffset = this.thickness / 2 + 0.01;
    const board = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0x0, roughness: 0.75, metalness: 0}));
    const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), new THREE.MeshStandardMaterial({roughness: 1.0, metalness: 0.5}));

    // get texture from image file
    const texture = new THREE.TextureLoader().load(this.data.url, (tex) => {
      // scale to image dimensions
      const height = this.data.width * (tex.image.naturalHeight / tex.image.naturalWidth);
      plane.scale.x = this.data.width;
      plane.scale.y = height;
      board.scale.x = v.x != 0 ? this.thickness : this.data.width;
      board.scale.y = height;
      board.scale.z = v.z != 0 ? this.thickness : this.data.width;
    });

    // required for NPOT textures
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;

    // record original
    this.baseY = p.y;

    // reposition
    p.x += (v.x != 0 ? 0 : 1) * this.data.offset.horizontal;
    p.y += this.data.offset.vertical;
    p.z += (v.z != 0 ? 0 : 1) * this.data.offset.horizontal;

    // set, add to scene
    plane.material.map = texture;
    plane.position.set(p.x + v.x * planeOffset, p.y, p.z + v.z * planeOffset);

    if (v.z == 1) {
      // default
    } else if (v.z == -1) {
      plane.rotation.y = Math.PI;
    } else if (v.x == 1) {
      plane.rotation.y = Math.PI * 0.5;
    } else if (v.x == -1) {
      plane.rotation.y = Math.PI * 1.5;
    }

    board.scale.x = v.x != 0 ? this.thickness : 1;
    board.scale.z = v.z != 0 ? this.thickness : 1;
    board.position.set(p.x, p.y, p.z);
    scene.add(plane);
    scene.add(board);

    // save reference
    this.board = board;

    // create interaction node
    this.node = new InteractionNodeView(p, null, v, this.baseY);
    this.position.set(p.x, p.y, p.z);
    this.direction.set(v.x, v.y, v.z);
  }

  activate() {
    if (!this.active && this.board !== undefined) {
      this.active = true;
      if (!this.saveScale) {
        this.saveScale = this.board.scale.clone();
      }

      // set target
      this.targetScale = this.board.scale.clone();
      this.targetScale.x += this.board.scale.x == this.thickness ? 0 : 0.25;
      this.targetScale.y += 0.25;
      this.targetScale.z += this.board.scale.z == this.thickness ? 0 : 0.25;
    }
  }

  deactivate() {
    if (this.active) {
      this.active = false;
      if (this.saveScale) {
        this.targetScale.set(this.saveScale.x, this.saveScale.y, this.saveScale.z);
      }
    }
  }

  getDistanceTo(p) {
    return this.position.distanceTo(p);
  }

  isFacing(p) {
    // check if (position->p . direction) >= 0
    const v = p.clone();
    v.sub(this.position);
    return (v.dot(this.direction) >= 0);
  }

  getCameraDot(p, v) {
    // get dot product p->position . v
    const d = this.position.clone();
    d.sub(p);
    d.normalize();
    return d.dot(v);
  }

  update(delta) {
    if (this.targetScale && this.board) {
      this.board.scale.x += (this.targetScale.x - this.board.scale.x) * 0.15;
      this.board.scale.y += (this.targetScale.y - this.board.scale.y) * 0.15;
      this.board.scale.z += (this.targetScale.z - this.board.scale.z) * 0.15;
    }
  }
}

export { Artwork };
