// generic collision box

function Box(pos, dim, buffer) {
	buffer = buffer || 0;
	this.x = {min: pos.x - dim.x/2 - buffer, max: pos.x + dim.x/2 + buffer};
	this.y = {min: pos.y - dim.y/2, max: pos.y + dim.y/2};
	this.z = {min: pos.z - dim.z/2 - buffer, max: pos.z + dim.z/2 + buffer};
}

Box.prototype = {
	collision3D: function(p) {
		return (
			p.x >= this.x.min && p.x <= this.x.max &&
			p.y >= this.y.min && p.y <= this.y.max && 
			p.z >= this.z.min && p.z <= this.z.max
		);
	},
	
	collision2D: function(p) {
		return (
			p.x >= this.x.min && p.x <= this.x.max &&
			p.z >= this.z.min && p.z <= this.z.max
		);
	},
	
	collisionData: function(p) {
		// dimension specific collisions
		
		var c = {
			x: (p.x >= this.x.min && p.x <= this.x.max),
			y: (p.y >= this.y.min && p.y <= this.y.max),
			z: (p.z >= this.z.min && p.z <= this.z.max)
		};
		
		return c;
	}
}

// solid wall -- stop player

function Wall (pos, dim, buffer) {
	this.box = new Box(pos, dim, buffer || 0);
}

Wall.prototype = {
	collision3D: function(p) {
		return this.box.collision3D(p);
	},
	
	collision2D: function(p) {
		return this.box.collision2D(p);
	},
	
	getTop: function(p) {
		return this.box.y.max;	
	}
}

// ramp -- elevate player

function Ramp (pos, dim, dir) {
	this.box = new Box(pos, dim);
	this.dir = dir; // quadrant [0 -> 3]
	this.dim = dim;
}

Ramp.prototype = {
	collision2D: function(p) {
		if (this.box.collision2D(p)) {
			return true;
		}
		return false;
	},
	
	getTop: function(p) {
		var f, y;
		
		switch (this.dir) {
			case 0:
				f = (this.box.z.max - p.z) / this.dim.z;
				break;
			case 1:
				f = (this.box.x.max - p.x) / this.dim.x;
				break;
			case 2:
				f = 1 - (this.box.z.max - p.z) / this.dim.z;
				break;
			case 3:
				f = 1 - (this.box.x.max - p.x) / this.dim.x;
				break;
			default:
				f = (this.box.z.max - p.z) / this.dim.z;
				break;
		}
					 
		y = f * this.dim.y + this.box.y.min;
		return y;
	}
}

// platform -- ground player

function Platform (pos, dim) {
	this.box = new Box(pos, dim);
}

Platform.prototype = {
	collision2D: function(p) {
		if (this.box.collision2D(p)) {
			return true;
		}
		return false;
	},
	
	getTop: function(p) {
		return this.box.y.max;
	}
}

// composite objects

function StairWell (pos) {
	var x, y, z, stairs;
	
	x = pos.x;
	y = pos.y;
	z = pos.z;
	stairs = {platforms: [], walls: [], ramps: []};
	
	stairs.walls.push(
		new Wall({x: x - 4.5, y: y + 15, z: z + 2.5}, {x:  4, y: 30, z: 20}, 0.25), // L & R wall
		new Wall({x: x + 4.5, y: y + 15, z: z + 2.5}, {x:  4, y: 30, z: 20}, 0.25),
		new Wall({x:       x, y: y + 15, z:       z}, {x:  1, y: 30, z:  5}, 0.25), // central
		new Wall({x:       x, y: y + 15, z: z - 8.0}, {x: 13, y: 30, z:  1}, 0.25), // back
		new Wall({x: x - 1.5, y: y +  2, z: z - 2.5}, {x:  2, y:  4, z:  1}, 0.25), // top & bottom inner wall
		new Wall({x: x - 1.5, y: y + 24, z: z + 2.0}, {x:  2, y:  4, z:  1}, 0.25)
	);
	
	stairs.platforms.push(
		new Platform({x: x, y:      y, z: z + 7.5}, {x:5, y:0, z:10}),
		new Platform({x: x, y: y +  4, z: z - 5.0}, {x:5, y:0, z: 5}),
		new Platform({x: x, y: y +  8, z: z + 7.5}, {x:5, y:0, z:10}),
		new Platform({x: x, y: y + 12, z: z - 5.0}, {x:5, y:0, z: 5}),
		new Platform({x: x, y: y + 16, z: z + 7.5}, {x:5, y:0, z:10}),
		new Platform({x: x, y: y + 20, z: z - 5.0}, {x:5, y:0, z: 5}),
		new Platform({x: x, y: y + 24, z: z + 7.5}, {x:5, y:0, z:10})
	);
	
	stairs.ramps.push(
		new Ramp({x: x - 1.5, y: y +  2, z: z}, {x:2, y:4, z:5}, 0),
		new Ramp({x: x + 1.5, y: y +  6, z: z}, {x:2, y:4, z:5}, 2),
		new Ramp({x: x - 1.5, y: y + 10, z: z}, {x:2, y:4, z:5}, 0),
		new Ramp({x: x + 1.5, y: y + 14, z: z}, {x:2, y:4, z:5}, 2),
		new Ramp({x: x - 1.5, y: y + 18, z: z}, {x:2, y:4, z:5}, 0),
		new Ramp({x: x + 1.5, y: y + 22, z: z}, {x:2, y:4, z:5}, 2)
	);
	
	return stairs;
}