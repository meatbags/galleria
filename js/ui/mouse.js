/** Mouse interface */

import IsMobileDevice from '../utils/is_mobile_device';
import Config from '../modules/config';

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

    // bind events
    this.resize();
    window.addEventListener('resize', () => { this.resize(); });

    if (!IsMobileDevice()) {
      this.domTarget.addEventListener('mousedown', evt => { this.onMouseDown(evt); });
      this.domTarget.addEventListener('mousemove', evt => { this.onMouseMove(evt); });
      this.domTarget.addEventListener('mouseup', evt => { this.onMouseUp(evt); });
      this.domTarget.addEventListener('mouseleave', evt => { this.onMouseUp(evt); });
    } else {
      this.domTarget.addEventListener('touchstart', evt => {
        evt.preventDefault();
        if (evt.touches && evt.touches.length) {
          this.onMouseDown(evt.touches[0]);
        }
      });
      this.domTarget.addEventListener('touchmove', evt => {
        evt.preventDefault();
        if (evt.touches && evt.touches.length) {
          this.onMouseMove(evt.touches[0]);
        }
      });
      this.domTarget.addEventListener('touchend', evt => {
        evt.preventDefault();
        this.onMouseUp(evt);
      });
    }
  }

  onMouseDown(evt) {
    this.active = true;
    this.origin.x = evt.clientX - this.left;
    this.origin.y = evt.clientY - this.top;
    this.delta.x = 0;
    this.delta.y = 0;

    if (this.onMouseDownCallback) {
      this.onMouseDownCallback(evt);
    }

    this.onMouseMove(evt);
  }

  onMouseMove(evt) {
    this.position.x = evt.clientX - this.left;
    this.position.y = evt.clientY - this.top;

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

  resize() {
    this.left = (window.innerWidth - Config.renderer.getWidth()) / 2;
    this.top = (window.innerHeight - Config.renderer.getHeight()) / 2;
  }
}

export default Mouse;
