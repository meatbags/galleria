/**
 * Control surface and player interface.
 **/

 import { Mouse, Keyboard, NodeView, OverlayCanvas } from './ui';
 import { Clamp } from './maths';

 class Surface {
   constructor(scene, isMobile) {
     this.scene = scene;
     this.isMobile = isMobile;
     this.player = this.scene.player;
     this.camera = this.scene.camera.camera;
     this.worldVector = new THREE.Vector3();
     this.domElement = document.querySelector('.canvas-wrapper');
     this.centre = {x:0, y:0};
     this.setSize();
     this.rotation = new THREE.Vector2();
     this.timestamp = null;
     this.threshold = {
       click: 150,
       pan: 200
     };

     // interactive nodes
     this.nodes = [];
     this.nodes.push(new NodeView(new THREE.Vector3(0, 3, 0), null));

     // events
     this.keyboard = new Keyboard((key) => { this.onKeyboard(key); });
     this.mouse = new Mouse(this.domElement, (e) => { this.onMouseDown(e); }, (e) => { this.onMouseMove(e); }, (e) => { this.onMouseUp(e); });
     this.canvas = new OverlayCanvas(this, this.domElement);
     window.addEventListener('resize', () => { this.resize(); });
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
       // highlight ui nodes
       for (var i=0, len=this.nodes.length; i<len; ++i) {
         this.nodes[i].mouseOver(this.mouse.x, this.mouse.y);
       }
     }
   }

   onMouseUp(e) {
     this.mouse.stop();
     if (Date.now() - this.timestamp < this.threshold.click) {
       // apply clickw
     }
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
     // update nodes
     this.camera.getWorldDirection(this.worldVector);
     this.activeNode = false;
     for (var i=0, len=this.nodes.length; i<len; ++i) {
       this.nodes[i].update(delta, this.player, this.camera, this.worldVector, this.centre);
       if (this.nodes[i].isHover()) {
         this.activeNode = true;
       }
     }
   }

   draw() {
     this.canvas.draw(this.nodes);
     this.canvas.promptTouchMove((this.mouse.active && (Date.now() - this.timestamp > this.threshold.pan)));
     this.canvas.promptClick((!this.mouse.active && this.activeNode), this.mouse.x, this.mouse.y);
     if (this.player.noclip) {
       this.canvas.promptGodMode();
     }
   }
 }

 export { Surface };
