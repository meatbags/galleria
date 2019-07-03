/** Gallery entry point */

import Camera from './camera';
import Canvas2D from './canvas_2d';
import FloorPlan from './floor_plan';
import Lighting from './lighting';
import Map from './map';
import Materials from './materials';
import Player from './player';
import Renderer from './renderer';
import Scene from './scene';
import Surface from './surface';

class Gallery {
  constructor() {
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
    };
  }

  bind(root) {
    this.ref = {};
    this.ref.nav = root.modules.nav;

    // bind modules
    Object.keys(this.modules).forEach(key => {
      this.modules[key].bind(this);
    });

    // start main loop
    this.loop();
  }

  load(data) {
    // reset player position & scene
    this.modules.player.reset();
    this.modules.scene.reset();

    // load map
    this.modules.map.load(data).then(() => {
      this.modules.floorPlan.load(data);
      this.modules.lighting.load(data);

      // reset "open" prompt
      const target = document.querySelector('#open-gallery-prompt');
      if (target) {
        target.classList.remove('loading');
        target.classList.add('prompt-action');
      }
    });
  }

  start() {
    this.timer = { previous: performance.now() };
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

export default Gallery;
