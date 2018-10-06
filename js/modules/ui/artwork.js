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
    this.thickness = 0.2;
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
    this.board = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0x0, roughness: 0.75, metalness: 0}));
    this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), new THREE.MeshStandardMaterial({roughness: 1.0, metalness: 0.5}));

    // set position, create node
    this.baseY = p.y;
    p.x += (v.x != 0 ? 0 : 1) * this.data.offset.horizontal;
    p.y += this.data.offset.vertical;
    p.z += (v.z != 0 ? 0 : 1) * this.data.offset.horizontal;
    this.plane.position.set(p.x + v.x * planeOffset, p.y, p.z + v.z * planeOffset);
    this.position.set(p.x, p.y, p.z);
    this.direction.set(v.x, v.y, v.z);
    this.node = new InteractionNodeView(p, null, v, this);

    // get texture from image file
    const texture = new THREE.TextureLoader().load(this.data.url, (tex) => {
      // scale to image dimensions
      const height = this.data.width * (tex.image.naturalHeight / tex.image.naturalWidth);
      this.plane.scale.x = this.data.width;
      this.plane.scale.y = height;
      this.board.scale.x = v.x != 0 ? this.thickness : this.data.width;
      this.board.scale.y = height;
      this.board.scale.z = v.z != 0 ? this.thickness : this.data.width;

      // set
      this.node.setCorners();
    });

    // set artwork texture
    this.plane.material.map = texture;

    // required for NPOT textures
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;

    if (v.z == 1) {
      // default
    } else if (v.z == -1) {
      this.plane.rotation.y = Math.PI;
    } else if (v.x == 1) {
      this.plane.rotation.y = Math.PI * 0.5;
    } else if (v.x == -1) {
      this.plane.rotation.y = Math.PI * 1.5;
    }

    this.board.scale.x = v.x != 0 ? this.thickness : 1;
    this.board.scale.z = v.z != 0 ? this.thickness : 1;
    this.board.position.set(p.x, p.y, p.z);

    // add
    scene.add(this.plane);
    scene.add(this.board);
  }

  activate() {
    if (!this.active) {
      this.active = true;
    }
  }

  deactivate() {
    if (this.active) {
      this.active = false;
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
  }
}

export { Artwork };
