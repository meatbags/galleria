/**
 ** Handle individual artwork.
 **/

import { InteractionNodeView } from './interaction_nodes';

class Artwork {
  constructor(id, e) {
    this.id = id;
    this.position = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.element = e;
    this.nearRadius = 5;
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
    const thickness = 0.125;
    const planeOffset = thickness / 2 + 0.01;
    const board = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0x0, roughness: 0.75, metalness: 0}));
    const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), new THREE.MeshStandardMaterial({roughness: 1.0, metalness: 0.5}));

    // get texture from image file
    const texture = new THREE.TextureLoader().load(this.data.url, (tex) => {
      // scale to image dimensions
      const height = this.data.width * (tex.image.naturalHeight / tex.image.naturalWidth);
      plane.scale.x = this.data.width;
      plane.scale.y = height;
      board.scale.x = v.x != 0 ? thickness : this.data.width;
      board.scale.y = height;
      board.scale.z = v.z != 0 ? thickness : this.data.width;
    });

    // required for NPOT textures
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;

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

    board.scale.x = v.x != 0 ? thickness : 1;
    board.scale.z = v.z != 0 ? thickness : 1;
    board.position.set(p.x, p.y, p.z);
    scene.add(plane);
    scene.add(board);

    // create interaction node
    this.node = new InteractionNodeView(p, null, v);
    this.position.set(p.x, p.y, p.z);
    this.direction.set(v.x, v.y, v.z);
  }

  getDistanceTo(p) {
    return this.position.distanceTo(p);
  }

  getCameraDot(p, v) {
    // get dot product p->position . v
    const d = this.position.clone();
    d.sub(p);
    d.normalize();
    return d.dot(v);
  }
}

export { Artwork };
