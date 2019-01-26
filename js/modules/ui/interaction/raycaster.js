/** DEPRECATED Raycaster for 3d mouse interaction. */

class Raycaster {

  /** Create THREE.js raycaster. */
  constructor(domElement, camera) {
    this.domElement = domElement;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.rect = this.domElement.getBoundingClientRect();
  }

  /** Resize target rect. */
  resize() {
    this.rect = this.domElement.getBoundingClientRect();
  }

  /** Perform raycasting. */
  cast(e, objects) {
    this.mouse.x = ((e.clientX - this.rect.left) / this.rect.width) * 2 - 1;
    this.mouse.y = -(((e.clientY - this.rect.top) / this.rect.height) * 2 - 1);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    return this.raycaster.intersectObjects(objects);
  }
}

export default Raycaster;
