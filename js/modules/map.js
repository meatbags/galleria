/** Load & update models */

import Loader from '../loader/loader';
import Clamp from '../maths/clamp';
import CustomExhibition from './custom_exhibition';

class Map {
  constructor() {
    this.assets = {};
    this.loader = new Loader('assets');
    this.customExhibition = new CustomExhibition();
  }

  bind(root) {
    this.ref = {};
    this.ref.root = root;
    this.ref.scene = root.modules.scene;
    this.ref.player = root.modules.player;
    this.ref.materials = root.modules.materials;

    // bind custom exhibition handler
    this.customExhibition.bind(root);
  }

  load(data) {
    return new Promise((resolve, reject) => {
      this.customExhibition.load(data);
      this.loadDefaultExhibition(() => {
        resolve();
      });
    });
  }

  loadDefaultExhibition(callback) {
    // load persistent assets
    let requiredAssets = 2;
    const checkLoaded = () => {
      requiredAssets -= 1;
      if (requiredAssets === 0) {
        callback();
      }
    }

    // add collision map async
    if (!this.assets.defaultCollisionMap) {
      this.loader.loadOBJ('collision').then(map => {
        this.assets.defaultCollisionMap = map;
        this.addCollisionMap(this.assets.defaultCollisionMap);
        checkLoaded();
      }, (err) => { console.log(err); });
    } else {
      checkLoaded();
      this.addCollisionMap(this.assets.defaultCollisionMap);
    }

    // add map async
    if (!this.assets.map) {
      this.loader.loadFBX('map').then((map) => {
        this.ref.scene.scene.add(map);
        this.ref.materials.conformGroup(map);
        checkLoaded();
      }, (err) => { console.log(err); });
    } else {
      checkLoaded();
    }

    // add floor collision map
    if (!this.assets.floor) {
      this.assets.floor = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 1, 100), new THREE.MeshPhongMaterial({}));
      this.assets.floor.position.y = -0.25;
    }
    this.addCollisionMap(this.assets.floor);

    // load props
    if (!this.assets.props) {
      this.loader.loadFBX('props').then((map) => {
        this.assets.props = map;
        this.ref.scene.scene.add(map);
        this.ref.materials.conformGroup(map);
      });
    }

    // ceiling lights
    if (!this.assets.ceilingLights) {
      const size = 0.1;
      const rodSize = 4;
      for (var x=-16; x<=16; x+=8) {
        const y = 19;
        const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(size, size, rodSize), this.ref.materials.mat.neon);
        const holster = new THREE.Mesh(new THREE.BoxBufferGeometry(size, size * 4, rodSize), this.ref.materials.mat.dark);
        const rod1 = new THREE.Mesh(new THREE.BoxBufferGeometry(size, 1, size), this.ref.materials.mat.dark);
        const rod2 = rod1.clone();
        mesh.position.set(x, y, 6);
        holster.position.set(x, y + size * 2.5, 6);
        rod1.position.set(x, y + size * 4.5 + 0.5, 6 + rodSize / 3);
        rod2.position.set(x, y + size * 4.5 + 0.5, 6 - rodSize / 3);
        rod1.rotation.y = Math.PI / 4;
        rod2.rotation.y = Math.PI / 4;
        this.ref.scene.scene.add(mesh, holster, rod1, rod2);
      }
      this.assets.ceilingLights = true;
    }
  }

  addCollisionMap(obj) {
    // recursively add object collision map
    if (obj.type === 'Mesh') {
      this.ref.scene.colliderSystem.add(obj);
    } else if (obj.children && obj.children.length) {
      obj.children.forEach(child => {
        this.addCollisionMap(child);
      });
    }
  }

  update(delta) {
    this.ref.materials.update(delta);
    this.customExhibition.update(delta);
  }

  render() {
    this.customExhibition.render();
  }
}

export default Map;
