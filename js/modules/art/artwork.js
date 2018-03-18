import { Materials } from '../config';
import { getPitch, getYaw } from '../maths';
import { Globals } from '../config';

class Artwork {
  constructor(root, id, element, ops) {
    // artwork
    this.id = id;
    this.root = root;
    this.element = element;
    this.object = new THREE.Object3D();
    this.active = false;
    this.textActive = false;
    this.opacity = 0.4;
    this.scale = ops.scale;
    this.pitch = ops.pitch;
    this.yaw = ops.yaw;
    this.position = ops.position;

    // eye target
    this.eyeTarget = {
      position: ops.eye,
      pitch: getPitch(ops.eye, new THREE.Vector3(this.position.x, this.position.y - Globals.player.height, this.position.z)),
      yaw: getYaw(ops.eye, this.position)
    };

    // build object
    this.build();

    // add to doc
    this.$label = $('.label__inner');
    this.root.add(this.object);
  }

  getEyeTarget() {
    // get viewing target

    return this.eyeTarget;
  }

  build() {
    // pull data from doc element
    this.title = this.element.find('.im__title').html();
    this.desc = this.element.find('.im__description').html();
    this.url = this.element.find('.im__url').html();
    this.image = this.element.find('.im__image').html();
    this.alpha = this.element.find('.im__alpha').html();

    // generate html tag
    this.spiel = `
      <div class="label-title">
        ${this.title}
      </div>
      <div class="label-desc">
        ${this.desc}
      </div>
      <div class="label-link">
        <a href='${this.url}' target='_blank'>Order print.</a>
      </div>`;

    // collision box
    this.box = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        visible: false,
        transparent: true,
        opacity: 0.1
      })
    );
    this.resizeBox = () => {
      // set collision box dimensions
      this.box.position.set(this.position.x, this.position.y, this.position.z);
      const sx = (this.yaw == 0) ? this.mesh.scale.x : this.mesh.scale.x / 2;
      const sz = (this.yaw == 0) ? this.mesh.scale.x / 2 : this.mesh.scale.x;
      this.box.scale.set(sx, this.mesh.scale.y, sz);
    };
    this.boxHasId = (id) => {
      return (id === this.box.uuid);
    };
    this.getBox = () => { return this.box; };
    this.object.add(this.box);

    // create 3D object
    this.textureLoader = new THREE.TextureLoader();
    this.mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 2, 2), Materials.canvas.clone());
    const map = this.textureLoader.load(this.image, (tex) => {
      // set scale and append to scene
      this.mesh.scale.x = (map.image.naturalWidth / 1000.) * this.scale;
      this.mesh.scale.y = (map.image.naturalHeight / 1000.) * this.scale;

      // resize box
      this.resizeBox();
    });
    const alphaMap = this.textureLoader.load(this.alpha, (tex) => {
      // add alpha map
      this.mesh.material.transparent = true;
    });
    this.mesh.material.map = map;
    this.mesh.material.alphaMap = alphaMap;

    // rotate to spec, add to scene
    this.mesh.rotation.set(this.pitch, this.yaw, 0);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.object.add(this.mesh);
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  isActive() {
    return this.active;
  }

  isTextActive() {
    return this.textActive;
  }

  activateText() {
    // set text to doc
    this.$label.html(this.spiel);
    this.$label.data('id', this.id);
    this.textActive = true;
  }

  update(playerPosition) {
    // update
    if (playerPosition.distanceTo(this.position) < 10) {
      this.activate();
    }

    // check text id
    if (this.textActive) {
      this.textActive = this.$label.data('id') == this.id;
    }

    // animate brightness
    if (this.active) {
      if (this.opacity < 1) {
        this.opacity += (1 - this.opacity) * 0.05;
        this.mesh.material.color.setScalar(this.opacity);
      }
    } else {
      if (this.opacity > 0.25) {
        this.opacity += (0.25 - this.opacity) * 0.05;
        this.mesh.material.color.setScalar(this.opacity);
      }
    }
  }
}

export default Artwork;
