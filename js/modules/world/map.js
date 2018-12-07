/**
 ** Handle models.
 **/

import { Materials } from './materials';
import { Loader } from '../loaders';

class Map {
  constructor(root) {
    this.root = root;
    this.scene = root.scene;
    this.colliderSystem = root.colliderSystem;
    this.materials = new Materials('assets');
    this.loader = new Loader('assets');
    this.loadScene();
    this.loadInstallation();
  }

  loadScene() {
    // invisible floor
    this.floor = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 1, 100), new THREE.MeshPhongMaterial({}));
    this.floor.position.y = -0.25;
    this.colliderSystem.add(this.floor);

    // onloads
    this.toLoad = 2;
    this.checkLoaded = () => {
      this.toLoad -= 1;
      if (this.toLoad == 0) {
        const target = document.querySelector('#open-gallery');
        target.classList.remove('is-loading');
        target.classList.add('flash');
        target.innerHTML = '<span class="mobile-show">&larr;&nbsp;Open Gallery</span><span class="mobile-hide">Open Gallery</span>';
      }
    };

    // visual map
    this.loader.loadFBX('map').then((map) => {
      this.scene.add(map);
      this.materials.conformGroup(map);
      this.checkLoaded();
    }, (err) => { console.log(err); });

    // collision map
    this.loader.loadOBJ('collision').then((map) => {
      this.addCollisionMap(map);
      this.checkLoaded();
    }, (err) => { console.log(err); });

    // peripherals props
    this.loader.loadFBX('props').then((map) => {
      this.scene.add(map);
      this.materials.conformGroup(map);
    });

    this.treeParse = (obj) => {
      if (obj.type == "Mesh") {
        if (obj.material.transparent) {
          console.log(obj.material);
          obj.material.color.set(0xffffff);
          obj.material.side = THREE.DoubleSide;
          obj.material.flatShading = true;
        }
      } else if (obj.children) {
        obj.children.forEach(child => { this.treeParse(child); });
      }
    };
    this.loader.loadFBX('tree/tree2').then(tree => {
      console.log(tree);
      this.treeParse(tree);
      this.scene.add(tree);
    });

    // neon ceiling lighting
    const size = 0.1;
    const rodSize = 4;
    for (var x=-16; x<=16; x+=8) {
      const y = 19;
      const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(size, size, rodSize), this.materials.mat.neon);
      const holster = new THREE.Mesh(new THREE.BoxBufferGeometry(size, size * 4, rodSize), this.materials.mat.dark);
      const rod1 = new THREE.Mesh(new THREE.BoxBufferGeometry(size, 1, size), this.materials.mat.dark);
      const rod2 = rod1.clone();
      mesh.position.set(x, y, 6);
      holster.position.set(x, y + size * 2.5, 6);
      rod1.position.set(x, y + size * 4.5 + 0.5, 6 + rodSize / 3);
      rod2.position.set(x, y + size * 4.5 + 0.5, 6 - rodSize / 3);
      rod1.rotation.y = Math.PI / 4;
      rod2.rotation.y = Math.PI / 4;
      this.scene.add(mesh, holster, rod1, rod2);
    }
  }

  loadInstallation() {
    // load exhibition-specific installations
    if (CUSTOM_EXHIBITION_INSTALLATION === 'JACK_DE_LACY') {
      this.installation = [{
          src: 'jack_de_lacy/sculpture_1',
          scale: 0.6,
          rot: Math.PI / 32,
          orientZ: Math.PI / 4,
        }, {
          src: 'jack_de_lacy/sculpture_2',
          scale: 0.5,
          rot: -Math.PI / 32,
          orientZ: 0,
        }, {
          src: 'jack_de_lacy/sculpture_3',
          scale: 0.5,
          rot: Math.PI / 32,
          orientZ: 0,
        }
      ];
      for (var i=0; i<this.installation.length; ++i) {
        const index = i;
        this.loader.loadFBX(this.installation[index].src).then((obj) => {
          const e = this.installation[index];
          obj.children.forEach(child => {
            this.materials.conformMaterial(child.material);
            child.material = this.materials.getCustomMaterial(child.material);
            if (index == 2) {
              child.material.side = THREE.DoubleSide;
            }
            child.material.envMapIntensity = 0.25;
          });
          obj.scale.multiplyScalar(e.scale);
          obj.rotation.z = e.orientZ;
          obj.position.set(-12 + index * 12, 14, 6);
          this.scene.add(obj);
          e.object = obj;
          e.active = true;
        }, (err) => { console.log(err); });
      }
      this.customExhibitionActive = true;
      this.updateCustomExhibition = (delta) => {
        this.installation.forEach(obj => {
          if (obj.active) {
            obj.object.rotation.y += obj.rot * delta;
          }
        });
      }
    } else {
      this.customExhibitionActive = false;
    }
  }

  addCollisionMap(obj) {
    // recursively add object group to collider
    if (obj.type === 'Mesh') {
      this.colliderSystem.add(obj);
    } else if (obj.children && obj.children.length) {
      obj.children.forEach(child => { this.addCollisionMap(child); });
    }
  }

  update(delta) {
    this.materials.update(delta);
    if (this.customExhibitionActive) {
      this.updateCustomExhibition(delta);
    }
  }
}

export { Map };
