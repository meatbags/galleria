/**
 * Webgl renderer.
 **/

import '../lib/glsl';

class Renderer {
  constructor(scene) {
    this.scene = scene.scene;
    this.camera = scene.camera.camera;
    this.renderer = new THREE.WebGLRenderer({});
    this.renderer.setClearColor(0x444444, 1);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.padding = {x: 64, y: 96, minX: 640, minY: 480};
    this.setSize();

    // render passes
    const strength = 0.5;
    const radius = 0.125;
    const threshold = 0.96;
    this.passRender = new THREE.RenderPass(this.scene, this.camera);
    this.passPoster = new THREE.PosterPass(this.size);
    this.passBloom = new THREE.UnrealBloomPass(this.size, strength, radius, threshold);
    this.passBloom.renderToScreen = true;
    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.addPass(this.passRender);
    this.composer.addPass(this.passPoster);
    this.composer.addPass(this.passBloom);

    // events, doc
    window.addEventListener('resize', () => { this.resize(); });
    this.domElement = document.querySelector('#canvas-target');
    this.domElement.append(this.renderer.domElement);
    this.resize();
    scene.resize();
  }

  setSize() {
    const w = Math.min(window.innerWidth, Math.max(this.padding.minX, window.innerWidth - this.padding.x * 2));
    const h = Math.min(window.innerHeight, Math.max(this.padding.minY, window.innerHeight - this.padding.y * 2));
    this.width = w;
    this.height = h;
    if (!this.size) {
      this.size = new THREE.Vector2(this.width, this.height);
    } else {
      this.size.x = this.width;
      this.size.y = this.height;
    }
  }

  resize() {
    this.setSize();
    this.domElement.style.width = `${this.width}px`;
    this.domElement.style.height = `${this.height}px`;
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
    this.passBloom.setSize(this.width, this.height);
  }

  draw(delta) {
    this.composer.render(delta);
  }
}

export { Renderer };
