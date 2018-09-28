/**
 * Handles user input and moves player on collision map.
 **/

import { Blend, MinAngleBetween, TwoPI } from '../maths';

class Player {
  constructor(root) {
    this.root = root;
    this.position = new THREE.Vector3(-24, 1, 16);
    this.rotation = new THREE.Vector2(Math.PI * 0.55, Math.PI * -0.05);
    this.motion = new THREE.Vector3();
    this.target = {
      position: this.position.clone(),
      rotation: this.rotation.clone(),
      motion: this.motion.clone()
    };
    this.collider = new Collider.Collider(this.target.position, this.motion);
    this.collider.setPhysics({gravity: 20});

    // automatic motion and panning
    this.automove = {
      active: {position: true, rotation: true},
      speed: {current: 0, max: 5},
      position: this.position.clone(),
      rotation: new THREE.Vector2(Math.PI * 0.55, Math.PI * 0.03),
      threshold: {
        position: {outer: 2, inner: 0.02},
        rotation: Math.PI / 1000 // ~0.006
      }
    };

    // physical attributes
    this.speed = 6; //5
    this.rotationSpeed = Math.PI * 0.5; //0.5
    this.jump = 8;
    this.jumpSpeedMultiplier = 0.25;
    this.height = 3;
    this.falling = false;
    this.fallTime = 0;
    this.fallTimeThreshold = 0.2;
    this.noclip = false;
    this.noclipSpeed = 36;
    this.toggleNoclip = () => { this.noclip = (this.noclip == false); };
    this.minPitch = Math.PI * -0.125;
    this.maxPitch = Math.PI * 0.125;
    this.adjust = {slow: 0.05, normal: 0.1, fast: 0.125, maximum: 0.3};

    // input
    this.keys = {disabled: true};

    // add to scene
    this.group = new THREE.Group();
    this.light = new THREE.PointLight(0xffffff, 1.0, 12, 2);
    this.light.position.y = this.height + 0.25;
    this.group.add(this.light);
    this.root.scene.add(this.group);
  }

  move(delta) {
    // key input to motion
    if (this.keys.left || this.keys.right) {
      if (this.automove.active.rotation) {
        this.target.rotation.copy(this.rotation);
        this.automove.active.rotation = false;
      }
      const d = ((this.keys.left) ? 1 : 0) + ((this.keys.right) ? -1 : 0);
      this.target.rotation.x += d * this.rotationSpeed * delta;
    }

    if (this.keys.up || this.keys.down) {
      if (this.automove.active.position) {
        this.automove.active.position = false;
        this.target.position.copy(this.position);
      }
      const speed = (this.noclip) ? this.noclipSpeed * (1 - Math.abs(Math.sin(this.target.rotation.y))) : this.speed;
      const dir = ((this.keys.up) ? 1 : 0) + ((this.keys.down) ? -1 : 0);
      this.target.motion.x = Math.sin(this.rotation.x) * speed * dir;
      this.target.motion.z = Math.cos(this.rotation.x) * speed * dir;
    } else {
      this.target.motion.x = 0;
      this.target.motion.z = 0;
    }

    if (this.keys.jump) {
      if (this.motion.y == 0 || this.fallTime < this.fallTimeThreshold) {
        this.motion.y = this.jump;
        this.fallTime = this.fallTimeThreshold;
      }
    }

    // decide if falling
    this.falling = (this.motion.y != 0);
    this.fallTime = (this.falling) ? this.fallTime + delta : 0;

    // noclip
    if (this.noclip) {
      this.falling = false;
      if (this.keys.up || this.keys.down) {
        const d = ((this.keys.up) ? 1 : 0) + ((this.keys.down) ? -1 : 0);
        this.target.motion.y = Math.sin(this.target.rotation.y) * d * this.noclipSpeed;
      } else {
        this.target.motion.y = 0;
      }
      this.motion.y = this.target.motion.y;
    }

    // reduce speed if falling
    if (!this.falling) {
      this.motion.x = this.target.motion.x;
      this.motion.z = this.target.motion.z;
    } else {
      this.motion.x = Blend(this.motion.x, this.target.motion.x, this.jumpSpeedMultiplier);
      this.motion.z = Blend(this.motion.z, this.target.motion.z, this.jumpSpeedMultiplier);
    }
  }

  moveToArtwork(artwork) {
    const p = artwork.position.clone();
    const v = artwork.direction.clone();
    v.normalize();
    v.multiplyScalar(3);
    p.add(v);
    this.automove.position.set(p.x, p.y, p.z);
    this.automove.active.position = true;
  }

  applyAutomove(delta) {
    // position
    if (this.automove.active.position) {
      const p = this.automove.position.clone();
      p.sub(this.position);
      p.y = 0; // use x, z only
      const mag = p.length();
      p.normalize();

      // increase speed, reduce speed, or stop
      if (mag > this.automove.threshold.position.outer) {
        this.automove.speed.current += (this.automove.speed.max - this.automove.speed.current) * 0.1;
        p.multiplyScalar(this.automove.speed.current * delta);
        this.position.add(p);
      } else {
        if (mag > this.automove.threshold.position.inner) {
          const speed = this.automove.speed.max * (mag / this.automove.threshold.position.outer);
          this.automove.speed.current += (speed - this.automove.speed.current) * 0.1;
          p.multiplyScalar(this.automove.speed.current * delta);
          this.position.add(p);
        } else {
          // reset y and jump to final position
          this.automove.position.y = this.target.position.y;
          this.target.position.copy(this.automove.position);
          this.automove.active.position = false;
          this.keys.disabled = false;
        }
      }
    } else {
      this.automove.speed.current = 0;
    }

    // rotation
    if (this.automove.active.rotation) {
      const rx = MinAngleBetween(this.rotation.x, this.automove.rotation.x);
      const ry = MinAngleBetween(this.rotation.y, this.automove.rotation.y);
      const mag = Math.hypot(rx, ry);
      this.rotation.x += rx * 0.025;
      this.rotation.y += ry * 0.025;

      if (mag < this.automove.threshold.rotation) {
        this.automove.active.rotation = false;
        this.target.rotation.copy(this.automove.rotation);
      }
    }
  }

  update(delta) {
    this.applyAutomove(delta);

    // move
    if (!this.keys.disabled && !this.automove.active.position) {
      this.move(delta);
      if (!this.noclip) {
        this.collider.move(delta, this.root.colliderSystem);
      } else {
        this.target.position.x += this.motion.x * delta;
        this.target.position.y += this.motion.y * delta;
        this.target.position.z += this.motion.z * delta;
      }
      this.position.x = Blend(this.position.x, this.target.position.x, this.adjust.maximum);
      this.position.y = Blend(this.position.y, this.target.position.y, this.adjust.maximum);
      this.position.z = Blend(this.position.z, this.target.position.z, this.adjust.maximum);
    }

    // rotate
    if (!this.automove.active.rotation) {
      this.rotation.x += MinAngleBetween(this.rotation.x, this.target.rotation.x) * this.adjust.normal;
      this.rotation.y = Blend(this.rotation.y, this.target.rotation.y, this.adjust.normal);
    }

    this.group.position.set(this.position.x, this.position.y, this.position.z);
	}

  setRotation(pitch, yaw) {
    this.target.rotation.y = pitch;
    this.target.rotation.x = yaw;
    this.automove.active.rotation = false;
  }

  getTargetPosition() {
    return this.target.position;
  }
};

export { Player };
