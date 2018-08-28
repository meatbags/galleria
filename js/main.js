/**
 * App entry point.
 **/

import { Scene, Renderer, Surface } from './modules';
import { detectMobileTablet } from './utils';

class App {
  constructor() {
    this.isMobile = detectMobileTablet();
    this.scene = new Scene();
    this.renderer = new Renderer(this.scene);
    this.surface = new Surface(this.scene, this.isMobile);
    this.now = performance.now();
    this.loop();
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); });
    const t = performance.now();
    const delta = (t - this.now) / 1000;
    this.now = t;
    this.scene.update(delta);
    this.surface.update(delta);
    this.renderer.draw(delta);
    this.surface.draw();
  }
}

window.onload = () => {
  const app = new App();
};
