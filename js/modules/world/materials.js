/**
 * Material manager.
 **/

class Materials {
  constructor(path) {
    this.path = `${APP_ROOT}/${path}/`;
    this.mat = {};
    this.mat.default = new THREE.MeshPhysicalMaterial({emissive: 0, roughness: 1, envMapIntensity: 0.25});
    this.mat.porcelain = new THREE.MeshPhysicalMaterial({color: 0xffffff, emissive: 0x888888, emissiveIntensity: 0.6, roughness: 0.55, metalness: 0.125, envMapIntensity: 0.5});
    this.mat.metal = new THREE.MeshPhysicalMaterial({color: 0xa88e79, emissive: 0x0, roughness: 0.25, metalness: 1.0, envMapIntensity: 0.5});
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

  conform(mat) {
    if (!this.loaded[mat.name]) {
      this.loaded[mat.name] = mat;
    }

    // mat specific
    mat.envMap = this.envMap;
    mat.envMapIntensity = 0.5;

    switch (mat.name) {
      case 'concrete':
        mat.normalScale.x = 0.25;
        mat.normalScale.y = 0.25;
        break;
      case 'gold':
        break;
      case 'neon':
        mat.emissive = new THREE.Color(1, 1, 1);
        mat.emissiveIntensity = 1.0;
        //mat.fog = false;
        break;
      case 'plastic':
        //mat.emissive = new THREE.Color(1, .95, .95);
        //mat.emissiveIntensity = .75;
        break;
      default:
        break;
    }
  }

  getCustomMaterial(type) {
    //if (type == 'warp') {
    const mat = this.mat.metal.clone();
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = `uniform float time;\n${shader.vertexShader}`;
      const beginVertex = `
        vec4 mvp = modelMatrix * vec4(position, 1.0);
        float theta = sin(time * 0.1 + mvp.x / 2.0);
        float c = cos(theta);
        float s = sin(theta);
        float off = 1.0;// + 0.2 * sin(time + position.x * 200.0);
        mat3 roty = mat3(c, 0, s, 0, 1, 0, -s, 0, c);
        //mat3 sy = mat3(s, 0, 0, 0, 1, 0, 0, 0, 1);
        mat4 m = mat4(1, 0, 0, 0, 0, 1, 0, s * off * 2.0, 0, 0, 1, s * off, 0, 0, 0, 1);
        vec4 t = vec4(position, 1.0) * m;
        vec3 transformed = vec3(t.x, t.y, t.z);
        vNormal = vNormal * roty;
      `;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', beginVertex);

      // hook uniforms
      shader.uniforms.time = this.uniforms.time;
    };
    mat.roughness = 0.5;
    return mat;
    //const index = shader.vertexShader.indexOf('#include <common>')''
    //shader.vertexShader = shader.vertexShader.slice(0, index) + '//funcs here' + shader.vertexShader.slice(index);
  }

  update(delta) {
    this.uniforms.time.value += delta;
  }
}

export { Materials };
