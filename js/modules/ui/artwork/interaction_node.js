/** Convert UI screenspace interaction to world space, prform actions. */

class InteractionNode {

  /** Initialise node from parent data. */
  constructor(position, rotation, clipping, root) {
    this.onscreen = true;
    this.position = position;
    this.rotation = rotation;
    this.clipping = clipping || null;
    this.coords = new THREE.Vector2();
    this.helper = new THREE.Vector3();

    // artwork root
    this.root = root;

    // props
    this.active = true;
    this.hover = false;
    this.cornersOK = false;
    this.clickable = false;
    this.buttonActive = false;
    this.buttonRadius = 50;
    this.buttonPosition = new THREE.Vector2();
    this.buttonPosition.isClamped = false;
    this.buttonHover = false;
    this.textColour = Math.abs(position.x) <= 16 && (position.z > 10 || position.z < 0) ? '#884466' : "#fff";
    this.radius = {min: this.root.isMobile ? 10 : 9, max: 32};
    this.corners = {
      world: {a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3(), d: new THREE.Vector3()},
      screen: {a: new THREE.Vector2(), b: new THREE.Vector2(), c: new THREE.Vector2(), d: new THREE.Vector2()}
    };
    this.distance = -1;

    // init
    this.resize();
  }

  /** Set 3d artwork corner positions. */
  setCorners() {
    // A --- B
    // |     |
    // D --- C
    const p = this.root.position;
    const v = this.root.direction;
    const s = this.root.board.scale;
    const scale = 0.5;
    const xo = v.x * this.root.thickness / 2;
    const zo = v.z * this.root.thickness / 2;
    this.corners.world.a.set(p.x - (v.x != 0 ? 0 : s.x * scale) + xo, p.y + s.y * scale, p.z - (v.z != 0 ? 0 : s.z * scale) + zo);
    this.corners.world.b.set(p.x + (v.x != 0 ? 0 : s.x * scale) + xo, p.y + s.y * scale, p.z + (v.z != 0 ? 0 : s.z * scale) + zo);
    this.corners.world.c.set(p.x + (v.x != 0 ? 0 : s.x * scale) + xo, p.y - s.y * scale, p.z + (v.z != 0 ? 0 : s.z * scale) + zo);
    this.corners.world.d.set(p.x - (v.x != 0 ? 0 : s.x * scale) + xo, p.y - s.y * scale, p.z - (v.z != 0 ? 0 : s.z * scale) + zo);
  }

  /** Convert 3d point to screen space. */
  pointToScreen(p, camera, centre, target) {
    const point = p.clone();
    point.project(camera);
    target.x = (point.x + 1) * centre.x;
    target.y = (-point.y + 1) * centre.y;
  }

  /** calculate 2D corner positions and check for distortion. */
  updateCorners(camera, centre) {
    this.pointToScreen(this.corners.world.a, camera, centre, this.corners.screen.a);
    this.pointToScreen(this.corners.world.b, camera, centre, this.corners.screen.b);
    this.pointToScreen(this.corners.world.c, camera, centre, this.corners.screen.c);
    this.pointToScreen(this.corners.world.d, camera, centre, this.corners.screen.d);

    // check if corners are okay
    this.cornersOK = (
      (this.corners.screen.a.y < this.corners.screen.c.y && this.corners.screen.b.y < this.corners.screen.d.y) &&
      Math.abs(this.corners.screen.a.x - this.corners.screen.b.x) < window.innerWidth &&
      !(this.corners.screen.a.x < 0 && this.corners.screen.c.x < 0) &&
      !(this.corners.screen.a.x > this.rect.width && this.corners.screen.c.x > this.rect.width)
    );

    // calculate [info] button position
    this.buttonPosition.x = Math.max(this.corners.screen.c.x, this.corners.screen.d.x);
    this.buttonPosition.y = ((this.buttonPosition.x == this.corners.screen.c.x) ? this.corners.screen.c.y : this.corners.screen.d.y) + 18;

    // clamp to screen
    this.buttonPosition.isClamped = (
      (this.buttonPosition.x > this.rect.width || this.buttonPosition.y > this.rect.height) &&
      (this.rect.width > Math.min(this.corners.screen.a.x, this.corners.screen.b.x) && this.rect.width > Math.min(this.corners.screen.c.x, this.corners.screen.d.x))
    );
    if (this.buttonPosition.isClamped) {
      this.buttonPosition.x = this.rect.width - 16;
      this.buttonPosition.y = this.rect.height - 16;
    }
  }

