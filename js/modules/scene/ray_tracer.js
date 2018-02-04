class RayTracer {
  constructor(domElement, camera) {
    // ray tracing functions

    this.domElement = domElement;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.rect = this.domElement.getBoundingClientRect();
    this.objects = [];
  }

  setTarget(objects) {
    // set target objects

    this.objects = objects;
  }

  handleMove(x, y) {
    // on mouse move

    this.rect = this.domElement.getBoundingClientRect();
  }

  handleClick(x, y) {
    // on mouse click

    this.rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((x - this.rect.left) / this.rect.width) * 2 - 1;
    this.mouse.y = ((y - this.rect.top) / this.rect.height) * 2 - 1;
    this.trace();
  }

  trace() {
    // raytrace, perform actions

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const res = this.raycaster.intersectObjects(this.objects);

    if (res.length) {
      // perform first collision action


    }
  }
}

export default RayTracer;
