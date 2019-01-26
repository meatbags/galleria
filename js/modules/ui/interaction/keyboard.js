/** Keyboard interface.  */

class Keyboard {

  /** Initialise keyboard events. */
  constructor(onEvent) {
    this.keys = {};
    this.onEvent = onEvent;
    document.addEventListener('keydown', (key) => { this.onKeyDown(key); });
    document.addEventListener('keyup', (key) => { this.onKeyUp(key); });
  }

  /** Handle keydown event. */
  onKeyDown(key) {
    this.keys[key.key] = true;
    this.onEvent(key.key);
  }

  /** Handle keyup event. */
  onKeyUp(key) {
    this.keys[key.key] = false;
    this.onEvent(key.key);
  }

  /** Manually release key state. */
  release(key) {
    this.keys[key] = false;
  }

  /** Check if special key is being pressed. */
  isSpecial() {
    return (this.keys['Shift'] || this.keys['Control'] || this.keys['Alt']);
  }

  /** Check for ctrl key. */
  isControl() {
    return (this.keys['Control']);
  }

  /** Check for shift key. */
  isShift() {
    return (this.keys['Shift']);
  }

  /** Check for alt key. */
  isAlt() {
    return (this.keys['Alt']);
  }
}

export default Keyboard;
