/**
 ** Handle individual artwork placement and interaction.
 **/

import { InteractionNodeView } from './interaction_nodes';

class Artwork {
  constructor(root, id, e, isMobile) {
    this.root = root;
    this.id = id;
    this.isMobile = isMobile;
    this.element = e;
    this.active = false;
    this.position = new THREE.Vector3();
    this.direction = new THREE.Vector3();
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

    // cache base
    this.baseY = p.y;

    // set position, create node
    p.x += (v.x != 0 ? 0 : 1) * this.data.offset.horizontal;
    p.y += this.data.offset.vertical;
    p.z += (v.z != 0 ? 0 : 1) * this.data.offset.horizontal;
    this.plane.position.set(p.x + v.x * planeOffset, p.y, p.z + v.z * planeOffset);
    this.position.set(p.x, p.y, p.z);
    this.direction.set(v.x, v.y, v.z);
    this.node = new InteractionNodeView(p, null, v, this);

    // calc view position
    const offScale = this.isMobile ? 1.5 : 0.9;
    this.viewPosition = new THREE.Vector3();
    this.viewPosition.y = Math.min(7.8, this.baseY - 3);
    this.viewPosition.x = p.x + v.x * Math.min((p.y - this.viewPosition.y) * offScale, 8);
    this.viewPosition.z = p.z + v.z * Math.min((p.y - this.viewPosition.y) * offScale, 8);

    // spacially above ramp
    if (p.x > 20 && p.z < -10) {
      this.viewPosition.set(28, 4.4, -8);
    } else if (p.x < -20 && p.z < -10) {
      this.viewPosition.set(-28, 4.4, -8);
    }

    // calc view rotation (pitch, yaw)
    this.viewRotation = new THREE.Vector2();
    this.viewRotation.y = Math.atan2(p.y - (this.viewPosition.y + this.root.player.height) - 0.125, Math.hypot(p.x - this.viewPosition.x, p.z - this.viewPosition.z));
    this.viewRotation.x = Math.atan2(p.x - this.viewPosition.x, p.z - this.viewPosition.z);

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

  mouseOver(x, y, player) {
    this.node.mouseOver(x, y, player);
  }

  click(x, y, player) {
    this.node.mouseOver(x, y, player);
    if (this.node.isHover()) {
      this.root.closeArtworkMenu();
      this.root.moveToArtwork(this);
      if (this.node.buttonActive) {
        this.root.openArtworkMenu(this);
      }
    }
  }

  removeHover() {
    this.node.hover = false;
  }

  forceHover() {
    this.node.hover = true;
  }

  getFloorPosition() {
    return this.floorPosition;
  }

  isHover() {
    return this.node.isHover();
  }

  update(delta, player, camera, cameraDir, centre) {
    this.node.update(delta, player, camera, cameraDir, centre);
  }

  draw(ctx) {
    this.node.draw(ctx);
  }
}

export { Artwork };
