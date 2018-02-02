import { Globals } from '../config';
import { copyVector, addVector, normalise, scaleVector } from '../maths';

const RayTracer = function() {
  this.position = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(0, 0, 0);
  this.smoothing = 0.25;
  this.target = {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.lastCollision = null;
  this.precision = Globals.raytracer.precision;
  this.init();
};

RayTracer.prototype = {
  init: function() {
    this.object = new THREE.Object3D();
    this.object.add(new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.25),
      new THREE.MeshPhongMaterial({})
    ))
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

  trace: function(point, vector, length, artworks) {
    // check ray against artworks and geometry

    let travelled = 0;
    let collision = false;
    let artwork = false;
    let last = new THREE.Vector3();

    vector = scaleVector(normalise(vector), this.precision);

    while (collision === false && artwork === false && travelled < length) {
      travelled += this.precision;
      last = copyVector(point);
      point = addVector(point, vector);

      for (let i=0; i<artworks.focalPoints.length; i+=1) {
        if (artworks.focalPoints[i].collision(point)) {
          artwork = artworks.focalPoints[i];
        }
      }

      /*
      if (!artwork) {
        collision = collider.collision(point);

        if (collision) {
          const intersect = collider.intersect(last, point);

          if (intersect != null) {
            point = intersect.intersect;
            this.target.rotation = intersect.plane.normal;
          }
        }
      }
      */
    }

    // smooth motion
    this.target.position.x = point.x;
    this.target.position.y = point.y;
    this.target.position.z = point.z;
    this.position.x += (this.target.position.x - this.position.x) * this.smoothing;
    this.position.y += (this.target.position.y - this.position.y) * this.smoothing;
    this.position.z += (this.target.position.z - this.position.z) * this.smoothing;
    this.object.position.set(this.position.x, this.position.y, this.position.z);

    if (artwork) {
      this.lastCollision = {
        type: Globals.type.TYPE_ARTWORK,
        position: point,
        artwork: artwork,
        vector: vector
      };
    } else {
      this.lastCollision = {
        type: Globals.type.TYPE_NONE,
        position: point,
        collision: collision,
        vector: vector
      };
    }
  }
};

export default RayTracer;
