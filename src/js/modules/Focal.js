import { getPitch, getYaw } from './Maths';
import { Materials } from './Materials';
import Globals from './Globals';

const TYPE_FOCAL = 'TYPE_FOCAL';

const FocalSystem = function() {
  this.focalPoints = [];
};

FocalSystem.prototype = {
  add: function(item) {
    if (item.type === TYPE_FOCAL) {
      this.focalPoints.push(item);
    }
  }
};

const Focal = function(pos, dim, eye) {
  this.type = TYPE_FOCAL;
  this.position = pos;
  this.dimensions = dim;
  this.eye = eye;
  this.box = new THREE.Box3();
  this.pitch = getPitch(eye, new THREE.Vector3(pos.x, pos.y - Globals.player.height, pos.z));
  this.yaw = getYaw(eye, pos);
  this.object = new THREE.Mesh(
    new THREE.BoxBufferGeometry(dim.x, dim.y, dim.z),
    Materials.dev2
  );
  this.object.position.set(pos.x, pos.y, pos.z);
};

Focal.prototype = {
  collision: function(pos) {
//    return this.bbox.collision(pos);
  },

  scale: function(x, y, z) {
    this.dimensions.x *= x;
    this.dimensions.y *= y;
    this.dimensions.z *= z;
    //this.bbox = new BoundingBox(this.position, this.dimensions);
    this.object.scale.x = x;
    this.object.scale.y = y;
    this.object.scale.z = z;
  },
};

export { Focal, FocalSystem, TYPE_FOCAL };
