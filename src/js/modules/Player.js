import { TYPE_BOX, TYPE_RAMP } from './Physics';
import { getDistanceVec2 } from './Maths';

const Player = function(position) {
	this.object = new THREE.Object3D();
	this.position = position;
	this.target = {
		active: false,
		position: position,
		yaw: 0,
		radius: 0.5,
	};
	this.pitch = 0;
	this.yaw = 0;
	this.speed = 5.5;
	this.height = 1.8;
	this.climbThreshold = 1;
	this.rotationSpeed = Math.PI * 0.75;
	this.init();
};

Player.prototype = {
	init: function() {
		this.bindControls();
		const light = new THREE.PointLight(0xffffff, 0.25, 20, 2);
		light.position.set(0, 2, 0);
		this.object.add(light);
	},

	bindControls: function() {
		const self = this;

		self.keys = {
			up: false,
			down: false,
			left: false,
			right: false
		};

		document.addEventListener("keydown", function(e) {
			switch (e.keyCode) {
				case 38:
				case 87:
					self.keys.up = true;
					break;
				case 37:
				case 65:
					self.keys.left = true;
					break;
				case 40:
				case 83:
					self.keys.down = true;
					break;
				case 39:
				case 68:
					self.keys.right = true;
					break;
				default:
					break;
			}
		}, false);

		document.addEventListener("keyup", function(e) {
			switch (e.keyCode) {
				case 38:
				case 87:
					self.keys.up = false;
					break;
				case 37:
				case 65:
					self.keys.left = false;
					break;
				case 40:
				case 83:
					self.keys.down = false;
					break;
				case 39:
				case 68:
					self.keys.right = false;
					break;
			}
		}, false);
	},

	setTarget: function(pos, yaw) {
		this.target.active = true;
		this.target.position = pos;
		this.target.yaw = yaw;
	},

	update: function(delta, objects) {
		if (this.keys.up || this.keys.down) {
			// disable automatic walk
			this.target.active = false;

			const move = ((this.keys.up) ? -1: 0) + ((this.keys.down) ? 1 : 0);
			const dx = Math.sin(this.yaw) * this.speed * delta * move;
			const dz = Math.cos(this.yaw) * this.speed * delta * move;
			const nextX = this.position.x + dx;
			const nextZ = this.position.z + dz;
			const testX = {x: nextX, y: this.position.y, z: this.position.z};
			const testZ = {x: this.position.x, y: this.position.y, z: nextZ};
			let collisionX = false;
			let collisionZ = false;

			// XZ collisions
			for (let i=0; i<objects.length; i+=1) {
				const obj = objects[i];

				if (obj.type === TYPE_BOX || obj.type === TYPE_RAMP) {
					// test next X position
					if (obj.collision(testX)) {
						const y = obj.getTop(testX);

						if (Math.abs(this.position.y - y) > this.climbThreshold) {
							collisionX = true;
						}
					}

					// test next Z position
					if (obj.collision(testZ)) {
						const y = obj.getTop(testZ);

						if (Math.abs(this.position.y - y) > this.climbThreshold) {
							collisionZ = true;
						}
					}
				}
			}

			// update XZ position
			this.position.x = (collisionX) ? this.position.x : nextX;
			this.position.z = (collisionZ) ? this.position.z : nextZ;
		}

		// get next Y position
		let nextY = 0;

		for (let i=0; i<objects.length; i+=1) {
			const obj = objects[i];

			if (obj.collision2D(this.position)) {
				const y = obj.getTop(this.position);

				if (Math.abs(this.position.y - y) <= this.climbThreshold)
					nextY = y;
			}
		}

		this.position.y += (nextY - this.position.y) * 0.5;

		// get next rotation
		if (this.keys.left || this.keys.right) {
			// disable automatic walk
			this.target.active = false;

			const rotate = ((this.keys.left) ? 1 : 0) + ((this.keys.right) ? -1 : 0);
			this.yaw += this.rotationSpeed * delta * rotate;
		}

		// auto walk and look
		if (this.target.active) {
			if (getDistanceVec2(this.position, this.target.position) > this.target.radius) {
				this.position.x += (this.target.position.x - this.position.x) * 0.05;
				this.position.z += (this.target.position.z - this.position.z) * 0.05;
			}
			this.yaw += (this.target.yaw - this.yaw) * 0.05;
		}

		// move THREE reference
		this.object.position.set(this.position.x, this.position.y, this.position.z);
	},
};

export default Player;
