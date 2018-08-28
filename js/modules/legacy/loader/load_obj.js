import { Globals } from '../config';

class LoadOBJ {
  constructor(path) {
    // load OBJ files

    this.path = path;
    this.materials = {};
    this.images = {};
    this.materialLoader = new THREE.MTLLoader();
    this.objectLoader =  new THREE.OBJLoader();
    this.textureLoader = new THREE.TextureLoader();

    // set root paths

    this.materialLoader.setPath(this.path);
    this.objectLoader.setPath(this.path);
    this.textureLoader.setPath(this.path);
  }

  loadOBJ(file) {
    // load OBJ from file

    return new Promise(
      (resolve, reject) => {
        try {
          this.materialLoader.load(file + '.mtl', (mtl) => {
            // load mats async
            this.preload(file, mtl.materialsInfo);

            this.objectLoader.load(file + '.obj', (obj) => {
              obj.children.forEach((child) => { this.setMaterial(child, this.materials[file]); });
              resolve(obj);
            });
          });
        } catch(error) {
          reject(error);
        }
      }
    );
  }

  preload(key, meta) {
    // load materials from meta

    this.materials[key] = {};

    for (let prop in meta) {
      if (meta.hasOwnProperty(prop)) {
        this.newMaterial(key, prop, meta[prop]);
      }
    }
  }

  newImage(url) {

  }

  newMaterial(key, target, prop) {
    // make new material from props

    this.materials[key][target] = new THREE.MeshPhongMaterial({});
    const mat = this.materials[key][target];

    if (prop.map_kd) {
      // diffuse map

      const tex_kd = this.textureLoader.load(prop.map_kd);
      mat.color = new THREE.Color(1, 1, 1);
      mat.map = tex_kd;
      
      if (prop.map_kd.indexOf('.png') != -1) {
        mat.transparent = true;
        mat.side = THREE.DoubleSide;
      }
    } else {
      // no diffuse map, set emissive -> colour

      mat.emissive = new THREE.Color(prop.ka[0], prop.ka[1], prop.ka[2])
    }

    if (prop.bump) {
      // bump map

      try {
        const opts = prop.bump.split(' ');
        const tex_bump = this.textureLoader.load(opts[0]);
        mat.bumpScale = parseFloat(opts[2]) * Globals.loader.bumpScale;
        mat.bumpMap = tex_bump;
      } catch(err) {
        console.log('Bump map', err);
      }
    }

    if (prop.map_ka) {
      // ambient map

      mat.requireSecondUVSet = true;
      const tex_ka = this.textureLoader.load(prop.map_ka);
      mat.lightMap = tex_ka;
      mat.lightMapIntensity = Globals.loader.lightMapIntensity;
    }
  }

  setMaterial(obj, materials) {
    // set material from materials

    if (materials[obj.material.name]) {
      obj.material = materials[obj.material.name];

      if (obj.material.requireSecondUVSet) {
        // create new UV set for light map

        obj.geometry.addAttribute('uv2', new THREE.BufferAttribute(obj.geometry.attributes.uv.array, 2));
      }
    }
  }

  testLoad() {
    // test new loading funcs

    this.manager = THREE.DefaultLoadingManager;
		this.fileLoader = new THREE.FileLoader(this.manager);
		this.fileLoader.setPath(this.path);
		this.fileLoader.load('hangar_monday.mtl', (res) => {
      // console.log(res.split('\n'));
      // onLoad(this.parse(text));
		}, () => {}, (err) => { console.warn(err); })
  }
}

export default LoadOBJ;
