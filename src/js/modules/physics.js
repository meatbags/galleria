import { BoundingRamp, BoundingBox } from './BoundingBox';
import { Materials } from './Loader';

const TYPE_BOX = 'TYPE_BOX';
const TYPE_RAMP = 'TYPE_RAMP';

const Box = function(pos, dim) {
	this.type = TYPE_BOX;
	this.box = new BoundingBox(pos, dim);
	this.object = new THREE.Mesh(
		new THREE.BoxBufferGeometry(dim.x, dim.y, dim.z),
		Materials.dev
	);
	const cloned = this.object.clone();
	cloned.material = Materials.wireframe;
	this.object.add(cloned);
	this.object.position.set(pos.x, pos.y, pos.z);
}

Box.prototype = {
	collision: function(pos) {
		return this.box.collision(pos);
	},

	collision2D: function(pos) {
		return this.box.collision2D(pos);
	},

	getTop: function(pos) {
		return this.box.getTop(pos);
	}
};

const Ramp = function(pos, dim, dir) {
	this.type = TYPE_RAMP;
	this.dir = dir;
	this.ramp = new BoundingRamp(pos, dim, dir);
	this.object = new THREE.Mesh(
		new THREE.BoxBufferGeometry(dim.x, dim.y, dim.z),
		Materials.dev
	);
	const plane = new THREE.Mesh(
		new THREE.BoxBufferGeometry(1, 0.05, 1),
		Materials.wireframe
	);

	if (dir == 0) {
		plane.scale.x = dim.x;
		plane.scale.z = Math.sqrt(dim.z * dim.z + dim.y * dim.y);
		plane.rotation.x = -Math.atan2(dim.y, dim.z);
	} else if (dir == 1) {
		plane.scale.z = dim.z;
		plane.scale.x = Math.sqrt(dim.x * dim.x + dim.y * dim.y);
		plane.rotation.z = Math.atan2(dim.y, dim.x);
	} else if (dir == 2) {
		plane.scale.x = dim.x;
		plane.scale.z = Math.sqrt(dim.z * dim.z + dim.y * dim.y);
		plane.rotation.x = Math.atan2(dim.y, dim.z);
	} else {
		plane.scale.z = dim.z;
		plane.scale.x = Math.sqrt(dim.x * dim.x + dim.y * dim.y);
		plane.rotation.z = -Math.atan2(dim.y, dim.x);
	}

	this.object.add(plane);
	this.object.position.set(pos.x, pos.y, pos.z);
}

Ramp.prototype = {
	collision: function(pos) {
		return this.ramp.collision(pos);
	},

	collision2D: function(pos) {
		return this.ramp.collision2D(pos);
	},

	getTop: function(pos) {
		return this.ramp.getTop(pos);
	}
}

const PhysicsModel = function() {
	this.contents = [];
	this.object = new THREE.Object3D();
};

PhysicsModel.prototype = {
	add: function() {
		for (let i=0; i<arguments.length; i+=1) {
			this.contents.push(arguments[i]);
			this.object.add(arguments[i].object);
		}
	},
};

export { PhysicsModel, Ramp, Box, TYPE_BOX, TYPE_RAMP };
