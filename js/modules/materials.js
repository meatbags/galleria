/** Material loader & manager */

class Materials {
  constructor() {
    this.path = `${APP_ROOT}/assets/`;
    this.mat = {};
    this.mat.default = new THREE.MeshPhysicalMaterial({emissive: 0, roughness: 1, envMapIntensity: 0.25});
    this.mat.porcelain = new THREE.MeshPhysicalMaterial({color: 0xffffff, emissive: 0x888888, emissiveIntensity: 0.6, roughness: 0.55, metalness: 0.125, envMapIntensity: 0.5});
    this.mat.metal = new THREE.MeshPhysicalMaterial({color: 0xa88e79, emissive: 0x0, roughness: 0.25, metalness: 1.0, envMapIntensity: 0.5});
    this.mat.neon = new THREE.MeshPhysicalMaterial({emissive: 0xffffff, emissiveIntensity: 1.0});
    this.envMap = this.createEnvMap('envmap');
    this.envMapIntensity = 0.5;
    //const envMapSources = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'].map(filename => `${this.path}envmap/${filename}.jpg`);
    //this.envMap = new THREE.CubeTextureLoader().load(envMapSources);
    this.normalMap = new THREE.TextureLoader().load(this.path + 'textures/noise.jpg');
    this.normalMap.wrapS = this.normalMap.wrapT = THREE.RepeatWrapping;
    this.normalMap.repeat.set(32, 32);

    // set envmaps
    Object.keys(this.mat).forEach(key => {
      if (this.mat[key].type && this.mat[key].type === 'MeshPhysicalMaterial') {
        this.mat[key].envMap = this.envMap;
      }
    });
    this.mat.dark = new THREE.MeshPhysicalMaterial({color: 0x0, roughness: 0.5, metalness: 0});

    // custom shader uniforms
    this.uniforms = {time: {value: 0}};

    // reference file-loaded materials
    this.loaded = {};
  }

  bind(root) {}

  load(data) {
    // defaults
    this.envMapDisabled = false;

    if (data) {
      switch (data.customValue) {
        case 'XAVIER':
          this.envMapDisabled = true;
          break;
        default:
          break;
      }
    }
  }

  createEnvMap(path) {
    const envMapSources = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'].map(filename => `${this.path}${path}/${filename}.jpg`);
    const envMap = new THREE.CubeTextureLoader().load(envMapSources);
    return envMap;
  }

  getTexture(path) {
    const texture = new THREE.TextureLoader().load(this.path + path);
    return texture;
  }

  conformGroup(obj) {
    // recursively conform object groups
    if (obj.type === 'Mesh') {
      this.conformMaterial(obj.material);
    } else if (obj.children && obj.children.length) {
      obj.children.forEach(child => {
        this.conformGroup(child);
      });
    }
  }

  conformMaterial(mat) {
    if (!this.loaded[mat.name]) {
      this.loaded[mat.name] = mat;
    }

    // update material
    this.addEnvironmentMap(mat);
    this.applyMaterialSettings(mat);
  }

  applyMaterialSettings(mat) {
    if (mat.name) {
      if (mat.name === 'conrete') {
        mat.normalScale.x = 0.25;
        mat.normalScale.y = 0.25;
      } else if (mat.name.indexOf('neon') !== -1) {
        mat.emissive = new THREE.Color(1, 1, 1);
        mat.emissiveIntensity = 1.0;
      } else if (mat.name === 'nu_metal') {
        mat.normalScale.x = 0.25;
        mat.normalScale.y = 0.25;
      }
    }
    // others: gold, wood, silver, wood2, metal, brick, painted_brick
  }

  addEnvironmentMap(mat) {
    if (!this.envMapDisabled) {
      mat.envMap = this.envMap;
      mat.envMapIntensity = this.envMapIntensity;
    }
  }

  createCustomMaterial(material, shaderText, funcs) {
    const mat = material.clone();
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = `uniform float time;\n${funcs || ''}\n${shader.vertexShader}`;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', shaderText);
      shader.uniforms.time = this.uniforms.time;
    };
    return mat;
  }

  applyAlphaMap(material, map) {
    material.color.setHex(0xffffff);
    material.alphaMap = map;
    material.transparent = true;
    material.side = THREE.DoubleSide;
    material.depthWrite = false;
    //material.blending = THREE.AdditiveBlending;
  }

  update(delta) {
    this.uniforms.time.value += delta;
  }
}

export default Materials;
