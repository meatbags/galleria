import Globals from './Globals';
import { addVector, normalise, scaleVector } from './VectorMaths';

const RayTracer = function() {
  this.precision = Globals.raytracer.precision;
  this.init();
};

RayTracer.prototype = {
  init: function() {
    this.object = new THREE.Object3D();
    this.object.add(new THREE.Mesh(
      new THREE.SphereBufferGeometry(.5),
      new THREE.MeshPhongMaterial({emissive: 0xffffff})
    ));
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

    vector = scaleVector(normalise(vector), this.precision);

    while (collision === false && travelled < length) {
      point = addVector(point, vector);
      collision = collider.collision(point);
      travelled += this.precision;
    }

    this.object.position.set(point.x, point.y, point.z);

    return {
      position: point,
      collision: collision
    };
  }
};

export default RayTracer;
