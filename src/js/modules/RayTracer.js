import { Normalise } from './Maths';

const RayTracer = function() {
  this.precision = 0.5;
  this.maxLength = 20;
  this.object = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16),
    new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: 0xffffff
    })
  );
};

RayTracer.prototype = {
  trace: function(point, vector, objects) {
    vector = Normalise(vector);
    const steps = this.maxLength / this.precision;
    const dx = vector.x * this.precision;
    const dy = vector.y * this.precision;
    const dz = vector.z * this.precision;
    let collision = false;

    for (let i=0; i<steps; i+=1) {
      point.x += dx;
      point.y += dy;
      point.z += dz;

      if (point.y < 0)
        break;

      for (let j=0; j<objects.length; j+=1) {
        if (objects[j].collision(point)) {
          collision = true;
          break;
        }
      }

      if (collision)
        break;
    }

    this.object.position.set(point.x, point.y, point.z);

    return point;
  },
};

export default RayTracer;
