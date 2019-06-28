/** Material loader & manager */

class Materials {
  constructor() {
    this.path = `${APP_ROOT}/assets/`;
    this.mat = {};
    this.mat.default = new THREE.MeshPhysicalMaterial({emissive: 0, roughness: 1, envMapIntensity: 0.25});
    this.mat.porcelain = new THREE.MeshPhysicalMaterial({color: 0xffffff, emissive: 0x888888, emissiveIntensity: 0.6, roughness: 0.55, metalness: 0.125, envMapIntensity: 0.5});
    this.mat.metal = new THREE.MeshPhysicalMaterial({color: 0xa88e79, emissive: 0x0, roughness: 0.25, metalness: 1.0, envMapIntensity: 0.5});
    this.mat.neon = new THREE.MeshPhysicalMaterial({emissive: 0xffffff, emissiveIntensity: 1.0});
    this.mat.dark = new THREE.MeshPhysicalMaterial({color: 0x0, roughness: 0.5, metalness: 0});
    const envMapSources = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'].map(filename => `${this.path}envmap/${filename}.jpg`);
    this.envMap = new THREE.CubeTextureLoader().load(envMapSources);
    this.normalMap = new THREE.TextureLoader().load(this.path + 'textures/noise.jpg');
    this.normalMap.wrapS = this.normalMap.wrapT = THREE.RepeatWrapping;
    this.normalMap.repeat.set(32, 32);

    // set envmaps
    Object.keys(this.mat).forEach(key => {
      if (this.mat[key].type && this.mat[key].type === 'MeshPhysicalMaterial') {
        this.mat[key].envMap = this.envMap;
      }
    });

    // custom shader uniforms
    this.uniforms = {time: {value: 0}};

    // reference file-loaded materials
    this.loaded = {};
  }

  bind(root) {}

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

    mat.envMap = this.envMap;
    mat.envMapIntensity = 0.5;

    // material specific
    switch (mat.name) {
      case 'concrete':
        mat.normalScale.x = 0.25;
        mat.normalScale.y = 0.25;
        break;
      case 'gold':
        break;
      case 'neon': case 'neon1': case 'neon2':
        mat.emissive = new THREE.Color(1, 1, 1);
        mat.emissiveIntensity = 1.0;
        //mat.fog = false;
        break;
      case 'nu_metal':
        mat.normalScale.x = 0.25;
        mat.normalScale.y = 0.25;
        break;
      case 'plastic':
        //mat.emissive = new THREE.Color(1, .95, .95);
        //mat.emissiveIntensity = .75;
        break;
      case 'tree_trunk_1':
        mat.vertexColors = THREE.NoColors;
        //mat.normalScale.x = 0.1;
        //mat.normalScale.y = 0.1;
        break;
      case 'tree_leaves_1':
        mat.vertexColors = THREE.NoColors;
        console.log(mat);
        break;
      case 'pollen_1':
        mat.side = THREE.DoubleSide;
        //mat.lights = false;
        mat.depthWrite = false;
        break;
      default:
        break;
    }
  }

  getCustomMaterial(matSource) {
    const mat = matSource.clone();
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = `uniform float time;\n${shader.vertexShader}`;
      const beginVertex = `
        vec4 mvp = modelMatrix * vec4(position, 1.0);
        float theta = sin(time * 0.1 + mvp.x / 2.0);
        float c = cos(theta);
        float s = sin(theta);
        float off = 1.0 * sin(time + position.x * 200.0);
        mat3 roty = mat3(c, 0, s, 0, 1, 0, -s, 0, c);
        //mat4 m = mat4(1, 0, 0, 0, 0, 1, 0, s * off * 2.0, 0, 0, 1, s * off, 0, 0, 0, 1);
        vec3 p = position;
        vec4 t = vec4(p.x + 0.25 * sin(time + p.y), p.y, p.z + 0.25 * cos(time + p.y), 1.0);
        vec3 transformed = vec3(t.x, t.y, t.z);
        vNormal = vNormal * roty;
      `;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', beginVertex);

      // hook uniforms
      shader.uniforms.time = this.uniforms.time;
    };
    //mat.roughness = 0.5;
    return mat;
    //const index = shader.vertexShader.indexOf('#include <common>')''
    //shader.vertexShader = shader.vertexShader.slice(0, index) + '//funcs here' + shader.vertexShader.slice(index);
  }

  update(delta) {
    this.uniforms.time.value += delta;
  }
}

export default Materials;
