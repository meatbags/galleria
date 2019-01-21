/**
 ** Gallery entry point and main app loop.
 **/

import Scene from './modules/scene';
import Renderer from './modules/renderer';
import Surface from './modules/surface';
import * as Util from './utils';

class App {
  constructor() {
    this.active = false;
    this.isMobile = Util.detectMobileAndTablet();
    this.isMobileExclusive = Util.detectMobileOnly();
    this.menu = new Util.Menu(this, this.isMobile, () => { this.load(); });

    // load site or defer
    if (!this.isMobile) {
      this.load();
    }
    this.maxTimeDelta = 1 / 10;

    // events
    window.addEventListener('resize', () => { this.resize(); });
    window.addEventListener('orientationchange', () => { setTimeout(() => {
      this.resize();
    }, 500); });

    // fix browser quirk
    if (this.isMobileExclusive && Util.detectMobileSafari()) {
      document.querySelectorAll('.fix-safari').forEach(el => { el.classList.add('safari'); });
    }

    this.loop();
  }

  load() {
    if (!this.loaded) {
      this.loaded = true;
      this.scene = new Scene();
      this.renderer = new Renderer(this, this.scene);
      this.surface = new Surface(this.scene, this.renderer, this.isMobile);
      this.archive = new Util.Archive(this);
    }
  }

  resize() {
    if (!this.isMobileExclusive) {
      this.renderer.resize();
      this.scene.resize();
      this.surface.resize();
    }
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
    if (this.active && this.loaded) {
      const t = performance.now();
      const delta = Math.min(this.maxTimeDelta, (t - this.now) / 1000);
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
