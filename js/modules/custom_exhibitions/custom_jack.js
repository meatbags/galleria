/** Custom exhibition */

import Loader from '../../loader/loader';

class CustomJack {
  constructor(root) {
    this.ref = {
      materials: root.ref.materials,
      scene: root.ref.scene,
    };
  }

  load() {
    return new Promise((resolve, reject) => {
      this.loadModels();
      resolve();
    });
  }

  loadModels() {
    // jack's assets
    this.assets = [
      {src: 'jack_de_lacy/sculpture_1', scale: 0.6, rot: Math.PI / 32, orientZ: Math.PI / 4},
      {src: 'jack_de_lacy/sculpture_2', scale: 0.5, rot: -Math.PI / 32, orientZ: 0},
      {src: 'jack_de_lacy/sculpture_3', scale: 0.5, rot: Math.PI / 32, orientZ: 0}
    ];

    const vertexShader = `
      vec4 mvp = modelMatrix * vec4(position, 1.0);
      float theta = sin(time * 0.1 + mvp.x / 2.0);
      float c = cos(theta);
      float s = sin(theta);
      float off = 1.0 * sin(time + position.x * 200.0);
      mat3 roty = mat3(c, 0, s, 0, 1, 0, -s, 0, c);
      // mat4 m = mat4(1, 0, 0, 0, 0, 1, 0, s * off * 2.0, 0, 0, 1, s * off, 0, 0, 0, 1);
      vec3 p = position;
      vec4 t = vec4(p.x + 0.25 * sin(time + p.y), p.y, p.z + 0.25 * cos(time + p.y), 1.0);
      vec3 transformed = vec3(t.x, t.y, t.z);
      vNormal = vNormal * roty;
    `;

    // load
    const loader = new Loader('assets');
    for (var i=0; i<this.assets.length; ++i) {
      const index = i;

      // load object & add references
      loader.loadFBX(this.assets[index].src).then(obj => {
        obj.children.forEach(child => {
          this.ref.materials.conformMaterial(child.material);
          child.material = this.ref.materials.createCustomMaterial(child.material, vertexShader);
          child.material.envMapIntensity = 0.25;
          if (index == 2) {
            child.material.side = THREE.DoubleSide;
          }
        });

        // initial position
        obj.scale.multiplyScalar(this.assets[index].scale);
        obj.rotation.z = this.assets[index].orientZ;
        obj.position.set(-12 + index * 12, 14, 6);

        // add to scene & asset reference list
        this.ref.scene.scene.add(obj);
        this.assets[index].object = obj;
      }, err => { console.log(err); });
    }
  }

  unload() {
    this.assets.forEach(asset => {
      this.ref.scene.scene.remove(asset.object);
    });
  }

  update(delta) {
    this.assets.forEach(asset => {
      if (asset.object) {
        asset.object.rotation.y += asset.rot * delta;
      }
    });
  }
}

export default CustomJack;
