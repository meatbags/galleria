/** Create 3D torus arc */

import MinAngleBetween from './min_angle_between';

function CustomCurve(radius, start, stop) {
  THREE.Curve.call(this);
  this.radius = radius;
  this.start = start;
  this.stop = stop;
}
CustomCurve.prototype = Object.create(THREE.Curve.prototype);
CustomCurve.prototype.constructor = CustomCurve;
CustomCurve.prototype.getPoint = function(t) {
  const theta = this.start + (this.stop - this.start) * t;
  var tz = Math.cos(theta) * this.radius;
	var ty = Math.sin(theta) * this.radius;
	var tx = 0;
	return new THREE.Vector3(tx, ty, tz);
};

const SEGMENT_STEP = Math.PI / 32;
const CreateArc = (radius, thickness, start, stop, segments) => {
  start += start < 0 ? Math.PI * 2 : 0;
  stop += stop < 0 ? Math.PI * 2 : 0;
  segments = segments !== undefined ? segments : Math.round(Math.max(8, Math.abs(MinAngleBetween(start, stop)) / SEGMENT_STEP));
  const path = new CustomCurve(radius, start, stop);
  const geo = new THREE.TubeGeometry(path, segments, thickness, 8, false);
  const mat = new THREE.MeshBasicMaterial({});
  const mesh = new THREE.Mesh(geo, mat);
  return mesh;
};

export default CreateArc;
