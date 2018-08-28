/**
 * App entry point.
 **/

import { Scene, Renderer, Surface } from './modules';

class App {
  constructor() {
    this.scene = new Scene();
    this.renderer = new Renderer(this.scene);
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
