/**
 * Perspective camera tracking player.
 **/

class Camera {
  constructor(root, position, rotation) {
    this.root = root;
    this.position = this.root.player.position;
    this.rotation = this.root.player.rotation;
    this.target = new THREE.Vector3();
    this.fov = 65;
    this.aspectRatio = this.root.width / this.root.height;
    this.offset = 1;
    this.height = 1.8;
    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspectRatio, 0.1, 2000000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
  }

  resize(w, h) {
    this.aspectRatio = this.root.width / this.root.height;
    this.camera.aspect = this.aspectRatio;
    this.camera.updateProjectionMatrix();
  }

  update(delta) {
    const offsetXZ = this.offset - this.offset * Math.abs(Math.sin(this.rotation.pitch));
    const offsetY = this.offset;
    const y = this.position.y + this.height;
    this.camera.up.z = -Math.sin(this.rotation.yaw) * this.rotation.roll;
    this.camera.up.x = Math.cos(this.rotation.yaw) * this.rotation.roll;
    this.camera.position.x = this.position.x - Math.sin(this.rotation.yaw) * offsetXZ / 4;
    this.camera.position.y = y - Math.sin(this.rotation.pitch) * offsetY / 4;
    this.camera.position.z = this.position.z - Math.cos(this.rotation.yaw) * offsetXZ / 4;
    this.target.x = this.position.x + Math.sin(this.rotation.yaw) * offsetXZ;
    this.target.y = y + Math.sin(this.rotation.pitch) * offsetY;
    this.target.z = this.position.z + Math.cos(this.rotation.yaw) * offsetXZ;
    this.camera.lookAt(this.target);
  }
}

export { Camera };
