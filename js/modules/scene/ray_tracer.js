class RayTracer {
  constructor(domElement, camera) {
    // ray tracing functions

    this.domElement = domElement;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 25; // metre range
    this.mouse = new THREE.Vector2(0, 0);
    this.rect = this.domElement.getBoundingClientRect();
    this.objects = [];
  }

  setFar(far) {
    this.raycaster.far = far;
  }

  setTargets(objects) {
    // set target objects

    this.objects = objects;
  }

  setEvents(onHover, onClick) {
    // set desktop & mobile events

    this.onHover = onHover;
    this.onClick = onClick;
    this.onTouchMove = onHover;
    this.onTap = onClick;
  }

  setMouse(x, y) {
    // convert mouse to [-1, 1]

    this.rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((x - this.rect.left) / this.rect.width) * 2 - 1;
    this.mouse.y = -(((y - this.rect.top) / this.rect.height) * 2 - 1);
  }

  handleMove(x, y) {
    // on mouse move

    this.setMouse(x, y);
    this.hover();
  }

  handleClick(x, y) {
    // on mouse click

    this.setMouse(x, y);
    this.click();
  }

  intersectObjects() {
    // raytrace and check objects

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const res = this.raycaster.intersectObjects(this.objects);

    return res;
  }

  click() {
    // raytrace, perform click

    this.onClick(this.intersectObjects());
  }

  hover() {
    // raytrace, perform actions

    this.onHover(this.intersectObjects());
  }
}

export default RayTracer;
