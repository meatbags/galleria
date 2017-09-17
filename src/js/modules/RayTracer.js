import { Normalise } from './Maths';
import { Materials } from'./Loader';

const RayTracer = function() {
  this.precision = 0.25;
  this.maxLength = 15;
  this.object = new THREE.Object3D();

  const light = new THREE.PointLight(0xffffff, 0.25, 5, 2);
  const ball = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16),
    Materials.concrete
  );
  light.position.y = 1;

  this.object.add(ball, light);
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
    // convert mouse position to 3D space

    const rect = domElement.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / domElement.width - 0.5) * 2;
    const mouseY = ((event.clientY - rect.top) / domElement.height - 0.5) * 2;
    const fov = camera.fov * Math.PI / 180.;
    const fovY = fov - (fov * Math.abs(mouseX) * 0.5);
    const yaw = -camera.rotation.y + mouseX * fov;
    const pitch = camera.rotation.x - (mouseY * 0.5 + (mouseY / camera.aspect) * 0.5) * fovY;
    const vec = new THREE.Vector3(
      Math.sin(yaw),
      Math.sin(pitch),
      -Math.cos(yaw)
    );
    const endPoint = this.trace(camera.position, vec, objects);
    const ray = {
      start: camera.position,
      end: endPoint,
      yaw: camera.rotation.y - mouseX * fov,
      pitch: pitch,
    };

    return ray;
  }
};

export default RayTracer;
