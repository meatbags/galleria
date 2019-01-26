/** Gallery entry point and main loop. */
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
    this.maxTimeDelta = 0.1;

    // load site or defer load (mobile)
    if (!this.isMobile) {
      this.load();
    }

    // events
    window.addEventListener('resize', () => { this.resize(); });
    window.addEventListener('orientationchange', () => { setTimeout(() => {
      this.resize();
    }, 500); });

    // fix browser quirk
    if (this.isMobileExclusive && Util.detectMobileSafari()) {
      document.querySelectorAll('.fix-safari').forEach(el => { el.classList.add('safari'); });
    }

    // start
    this.loop();
  }

  /** Load the gallery. */
  load() {
    if (!this.loaded) {
      this.loaded = true;
      this.scene = new Scene();
      this.renderer = new Renderer(this, this.scene);
      this.surface = new Surface(this.scene, this.renderer, this.isMobile);
      this.archive = new Util.Archive(this);
    }
  }

  /** Resize render surface and UI. */
  resize() {
    if (!this.isMobileExclusive) {
      this.renderer.resize();
      this.scene.resize();
      this.surface.resize();
    }
  }

  /** Pause rendering. */
  deactivate() {
    this.active = false;
  }

  /** Resume rendering. */
  activate() {
    this.active = true;
    this.now = performance.now();
  }

  /** The main loop. */
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
