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

const Ramp = function(pos, dim, type) {
	this.type = TYPE_RAMP;
	this.ramp = new BoundingRamp(pos, dim);
	this.object = new THREE.Mesh(
		new THREE.BoxBufferGeometry(dim.x, dim.y, dim.z),
		Materials.dev
	);
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
