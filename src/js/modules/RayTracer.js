import { getNormalisedVec3 } from './Maths';
import { Materials } from'./Loader';
import { TYPE_FOCAL } from './Focal';
import { TYPE_BOX, TYPE_RAMP } from './Physics';

const RayTracer = function() {
  this.precision = 0.4;
  this.maxLength = 15;
  this.object = new THREE.Object3D();

  const light = new THREE.PointLight(0xffffff, 0.8, 5, 2);
  const ball = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.2, 16),
    Materials.concrete
  );
  light.position.y = 1.1;

  this.object.add(ball, light);
};

RayTracer.prototype = {
  trace: function(point, vector, objects) {
    // raytracing function

    vector = getNormalisedVec3(vector);
    const steps = this.maxLength / this.precision;
    const dx = vector.x * this.precision;
    const dy = vector.y * this.precision;
    const dz = vector.z * this.precision;
    let collision = false;
    let object = null;

    for (let i=0; i<steps; i+=1) {
      point.x += dx;
      point.y += dy;
      point.z += dz;

      if (point.y < 0)
        break;

      for (let j=0; j<objects.length; j+=1) {
        if (objects[j].collision(point)) {
          if (objects[j].type != TYPE_RAMP || objects[j].getTop(point) > point.y) {
            collision = true;
            object = objects[j];
            break;
          }
        }
      }

      if (collision)
        break;
    }

    this.object.position.set(point.x, point.y, point.z);

    return {
      point: point,
      object: object,
    };
  },

  emitRayFromScreen(event, domElement, camera, player, objects) {
    // convert mouse position to 3D space

    const rect = domElement.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / domElement.width - 0.5) * 2;
    const mouseY = ((event.clientY - rect.top) / domElement.height - 0.5) * 2;
    const fov = camera.fov * Math.PI / 180.;
    const fovY = fov - (fov * Math.abs(mouseX) * 0.5);
    const yaw = player.yaw - mouseX * fov;
    const pitch = player.pitch - (mouseY * 0.5 + (mouseY / camera.aspect) * 0.5) * fovY;
    const vec = new THREE.Vector3(
      Math.sin(yaw),
      Math.sin(pitch),
      Math.cos(yaw)
    );
    const end = this.trace(camera.position, vec, objects);
    const ray = {
      start: camera.position,
      end: end.point,
      yaw: yaw,
      pitch: pitch,
    };

    if (end.object && end.object.type === TYPE_FOCAL) {
      ray.end = end.object.eye;
      ray.yaw = end.object.yaw;
      ray.pitch = end.object.pitch;
    }

    return ray;
  }
};

export default RayTracer;
