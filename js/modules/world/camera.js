/**
 * Perspective camera tracking player.
 **/

class Camera {
  constructor(root) {
    this.root = root;
    this.position = root.player.position;
    this.rotation = root.player.rotation;
    this.height = root.player.height;
    this.target = new THREE.Vector3();
    this.fov = 65;
    this.aspectRatio = this.root.width / this.root.height;
    this.offset = 1;
    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspectRatio, 0.1, 2000000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
  }

  resize(w, h) {
    this.aspectRatio = this.root.width / this.root.height;
    this.camera.aspect = this.aspectRatio;
    this.camera.updateProjectionMatrix();
  }

  update(delta) {
    const offsetXZ = this.offset - this.offset * Math.abs(Math.sin(this.rotation.y));
    const offsetY = this.offset;
    const y = this.position.y + this.height;
    //this.camera.up.z = 0; //this.camera.up.x = 0;
    this.camera.position.x = this.position.x - Math.sin(this.rotation.x) * offsetXZ / 4;
    this.camera.position.y = y - Math.sin(this.rotation.y) * offsetY / 4;
    this.camera.position.z = this.position.z - Math.cos(this.rotation.x) * offsetXZ / 4;
    this.target.x = this.position.x + Math.sin(this.rotation.x) * offsetXZ;
    this.target.y = y + Math.sin(this.rotation.y) * offsetY;
    this.target.z = this.position.z + Math.cos(this.rotation.x) * offsetXZ;
    this.camera.lookAt(this.target);
  }
}

export { Camera };
