/** Gallery entry point */

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

    // bind modules
    Object.keys(this.modules).forEach(key => {
      this.modules[key].bind(this);
    });

    // start main loop
    this.loop();
  }

  bind(root) {
    this.ref = {};
  }

  load(data) {
    console.log(data);
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
