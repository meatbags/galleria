/**
 ** Handle model loading and update.
 **/

import Materials from './materials';
import Loader from '../utils/loader';
import { Clamp } from '../utils/maths';

class Map {
  constructor(root) {
    this.root = root; // Scene
    this.scene = root.scene;
    this.colliderSystem = root.colliderSystem;
    this.materials = new Materials('assets');
    this.loader = new Loader('assets');
    this.loadScene();
    this.reloadInstallation();
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
      this.defaultCollisionMap = map;
      this.addCollisionMap(map);
      this.checkLoaded();
    }, (err) => { console.log(err); });

    // peripherals props
    this.loader.loadFBX('props').then((map) => {
      this.scene.add(map);
      this.materials.conformGroup(map);
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

  reloadInstallation() {
    // remove current installation
    if (this.installation && this.installation.length) {
      this.installation.forEach(obj => {
        if (obj.object) {
          this.scene.remove(obj.object);
        }
      });

      // reload collision map
      this.root.colliderSystem = new Collider.System();
      this.colliderSystem = this.root.colliderSystem;
      this.addCollisionMap(this.defaultCollisionMap);
    }

    // reset
    this.customExhibitionActive = false;
    this.updateCustomExhibition = false;
    this.installation = [];
    const target = document.querySelector('.active-exhibition-data .custom-exhibition-installation');

    // add new installation from data
    if (target) {
      // load exhibition-specific installations
      const customExhibition = target.dataset.value;

      switch (customExhibition) {
        case 'JACK_DE_LACY':
          // custom installation container
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

          // load assets async
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

          // installation active flag
          this.customExhibitionActive = true;

          // installation update
          this.updateCustomExhibition = (delta) => {
            this.installation.forEach(obj => {
              if (obj.active) {
                obj.object.rotation.y += obj.rot * delta;
              }
            });
          }
          break;
        case 'TIYAN':
          this.installation = [{
            src: 'tiyan/separators',
          }];

          // load
          this.installation.forEach(el => {
            this.loader.loadFBX(el.src).then(obj => {
              this.materials.conformGroup(obj);
              this.scene.add(obj);
              el.object = obj;
            });
          });

          // add separator collisions
          const mesh1 = new THREE.Mesh(new THREE.BoxBufferGeometry(14, 4, 1.5), new THREE.MeshStandardMaterial({}));
          const mesh2 = new THREE.Mesh(new THREE.BoxBufferGeometry(1.5, 4, 16), new THREE.MeshStandardMaterial({}));
          mesh1.position.set(-23, 1, 6);
          mesh2.position.set(17.25, 1, 15.5);
          this.colliderSystem.add(mesh1);
          this.colliderSystem.add(mesh2);

          // installation active flag, update func
          this.customExhibitionActive = true;
          //this.updateCustomExhibition = (delta) => {};
          break;
        case 'DOUGLAS':
          this.installation = [{
            src: 'douglas/tree'
          }, {
            src: 'douglas/leaves'
          }, {
            src: 'douglas/pollen'
          }];

          this.installation.forEach(el => {
            this.loader.loadFBX(el.src).then(obj => {
              this.materials.conformGroup(obj);
              this.scene.add(obj);
              el.object = obj;
            });
          });

          break;
        case 'BRENTON':
          this.installation = [
            'crash7/crash_7',
            'crash8/crash_8',
            'crash9/crash_9',
            'crash10/crash_10',
            'crash11/crash_11',
            'crash12/crash_12',
            'crash13/crash_13',
            'hang/hang',
          ].map(str => {
            return {src: `brenton/${str}`};
          });

          const setInstallation = (child) => {
            // set material
            const mat = new THREE.MeshPhysicalMaterial({});
            mat.map = child.material.map ? child.material.map : null;
            if (!mat.map) {
              mat.color = child.material.color;
              mat.emissive = child.material.color;
              mat.emissiveIntensity = 0.1;
            }
            //mat.envMap = child.material.envMap ? child.material.envMap : null;
            mat.envMap = this.materials.envMap;
            mat.envMapIntensity = 0.5;
            mat.normalMap = child.material.normalMap ? child.material.normalMap : null;
            mat.metalness = child.material.metalness ? child.material.metalness : 0.75;
            mat.roughness = child.material.roughness ? child.material.roughness : 0.5;
            mat.side = THREE.DoubleSide;
            if (child.material.transparent) {
              mat.transparent = true;
              mat.opacity = child.material.opacity;
            }

            // npot
            if (mat.map) {
              mat.map.wrapS = mat.map.wrapT = THREE.ClampToEdgeWrapping;
              mat.map.minFilter = THREE.LinearFilter;
            }
            if (mat.normalMap) {
              mat.normalMap.wrapS = mat.normalMap.wrapT = THREE.ClampToEdgeWrapping;
              mat.normalMap.minFilter = THREE.LinearFilter;
            }

            // set new material
            child.material = mat;

            // limit position
            const rad = 0.25;
            child.customPos = {};
            child.customPos.x = {max: child.position.x + rad, min: child.position.x - rad};
            child.customPos.y = {max: child.position.y + rad, min: child.position.y - rad};
            child.customPos.z = {max: child.position.z + rad, min: child.position.z - rad};

            // animation type
            const box = new THREE.Box3();
            box.setFromObject(child);
            const size = box.getSize();
            const sizeMax = 4;
            const oversize = (size.x > sizeMax || size.y > sizeMax || size.z > sizeMax);
            child.animType = Math.random() > 0.3 || oversize ? 'jitter' : 'rotate';
            child.rotationAxis = Math.random() > 0.5 ? 'y' : 'x';
            if (child.name && child.name.indexOf('spin') != -1) {
              child.animType = 'rotate';
              child.rotationAxis = 'y';
            }
          };

          this.installation.forEach(el => {
            this.loader.loadFBX(el.src).then(obj => {
              this.materials.conformGroup(obj);
              this.scene.add(obj);
              el.object = obj;
              el.children = [];
              el.sparks = [];
              el.smokeMat = new THREE.MeshPhongMaterial({transparent: true, side: THREE.DoubleSide, opacity: 0.25});
              const tex = this.materials.getTexture('brenton/smoke.png');
              el.smokeMat.map = tex;

              // particle flag
              if (el.src == 'brenton/crash12/crash12') {
                el.isLong = true;
                el.radius = 40;
              }

              // set children, find centre
              let n = 0;
              let p = new THREE.Vector3();
              obj.children.forEach(child => {
                if (child.type == 'Mesh') {
                  setInstallation(child);
                  el.children.push(child);
                  p.add(child.position);
                  n += 1;
                } else if (child.type == 'Group') {
                  child.children.forEach(child => {
                    if (child.type == 'Mesh') {
                      setInstallation(child);
                      el.children.push(child);
                    }
                  })
                }
              });

              // set centre
              if (n != 0) {
                p.divideScalar(n);
              }
              el.position = p;
            });
          });

          this.customExhibitionActive = true;
          this.updateCustomExhibition = (delta) => {
            for (var i=0; i < this.installation.length; i++) {
              if (this.installation[i].children) {
                const target = this.installation[i];
                const threshold = 3;
                const radius = target.radius ? target.radius : 25;
                const dist = this.root.player.position.distanceTo(target.position);
                const f = dist < threshold ? 1 : Math.max(0, 1 - ((dist - threshold) / (radius - threshold)));
                const amt = 0.025;

                // animate parts
                target.children.forEach(child => {
                  if (child.animType == 'jitter') {
                    child.position.x = Clamp(child.position.x + f * (Math.random() * 2 - 1) * amt, child.customPos.x.min, child.customPos.x.max);
                    child.position.y = Clamp(child.position.y + f * (Math.random() * 2 - 1) * amt, child.customPos.y.min, child.customPos.y.max);
                    child.position.z = Clamp(child.position.z + f * (Math.random() * 2 - 1) * amt, child.customPos.z.min, child.customPos.z.max);
                  } else if (child.animType == 'rotate') {
                    child.rotation[child.rotationAxis] += (Math.random() * 2 - 1) * amt * f;
                  }
                });

                // create particles
                if (target.sparks.length < 25 && Math.random() < f * 2) {
                  const spark = {};

                  if (Math.random() > 0.45) {
                    // SPARK
                    spark.object = new THREE.Mesh(new THREE.BoxBufferGeometry(0.02, 0.02, 0.04 + Math.random() * 0.5), new THREE.MeshBasicMaterial({color: 0xffffff}));
                    spark.object.position.copy(target.position);
                    spark.object.position.x += target.isLong ? (Math.random() * 20 - 10) : (Math.random() * 4 - 2);
                    spark.object.position.y += (Math.random() * 3 - 1.5);
                    spark.object.position.z += (Math.random() * 4 - 2);
                    spark.vec = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
                    spark.vec.normalize();
                    spark.vec.multiplyScalar(5 + Math.random() * 15);

                    // align spark
                    var p = new THREE.Vector3();
                    p.addVectors(spark.object.position, spark.vec);
                    spark.object.lookAt(p);

                    // set age
                    spark.age = 0;
                    spark.maxAge = 0.125 + Math.random() * 0.25;
                  } else {
                    // SMOKE
                    spark.object = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), target.smokeMat);
                    spark.object.position.copy(target.position);
                    spark.object.position.x += target.isLong ? (Math.random() * 6 - 3) : (Math.random() * 1 - 0.5);
                    spark.object.position.y += 2 + (Math.random() * 1 - 0.5);
                    spark.object.position.z += (Math.random() * 1 - 0.5);
                    spark.vec = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
                    spark.vec.normalize();
                    spark.vec.multiplyScalar(2 + Math.random() * 4);
                    spark.object.rotation.set(Math.random(), Math.random(), Math.random());

                    // set age
                    spark.age = 0;
                    spark.maxAge = 0.25 + Math.random() * 0.5;
                  }

                  // add to scene, animation array
                  this.scene.add(spark.object);
                  target.sparks.push(spark);
                }

                // animate particles
                for (var j=target.sparks.length-1, lim=-1; j>lim; j--) {
                  const spark = target.sparks[j];
                  spark.object.position.x += spark.vec.x * delta;
                  spark.object.position.y += spark.vec.y * delta;
                  spark.object.position.z += spark.vec.z * delta;
                  spark.age += delta;
                  if (spark.age > spark.maxAge) {
                    this.scene.remove(spark.object);
                    target.sparks.splice(j, 1);
                  }
                }
              }
            }
          };
          break;
        default:
          break;
      }
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

  loadExperimental() {
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
  }

  update(delta) {
    this.materials.update(delta);
    if (this.customExhibitionActive && this.updateCustomExhibition) {
      this.updateCustomExhibition(delta);
    }
  }
}

export default Map;
