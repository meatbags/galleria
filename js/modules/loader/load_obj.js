import { Globals } from '../config';

class LoadOBJ {
  constructor(path) {
    // load OBJ files

    this.path = path;
    this.materialLoader = new THREE.MTLLoader();
    this.objectLoader =  new THREE.OBJLoader();

    // set root paths

    this.materialLoader.setPath(this.path);
    this.objectLoader.setPath(this.path);
  }

  loadOBJ(file) {
    // load OBJ from file

    return new Promise(
      (resolve, reject) => {
        try {
          this.materialLoader.load(file + '.mtl', (materials) => {
            materials.preload();
            this.objectLoader.load(file + '.obj', (obj) => {
              this.process(obj, materials);
              resolve(obj);
            });
          });
        } catch(error) {
          reject(error);
        }
      }
    );
  }

  process(obj, materials) {
    // get object materials

    obj.children.forEach((child) => {
      // set material

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
    });
  }
}

export default LoadOBJ;
