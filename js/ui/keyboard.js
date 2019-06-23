/** Keyboard interface.  */

class Keyboard {
  constructor(onEvent) {
    this.keys = {};
    this.onEvent = onEvent;
    document.addEventListener('keydown', (key) => { this.onKeyDown(key); });
    document.addEventListener('keyup', (key) => { this.onKeyUp(key); });
  }

  onKeyDown(key) {
    this.keys[key.key] = true;
    this.onEvent(key.key);
  }

  onKeyUp(key) {
    this.keys[key.key] = false;
    this.onEvent(key.key);
  }

  release(key) {
    this.keys[key] = false;
  }

  isSpecial() {
    return (this.keys['Shift'] || this.keys['Control'] || this.keys['Alt']);
  }

  isControl() {
    return (this.keys['Control']);
  }

  isShift() {
    return (this.keys['Shift']);
  }

  isAlt() {
    return (this.keys['Alt']);
  }
}

export default Keyboard;
