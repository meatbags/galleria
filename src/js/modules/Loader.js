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
matLoader.load('hangar.mtl', function(mats) {
  mats.preload();
  var objLoader = new THREE.OBJLoader();

  objLoader.setPath(appRoot + 'assets/3d/');
  objLoader.load('hangar.obj', function (obj) {
    for (let i=0; i<obj.children.length; i+=1) {
      const child = obj.children[i];

      child.material = new THREE.MeshPhysicalMaterial({
        clearCoat: 0,
        clearCoatRoughness: 0.5,
        reflectivity: 0.5,
        color: 0xffffff,
        emissive: 0x111111,
        map: mats.materials[child.material.name].map,
        bumpMap: mats.materials[child.material.name].bumpMap,
        bumpScale: 0.01
      });
    }
    Models.mainBuilding.add(obj);
  });
});

export { Models, Materials };
