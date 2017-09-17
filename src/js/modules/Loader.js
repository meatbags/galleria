const Models = {};

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

export { Models, Materials };
