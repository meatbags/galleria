/**
 * Mouse interface.
 **/

class Mouse {
  constructor(domElement, onDown, onMove, onUp, isMobile) {
    this.x = 0;
    this.y = 0;
    this.origin = {x: 0, y: 0};
    this.delta = {x: 0, y: 0};
    this.active = false;

    // dom events
    this.domElement = domElement;

    if (!isMobile) {
      this.domElement.addEventListener('mousedown', onDown, false);
      this.domElement.addEventListener('mousemove', onMove, false);
      this.domElement.addEventListener('mouseup', onUp, false);
      this.domElement.addEventListener('mouseleave', onUp, false);
    } else {
      this.domElement.addEventListener('touchstart', onDown, false);
      this.domElement.addEventListener('touchmove', onMove, false);
      this.domElement.addEventListener('touchend', onUp, false);
    }
  }

  start(e) {
    this.active = true;
    this.origin.x = e.offsetX;
    this.origin.y = e.offsetY;
  }

  move(e) {
    this.x = e.offsetX;
    this.y = e.offsetY;
    this.delta.x = this.x - this.origin.x;
    this.delta.y = this.y - this.origin.y;
  }

  stop() {
    this.active = false;
  }
}

export { Mouse };
