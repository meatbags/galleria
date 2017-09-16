import BoundingBox from './BoundingBox';

function FocalPoint(obj, data) {
	this.obj = obj;
	this.position = {
		x: obj.position.x,
		y: obj.position.y,
		z: obj.position.z
	};
	this.box = new Box(this.position, {x:1, y:1, z:1});
	this.data = data;
	this.radius = 3; //m
}

FocalPoint.prototype = {
	collision: function(camera, pitch, yaw) {

		// if camera inside radius

		if (getMagnitude(camera, this.position) < this.radius) {
			var p, lim, step;

			lim = this.radius;
			step = lim * 0.1;
			p = {
				x: camera.x,
				y: camera.y,
				z: camera.z
			};

			// raytrace from camera

			for (var i=0; i<lim; i+=step) {
				if (this.box.collision3D(p)) {
					return true;
				}
				p.x -= Math.sin(yaw) * step;
				p.y += Math.sin(pitch) * step;
				p.z -= Math.cos(yaw) * step;
			}
		}
		return false;
	}
};
