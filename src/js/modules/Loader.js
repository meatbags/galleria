const Loader = function(basePath) {
  this.basePath = basePath;
  this.init();
};

Loader.prototype = {
  init: function() {
    this.materialLoader = new THREE.MTLLoader();
    this.objectLoader = new THREE.OBJLoader();
    this.materialLoader.setPath(this.basePath);
    this.objectLoader.setPath(this.basePath);
  },

  createMaterials: function() {
    this.materials = {
      concrete: new THREE.MeshPhysicalMaterial({
        clearCoat: 0,
        clearCoatRoughness: 1,
        reflectivity: 0,
        color: 0xffffff,
        emissive: 0x888888
      }),
      canvas: new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
      }),
      dev: new THREE.MeshLambertMaterial({
        color: 0xff0000,
        opacity: 0.25,
        transparent: true,
        side: THREE.DoubleSide
      }),
      dev2: new THREE.MeshLambertMaterial({
        color: 0xffaa88,
        opacity: 0.25,
        transparent: true,
        side: THREE.DoubleSide
      }),
      wireframe: new THREE.MeshLambertMaterial({
        color: 0xff0000,
        wireframe: true
      })
   };

   this.models = {
     mainBuilding: new THREE.Group(),
   };
  },

  process: function(obj, materials) {
    // fix materials

    for (let i=0; i<obj.children.length; i+=1) {
      const child = obj.children[i];
      const meta = materials.materialsInfo[child.material.name];

      // load lightmaps
      if (meta.map_ka) {
        const uvs = child.geometry.attributes.uv.array;
        const src = meta.map_ka;
        const tex = new THREE.TextureLoader().load(self.basePath + src);

        child.material.lightMap = tex;
        child.material.lightMapIntensity = 1;
        child.geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs, 2));
      }

      // make glass translucent
      if (child.material.map) {
        // if textured, set full colour
        child.material.color = new THREE.Color(0xffffff);

        // set transparent for .png
        if (child.material.map.image.src.indexOf('.png') !== -1) {
          child.material.transparent = true;
          child.material.side = THREE.DoubleSide;
        }

        // for glass
        if (child.material.map.image.src.indexOf('glass') != -1) {
          child.material.transparent = true;
          child.material.opacity = 0.4;
        }
      } else {
        // no texture, set colour
        child.material.emissive = child.material.color;
      }
    }
  },

  loadOBJ: function(filename) {
    const self = this;

    return new Promise(
      function(resolve, reject) {
        try {
          self.materialLoader.load(filename + '.mtl', function(materials) {
            materials.preload();
            self.objectLoader.setMaterials(materials);
            self.objectLoader.load(filename + '.obj', function(obj){
              self.process(obj, materials);
              resolve(obj);
            });
          });
        } catch(error) {
          reject(error);
        }
      }
    );
  }
};

export default Loader;
