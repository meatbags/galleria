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
    this.domArtworkTarget = document.querySelector('#artwork-target');
    this.centre = {x:0, y:0};
    this.setSize();
    this.rotation = new THREE.Vector2();
    this.timestamp = null;
    this.threshold = {click: 225, pan: 200, mouseDelta: isMobile ? 0.5 : 0.25};
    this.scaleRotation = {x: isMobile ? 0.75 : 1, y: 1};

    // events
    document.querySelectorAll('#gallery-controls .controls__inner .control').forEach(e => {
      if (!isMobile) {
        e.addEventListener('mousedown', evt => { this.onControlDown(evt.currentTarget); });
        e.addEventListener('mouseup', evt => { this.onControlUp(evt.currentTarget); });
        e.addEventListener('mouseleave', evt => { this.onControlLeave(evt.currentTarget); });
      } else {
        e.addEventListener('touchstart', evt => {
          evt.preventDefault();
          this.onControlDown(evt.currentTarget);
        });
        e.addEventListener('touchend', evt => {
          evt.preventDefault();
          this.onControlUp(evt.currentTarget);
        });
      }
    });
    this.controls = {
      up: document.querySelector('#ctrl-U'),
      down: document.querySelector('#ctrl-D'),
      left: document.querySelector('#ctrl-L'),
      right: document.querySelector('#ctrl-R')
    };
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
        (e) => {
          e.preventDefault();
          this.onMouseDown(this.processTouch(e));
        },
        (e) => {
          this.onMouseMove(this.processTouch(e));
        },
        (e) => {
          e.preventDefault();
          this.onMouseUp(this.processTouch(e));
        },
        this.isMobile
      );
    }
    window.addEventListener('resize', () => { this.resize(); });

    // 2d canvas
    this.canvas = new OverlayCanvas(this, this.domElement, renderer.renderer.domElement);

    // artwork handler
    this.floorPlan = new FloorPlan(this, isMobile);
  }

  processTouch(e) {
    // touch event -> mouse analogue
    var x = 0;
    var y = 0;
    if (e.targetTouches && e.targetTouches.length) {
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

    // set cursor position mobile
    if (this.isMobile) {
      this.onMouseMove(e);
    }
  }

  onMouseMove(e) {
    this.mouse.move(e);

    if (this.mouse.active) {
      // update player rotation
      if (!(this.player.keys.left || this.player.keys.right)) {
        const yaw = this.rotation.x + (this.mouse.delta.x / this.centre.x) * this.scaleRotation.x;
        const pitch = Clamp(this.rotation.y + (this.mouse.delta.y / this.centre.y) * this.scaleRotation.y, this.player.minPitch, this.player.maxPitch);
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
    if (Date.now() - this.timestamp < this.threshold.click && Math.hypot(this.mouse.delta.x, this.mouse.delta.y) < window.innerWidth * this.threshold.mouseDelta) {
       this.floorPlan.click(this.mouse.x, this.mouse.y);
    }
  }

  onControlUp(e) {
    switch(e.dataset.dir) {
      case 'up':
        this.player.keys.up = false;
        break;
      case 'down':
        this.player.keys.down = false;
        break;
      case 'left':
        this.player.keys.left = false;
        break;
      case 'right':
        this.player.keys.right = false;
        break;
      default:
        break;
    }
    e.classList.remove('active');
  }

  onControlDown(e) {
    switch(e.dataset.dir) {
      case 'up':
        this.player.keys.up = true;
        break;
      case 'down':
        this.player.keys.down = true;
        break;
      case 'left':
        this.player.keys.left = true;
        break;
      case 'right':
        this.player.keys.right = true;
        break;
      default:
        break;
    }
    e.classList.add('active');
  }

  onControlLeave(e) {
    this.onControlUp(e);
  }

  onKeyboard(key) {
    if (!this.domArtworkTarget.classList.contains('active')) {
      switch (key) {
        case 'a': case 'A': case 'ArrowLeft':
          this.player.keys.left = this.keyboard.keys[key];
          if (this.player.keys.left) {
            this.controls.left.classList.add('active');
          } else {
            this.controls.left.classList.remove('active');
          }
          break;
        case 'd': case 'D': case 'ArrowRight':
          this.player.keys.right = this.keyboard.keys[key];
          if (this.player.keys.right) {
            this.controls.right.classList.add('active');
          } else {
            this.controls.right.classList.remove('active');
          }
          break;
        case 'w': case 'W': case 'ArrowUp':
          this.player.keys.up = this.keyboard.keys[key];
          if (this.player.keys.up) {
            this.controls.up.classList.add('active');
          } else {
            this.controls.up.classList.remove('active');
          }
          break;
        case 's': case 'S': case 'ArrowDown':
          this.player.keys.down = this.keyboard.keys[key];
          if (this.player.keys.down) {
            this.controls.down.classList.add('active');
          } else {
            this.controls.down.classList.remove('active');
          }
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
  }

  draw() {
    this.canvas.clear();
    this.floorPlan.draw(this.canvas.getContext());
    this.canvas.promptTouchMove((this.mouse.active && (Date.now() - this.timestamp > this.threshold.pan)));
    //this.canvas.promptClick(this.activeTitle, (!this.mouse.active && this.floorPlan.activeArtwork != null), this.mouse.x, this.mouse.y);
    if (this.player.noclip) {
      this.canvas.promptGodMode();
      this.canvas.drawDevOverlay();
    } else {
      this.canvas.drawDevOverlay();
    }
  }
}

export { Surface };
