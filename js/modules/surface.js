/** UI surface */

import Config from './config';
import Mouse from '../ui/mouse';
import Keyboard from '../ui/keyboard';
import Clamp from '../maths/clamp';
import IsMobileDevice from '../utils/is_mobile_device';

class Surface {
  constructor() {
    this.domElement = document.querySelector('#canvas-target');
    this.domArtworkTarget = document.querySelector('#artwork-target');
    this.rotation = new THREE.Vector2();
    this.timestamp = null;
    const isMobile = IsMobileDevice();
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
    this.mouse = new Mouse({
      domTarget: this.domElement,
      onMouseDown: evt => { this.onMouseDown(evt); },
      onMouseMove: evt => { this.onMouseMove(evt); },
      onMouseUp: evt => { this.onMouseUp(evt); },
    });
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene;
    this.ref.player = root.modules.player;
    this.ref.canvas2d = root.modules.canvas2d;
    this.ref.floorPlan = root.modules.floorPlan;

    this.resize();
    window.addEventListener('resize', () => { this.resize(); });
  }

  onMouseDown(evt) {
    // record player rotation
    this.rotation.y = this.ref.player.rotation.y;
    this.rotation.x = this.ref.player.rotation.x;
    this.timestamp = performance.now();
  }

  onMouseMove(evt) {
    if (this.mouse.active) {
      // update player rotation
      if (!(this.ref.player.keys.left || this.ref.player.keys.right)) {
        const yaw = this.rotation.x + (this.mouse.delta.x / this.centre.x) * this.scaleRotation.x;
        const pitch = Clamp(this.rotation.y + (this.mouse.delta.y / this.centre.y) * this.scaleRotation.y, this.ref.player.minPitch, this.ref.player.maxPitch);

        // reset pitch origin if clamped
        if (pitch == this.ref.player.minPitch || pitch == this.ref.player.maxPitch) {
          this.mouse.origin.y = evt.clientY;
          this.rotation.y = pitch;
        }

        this.ref.player.setRotation(pitch, yaw);
      }
    } else {
      // update artwork nodes
      this.ref.floorPlan.mouseOver(this.mouse.position.x, this.mouse.position.y);
    }
  }

  onMouseUp(evt) {
    const dt = performance.now() - this.timestamp;
    const dx = Math.hypot(this.mouse.delta.x, this.mouse.delta.y);
    if (dt < this.threshold.click &&  dx < window.innerWidth * this.threshold.mouseDelta) {
      console.log('click!')
      this.ref.floorPlan.click(this.mouse.position.x, this.mouse.position.y);
    }
  }

  onControlUp(el) {
    // up, down, left, right
    this.ref.players.keys[el.dataset.dir] = false;
    e.classList.remove('active');
  }

  onControlDown(e) {
    // up, down, left, right
    this.ref.players.keys[el.dataset.dir] = true;
    e.classList.add('active');
  }

  onControlLeave(e) {
    this.onControlUp(e);
  }

  onKeyboard(key) {
    if (!this.domArtworkTarget.classList.contains('active')) {
      switch (key) {
        case 'a': case 'A': case 'ArrowLeft':
          this.ref.player.keys.left = this.keyboard.keys[key];
          this.controls.left.classList[this.ref.player.keys.left ? 'add' : 'remove']('active');
          break;
        case 'd': case 'D': case 'ArrowRight':
          this.ref.player.keys.right = this.keyboard.keys[key];
          if (this.ref.player.keys.right) {
            this.controls.right.classList.add('active');
          } else {
            this.controls.right.classList.remove('active');
          }
          break;
        case 'w': case 'W': case 'ArrowUp':
          this.ref.player.keys.up = this.keyboard.keys[key];
          if (this.ref.player.keys.up) {
            this.controls.up.classList.add('active');
          } else {
            this.controls.up.classList.remove('active');
          }
          break;
        case 's': case 'S': case 'ArrowDown':
          this.ref.player.keys.down = this.keyboard.keys[key];
          if (this.ref.player.keys.down) {
            this.controls.down.classList.add('active');
          } else {
            this.controls.down.classList.remove('active');
          }
          break;
        case ' ':
          this.ref.player.keys.jump = this.keyboard.keys[key];
          break;
        case 'x': case 'X':
          // toggle noclip on ctrl+x
          if (this.keyboard.keys['x'] || this.keyboard.keys['X']) {
            if (this.keyboard.isControl()) {
              this.ref.player.toggleNoclip();
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

  resize() {
    this.width = window.innerWidth * Config.renderer.width;
    this.height = window.innerHeight * Config.renderer.height;
    this.centre = {
      x: this.width / 2,
      y: this.height / 2,
    };
    this.domElement.style.width = `${this.width}px`;
    this.domElement.style.height = `${this.height}px`;
  }

  update(delta) {
    this.ref.floorPlan.update(delta);
  }

  render() {
    this.ref.canvas2d.clear();
    this.ref.floorPlan.draw(this.ref.canvas2d.getContext());
    this.ref.canvas2d.promptTouchMove((this.mouse.active && (Date.now() - this.timestamp > this.threshold.pan)));

    if (this.ref.player.noclip) {
      this.ref.canvas2d.promptGodMode();
      this.ref.canvas2d.drawDevOverlay();
    } else {
      this.ref.canvas2d.drawDevOverlay();
    }
  }
}

export default Surface;
