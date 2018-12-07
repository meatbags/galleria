/**
 * App entry point.
 **/

import { Scene, Renderer, Surface } from './modules';
import { detectMobileOnly, detectMobileSafari, detectMobileAndTablet, Menu, Archive } from './utils';

class App {
  constructor() {
    this.active = false;
    this.isMobile = detectMobileAndTablet();
    this.isMobileExclusive = detectMobileOnly();
    this.scene = new Scene();
    this.renderer = new Renderer(this, this.scene);
    this.surface = new Surface(this.scene, this.renderer, this.isMobile);
    this.menu = new Menu(this);
    this.archive = new Archive(this);
    this.maxDelta = 1 / 10;

    // events
    window.addEventListener('resize', () => {
      if (!this.isMobileExclusive) {
        this.resize();
      }
    });
    window.addEventListener('orientationchange', () => { setTimeout(() => {
      this.resize();
    }, 500); });

    // browser specific fixes
    if (this.isMobileExclusive && detectMobileSafari()) {
      document.querySelectorAll('.fix-safari').forEach(el => { el.classList.add('safari'); });
    }

    // run
    this.loop();
  }

  resize() {
    this.renderer.resize();
    this.scene.resize();
    this.surface.resize();
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
      const delta = Math.min(this.maxDelta, (t - this.now) / 1000);
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
