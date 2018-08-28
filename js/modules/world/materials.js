/**
 * Material manager.
 **/

class Materials {
  constructor() {
    this.mat = {};
    this.mat.default = new THREE.MeshPhysicalMaterial({emissive: 0, roughness: 1, envMapIntensity: 0.25});
    this.mat.porcelain = new THREE.MeshPhysicalMaterial({color: 0xffffff, emissive: 0x888888, emissiveIntensity: 0.6, roughness: 0.55, metalness: 0.125, envMapIntensity: 0.5});
    this.mat.metal = new THREE.MeshPhysicalMaterial({color: 0xa88e79, emissive: 0x0, roughness: 0.25, metalness: 1.0, envMapIntensity: 0.5});
    this.envMap = new THREE.CubeTextureLoader().load(['./assets/envmap/posx.jpg', './assets/envmap/negx.jpg', './assets/envmap/posy.jpg', './assets/envmap/negy.jpg', './assets/envmap/posz.jpg', './assets/envmap/negz.jpg']);
    this.normalMap = new THREE.TextureLoader().load('./assets/textures/noise.jpg');
    this.normalMap.wrapS = this.normalMap.wrapT = THREE.RepeatWrapping;
    this.normalMap.repeat.set(32, 32);
    
    // set envmaps
    Object.keys(this.mat).forEach(key => {
      if (this.mat[key].type && this.mat[key].type === 'MeshPhysicalMaterial') {
        this.mat[key].envMap = this.envMap;
      }
    });

    // reference file-loaded materials
    this.loaded = {};
  }

  conform(mat) {
    this.loaded[mat.name] = mat;
    mat.envMap = this.envMap;
    mat.envMapIntensity = 0.5;
    switch (mat.name) {
      default:
        break;
    }
  }
}

export { Materials };
