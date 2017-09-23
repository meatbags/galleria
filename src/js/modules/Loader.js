const Materials = {
  concrete: new THREE.MeshPhysicalMaterial({
    clearCoat: 0,
    clearCoatRoughness: 1,
    reflectivity: 0,
    color: 0xffffff,
    emissive: 0x888888
  }),
  canvas: new THREE.MeshPhysicalMaterial({
    clearCoat: 0,
    clearCoatRoughness: 0.5,
    reflectivity: 0.25,
    color: 0xffffff,
    emissive: 0x444444
  }),
  dev: new THREE.MeshLambertMaterial({
    color: 0xff0000,
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

  console.log(materials);

  objLoader.setPath(appRoot + 'assets/3d/');
  objLoader.setMaterials(materials)
  objLoader.load('hangar.obj', function (obj) {
    for (let i=0; i<obj.children.length; i+=1) {
      const child = obj.children[i];
      //const mat = materials.materials[child.material.name];
      //child.material = mat;

      // make visible, reduce bump map
      child.material.color = new THREE.Color(0xffffff);
      child.material.bumpScale = 0.01;

      // make glass translucent
      if (child.material.map) {
        if (child.material.map.image.src.indexOf('glass') != -1) {
          child.material.transparent = true;
          child.material.opacity = 0.4;
        }
      } else {
        child.material.emissive = child.material.color;
      }
    }
    Models.mainBuilding.add(obj);
  });
});

export { Models, Materials };
