import { Globals } from '../config';

class LoadOBJ {
  constructor(path) {
    // load OBJ files

    this.path = path;
    this.materials = {};
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

  newMaterial(key, target, prop) {
    // make new material from props

    this.materials[key][target] = new THREE.MeshPhongMaterial({});
    const mat = this.materials[key][target];

    if (prop.map_kd) {
      // diffuse map

      this.textureLoader.load(prop.map_kd, (tex) => {
        mat.color = new THREE.Color(1, 1, 1);
        mat.map = tex;

        // transparent textures

        if (prop.map_kd.indexOf('.png') != -1) {
          mat.transparent = true;
          mat.side = THREE.DoubleSide;
        }
      });
    } else {
      // no diffuse map, set emissive -> colour

      mat.emissive = new THREE.Color(prop.ka[0], prop.ka[1], prop.ka[2])
    }

    if (prop.bump) {
      // bump map

      try {
        const opts = prop.bump.split(' ');

        mat.bumpScale = parseFloat(opts[2]) * Globals.loader.bumpScale;
        this.textureLoader.load(opts[0], (tex) => {
          mat.bumpMap = tex;
        });
      } catch(err) {
        console.log('Bump map', err);
      }
    }

    if (prop.map_ka) {
      // ambient map

      mat.requireSecondUVSet = true;
      this.textureLoader.load(prop.map_ka, (tex) => {
        mat.lightMap = tex;
        mat.lightMapIntensity = Globals.loader.lightMapIntensity;
      });
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

  /*
  process(child, materials) {
    // set child material

    if (materials.materialsInfo[child.material.name]) {
      const meta = materials.materialsInfo[child.material.name];
      child.material = materials.materials[child.material.name];
      child.material.bumpScale = Globals.loader.bumpScale;

      // if light map exists, apply

      if (meta.map_ka) {
        const uvs = child.geometry.attributes.uv.array;
        const src = meta.map_ka;
        const texture = new THREE.TextureLoader().load(this.path + src);

        child.material.lightMap = texture;
        child.material.lightMapIntensity = Globals.loader.lightMapIntensity;
        child.geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs, 2));
      }

      // process texture

      if (child.material.map) {
        child.material.color = new THREE.Color(0xffffff);

        // .png translucency

        if (child.material.map.image && child.material.map.image.src.indexOf('.png') != -1) {
          child.material.transparent = true;
          child.material.side = THREE.DoubleSide;
        }

        // glass

        if (child.material.map.image && child.material.map.image.src.indexOf('glass') != -1) {
          child.material.transparent = true;
          child.material.opacity = 0.4;
        }
      } else {
        child.material.emissive = child.material.color;
      }
    } else {
      // no material

      console.log('No material found:', child, child.material.name);
      child.material = new THREE.MeshPhongMaterial({emissive: 0xff0000});
    }
  }
  */

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
