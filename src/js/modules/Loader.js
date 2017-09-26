const Materials = {
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

const Models = {
  mainBuilding: new THREE.Group(),
};

// load OBJ models

const matLoader = new THREE.MTLLoader();

matLoader.setPath(appRoot + 'assets/3d/');
matLoader.load('hangar.mtl', function(materials) {
  materials.preload();
  var objLoader = new THREE.OBJLoader();

  for (var key in materials.materials) {
    const mat = materials.materials[key];

    if (mat.map) {
      console.log(mat.map.image.src, mat);
    } else {
      console.log('no map', mat);
    }
  }

  objLoader.setPath(appRoot + 'assets/3d/');
  objLoader.setMaterials(materials)
  objLoader.load('hangar.obj', function (obj) {
    for (let i=0; i<obj.children.length; i+=1) {
      const child = obj.children[i];

      // reduce bump map
      child.material.bumpScale = 0.01;

      // make glass translucent
      if (child.material.map) {
        // if textured, set full colour
        child.material.color = new THREE.Color(0xffffff);

        // set transparent for .png
        if (child.material.map.image.src.indexOf('.png') !== -1) {
          child.material.transparent = true;
        }

        // for glass
        if (child.material.map.image.src.indexOf('glass') != -1) {
          child.material.transparent = true;
          child.material.opacity = 0.4;
        }
      } else {
        // no texture, set pure colour
        child.material.emissive = child.material.color;
      }
    }
    Models.mainBuilding.add(obj);
  });
});

export { Models, Materials };
