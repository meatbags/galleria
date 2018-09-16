/**
 * 3D scene handler.
 **/

import { Camera, Lighting, Player, Map } from './world';

class Scene {
  constructor() {
    this.element = document.querySelector('#canvas-target');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.colliderSystem = new Collider.System();
    this.player = new Player(this);
    this.camera = new Camera(this);
    this.lighting = new Lighting(this);
    this.map = new Map(this);

    // events
    window.addEventListener('resize', () => { this.resize(); });
  }

  resize() {
    const rect = this.element.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.camera.resize();
  }

  update(delta) {
    this.player.update(delta);
    this.camera.update(delta);
    this.map.update(delta);
  }
}

export { Scene };
