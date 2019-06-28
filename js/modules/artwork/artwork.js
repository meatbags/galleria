/** Artwork */

import InteractionNode from './interaction_node';
import VideoElement from './video_element';

class Artwork {
  constructor(root, index, data, isMobile) {
    this.root = root;
    this.id = 'artwork-' + index;
    this.index = index;
    this.data = data;
    this.isMobile = isMobile;

    // props
    this.active = false;
    this.position = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.nearRadius = 5;
    this.thickness = 0.2;
    this.artworkMenuActive = true;
  }

  init(scene, p, v) {
    this.sceneReference = scene;

    // create meshes
    const planeOffset = this.thickness / 2 + 0.01;
    this.board = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0x0, roughness: 0.75, metalness: 0}));
    this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), new THREE.MeshStandardMaterial({roughness: 1.0, metalness: 0.5}));

    // cache base
    this.baseY = p.y;

    // set position, create node
    p.x += (v.x != 0 ? 0 : 1) * this.data.horizontalOffset;
    p.y += this.data.verticalOffset;
    p.z += (v.z != 0 ? 0 : 1) * this.data.horizontalOffset;
    this.plane.position.set(p.x + v.x * planeOffset, p.y, p.z + v.z * planeOffset);
    this.position.set(p.x, p.y, p.z);
    this.direction.set(v.x, v.y, v.z);
    this.node = new InteractionNode(p, null, v, this);

    // calc view position
    const offScale = this.isMobile ? 1.5 : 0.9;
    this.viewPosition = new THREE.Vector3();
    this.viewPosition.y = Math.min(7.8, this.baseY - 3);
    this.viewPosition.x = p.x + v.x * Math.min((p.y - this.viewPosition.y) * offScale, 8);
    this.viewPosition.z = p.z + v.z * Math.min((p.y - this.viewPosition.y) * offScale, 8);

    // spatially above ramp
    if (p.x > 20 && p.z < -10) {
      this.viewPosition.set(28, 4.4, -8);
    } else if (p.x < -20 && p.z < -10) {
      this.viewPosition.set(-28, 4.4, -8);
    }

    // calc view rotation (pitch, yaw)
    this.viewRotation = new THREE.Vector2();
    this.viewRotation.y = Math.atan2(p.y - (this.viewPosition.y + this.root.ref.player.height) - 0.125, Math.hypot(p.x - this.viewPosition.x, p.z - this.viewPosition.z));
    this.viewRotation.x = Math.atan2(p.x - this.viewPosition.x, p.z - this.viewPosition.z);

    // set default board scale
    this.board.scale.x = v.x != 0 ? this.thickness : 1;
    this.board.scale.z = v.z != 0 ? this.thickness : 1;
    this.board.position.set(p.x, p.y, p.z);

    // get texture from image file/ or link to video
    let texture;
    if (this.data.videoFile !== '') {
      const audioPosition = new THREE.Vector3();
      audioPosition.copy(this.plane.position);
      audioPosition.x += v.x / 2;
      audioPosition.z += v.z / 2;
      this.videoElement = new VideoElement(this.sceneReference, this.data.videoFile, this.data.audioFile, audioPosition, this.root.ref.camera);

      // video texture
      texture = new THREE.VideoTexture(this.videoElement.getElement());

      // set size
      const width = this.data.width;
      const height = width * (1080 / 1920);
      this.plane.scale.x = width;
      this.plane.scale.y = height;
      this.board.scale.x = v.x != 0 ? this.thickness : width;
      this.board.scale.y = height;
      this.board.scale.z = v.z != 0 ? this.thickness : width;

      // set node
      this.node.setCorners();
    } else {
      texture = new THREE.TextureLoader().load(this.data.url, (tex) => {
        // scale to image dimensions
        const height = this.data.width * (tex.image.naturalHeight / tex.image.naturalWidth);
        this.plane.scale.x = this.data.width;
        this.plane.scale.y = height;
        this.board.scale.x = v.x != 0 ? this.thickness : this.data.width;
        this.board.scale.y = height;
        this.board.scale.z = v.z != 0 ? this.thickness : this.data.width;

        // set node
        this.node.setCorners();
      });
    }

    // set artwork texture
    this.plane.material.map = texture;

    // required for NPOT textures
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;

    // rotate image plane accordingly
    if (v.z == 1) {
      // default
    } else if (v.z == -1) {
      this.plane.rotation.y = Math.PI;
    } else if (v.x == 1) {
      this.plane.rotation.y = Math.PI * 0.5;
    } else if (v.x == -1) {
      this.plane.rotation.y = Math.PI * 1.5;
    }

    // add
    scene.add(this.plane);
    scene.add(this.board);
  }

  mouseOver(x, y, player) {
    this.node.mouseOver(x, y, player);
  }

  click(x, y, player) {
    this.node.mouseOver(x, y, player);

    if (this.node.isClickable()) {
      this.root.moveToArtwork(this);

      // close menu if not current artwork
      if (!this.isArtworkMenuMine()) {
        this.root.closeArtworkMenu();
      }

      // open menu
      if (this.artworkMenuActive && this.node.buttonActive && this.node.buttonHover) {
        this.root.openArtworkMenu(this);
      }

      return true;
    }
    return false;
  }

  disableArtworkMenu() {
    this.artworkMenuActive = false;
    this.node.disableInfoTag();
  }

  isArtworkMenuMine() {
    const img = this.root.el.image.querySelector('img');
    if (img) {
      return (
        this.root.domElement.dataset.active == this.id && img.src == this.data.url
      );
    } else {
      return (this.root.domElement.dataset.active == this.id);
    }
  }

  update(delta, player, camera, cameraDir, centre) {
    this.node.update(delta, player, camera, cameraDir, centre);

    if (this.videoElement) {
      this.videoElement.update(player.position);
    }
  }

  draw(ctx) {
    return this.node.draw(ctx);
  }

  destroy() {
    this.sceneReference.remove(this.plane);
    this.sceneReference.remove(this.board);
    if (this.videoElement) {
      this.videoElement.destroy();
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

  isClickable() {
    return this.node.isClickable();
  }

  resize() {
    this.node.resize();
  }
}

export default Artwork;
