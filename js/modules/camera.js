/** Camera */

import Config from './config';

class Camera {
  constructor(root) {
    this.fov = 65;
    this.aspectRatio = Config.renderer.getWidth() / Config.renderer.getHeight();
    this.offset = 0.1;
    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspectRatio, 0.1, 2000000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.rotation.order = 'YXZ';
  }

  bind(root) {
    this.ref = {};
    this.ref.player = root.modules.player;
    window.addEventListener('resize', () => { this.resize(); });
  }

  addAudioListener() {
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
  }

  resize() {
    this.aspectRatio = Config.renderer.getWidth() / Config.renderer.getHeight();
    this.camera.aspect = this.aspectRatio;
    this.camera.updateProjectionMatrix();
  }

  update(delta) {
    const offsetXZ = this.offset - this.offset * Math.abs(Math.sin(this.ref.player.rotation.y));
    const offsetY = this.offset;
    const y = this.ref.player.position.y + this.ref.player.height;
    this.camera.position.set(this.ref.player.position.x, this.ref.player.position.y + this.ref.player.height, this.ref.player.position.z);
    this.camera.rotation.y = this.ref.player.rotation.x + Math.PI;
    this.camera.rotation.x = this.ref.player.rotation.y;
  }
}

export default Camera;
