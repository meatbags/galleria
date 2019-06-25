/** App entry */

import Camera from './modules/camera';
import Canvas2D from './modules/canvas_2d';
import FloorPlan from './modules/floor_plan';
import Lighting from './modules/lighting';
import Map from './modules/map';
import Materials from './modules/materials';
import Player from './modules/player';
import Renderer from './modules/renderer';
import Scene from './modules/scene';
import Surface from './modules/surface';
import Archive from './ui/archive';
import Menu from './ui/menu';
import IsSafariMobile from './utils/is_safari_mobile';

class App {
  constructor() {
    this.active = false;
    this.modules = {
      renderer: new Renderer(),
      scene: new Scene(),
      player: new Player(),
      camera: new Camera(),
      floorPlan: new FloorPlan(),
      lighting: new Lighting(),
      map: new Map(),
      materials: new Materials(),
      surface: new Surface(),
      canvas2d: new Canvas2D(),
      archive: new Archive(),
      menu: new Menu(),
    };
    this.bind();
    this.timer = { previous: performance.now() };
    this.loop();
  }

  bind() {
    // bind modules
    Object.keys(this.modules).forEach(key => {
      if (this.modules[key].bind) {
        this.modules[key].bind(this);
      }
    });

    // trigger resize after orientationchange
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 500);
    });

    // safari fix
    if (IsSafariMobile()) {
      document.querySelectorAll('.fix-safari').forEach(el => { el.classList.add('safari'); });
    }
  }

  start() {
    this.timer.previous = performance.now();
    this.active = true;
  }

  pause() {
    this.active = false;
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); });
    if (this.active) {
      const now = performance.now();
      const delta = Math.min(0.1, (now - this.timer.previous) / 1000);
      this.timer.previous = now;

      // update modules
      Object.keys(this.modules).forEach(key => {
        if (this.modules[key].update) {
          this.modules[key].update(delta);
        }
      });

      // render
      this.modules.renderer.render(delta);
      this.modules.surface.render();
    }
  }
}

window.onload = () => {
  //const app = new App();
};
