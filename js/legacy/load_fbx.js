import './FBXLoader.js';


const FBXLoader = new THREE.FBXLoader();
const LoadFBX = (path, material) => {
  // load fbx file
  return new Promise(
    (resolve, reject) => {
      try {
        FBXLoader.load(path, (object) => {
          const meshes = [];

          // extract meshes from object
          for (let i=0; i<object.children.length; i++) {
            if (object.children[i].type == 'Mesh') {
              meshes.push(object.children[i]);
            } else if (object.children[i].type == 'Group') {
              for (let j=0; j<object.children[i].children.length; j++) {
                if (object.children[i].children[j].type == 'Mesh') {
                  meshes.push(object.children[i].children[j]);
                }
              }
            }
          }

          // material settings
          if (material) {
            for (let i=0; i<meshes.length; i++) {
              // replace default material
              if (meshes[i].material.type == 'MeshLambertMaterial') {
                meshes[i].material = material;
              }
            }
          } else {
            // set defaults
            for (let i=0; i<meshes.length; i+=1) {
              //meshes[i].material.envMap = self.envTextureCube;
              //meshes[i].material.envMapIntensity = 0.25;
              console.log(meshes[i].material);
              meshes[i].material.bumpScale = 0.01;
              meshes[i].material.normalScale = new THREE.Vector2(0.1, 0.1);
            }
          }

          resolve(meshes);
        });
      } catch(error) {
        reject(error);
      }
    }
  )
};

export default LoadFBX;
