import * as Maths from './VectorMaths';
import Globals from './Globals';

const Player = function(domElement) {
  this.domElement = domElement;
  this.object = new THREE.Object3D();
  this.position = new THREE.Vector3(Globals.player.position.x, Globals.player.position.y, Globals.player.position.z);
  this.movement = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(0, 0, 0);
  this.offset = {
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.target = {
    position: new THREE.Vector3(this.position.x, this.position.y, this.position.z),
    movement: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(0, 0, 0),
    offset: {
      rotation: new THREE.Vector3(0, 0, 0)
    }
  }
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
    maxRotationOffset: Math.PI * 0.3,
    falling: false,
    adjust: {
      slow: 0.02,
      normal: 0.05,
      fast: 0.09,
      veryFast: 0.2,
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
  this.outputLog = [];
  this.camera = new THREE.PerspectiveCamera(this.attributes.camera.fov, 1, this.attributes.camera.near, this.attributes.camera.far);
  this.camera.up = new THREE.Vector3(0, 1, 0);
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
    const light = new THREE.PointLight(0xffffff, 0.8, 10, 2);
		light.position.set(0, 2, 0);
		this.object.add(light);
	},

  resizeCamera: function() {
    const w = this.domElement.width;
    const h = this.domElement.height;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  },

	bindControls: function() {
		const self = this;

    // mouse
    self.domElement.addEventListener('mousemove', function(e){
      self.handleMouseMove(e);
    }, false);
    self.domElement.addEventListener('mousedown', function(e){
      self.handleMouseDown(e);
    }, false);

    // keyboard
		self.keys = {
			up: false,
			down: false,
			left: false,
			right: false,
      jump: false
		};
		document.addEventListener("keydown", function(e) {
      self.handleKeyDown(e);
    }, false);
		document.addEventListener("keyup", function(e) {
      self.handleKeyUp(e);
		}, false);
	},

  log: function() {
    let text = '';
    for (let i=0; i<arguments.length; i+=1) {
      text += arguments[i] + ' ';
    }
    this.outputLog.push(text);
  },

	update: function(delta, collider) {
    // handle key presses and move player

    this.outputLog = [];

    // get movement vector from controls
    if (this.keys.up || this.keys.down) {
      const dir = ((this.keys.up) ? 1 : 0) + ((this.keys.down) ? -1 : 0);
      const yaw = this.rotation.y + this.offset.rotation.y;
      const dx = Math.sin(yaw) * this.attributes.speed * dir;
      const dz = Math.cos(yaw) * this.attributes.speed * dir;
      this.target.movement.x = dx;
      this.target.movement.z = dz;
    } else {
      this.target.movement.x = 0;
      this.target.movement.z = 0;
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

    // reduce movement if falling
    if (!this.falling) {
      this.movement.x = this.target.movement.x;
      this.movement.z = this.target.movement.z;
    } else {
      this.movement.x += (this.target.movement.x - this.movement.x) * this.attributes.adjust.slow;
      this.movement.z += (this.target.movement.z - this.movement.z) * this.attributes.adjust.slow;
    }

    // check next position for collision
    let next = Maths.addVector(Maths.scaleVector(this.movement, delta), this.target.position);
    let collisions = collider.collisions(next);

    // apply gravity
    this.movement.y = Math.max(this.movement.y - this.attributes.gravity.accel * delta, -this.attributes.gravity.maxVelocity);

    if (collisions.length > 0) {
      this.log('Collisions', collisions.length);

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
            this.log('CLIMBED')
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

    // set new position target
    this.target.position.x = next.x;
    this.target.position.y = next.y;
    this.target.position.z = next.z;

    // smooth motion a little
    this.position.x += (this.target.position.x - this.position.x) * this.attributes.adjust.veryFast;
    this.position.y += (this.target.position.y - this.position.y) * this.attributes.adjust.veryFast;
    this.position.z += (this.target.position.z - this.position.z) * this.attributes.adjust.veryFast;

    // update rotation vector
    if (this.keys.left || this.keys.right) {
      const dir = ((this.keys.left) ? 1 : 0) + ((this.keys.right) ? -1 : 0);
      this.target.rotation.y += this.attributes.rotation * delta * dir;
    }

    this.rotation.y += Maths.minAngleDifference(this.rotation.y, this.target.rotation.y) * this.attributes.adjust.fast;
    this.offset.rotation.x += (this.target.offset.rotation.x - this.offset.rotation.x) * this.attributes.adjust.normal;
    this.offset.rotation.y += (this.target.offset.rotation.y - this.offset.rotation.y) * this.attributes.adjust.normal;
    this.rotation.y += (this.rotation.y < 0) ? Maths.twoPi : ((this.rotation.y > Maths.twoPi) ? -Maths.twoPi : 0);

    // set new camera position
    const yaw = this.rotation.y + this.offset.rotation.y;
    const pitch = this.rotation.x + this.offset.rotation.x;
    const height = this.position.y + this.attributes.height;

    this.object.position.set(this.position.x, height, this.position.z);
    this.camera.position.set(this.position.x, height, this.position.z);
    this.camera.lookAt(new THREE.Vector3(
      this.position.x + Math.sin(yaw),
      height + Math.sin(pitch),
      this.position.z + Math.cos(yaw)
    ));
	},

  handleKeyDown(e) {
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

  handleKeyUp(e) {
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

  handleMouseDown(e) {
    const bound = this.domElement.getBoundingClientRect();
    const w = this.domElement.width;
    const x = (e.clientX - bound.left) / w;
    const t = this.attributes.cameraThreshold;

    // adjust camera
    if (x < t) {
      this.target.rotation.y = this.rotation.y + ((t - x) / t) * this.attributes.maxRotationOffset;
    } else if (x > 1 - t) {
      this.target.rotation.y = this.rotation.y + ((x - (1 - t)) / t) * -this.attributes.maxRotationOffset;
    } else {
      this.target.rotation.y = this.rotation.y;
    }
  },

  handleMouseMove(e) {
    const bound = this.domElement.getBoundingClientRect();
    const w = this.domElement.width;
    const h = this.domElement.height;
    const x = (e.clientX - bound.left) / w;
    const y = (e.clientY - bound.top) / h;
    const t = this.attributes.cameraThreshold;

    // adjust camera
    if (x < t) {
      this.target.offset.rotation.y = ((t - x) / t) * this.attributes.maxRotationOffset;
    } else if (x > 1 - t) {
      this.target.offset.rotation.y = ((x - (1 - t)) / t) * -this.attributes.maxRotationOffset;
    } else {
      this.target.offset.rotation.y = 0;
    }

    if (y < t) {
      this.target.offset.rotation.x = ((t - y) / t) * this.attributes.maxRotationOffset;
    } else if (y > (1 - t)) {
      this.target.offset.rotation.x = ((y - (1 - t)) / t) * -this.attributes.maxRotationOffset;
    } else {
      this.target.offset.rotation.x = 0;
    }
  }
};

export default Player;
