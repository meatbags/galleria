/** Mouse interface */

import IsMobileDevice from '../utils/is_mobile_device';

class Mouse {
  constructor(params) {
    this.active = false;
    this.position = {x: 0, y: 0};
    this.origin = {x: 0, y: 0};
    this.delta = {x: 0, y: 0};
    this.domTarget = params.domTarget;
    this.onMouseDownCallback = params.onMouseDown || null;
    this.onMouseUpCallback = params.onMouseUp || null;
    this.onMouseMoveCallback = params.onMouseMove || null;

    if (!IsMobileDevice()) {
      this.domTarget.addEventListener('mousedown', evt => { this.onMouseDown(evt); });
      this.domTarget.addEventListener('mousemove', evt => { this.onMouseMove(evt); });
      this.domTarget.addEventListener('mouseup', evt => { this.onMouseUp(evt); });
      this.domTarget.addEventListener('mouseleave', evt => { this.onMouseUp(evt); });
    } else {
      this.domTarget.addEventListener('touchstart', evt => { this.onMouseDown(evt.touches[0]); });
      this.domTarget.addEventListener('touchmove', evt => { this.onMouseMove(evt.touches[0]); });
      this.domTarget.addEventListener('touchend', evt => { this.onMouseUp(evt.touches[0]); });
    }
  }

  onMouseDown(evt) {
    this.active = true;
    this.origin.x = evt.offsetX;
    this.origin.y = evt.offsetY;
    this.delta.x = 0;
    this.delta.y = 0;

    if (this.onMouseDownCallback) {
      this.onMouseDownCallback(evt);
    }

    this.onMouseMove(evt);
  }

  onMouseMove(evt) {
    this.position.x = evt.offsetX;
    this.position.y = evt.offsetY;

    if (this.active) {
      this.delta.x = this.position.x - this.origin.x;
      this.delta.y = this.position.y - this.origin.y;
    }

    if (this.onMouseMoveCallback) {
      this.onMouseMoveCallback(evt);
    }
  }

  onMouseUp(evt) {
    this.active = false;
    if (this.onMouseUpCallback) {
      this.onMouseUpCallback(evt);
    }
  }
}

export default Mouse;
