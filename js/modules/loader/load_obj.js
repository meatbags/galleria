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
              console.log(obj);
              obj.children.forEach((child) => {
                try {
                  this.process(child, materials);
                } catch(err) {
                  console.warn('MTL Error', child);
                }
              })
              resolve(obj);
            });
          });
        } catch(error) {
          reject(error);
        }
      }
    );
  }

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
}

export default LoadOBJ;
