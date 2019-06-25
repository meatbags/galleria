/** Gallery app entry point */

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

  loop() {

  }

  load() {

  }
}
