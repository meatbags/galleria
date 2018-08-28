/**
 * Mouse interface.
 **/

class Mouse {
  constructor(domElement, onDown, onMove, onUp) {
    this.x = 0;
    this.y = 0;
    this.origin = {x: 0, y: 0};
    this.delta = {x: 0, y: 0};
    this.active = false;

    // dom events
    this.domElement = domElement;
    this.domElement.addEventListener('mousedown', onDown, false);
    this.domElement.addEventListener('mousemove', onMove, false);
    this.domElement.addEventListener('mouseup', onUp, false);
    this.domElement.addEventListener('mouseleave', onUp, false);
  }

  start(e) {
    this.active = true;
    this.origin.x = e.clientX;
    this.origin.y = e.clientY;
  }

  move(e) {
    this.x = e.clientX;
    this.y = e.clientY;
    this.delta.x = this.x - this.origin.x;
    this.delta.y = this.y - this.origin.y;
  }

  stop() {
    this.active = false;
  }
}

export { Mouse };
