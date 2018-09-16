/**
  @author meatbags / https://github.com/meatbags
  **/

THREE.PosterShader = {
  uniforms: {
    'tDiffuse': {value: null}
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    #define PI 3.14159
    #define UV_SCALE 0.02
    #define MAX_HEIGHT 0.5
    varying vec2 vUv;
    uniform sampler2D tDiffuse;

    float posterise(float val, float amount) {
      return floor(val * amount) / amount;
    }

    float posteriseCeil(float val, float amount) {
      return ceil(val * amount) / amount;
    }

    void main() {
      vec4 frag = texture2D(tDiffuse, vUv);
      frag.r = posterise(frag.r, 16.0);
      gl_FragColor = frag;
    }
  `
};

// render pass
THREE.PosterPass = function(size) {
  THREE.Pass.call(this);
  this.size = size;
  this.shader = THREE.PosterShader;
  this.material = new THREE.ShaderMaterial(this.shader);
  this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new THREE.Scene();
  this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.material);
  this.quad.frustumCulled = false;
  this.scene.add(this.quad);
  this.time = 0;
};

THREE.PosterPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
    constructor: THREE.PosterPass,
    render: function(renderer, writeBuffer, readBuffer, delta, maskActive) {
      this.shader.uniforms['tDiffuse'].value = readBuffer.texture;
      if (this.renderToScreen) {
        renderer.render(this.scene, this.camera);
      } else {
        renderer.render(this.scene, this.camera, writeBuffer, this.clear);
      }
  }
});
