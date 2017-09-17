import { Normalise } from './Maths';

const RayTracer = function() {
  this.precision = 1;
  this.maxLength = 20;
  this.object = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.25, 8),
    new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: 0xffffff
    })
  );
  const rect = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.1, 10, 0.1),
    new THREE.MeshLambertMaterial({ emissive: 0xffffff })
  );
  rect.position.y = -5;
  this.object.add(rect);
};

RayTracer.prototype = {
  trace: function(point, vector, objects) {
    // raytracing function

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

  emitRayFromScreen(event, domElement, camera, objects) {
    //

    const rect = domElement.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / domElement.width - 0.5) * 2;
    const mouseY = ((event.clientY - rect.top) / domElement.height - 0.5) * 2;
    const fov = camera.fov * Math.PI / 180.;
    const fovY = fov - (fov * Math.abs(mouseX) * 0.5);
    const vec = new THREE.Vector3(
      Math.sin(-camera.rotation.y + mouseX * fov),
      Math.sin(camera.rotation.x - (mouseY * 0.5 + (mouseY / camera.aspect) * 0.5) * fovY),
      -Math.cos(-camera.rotation.y + mouseX * fov)
    );
    const point = this.trace(camera.position, vec, objects);

    return point;
  }
};

export default RayTracer;