  /** Disable. */
  disableInfoTag() {
    this.infoTagDisabled = true;
  }

  /** Prevent clicking through walls using arbitrary quadrants. */
  isCorrectQuadrant(p) {
    return ((p.x <= -16 || p.x >= 16 || this.position.x >= 16 || this.position.x <= -16) || ((p.z >= 6 && this.position.z >= 6) || (p.z <= 6 && this.position.z <= 6)));
  }

  /** Check if clickable and activate UI items. */
  mouseOver(x, y, player) {
    if (this.active && this.onscreen && this.cornersOK && this.isCorrectQuadrant(player)) {
      const minX = Math.min(this.corners.screen.a.x, this.corners.screen.b.x, this.corners.screen.c.x, this.corners.screen.d.x) - 10;
      const maxX = Math.max(this.corners.screen.a.x, this.corners.screen.b.x, this.corners.screen.c.x, this.corners.screen.d.x) + 10;
      const minY = Math.min(this.corners.screen.a.y, this.corners.screen.b.y) - 10;
      const maxY = Math.max(this.corners.screen.c.y, this.corners.screen.d.y) + 10;

      // check artwork box & button hover
      this.buttonHover = this.buttonActive && Math.hypot(this.buttonPosition.x - x, this.buttonPosition.y - y) < (this.buttonRadius + 10);
      this.hover = (this.buttonHover || (x >= minX && x <= maxX && y >= minY && y <= maxY));

      // check for hover in the space between the artwork and the clamped button
      if (this.buttonPosition.isClamped && !this.hover) {
        this.hover = (this.buttonPosition.x > maxX && x >= maxX - 100 && y >= this.rect.height - 100);
      }
    } else {
      this.hover = false;
      this.buttonHover = false;
    }

    // set clickable flag
    this.clickable = this.onscreen && this.active && this.hover && this.cornersOK;
  }

  /** Return mouse hover state. */
  isClickable() {
    return this.clickable;
  }

  /** Calculate screen space position. */
  calculateNodePosition(camera, worldVec, centre) {
    this.helper.copy(camera.position);
    this.helper.sub(this.position);
    this.helper.normalize();
    if (this.helper.dot(worldVec) <= 0) {
      this.onscreen = true;
      this.helper.copy(this.position);
      this.helper.project(camera);
      this.coords.x = (this.helper.x + 1) * centre.x;
      this.coords.y = (-this.helper.y + 1) * centre.y;
    } else {
      this.onscreen = false;
    }

    // clip plane
    if (this.clipping && this.onscreen) {
      this.helper.copy(camera.position);
      this.helper.sub(this.position);
      if (this.helper.dot(this.clipping) < 0) {
        this.onscreen = false;
      }
    }
  }

  /** Update node. */
  update(delta, player, camera, worldVec, centre) {
    this.calculateNodePosition(camera, worldVec, centre);
    this.distance = player.position.distanceTo(this.position);

    // activate or deactivate
    this.active = this.distance <= this.radius.max;
    if (this.active) {
      this.updateCorners(camera, centre);
      this.buttonActive = this.distance <= this.radius.min;
    }
  }

  /** Set visible flag & draw node with supplied context (2d). */
  draw(ctx) {
    if (this.clickable) {
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(this.corners.screen.a.x, this.corners.screen.a.y);
      ctx.lineTo(this.corners.screen.b.x, this.corners.screen.b.y);
      ctx.lineTo(this.corners.screen.c.x, this.corners.screen.c.y);
      ctx.lineTo(this.corners.screen.d.x, this.corners.screen.d.y);
      ctx.closePath();
      ctx.stroke();

      if (this.buttonActive) {
        ctx.fillStyle = this.textColour;
        ctx.textAlign = 'right';
        ctx.globalAlpha = this.buttonHover && !this.infoTagDisabled ? 0.6 : 1;

        if (!this.infoTagDisabled) {
          ctx.fillText('[INFO]', this.buttonPosition.x, this.buttonPosition.y);
        }
      }
      return true;
    }
    return false;
  }

  /** Get canvas bounding rect reference. */
  resize() {
    this.rect = document.querySelector('#canvas-target').getBoundingClientRect();
  }

}

export default InteractionNode;
