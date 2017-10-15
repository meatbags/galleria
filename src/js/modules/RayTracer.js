import Globals from './Globals';
import { copyVector, addVector, normalise, scaleVector } from './VectorMaths';

const RayTracer = function() {
  this.position = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(0, 0, 0);
  this.smoothing = 0.25;
  this.target = {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.precision = Globals.raytracer.precision;
  this.init();
};

RayTracer.prototype = {
  init: function() {
    this.object = new THREE.Object3D();
    const cone = new THREE.Mesh(
      new THREE.ConeBufferGeometry(0.3, 1, 4),
      new THREE.MeshPhongMaterial({emissive: 0xffffff})
    );
    cone.rotation.x = Math.PI;
    cone.position.y = 0.5;
    this.object.add(cone);
  },

  getRayVector: function(camera, h, v) {
    // h, v should be in the range [-1, 1]

    const vec = camera.getWorldDirection();
    const fovVertical = (camera.fov * 0.5) * (Math.PI / 180.);
    const fovHorizontal = (camera.fov * camera.aspect * 0.5) * (Math.PI / 180.);
    const yaw = Math.atan2(vec.x, vec.z) - (h * fovHorizontal);
    const pitch = vec.y - (v * fovVertical);

    vec.x = Math.sin(yaw);
    vec.y = Math.sin(pitch);
    vec.z = Math.cos(yaw);

    return vec;
  },

  trace: function(point, vector, length, collider) {
    let travelled = 0;
    let collision = false;
    let last = new THREE.Vector3();

    vector = scaleVector(normalise(vector), this.precision);

    while (collision === false && travelled < length) {
      last = copyVector(point);
      point = addVector(point, vector);
      collision = collider.collision(point);
      travelled += this.precision;

      if (collision) {
        const intersect = collider.intersect(last, point);
        if (intersect != null) {
          point = intersect.intersect;
          this.target.rotation = intersect.plane.normal;
        }
      }
    }

    // smooth
    this.target.position.x = point.x;
    this.target.position.y = point.y;
    this.target.position.z = point.z;
    this.position.x += (this.target.position.x - this.position.x) * this.smoothing;
    this.position.y += (this.target.position.y - this.position.y) * this.smoothing;
    this.position.z += (this.target.position.z - this.position.z) * this.smoothing;

    // rotate
    this.rotation.x += (this.target.rotation.x - this.rotation.x) * this.smoothing;
    this.rotation.y += (this.target.rotation.y - this.rotation.y) * this.smoothing;
    this.rotation.z += (this.target.rotation.z - this.rotation.z) * this.smoothing;

    //this.object.rotation.set(-this.rotation.x, -this.rotation.y, -this.rotation.z);
    this.object.position.set(this.position.x, this.position.y, this.position.z);

    return {
      position: point,
      collision: collision
    };
  }
};

export default RayTracer;
