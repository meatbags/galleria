class RayTracer {
  constructor(domElement, camera) {
    // ray tracing functions

    this.domElement = domElement;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.rect = this.domElement.getBoundingClientRect();
    this.objects = [];

    console.log(this.raycaster);
  }

  setTargets(objects, onHover, onClick) {
    // set target objects

    this.objects = objects;
    this.onHover = onHover;
    this.onClick = onClick;
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

    this.setMouse();
    this.click();
  }

  click() {

  }

  hover() {
    // raytrace, perform actions

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const res = this.raycaster.intersectObjects(this.objects);
    this.onHover(res);
  }
}

export default RayTracer;
