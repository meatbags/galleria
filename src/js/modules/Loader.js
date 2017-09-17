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
  })
};

export { Models, Materials };
