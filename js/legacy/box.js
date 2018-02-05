import { getPitch, getYaw, scaleVector, copyVector, subtractVector, addVector } from '../maths';
import { Materials, Globals } from '../config';

const TYPE_FOCAL = 'TYPE_FOCAL';

const Box = (position, dimensions) => {
  // create a box
  
  const b = new THREE.Box3();
  const min = subtractVector(position, scaleVector(dimensions, 0.5));
  const max = addVector(position, scaleVector(dimensions, 0.5));

  b.set(min, max);

  return b;
};

export default Box;

/*
Focal.prototype = {
  init: function() {
    this.pitch = getPitch(this.eye, new THREE.Vector3(this.position.x, this.position.y - Globals.player.height, this.position.z));
    this.yaw = getYaw(this.eye, this.position);
    this.direction = (Math.abs(Math.sin(this.yaw)) < 0.5) ? 'z' : 'x';
    this.object = new THREE.Mesh(
      new THREE.BoxBufferGeometry(this.dimensions.x, this.dimensions.y, this.dimensions.z),
      Materials.dev2
    );
    this.object.position.set(this.position.x, this.position.y, this.position.z);
    this.box = new THREE.Box3();
    this.setBox();
  },


  scale: function(x, y, z) {
    const s = Globals.artwork.clickBoxScale;
    const zScale = (this.direction == 'z') ? 0.25 : 1;
    const xScale = (this.direction == 'x') ? 0.25 : 1;

    this.dimensions.x *= x * s * xScale;
    this.dimensions.y *= y * s;
    this.dimensions.z *= z * s * zScale;
    this.object.scale.x = x * s * xScale;
    this.object.scale.y = y * s;
    this.object.scale.z = z * s * zScale;
    this.object.position.set(
      this.position.x - Math.sin(this.yaw) * (x * xScale * 0.5),
      this.position.y,
      this.position.z - Math.cos(this.yaw) * (z * zScale * 0.5)
    );
    this.setBox();
  },
};

export { Focal, TYPE_FOCAL };
*/
