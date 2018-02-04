import { Materials } from '../config';

class Artwork {
  constructor(root, element, ops) {
    // artwork

    this.root = root;
    this.element = element;
    this.object = new THREE.Object3D();
    this.active = false;
    this.opacity = 0.4;
    this.scale = ops.scale;
    this.pitch = ops.pitch;
    this.yaw = ops.yaw;
    this.position = ops.position;
    this.eye = ops.eye;

    // build object

    this.build();

    // add to doc

    this.root.add(this.object);
  }

  build() {
    // pull data from doc element

    this.title = this.element.find('.im__title').html();
    this.desc = this.element.find('.im__description').html();
    this.url = this.element.find('.im__url').html();
    this.image = this.element.find('.im__image').html();
    this.alpha = this.element.find('.im__alpha').html();

    // generate html tag

    this.spiel = `${this.title}${this.desc}${this.url}`;

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
      this.box.scale.set(this.mesh.scale.x, this.mesh.scale.y, this.mesh.scale.x);
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
    // turn on

    if (!this.active) {
      this.active = true;
    }
  }

  deactivate() {
    // turn off

    if (this.active) {
      this.active = false;
    }
  }

  update() {
    // update animation

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
