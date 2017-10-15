import { getPitch, getYaw } from './Maths';
import { scaleVector, copyVector, subtractVector, addVector } from './VectorMaths';
import { Materials } from './Materials';
import Globals from './Globals';

const TYPE_FOCAL = 'TYPE_FOCAL';

const Focal = function(pos, dim, eye) {
  this.type = TYPE_FOCAL;
  this.position = pos;
  this.dimensions = dim;
  this.eye = eye;
  this.init();
};

Focal.prototype = {
  init: function() {
    this.pitch = getPitch(this.eye, new THREE.Vector3(this.position.x, this.position.y - Globals.player.height, this.position.z));
    this.yaw = getYaw(this.eye, this.position);
    this.object = new THREE.Mesh(
      new THREE.BoxBufferGeometry(this.dimensions.x, this.dimensions.y, this.dimensions.z),
      Materials.dev2
    );
    this.object.position.set(this.position.x, this.position.y, this.position.z);
    this.box = new THREE.Box3();
    this.setBox();
  },

  setBox: function() {
    // set collision box size
    const min = subtractVector(this.position, scaleVector(this.dimensions, 0.5));
    const max = addVector(this.position, scaleVector(this.dimensions, 0.5));
    this.box.set(min, max);
  },

  collision: function(point) {
    return this.box.containsPoint(point);
  },

  scale: function(x, y, z) {
    this.dimensions.x *= x;
    this.dimensions.y *= y;
    this.dimensions.z *= z;
    this.object.scale.x = x;
    this.object.scale.y = y;
    this.object.scale.z = z;
    this.setBox();
  },
};

export { Focal, TYPE_FOCAL };
