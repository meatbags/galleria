/** Generic 3D interaction point */

import Config from '../modules/config';

class InteractionPoint {
  constructor(position, radius, callback, camera) {
    this.position = position;
    this.radius = radius;
    this.callback = callback;
    this.screenPosition = new THREE.Vector2();
    this.helper = new THREE.Vector3();
    this.worldVector = new THREE.Vector3();
    this.onscreen = false;
    this.hover = false;
    this.ref = {};
    this.ref.camera = camera;
    this.bind();
  }

  bind() {
    this.resize = () => {
      this.centre = {
        x: Config.renderer.getWidth() / 2,
        y: Config.renderer.getHeight() / 2
      };
    };
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  delete() {
    window.removeEventListener('resize', this.resize);
  }

  mouseOver(x, y) {
    this.hover = (
      this.onscreen &&
      Math.hypot(this.screenPosition.x - x, this.screenPosition.y) <= this.radius
    );
    return this.hover;
  }

  click(x, y) {
    if (this.mouseOver(x, y)) {
      this.callback();
    }
  }

  update() {
    // calculate screen position
    this.helper.copy(this.ref.camera.position);
    this.helper.sub(this.position);
    this.helper.normalize();
    this.ref.camera.getWorldDirection(this.worldVector);
    this.onscreen = this.helper.dot(this.worldVector) <= 0;
    if (this.onscreen) {
      this.helper.copy(this.position);
      this.helper.project(this.ref.camera);
      this.screenPosition.x = (this.helper.x + 1) * this.centre.x;
      this.screenPosition.y = (-this.helper.y + 1) * this.centre.y;
    }
  }
}

export default InteractionPoint;
