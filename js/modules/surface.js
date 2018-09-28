/**
 * Control surface and player interface.
 **/

import { Mouse, Keyboard, OverlayCanvas, FloorPlan } from './ui';
import { Clamp } from './maths';

class Surface {
  constructor(scene, renderer, isMobile) {
    this.scene = scene;
    this.isMobile = isMobile;
    this.player = this.scene.player;
    this.domElement = document.querySelector('#canvas-target');
    this.centre = {x:0, y:0};
    this.setSize();
    this.rotation = new THREE.Vector2();
    this.timestamp = null;
    this.threshold = {click: 150, pan: 200};

    // events
    this.keyboard = new Keyboard((key) => { this.onKeyboard(key); });
    if (!this.isMobile) {
      this.mouse = new Mouse(
        this.domElement,
        (e) => { this.onMouseDown(e); },
        (e) => { this.onMouseMove(e); },
        (e) => { this.onMouseUp(e); },
        this.isMobile
      );
    } else {
      this.mouse = new Mouse(
        this.domElement,
        (e) => { this.onMouseDown(this.processTouch(e)); },
        (e) => { this.onMouseMove(this.processTouch(e)); },
        (e) => { this.onMouseUp(this.processTouch(e)); },
        this.isMobile
      );
    }
    this.canvas = new OverlayCanvas(this, this.domElement, renderer.renderer.domElement);
    window.addEventListener('resize', () => { this.resize(); });

    // artwork handler
    this.floorPlan = new FloorPlan(this);
  }

  processTouch(e) {
    // touch event -> mouse analogue
    var x = 0;
    var y = 0;
    if (e.targetTouches.length) {
      const rect = this.domElement.getBoundingClientRect();
      const touch = e.targetTouches[0];
      x = touch.pageX - rect.left;
      y = touch.pageY - rect.top;
    }
    return {offsetX: x, offsetY: y};
  }

  onMouseDown(e) {
    // record player rotation
    this.rotation.y = this.player.rotation.y;
    this.rotation.x = this.player.rotation.x;
    this.timestamp = Date.now();
    this.mouse.start(e);
  }

  onMouseMove(e) {
    this.mouse.move(e);

    if (this.mouse.active) {
      // update player rotation
      if (!(this.player.keys.left || this.player.keys.right)) {
        const yaw = this.rotation.x + this.mouse.delta.x / this.centre.x;
        const pitch = Clamp(this.rotation.y + this.mouse.delta.y / this.centre.y, this.player.minPitch, this.player.maxPitch);
        if (pitch == this.player.minPitch || pitch == this.player.maxPitch) {
          this.mouse.origin.y = e.offsetY;
          this.rotation.y = pitch;
        }
        this.player.setRotation(pitch, yaw);
      }
    } else {
      // update artwork nodes
      this.floorPlan.mouseOver(this.mouse.x, this.mouse.y);
    }
  }

  onMouseUp(e) {
    this.mouse.stop();
    if (Date.now() - this.timestamp < this.threshold.click) {
       this.floorPlan.click(this.mouse.x, this.mouse.y);
    }
  }

  initOnscreenKeyboard() {
    // ?
  }

  onKeyboard(key) {
    switch (key) {
      case 'a': case 'A': case 'ArrowLeft':
        this.player.keys.left = this.keyboard.keys[key];
        break;
      case 'd': case 'D': case 'ArrowRight':
        this.player.keys.right = this.keyboard.keys[key];
        break;
      case 'w': case 'W': case 'ArrowUp':
        this.player.keys.up = this.keyboard.keys[key];
        break;
      case 's': case 'S': case 'ArrowDown':
        this.player.keys.down = this.keyboard.keys[key];
        break;
      case ' ':
        this.player.keys.jump = this.keyboard.keys[key];
        break;
      case 'x': case 'X':
        // toggle noclip on ctrl+x
        if (this.keyboard.keys['x'] || this.keyboard.keys['X']) {
          if (this.keyboard.isControl()) {
            this.player.toggleNoclip();
          }
          this.keyboard.release('x');
          this.keyboard.release('X');
        }
        break;
      default:
        break;
    }
  }

  setSize() {
    // get centre of canvas
    const rect = this.domElement.getBoundingClientRect();
    this.centre.x = rect.width / 2;
    this.centre.y = rect.height / 2;
  }

  resize() {
    //this.raycaster.resize();
    this.setSize();
    this.canvas.resize();
  }

  update(delta) {
    // update artwork display
    this.floorPlan.update(delta);
    this.activeTitle = this.floorPlan.activeArtwork == null ? '' : this.floorPlan.activeArtwork.data.title;
  }

  draw() {
    this.canvas.clear();
    this.floorPlan.draw(this.canvas);
    this.canvas.promptTouchMove((this.mouse.active && (Date.now() - this.timestamp > this.threshold.pan)));
    this.canvas.promptClick('view: ' + this.activeTitle, (!this.mouse.active && this.floorPlan.activeArtwork != null), this.mouse.x, this.mouse.y);
    if (this.player.noclip) {
      this.canvas.promptGodMode();
      this.canvas.drawDevOverlay();
    } else {
      this.canvas.drawDevOverlay();
    }
  }
}

export { Surface };
