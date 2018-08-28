/**
 ** Load FBX files.
 **/

import '../../lib/loaders';

class LoadFBX {
  constructor(path) {
    this.path = path;
    this.materials = {};
    this.images = {};
    this.loader = new THREE.FBXLoader();
  }

  load(file) {
    return new Promise(
      (resolve, reject) => {
        try {
          this.loader.load(this.path + file + '.fbx', (model) => { resolve(model); });
        } catch(error) {
          console.log(error);
          reject(error);
        }
      }
    );
  }
}

export { LoadFBX };
