/**
 ** Load FBX & OBJ files.
 **/

import '../../lib/loaders';

class Loader {
  constructor(path) {
    this.path = `${APP_ROOT}/${path}/`;
    this.materials = {};
    this.images = {};
    this.loaderFBX = new THREE.FBXLoader();
    this.loaderOBJ = new THREE.OBJLoader();
  }

  loadFBX(file) {
    return new Promise(
      (resolve, reject) => {
        try {
          this.loaderFBX.load(this.path + file + '.fbx', (model) => { resolve(model); });
        } catch(error) {
          console.log(error);
          reject(error);
        }
      }
    );
  }

  loadOBJ(file) {
    return new Promise(
      (resolve, reject) => {
        try {
          this.loaderOBJ.load(this.path + file + '.obj', (model) => { resolve(model); });
        } catch(error) {
          console.log(error);
          reject(error);
        }
      }
    )
  }
}

export { Loader };
