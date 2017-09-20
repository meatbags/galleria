import './OBJLoader.js';

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
  mainBuilding: new THREE.Mesh(),
};

// load textures and models

const loader = new THREE.OBJLoader();
loader.load(appRoot + './assets/3d/hangar.obj', function(obj) {
  Models.mainBuilding.geometry = obj.children[0].geometry;
  Models.mainBuilding.material = Materials.concrete;

  for (let i=0; i<obj.children.length; i+=1) {
    Models.mainBuilding.add(
      new THREE.Mesh(
        obj.children[i].geometry,
        Materials.concrete
      )
    );
  }
});

export { Models, Materials };
