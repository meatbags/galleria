/**
 * App entry point.
 **/

import { Scene, Renderer, Surface } from './modules';
import { detectMobileAndTablet, Menu } from './utils';

class App {
  constructor() {
    this.active = false;
    this.isMobile = detectMobileAndTablet();
    this.scene = new Scene();
    this.renderer = new Renderer(this.scene);
    this.surface = new Surface(this.scene, this.renderer, this.isMobile);
    this.menu = new Menu(this);
    this.loop();
  }

  deactivate() {
    this.active = false;
  }

  activate() {
    this.active = true;
    this.now = performance.now();
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); });
    if (this.active) {
      const t = performance.now();
      const delta = (t - this.now) / 1000;
      this.now = t;
      this.scene.update(delta);
      this.surface.update(delta);
      this.renderer.draw(delta);
      this.surface.draw();
    }
  }
}

window.onload = () => {
  const app = new App();
};
