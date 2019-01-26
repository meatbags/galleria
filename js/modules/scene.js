/** Scene & game logic. */
import Camera from './world/camera';
import Player from './world/player';
import Lighting from './world/lighting';
import Map from './world/map';

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
  }

  /** Resize the camera. */
  resize() {
    const rect = this.element.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.camera.resize();
  }

  /** Load exhibition data. */
  reloadExhibition() {
    this.map.reloadInstallation();
    this.lighting.reloadExhibition();
    this.player.resetPosition();
  }

  /** Update scene. */
  update(delta) {
    this.player.update(delta);
    this.camera.update(delta);
    this.map.update(delta);
  }
}

export default Scene;
