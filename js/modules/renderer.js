/** Renderer */

import '../glsl';
import Config from './config';
import IsMobileDevice from '../utils/is_mobile_device';

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({});
    this.renderer.setClearColor(0xffdede, 1);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.gammaFactor = 2.25;

    // add to doc
    document.querySelector('#canvas-target').appendChild(this.renderer.domElement);
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene.scene;
    this.ref.camera = root.modules.camera.camera;

    // render passes
    this.width = Config.renderer.getWidth();
    this.height = Config.renderer.getHeight();
    this.size = new THREE.Vector2(this.width, this.height);
    const strength = 0.5;
    const radius = 0.125;
    const threshold = 0.96;
    this.passRender = new THREE.RenderPass(this.ref.scene, this.ref.camera);
    this.passBloom = new THREE.UnrealBloomPass(this.size, strength, radius, threshold);

    // composer
    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.addPass(this.passRender);
    if (!IsMobileDevice()) {
      this.composer.addPass(this.passBloom);
      this.passBloom.renderToScreen = true;
    } else {
      this.passRender.renderToScreen = true;
    }

    // bind events
    this.resize();
    window.addEventListener('resize', () => { this.resize(); });
  }

  resize() {
    this.width = Config.renderer.getWidth();
    this.height =  Config.renderer.getHeight();
    this.size.set(this.width, this.height);
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
    this.passBloom.setSize(this.width, this.height);
  }

  render(delta) {
    this.composer.render(delta);
  }
}

export default Renderer;
