import { Materials } from '../config';

class Artwork {
  constructor(root, element, ops) {
    // artwork

    this.root = root;
    this.element = element;
    this.object = new THREE.Object3D();
    this.active = false;
    this.scale = ops.scale;
    this.pitch = ops.pitch;
    this.yaw = ops.yaw;
    this.position = ops.position;
    this.eye = ops.eye;

    // create

    this.parseElement();
    this.createObject();

    // add to doc

    this.root.add(this.object);
  }

  activate() {
    // turn on

    if (!this.active) {
      this.active = true;
      this.mesh.material.color.setHex(0xffffff);
    }
  }

  deactivate() {
    // turn off

    if (this.active) {
      this.active = false;
    }
  }

  createObject() {
    // create 3D object

    this.textureLoader = new THREE.TextureLoader();
    this.mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 2, 2), Materials.canvas.clone());
    const map = this.textureLoader.load(this.image, (tex) => {
      // set scale and append to scene

      this.mesh.scale.x = (map.image.naturalWidth / 1000.) * this.scale;
      this.mesh.scale.y = (map.image.naturalHeight / 1000.) * this.scale;

      // create collision box w new dimensions

      this.object.add(this.mesh);
    });
    const alphaMap = this.textureLoader.load(this.alpha, (tex) => {
      // add alpha map

      this.mesh.material.transparent = true;
    });
    this.mesh.material.map = map;
    this.mesh.material.alphaMap = alphaMap;

    // rotate to spec

    this.mesh.rotation.set(this.pitch, this.yaw, 0);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  parseElement() {
    // pull data from doc element

    this.title = this.element.find('.im__title').html();
    this.desc = this.element.find('.im__description').html();
    this.url = this.element.find('.im__url').html();
    this.image = this.element.find('.im__image').html();
    this.alpha = this.element.find('.im__alpha').html();

    // generate spiel

    this.spiel = `${this.title}${this.desc}${this.url}`;
  }

  meshHasId(id) {
    return (id === this.mesh.uuid);
  }
}

export default Artwork;
