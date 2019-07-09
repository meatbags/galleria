/** Custom exhibition handler */

import Loader from '../loader/loader';
import Clamp from '../maths/clamp';

class CustomExhibition {
  constructor() {
    this.loader = new Loader('assets');
    this.updateCallback = null;
    this.unloadCallback = null;
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene;
    this.ref.materials = root.modules.materials;
    this.ref.player = root.modules.player;
  }

  load(data) {
    // reset update callback
    this.updateCallback = null;

    // remove current exhibition
    if (this.unloadCallback) {
      this.unloadCallback();
    }

    // reset unload callback
    this.unloadCallback = null;

    // new installation
    switch (data.customValue) {
      case 'XAVIER':
        break;
      case 'JACK_DE_LACY':
        this.loadJack();
        break;
      case 'TIYAN':
        this.loadTiyan();
        break;
      case 'BRENTON':
        this.loadBrenton();
        break;
      default:
        break;
    }
  }

  loadXavier() {}

  loadJack() {
    // jack's assets
    this.assets = [
      {src: 'jack_de_lacy/sculpture_1', scale: 0.6, rot: Math.PI / 32, orientZ: Math.PI / 4},
      {src: 'jack_de_lacy/sculpture_2', scale: 0.5, rot: -Math.PI / 32, orientZ: 0},
      {src: 'jack_de_lacy/sculpture_3', scale: 0.5, rot: Math.PI / 32, orientZ: 0}
    ];

    // callbacks
    this.updateCallback = (delta) => {
      this.assets.forEach(asset => {
        if (asset.object) {
          asset.object.rotation.y += asset.rot * delta;
        }
      });
    };
    this.unloadCallback = () => {
      this.assets.forEach(asset => {
        this.ref.scene.scene.remove(asset.object);
      });
      this.assets = [];
    }

    // load
    for (var i=0; i<this.assets.length; ++i) {
      const index = i;

      // load object & add references
      this.loader.loadFBX(this.assets[index].src).then(obj => {
        obj.children.forEach(child => {
          this.ref.materials.conformMaterial(child.material);
          child.material = this.ref.materials.getCustomMaterial(child.material);
          child.material.envMapIntensity = 0.25;
          if (index == 2) {
            child.material.side = THREE.DoubleSide;
          }
        });

        // initial position
        obj.scale.multiplyScalar(this.assets[index].scale);
        obj.rotation.z = this.assets[index].orientZ;
        obj.position.set(-12 + index * 12, 14, 6);

        // add to scene & asset reference list
        this.ref.scene.scene.add(obj);
        this.assets[index].object = obj;
      }, err => { console.log(err); });
    }
  }

  loadTiyan() {
    // load models
    this.assets = [];
    this.loader.loadFBX('tiyan/separators').then(obj => {
      this.ref.materials.conformGroup(obj);
      this.ref.scene.scene.add(obj);
      this.assets.push({
        object: obj
      });
    });

    // unload callback
    this.unloadCallback = () => {
      this.assets.forEach(asset => {
        this.ref.scene.scene.remove(asset.object);
      });
      this.assets = [];
    };

    // add separator collisions
    const mesh1 = new THREE.Mesh(new THREE.BoxBufferGeometry(14, 4, 1.5), new THREE.MeshStandardMaterial({}));
    const mesh2 = new THREE.Mesh(new THREE.BoxBufferGeometry(1.5, 4, 16), new THREE.MeshStandardMaterial({}));
    mesh1.position.set(-23, 1, 6);
    mesh2.position.set(17.25, 1, 15.5);
    this.ref.scene.colliderSystem.add(mesh1);
    this.ref.scene.colliderSystem.add(mesh2);
  }

  loadBrenton() {
    this.assets = [
      'brenton/crash7/crash_7', 'brenton/crash8/crash_8', 'brenton/crash9/crash_9',
      'brenton/crash11/crash_11', 'brenton/crash12/crash_12', 'brenton/crash13/crash_13',
      'brenton/new_crashform/new_crashform'
    ].map(str => {
      return { src: str };
    });

    // unload callback
    this.unloadCallback = () => {
      this.assets.forEach(asset => {
        if (asset.isMesh) {
          this.ref.scene.scene.remove(asset);
        } else if (asset.object) {
          this.ref.scene.scene.remove(asset.object);
          if (asset.sparks) {
            asset.sparks.forEach(spark => {
              this.ref.scene.scene.remove(spark.object);
            });
          }
        }
      });
      this.assets = [];
    };

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
      mat.envMap = this.ref.materials.envMap;
      mat.envMapIntensity = 0.5;
      mat.normalMap = child.material.normalMap ? child.material.normalMap : null;
      mat.metalness = child.material.metalness ? child.material.metalness : 0.75;
      mat.roughness = child.material.roughness ? child.material.roughness : 0.5;
      mat.side = THREE.DoubleSide;
      if (child.material.transparent) {
        mat.transparent = true;
        mat.opacity = child.material.opacity;
      }

      // NPOT
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
      const size = new THREE.Vector3();
      box.getSize(size);
      const sizeMax = 4;
      const oversize = (size.x > sizeMax || size.y > sizeMax || size.z > sizeMax);
      child.animType = Math.random() > 0.3 || oversize ? 'jitter' : 'rotate';
      child.rotationAxis = Math.random() > 0.5 ? 'y' : 'x';
      if (child.name && child.name.indexOf('spin') != -1) {
        child.animType = 'rotate';
        child.rotationAxis = 'y';
      }
    };

    this.assets.forEach(el => {
      this.loader.loadFBX(el.src).then(obj => {
        // add to scene and asset reference
        this.ref.materials.conformGroup(obj);
        this.ref.scene.scene.add(obj);

        // set car containers
        el.object = obj;
        el.sparks = [];
        el.children = [];
        el.smokeMat = new THREE.MeshPhongMaterial({transparent: true, side: THREE.DoubleSide, opacity: 0.25});
        const tex = this.ref.materials.getTexture('brenton/smoke.png');
        el.smokeMat.map = tex;

        // particle flag
        if (el.src.indexOf('12') != -1) {
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

    this.updateCallback = delta => {
      for (let i=0, lim=this.assets.length; i<lim; ++i) {
        if (this.assets[i].children) {
          const target = this.assets[i];
          const threshold = 3;
          const radius = target.radius ? target.radius : 25;
          const dist = this.ref.player.position.distanceTo(target.position);
          const f = dist < threshold ? 1 : Math.max(0, 1 - ((dist - threshold) / (radius - threshold)));
          const amt = 0.0125;

          // animate car parts
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

            // add to scene, animation array, asset reference
            this.ref.scene.scene.add(spark.object);
            target.sparks.push(spark);
          }

          // animate particles
          for (let j=target.sparks.length-1, jlim=-1; j>jlim; j--) {
            const spark = target.sparks[j];
            spark.object.position.x += spark.vec.x * delta;
            spark.object.position.y += spark.vec.y * delta;
            spark.object.position.z += spark.vec.z * delta;
            spark.age += delta;
            if (spark.age > spark.maxAge) {
              this.ref.scene.scene.remove(spark.object);
              target.sparks.splice(j, 1);
            }
          }
        }
      }
    };
  }

  update(delta) {
    if (this.updateCallback) {
      this.updateCallback(delta);
    }
  }
}

export default CustomExhibition;
