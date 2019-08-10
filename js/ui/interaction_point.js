/** Generic 3D interaction point */

import Config from '../modules/config';

class InteractionPoint {
  constructor(position, width, height, callback, camera, normal, label) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.callback = callback;
    this.normal = normal;
    this.label = label || null;
    this.side = Math.sign(position.z - 6); // z=6 is centre of pillar
    this.helper = new THREE.Vector3();
    this.worldVector = new THREE.Vector3();
    this.box = {position: new THREE.Vector2(), width: 0, height: 0};
    this.onscreen = false;
    this.hover = false;
    this.activeThreshold = 30;
    this.ref = {};
    this.ref.camera = camera;
    this.bind();
  }

  bind() {
    this.resize = () => {
      this.centre = {
        x: Config.renderer.getWidth() / 2,
        y: Config.renderer.getHeight() / 2,
      };
      this.ref.focalLength = this.ref.camera.getFocalLength();
    };
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  delete() {
    window.removeEventListener('resize', this.resize);
  }

  mouseMove(x, y) {
    this.hover = (
      this.onscreen &&
      this.position.distanceTo(this.ref.camera.position) < this.activeThreshold &&
      Math.abs(this.box.position.x - x) < this.box.width / 2 &&
      Math.abs(this.box.position.y - y) < this.box.height / 2
    );
    return this.hover;
  }

  click(x, y) {
    if (this.mouseMove(x, y)) {
      this.callback();
    }
  }

  update() {
    // calculate screen position
    this.helper.copy(this.ref.camera.position);
    this.helper.sub(this.position);
    this.helper.normalize();
    this.ref.camera.getWorldDirection(this.worldVector);
    this.onscreen = this.helper.dot(this.worldVector) <= 0
      && this.normal.dot(this.helper) >= 0
      && (Math.sign(this.ref.camera.position.z - 6) == this.side || this.position.x > 20);
    const mag = this.position.distanceTo(this.ref.camera.position);
    
    if (this.onscreen && mag < this.activeThreshold && mag != 0) {
      this.helper.copy(this.position);
      this.helper.project(this.ref.camera);
      this.box.position.x = (this.helper.x + 1) * this.centre.x;
      this.box.position.y = (-this.helper.y + 1) * this.centre.y;

      // calc object size by angular size
      const scale = this.ref.focalLength / mag;
      this.box.width = 2 * Math.atan(this.width / (2 * mag)) * window.innerHeight; // * scale;
      this.box.height = 2 * Math.atan(this.height / (2 * mag)) * window.innerHeight; // * scale;
    }
  }
}

export default InteractionPoint;
