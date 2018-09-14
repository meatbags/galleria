/**
 * App entry point.
 **/

import { Scene, Renderer, Surface } from './modules';
import { detectMobileTablet, Menu } from './utils';

class App {
  constructor() {
    this.isMobile = detectMobileTablet();
    this.scene = new Scene();
    this.renderer = new Renderer(this.scene);
    this.surface = new Surface(this.scene, this.renderer, this.isMobile);
    this.menu = new Menu(this);
    this.active = false;
    this.loop();
  }

  deactivate() {
    this.active = false;
  }

  activate() {
    this.active = true;
    this.now = performance.now();
    this.scene.camera.fadeIn();
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); });
    if (this.active && false) {
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
