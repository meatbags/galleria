import { Globals } from '../config';
import { minAngleDifference, twoPi } from '../maths';

class Player extends Collider.Player {
  constructor(domElement) {
    super(domElement);

    // player props

    this._override();
  }

  _override() {
    // override inheritance

    this.config.height = Globals.player.height;
    this.camera.far = 500000;
    this.camera.updateProjectionMatrix();
    this.position.z = this.target.position.z = -40;
    this.position.x = this.target.position.x = -15;
    this.rotation.yaw = this.target.rotation.yaw = Math.PI / 8;
    this.rotation.pitch = this.target.rotation.pitch = Math.PI / 12;
    this.config.adjust = {
      verySlow: 0.01,
      slow: 0.018,
      normal: 0.035,
      fast: 0.06,
      rapid: 0.09,
      veryFast: 0.18,
    };
    this.moveAdjust = this.config.adjust.veryFast;
    this.moveAdjustTarget = this.moveAdjust;
    this.rotateAdjust = this.config.adjust.fast;
    this.rotateAdjustTarget = this.rotateAdjust;

    // override move function

    this.move = () => {
      // move

      this.moveAdjust += (this.moveAdjustTarget - this.moveAdjust) * this.config.adjust.verySlow;
      this.position.x += (this.target.position.x - this.position.x) * this.moveAdjust;
      this.position.y += (this.target.position.y - this.position.y) * this.moveAdjust;
      this.position.z += (this.target.position.z - this.position.z) * this.moveAdjust;

      // look

      this.rotateAdjust += (this.rotateAdjustTarget - this.rotateAdjust) * this.config.adjust.slow;
      this.rotation.yaw += minAngleDifference(this.rotation.yaw, this.target.rotation.yaw) * this.rotateAdjust;
      this.offset.rotation.yaw += (this.target.offset.rotation.yaw - this.offset.rotation.yaw) * this.config.adjust.normal;
      this.rotation.yaw += (this.rotation.yaw < 0) ? twoPi : ((this.rotation.yaw > twoPi) ? -twoPi : 0);

      this.rotation.pitch += (this.target.rotation.pitch - this.rotation.pitch) * this.rotateAdjust;
      this.offset.rotation.pitch += (this.target.offset.rotation.pitch - this.offset.rotation.pitch) * this.config.adjust.normal;
      this.rotation.roll += (this.target.rotation.roll - this.rotation.roll) * this.rotateAdjust;

      // set camera

      const pitch = this.rotation.pitch + this.offset.rotation.pitch;
      const yaw = this.rotation.yaw + this.offset.rotation.yaw;
      const height = this.position.y + this.config.height;
      const offxz = 1 - Math.abs(Math.sin(pitch));
      const offy = 1;

      // fix camera roll

      this.camera.up.z = -Math.sin(this.rotation.yaw) * this.rotation.roll;
      this.camera.up.x = Math.cos(this.rotation.yaw) * this.rotation.roll;

      // set position, camera target

      this.camera.position.set(
        this.position.x - Math.sin(yaw) * offxz / 4,
        height - Math.sin(pitch) * offy / 4,
        this.position.z - Math.cos(yaw) * offxz / 4
      );
      this.camera.lookAt(new THREE.Vector3(
        this.position.x + Math.sin(yaw) * offxz,
        height + Math.sin(pitch) * offy,
        this.position.z + Math.cos(yaw) * offxz
      ));

      // set world object

      this.object.position.set(this.position.x, this.position.y, this.position.z);
    }
  }

  mobileMove() {
    // move forward on tap


  }

  setEyeTarget(target) {
    // set target

    this.target.position.x = target.position.x;
    //this.target.position.y = target.position.y;
    this.target.position.z = target.position.z;
    this.target.rotation.pitch = target.pitch;
    this.target.rotation.yaw = target.yaw;

    // set to slow position adjust

    this.moveAdjust = 0;
    this.rotateAdjust = 0;
    //this.moveAdjustTarget = this.config.adjust.veryFast;
  }

  updatePlayer(delta, collider) {
    // update collider player

    this.update(delta, collider);
  }
}

export default Player;
