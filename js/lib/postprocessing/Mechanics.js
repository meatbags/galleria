/**
  @author meatbags / https://github.com/meatbags
  **/

THREE.MechanicsShader = {
  uniforms: {
    'time': {value: 0.0},
    'width': {value: 100.0},
    'height': {value: 100.0},
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
    uniform float time;

    float rand(vec2 seed) {
      return fract(sin(dot(seed.xy, vec2(12.9898,78.233))) * 43758.5453);
    }

    vec2 randVec2() {
      return vec2(rand(vUv + time), rand(vUv + time + 1.));
    }

    vec3 getPosition(vec2 coords) {
      vec4 sample = texture2D(tDiffuse, coords);
      vec3 res = vec3(coords.x / UV_SCALE, sample.y * MAX_HEIGHT, coords.y / UV_SCALE);
      return res;
    }

    float computeAO(vec2 uvOff, vec3 P, vec3 N) {
      vec3 Vpos = getPosition(vUv + uvOff * UV_SCALE) - P;
      vec3 Vnorm = normalize(Vpos);
      float dist = length(Vpos);
      return max(dot(N, Vnorm) * (1.0 / (1.0 + dist)), 0.0);
    }

    float sampleAO(vec3 P) {
      vec3 N = vec3(0., 1., 0.);
      vec2 randOffset = randVec2();
      const int iterations = 4;
      float totalAO = 0.0;

      for (int i=0; i<iterations; i++) {
        vec2 coord1 = reflect(vec2(
          (i < 2) ? ((i == 0) ? 1.0 : -1.0) : 0.0,
          (i > 1) ? ((i == 2) ? 1.0 : -1.0) : 0.0
        ), randOffset);
        vec2 coord2 = vec2(
          coord1.x * 0.707 - coord1.y * 0.707,
          coord1.x * 0.707 + coord1.y * 0.707
        );
        totalAO += computeAO(coord1 * 0.25, P, N);
        totalAO += computeAO(coord2 * 0.5, P, N);
        totalAO += computeAO(coord1 * 0.75, P, N);
        totalAO += computeAO(coord2, P, N);
      }

      return (totalAO / (float(iterations) * 4.));
    }

    void main() {
      vec4 tex = texture2D(tDiffuse, vUv);
      //vec3 P = getPosition(vUv);
      //float ao = sampleAO(P);
      //vec4 frag = tex - ao;

      vec4 frag = tex;
      frag.r = floor(frag.r * 16.0) / 16.0;
      //frag.g = floor(frag.g * 64.0) / 64.0;
      //frag.b = floor(frag.b * 64.0) / 64.0;

      gl_FragColor = frag;
    }
  `
};

// render pass
THREE.MechanicsPass = function(size) {
  THREE.Pass.call(this);

  this.shader = THREE.MechanicsShader;
  this.material = new THREE.ShaderMaterial(this.shader);
  this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new THREE.Scene();
  this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.material);
  this.quad.frustumCulled = false;
  this.scene.add(this.quad);
  this.time = 0;
};

THREE.MechanicsPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
  constructor: THREE.MechanicsPass,
  render: function(renderer, writeBuffer, readBuffer, delta, maskActive) {
    this.shader.uniforms['tDiffuse'].value = readBuffer.texture;
    this.time = (this.time + delta) % 10.;
    this.shader.uniforms['time'].value = this.time;

    if (this.renderToScreen) {
      renderer.render(this.scene, this.camera);
    } else {
      renderer.render(this.scene, this.camera, writeBuffer, this.clear);
    }
  }
});
