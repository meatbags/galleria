import * as Maths from './VectorMaths';
import Globals from './Globals';
import RayTracer from './RayTracer';
//import HUD from './HUD';

const Player = function(domElement) {
  this.domElement = domElement;
  //this.hud = new HUD();
  this.object = new THREE.Object3D();
  this.position = new THREE.Vector3(Globals.player.position.x, Globals.player.position.y, Globals.player.position.z);
  this.movement = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(Globals.player.rotation.x * 1.1, Globals.player.rotation.y, Globals.player.rotation.z);
  this.offset = {
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.target = {
    position: new THREE.Vector3(this.position.x, this.position.y, this.position.z),
    movement: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(Globals.player.rotation.x, Globals.player.rotation.y, Globals.player.rotation.z),
    offset: {
      rotation: new THREE.Vector3(0, 0, 0)
    }
  }
  this.autoMove = {
    active: false,
    position: new THREE.Vector3(),
    rotation: new THREE.Vector3(),
    threshold: 1,
  };
  this.attributes = {
    speed: Globals.player.speed,
    speedWhileJumping: Globals.player.speed / 2,
    height: Globals.player.height,
    rotation: Globals.player.rotationSpeed,
    camera: {
      fov: Globals.camera.fov,
      near: Globals.camera.near,
      far: Globals.camera.far
    },
    cameraThreshold: 0.4,
    maxRotationOffset: Math.PI * 0.35,
    maxRotationOffsetLower: Math.PI * 0.35,
    falling: false,
    adjust: {
      slow: 0.025,
      medium: 0.04,
      normal: 0.05,
      fast: 0.09,
      veryFast: 0.15
    },
    climb: {
      up: 1,
      down: 0.5,
      minYNormal: 0.5
    },
    gravity: {
      accel: 10,
      maxVelocity: 50,
      jumpVelocity: 5,
    }
  };
  this.camera = new THREE.PerspectiveCamera(this.attributes.camera.fov, 1, this.attributes.camera.near, this.attributes.camera.far);
  this.camera.up = new THREE.Vector3(0, 1, 0);
  this.raytracer = new RayTracer();
	this.init();
};

Player.prototype = {
	init: function() {
    this.object = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.05),
      new THREE.MeshPhongMaterial()
    );
		this.bindControls();
    this.resizeCamera();
    this.light = new THREE.PointLight(0xffffff, 0.8, 10, 2);
		this.light.position.set(0, 2, 0);
		this.object.add(this.light);
	},

  resizeCamera: function() {
    const w = this.domElement.width;
    const h = this.domElement.height;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  },

	bindControls: function() {
		const self = this;

    // store
    self.keys = {up: false, down: false, left: false, right: false, jump: false, click: false};
    self.mouse = {
      x: 0,
      y: 0,
      time: 0,
      clickTimeThreshold: 0.2,
      clickMagnitudeThreshold: 0.05,
      active: false,
      start: {
        x: 0,
        y: 0
      },
      delta: {
        x: 0,
        y: 0
      },
      rotation: {
        x: 0,
        y: 0
      }
    };

    // mouse events
    self.domElement.addEventListener('mousemove', function(e){ self.handleMouseMove(e) });
    self.domElement.addEventListener('click', function(e){ self.handleMouseClick(e) });
    self.domElement.addEventListener('mousedown', function(e){ self.handleMouseDown(e) });
    document.addEventListener('mouseup', function(e){ self.handleMouseUp(e) });
    document.addEventListener('mouseleave', function(e){ self.handleMouseOut(e) });

    // keyboard events
		document.addEventListener("keydown", function(e){ self.handleKeyDown(e) });
		document.addEventListener("keyup", function(e){ self.handleKeyUp(e) });
	},

	update: function(delta, collider, artworks) {
    // handle key presses and move player
    // controls
    this.handleInput(delta, artworks);

    // check next position for collision
    let next = Maths.addVector(Maths.scaleVector(this.movement, delta), this.target.position);

    // apply gravity
    this.movement.y = Math.max(this.movement.y - this.attributes.gravity.accel * delta, -this.attributes.gravity.maxVelocity);

    // collisions
    this.processCollisions(next, collider);

    // set new position target
    this.target.position.x = next.x;
    this.target.position.y = next.y;
    this.target.position.z = next.z;

    // move & rotate camera
    this.setPosition();

    // raytracer
    const ray = this.raytracer.getRayVector(this.camera, this.mouse.x, this.mouse.y);
    const collision = this.raytracer.trace(this.camera.position, ray, Globals.raytracer.length, artworks); //collider
	},

  processCollisions: function(next, collider) {
    // handle collision cases

    let collisions = collider.collisions(next);

    if (collisions.length > 0) {

      // check for floor

      for (let i=0; i<collisions.length; i+=1) {
        const ceiling = collisions[i].ceilingPlane(next);

        if (
          ceiling.y != null &&
          ceiling.plane.normal.y >= this.attributes.climb.minYNormal &&
          (ceiling.y - this.target.position.y) <= this.attributes.climb.up
        ) {
          // ground
          this.movement.y = 0;

          // ascend
          if (ceiling.y >= next.y) {
            next.y = ceiling.y;
          }
        }
      }

      // check for walls

      collisions = collider.collisions(next);
      let walls = [];

      for (let i=0; i<collisions.length; i+=1) {
        const ceiling = collisions[i].ceilingPlane(next);

        if (
          ceiling.y != null && (
          ceiling.plane.normal.y < this.attributes.climb.minYNormal ||
          (ceiling.y - this.target.position.y) > this.attributes.climb.up)
        ){
          walls.push(collisions[i]);
        }
      }

      // if inside a wall, extrude out

      if (walls.length > 0) {
        let extrude = Maths.copyVector(next);

        for (let i=0; i<walls.length; i+=1) {
          const mesh = walls[i];
          extrude = mesh.nearest2DIntersect(this.target.position, next);
        }

        next.x = extrude.x;
        next.z = extrude.z;

        // helper

        this.object.position.set(next.x, next.y, next.z);

        // check extruded point for collisions

        let hits = 0;
        collisions = collider.collisions(next);

        for (let i=0; i<collisions.length; i+=1) {
          const ceiling = collisions[i].ceilingPlane(next);

          if (
            ceiling.y != null &&
            (ceiling.plane.normal.y < this.attributes.climb.minYNormal ||
            (ceiling.y - this.target.position.y) > this.attributes.climb.up)
          ) {
            hits += 1;
          }
        }

        // if contact with > 1 walls, stop motion

        if (hits > 1) {
          next.x = this.target.position.x;
          next.z = this.target.position.z;
        }
      }
    } else {
      // check if on downward slope
      const testUnder = Maths.copyVector(next);
      testUnder.y -= this.attributes.climb.down;

      if (!this.falling && collider.collision(testUnder)) {
        const ceiling = collider.ceilingPlane(testUnder);

        // snap to slope if not too steep
        if (ceiling.plane.normal.y >= this.attributes.climb.minYNormal) {
          next.y = ceiling.y;
          this.movement.y = 0;
        }
      }
    }

    if (next.y < 0) {
      next.y = 0;
      this.movement.y = 0;
    }
  },

  handleInput: function(delta, artworks) {
    // handle controls

    // click
    if (this.keys.click) {
      this.keys.click = false;

      // if centre clicked
      this.autoMove.active = true;

      if (this.raytracer.lastCollision.type === Globals.type.TYPE_NONE) {
        // remove description
        artworks.deactivate();

        const yaw = this.rotation.y;

        this.autoMove.position.x = this.position.x + Math.sin(yaw) * 10;
        this.autoMove.position.z = this.position.z + Math.cos(yaw) * 10;
        this.autoMove.rotation.x = 0;
        this.autoMove.rotation.y = yaw;
      } else {
        const artwork = this.raytracer.lastCollision.artwork;

        // add new description
        artworks.deactivate();
        artworks.activate(artwork);

        // move to artwork
        this.autoMove.position.x = artwork.eye.x;
        this.autoMove.position.z = artwork.eye.z;
        this.autoMove.rotation.x = artwork.pitch;
        this.autoMove.rotation.y = artwork.yaw;
        this.target.rotation.x = this.autoMove.rotation.x;
        this.target.rotation.y = this.autoMove.rotation.y;
      }
    }

    // update rotation vector
    if (this.keys.left || this.keys.right) {
      // disable automove
      this.autoMove.active = false;

      const dir = ((this.keys.left) ? 1 : 0) + ((this.keys.right) ? -1 : 0);
      this.target.rotation.y += this.attributes.rotation * delta * dir;

      // reset pitch
      this.target.rotation.x = 0;

      // remove description
      artworks.deactivate();
    }

    // up/ down keys
    if (this.keys.up || this.keys.down) {
      // disable automove
      this.autoMove.active = false;

      // get next move vector
      const dir = ((this.keys.up) ? 1 : 0) + ((this.keys.down) ? -1 : 0);
      const yaw = this.rotation.y + this.offset.rotation.y;
      const dx = Math.sin(yaw) * this.attributes.speed * dir;
      const dz = Math.cos(yaw) * this.attributes.speed * dir;
      this.target.movement.x = dx;
      this.target.movement.z = dz;

      // reset pitch
      this.target.rotation.x = 0;

      // remove description
      artworks.deactivate();
    } else {
      this.target.movement.x = 0;
      this.target.movement.z = 0;
    }

    // move and look automatically
    if (this.autoMove.active) {
      //this.target.rotation.x = this.autoMove.rotation.x;
      //this.target.rotation.y = this.autoMove.rotation.y;
      const dist = Maths.distanceBetween2D(this.target.position, this.autoMove.position);

      if (dist < this.autoMove.threshold) {
        //this.autoMove.active = false;
        this.target.movement.x = 0;
        this.target.movement.z = 0;
      } else {
        let vec = Maths.scaleVector(Maths.normalise(Maths.subtractVector(this.autoMove.position, this.position)), this.attributes.speed);
        const mag = Maths.getMagnitude2D(vec);

        if (mag > dist) {
          vec = Maths.scaleVector(vec, dist / mag);
        }

        this.target.movement.x = vec.x;
        this.target.movement.z = vec.z;
      }
    }

    // jump key
    if (this.keys.jump) {
      this.keys.jump = false;

      // jump if not falling
      if (this.movement.y == 0) {
        this.movement.y = this.attributes.gravity.jumpVelocity;
      }
    }

    // set falling
    this.falling = (this.movement.y != 0);

    // adjust movement if falling
    if (this.autoMove.active) {
      this.movement.x += (this.target.movement.x - this.movement.x) * this.attributes.adjust.medium;
      this.movement.z += (this.target.movement.z - this.movement.z) * this.attributes.adjust.medium;
    } else if (this.falling) {
      this.movement.x += (this.target.movement.x - this.movement.x) * this.attributes.adjust.slow;
      this.movement.z += (this.target.movement.z - this.movement.z) * this.attributes.adjust.slow;
    } else {
      this.movement.x = this.target.movement.x;
      this.movement.z = this.target.movement.z;
    }
  },

  setPosition: function() {
    // move and rotate player

    // smooth motion
    this.position.x += (this.target.position.x - this.position.x) * this.attributes.adjust.veryFast;
    this.position.y += (this.target.position.y - this.position.y) * this.attributes.adjust.veryFast;
    this.position.z += (this.target.position.z - this.position.z) * this.attributes.adjust.veryFast;

    // rotate
    //const factor = (this.autoMove.active) ? this.attributes.adjust.slow : this.attributes.adjust.veryFast;

    this.rotation.y += Maths.minAngleDifference(this.rotation.y, this.target.rotation.y) * this.attributes.adjust.veryFast;
    this.rotation.x += Maths.minAngleDifference(this.rotation.x, this.target.rotation.x) * this.attributes.adjust.normal;
    this.offset.rotation.y += (this.target.offset.rotation.y - this.offset.rotation.y) * this.attributes.adjust.normal;
    this.offset.rotation.x += (this.target.offset.rotation.x - this.offset.rotation.x) * this.attributes.adjust.fast;

    // limit rotation
    this.rotation.y += (this.rotation.y < 0) ? Maths.twoPi : ((this.rotation.y > Maths.twoPi) ? -Maths.twoPi : 0);

    // set new camera position
    const yaw = this.rotation.y + this.offset.rotation.y;
    const pitch = this.rotation.x + this.offset.rotation.x;
    const height = this.position.y + this.attributes.height;
    const halfHeight = this.position.y + (this.attributes.height * 0.5);

    // move camera and world object
    this.object.position.set(this.position.x, halfHeight, this.position.z);
    this.camera.position.set(this.position.x, height, this.position.z);
    this.camera.lookAt(new THREE.Vector3(
      this.position.x + Math.sin(yaw),
      height + Math.sin(pitch),
      this.position.z + Math.cos(yaw)
    ));
  },

  handleKeyDown: function(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        this.keys.up = true;
        break;
      case 37:
      case 65:
        this.keys.left = true;
        break;
      case 40:
      case 83:
        this.keys.down = true;
        break;
      case 39:
      case 68:
        this.keys.right = true;
        break;
      case 32:
        this.keys.jump = true;
        break;
      default:
        break;
    }
  },

  handleKeyUp: function(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        this.keys.up = false;
        break;
      case 37:
      case 65:
        this.keys.left = false;
        break;
      case 40:
      case 83:
        this.keys.down = false;
        break;
      case 39:
      case 68:
        this.keys.right = false;
        break;
    }
  },

  handleMouseClick: function(e) {
    var t = ((new Date()).getTime() - this.mouse.time) / 1000.;
    var mag = Math.sqrt(
      Math.pow(this.mouse.x - this.mouse.start.x, 2) +
      Math.pow(this.mouse.y - this.mouse.start.y, 2)
    );

    if (t < this.mouse.clickTimeThreshold && mag < this.mouse.clickMagnitudeThreshold) {
      this.keys.click = true;
    }
  },

  handleMouseDown: function(e) {
    this.mouse.active = true;
    this.mouse.rotation.x = this.offset.rotation.x;
    this.mouse.rotation.y = this.rotation.y;
    this.mouse.time = (new Date()).getTime()
    this.mouse.start.x = (e.clientX / this.domElement.width) * 2 - 1;
    this.mouse.start.y = (e.clientY / this.domElement.height) * 2 - 1;
  },

  handleMouseMove: function(e) {
    this.mouse.x = (e.clientX / this.domElement.width) * 2 - 1;
    this.mouse.y = (e.clientY / this.domElement.height) * 2 - 1;

    if (this.mouse.active) {
      this.mouse.delta.x = this.mouse.x - this.mouse.start.x;
      this.mouse.delta.y = this.mouse.y - this.mouse.start.y;

      // target rotation yaw
      this.target.rotation.y = this.mouse.rotation.y + this.mouse.delta.x * 1;

      // pitch is dependent, so set it to offset.rotation
      let pitch = this.mouse.rotation.x + this.mouse.delta.y * 0.75;

      // if limit reached, reset start point
      if (pitch > this.attributes.maxRotationOffset) {
        pitch = this.attributes.maxRotationOffset;
        this.mouse.start.y = this.mouse.y;
        this.mouse.rotation.x = pitch;
      } else if (pitch < -this.attributes.maxRotationOffsetLower) {
        pitch = -this.attributes.maxRotationOffsetLower;
        this.mouse.start.y = this.mouse.y;
        this.mouse.rotation.x = pitch;
      }

      this.target.offset.rotation.x = pitch;
    }
  },

  handleMouseOut: function(e) {
    this.mouse.active = false;
  },

  handleMouseUp: function(e) {
    this.mouse.active = false;
  }
};

export default Player;
