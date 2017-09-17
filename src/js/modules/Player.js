import { TYPE_BOX, TYPE_RAMP } from './Physics';

const Player = function(position) {
	this.position = position;
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

	update: function(delta, objects) {
		const rotate = ((this.keys.left) ? 1 : 0) + ((this.keys.right) ? -1 : 0);
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

		// update Y position
		this.position.y += (nextY - this.position.y) * 0.25;

		// update rotation
		this.yaw += this.rotationSpeed * delta * rotate;
	},
};

export default Player;

/*
function Player(position) {
	this.position = position;
	this.target = new THREE.Vector3(position.x, position.y, position.z);
	this.rotation = 0;
	this.walkTime = 0;
	this.height = 1.8; // eye height
	this.halfHeight = this.height / 2;
	this.headHeight = 0;
	this.speed = 12; // m/s
	this.speeds = {dev: 12, game: 3};
	this.rateOfChange = 0.3;
}

Player.prototype = {
	update: function(delta, controls, terrain) {
		var forward, strafe, next, mag;

		// dev stuff

		if (controls.Q) {
			if (this.position.y < 8) {
				this.position = this.target = Vec3(0, 24, 0);
			} else
				this.position.y -= 8;
			controls.Q = false;
		}

		if (controls.E) {
			if (this.speed == this.speeds.dev)
				this.speed = this.speeds.game;
			else
				this.speed = this.speeds.dev;
			controls.E = false;
		}

		// find next position

		next = {x:0, y:0, z:0};
		forward = ((controls.up) ? 1 : 0) + ((controls.down) ? -1 : 0);
		strafe  = ((controls.left) ? 1 : 0) + ((controls.right) ? -1 : 0);
		next.x = strafe * -Math.sin(this.rotation + Math.PI/2) + forward * -Math.sin(this.rotation);
		next.z = forward * -Math.cos(this.rotation) + strafe * -Math.cos(this.rotation + Math.PI/2);
		mag = Math.sqrt(Math.pow(next.x, 2) + Math.pow(next.z, 2));

		if (mag != 0) {
			next.z /= mag;
			next.x /= mag;
		}

		next.x = next.x * this.speed * delta + this.target.x;
		next.y = this.position.y;
		next.z = next.z * this.speed * delta + this.target.z;

		// check for wall collisions

		var collision, nextX, nextZ;

		collision = {x: false, y: false, z: false};
		nextX = {x:next.x, y:next.y, z:this.target.z};
		nextZ = {x:this.target.x, y:next.y, z:next.z};


		for (var i=0; i<terrain.walls.length; i+=1) {
			var wall = terrain.walls[i];

			if (wall.collision3D(nextX)) {
				if (wall.getTop() > next.y + this.halfHeight) {
					collision.x = true;
				}
			} if (wall.collision3D(nextZ)) {
				if (wall.getTop() > next.y + this.halfHeight) {
					collision.z = true;
				}
			}
		}

		next.x = (collision.x) ? this.target.x : next.x;
		next.z = (collision.z) ? this.target.z : next.z;

		// climb onto platforms, ramps, walls

		var top, objects;

		nextX = {x:next.x, y:next.y, z:this.target.z};
		nextZ = {x:this.target.x, y:next.y, z:next.z};
		objects = terrain.platforms.concat(terrain.ramps, terrain.walls);
		top = {x: -1, z: -1};

		for (var i=0; i<objects.length; i+=1) {
			var obj = objects[i];

			// x direction

			if (obj.collision2D(nextX)) {
				var y = obj.getTop(nextX);

				if (y > top.x && Math.abs(y - next.y) < this.halfHeight) {
					top.x = y;
				}
			}

			// z direction

			if (obj.collision2D(nextZ)) {
				var y = obj.getTop(nextZ);

				if (y > top.z && Math.abs(y - next.y) < this.halfHeight) {
					top.z = y;
				}
			}
		}

		next.x = (top.x == -1) ? this.target.x : next.x;
		next.z = (top.z == -1) ? this.target.z : next.z;

		if (top.x != -1 || top.z != -1) {
			next.y = Math.max(top.x, top.z);
		}

		// alter player position

		this.target = next;
		this.position.z += (this.target.z - this.position.z) * this.rateOfChange;
		this.position.x += (this.target.x - this.position.x) * this.rateOfChange;
		this.position.y += (this.target.y - this.position.y) * this.rateOfChange;

		// alter head height

		//this.walkTime += (forward || strafe) ? delta : 0;
		//this.headHeight = Math.sin(this.walkTime * 6) * 0.05;
	},

	getHeight: function() {
		return this.height;
	}
};
*/
