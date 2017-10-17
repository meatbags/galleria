import { getPitch, getYaw } from './Maths';
import { scaleVector, copyVector, subtractVector, addVector } from './VectorMaths';
import { Materials } from './Materials';
import Globals from './Globals';

const TYPE_FOCAL = 'TYPE_FOCAL';

const Focal = function(id, pos, dim, eye, source) {
  this.id = id;
  this.type = TYPE_FOCAL;
  this.position = pos;
  this.dimensions = dim;
  this.eye = eye;
  this.source = source;
  this.active = false;
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

  activate: function() {
    this.active = true;
  },

  deactivate: function() {
    this.active = false;
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
    const s = Globals.artwork.clickBoxScale;
    this.dimensions.x *= x * s;
    this.dimensions.y *= y * s;
    this.dimensions.z *= z * s;
    this.object.scale.x = x * s;
    this.object.scale.y = y * s;
    this.object.scale.z = z * s;
    this.setBox();
  },
};

export { Focal, TYPE_FOCAL };
