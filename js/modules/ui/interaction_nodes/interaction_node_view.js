/**
 * Signify view location exists.
 **/

import { InteractionNodeBase } from './interaction_node_base';
import { pointToScreen } from './point_to_screen';

class InteractionNodeView extends InteractionNodeBase {
  constructor(position, rotation, clipping, root) {
    super(position, clipping || null);
    this.rotation = rotation;
    this.active = true;
    this.hover = false;
    this.radius = {min: 5, max: 24, fadeThreshold: 3};
    this.corners = {
      world: {a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3(), d: new THREE.Vector3()},
      screen: {a: new THREE.Vector2(), b: new THREE.Vector2(), c: new THREE.Vector2(), d: new THREE.Vector2()}
    };
    this.distance = -1;
    this.maxVerticalDifference = 4;
    this.opacity = 1;

    // set root (optional)
    this.root = root || null;
  }

  isCorrectQuadrant(p) {
    return (
      (p.x <= -16 || p.x >= 16) ||
      ((p.z >= 6 && this.position.z >= 6) || (p.z <= 6 && this.position.z <= 6))
    );
  }

  mouseOver(x, y, player) {
    // check if mouse hover
    if (this.active && this.onscreen) {
      const minX = Math.min(this.corners.screen.a.x, this.corners.screen.b.x) - 4;
      const maxX = Math.max(this.corners.screen.a.x, this.corners.screen.b.x) + 4;
      const minY = this.corners.screen.a.y + 4;
      const maxY = this.corners.screen.c.y - 4;
      this.hover = (x >= minX && x <= maxX && y >= minY && y <= maxY && this.isCorrectQuadrant(player));
    } else {
      this.hover = false;
    }
  }

  isHover() {
    return this.hover && this.active;
  }

  update(delta, player, camera, worldVec, centre) {
    this.calculateNodePosition(camera, worldVec, centre);

    // fade out and deactivate
    this.distance = player.position.distanceTo(this.position);
    this.height = Math.abs((player.position.y + player.height) - ((this.root == null) ? this.position.y : this.root.baseY));

    if (this.distance < this.radius.min || this.distance > this.radius.max || this.height > this.maxVerticalDifference) {
      this.active = false;
    } else {
      this.active = true;

      // calculate corners
      if (this.root) {
        pointToScreen(this.corners.world.a, camera, centre, this.corners.screen.a);
        pointToScreen(this.corners.world.b, camera, centre, this.corners.screen.b);
        pointToScreen(this.corners.world.c, camera, centre, this.corners.screen.c);
        pointToScreen(this.corners.world.d, camera, centre, this.corners.screen.d);
      }

      if (this.distance < this.radius.min + this.radius.fadeThreshold) {
        this.opacity = (this.distance - this.radius.min) / this.radius.fadeThreshold;
      } else if (this.distance > this.radius.max - this.radius.fadeThreshold) {
        this.opacity = (this.radius.max - this.distance) / this.radius.fadeThreshold;
      } else {
        this.opacity = 1;
      }
    }
  }

  setCorners() {
    // set 2D corner positions
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

  shouldDraw() {
    // check onscreen, active, and corners not distorting
    return (
      this.onscreen &&
      this.active &&
      this.hover &&
      Math.max(this.corners.screen.a.x, this.corners.screen.b.x) - Math.min(this.corners.screen.a.x, this.corners.screen.b.x) < window.innerWidth
    );
  }

  draw(ctx) {
    if (this.shouldDraw()) {
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.moveTo(this.corners.screen.a.x, this.corners.screen.a.y);
      ctx.lineTo(this.corners.screen.b.x, this.corners.screen.b.y);
      ctx.lineTo(this.corners.screen.c.x, this.corners.screen.c.y);
      ctx.lineTo(this.corners.screen.d.x, this.corners.screen.d.y);
      ctx.closePath();
      ctx.stroke();
      const x = Math.max(this.corners.screen.c.x, this.corners.screen.d.x);
      const y = (x == this.corners.screen.c.x ? this.corners.screen.c.y : this.corners.screen.d.y);
      ctx.fillText(this.root.data.title, x + 8, y);
    }
  }
}

export { InteractionNodeView };
