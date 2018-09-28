/**
 * Signify view location exists.
 **/

import { InteractionNodeBase } from './interaction_node_base';

class InteractionNodeView extends InteractionNodeBase {
  constructor(position, rotation, clipping) {
    super(position, clipping || null);
    this.rotation = rotation;
    this.active = true;
    this.hover = false;
    this.nearby = false;
    this.radius = {min: 5, max: 20, fadeThreshold: 4};
    this.boundingBox = {width: 40, height: 40, nearbyThreshold: 150};
    this.eye = {
      width: 18,
      height: 9,
      bez: 6,
      radius: {current: 7, min: 5, max: 7}
    };
    this.bez = {};
    this.bez.p1 = {x: this.eye.width, y: 2};
    this.bez.cp1 = {x: this.eye.width - this.eye.bez, y: 2 + this.eye.bez * 0.75};
    this.bez.cp2 = {x: this.eye.bez, y: this.eye.height};
    this.bez.p2 = {x: 0, y: this.eye.height};
    this.bez.offset = {current: 0, min: -2, max: 1.5};
    this.distance = -1;
    this.maxVerticalDifference = 5;
    this.opacity = 1;
  }

  mouseOver(x, y) {
    // check if mouse hover or nearby
    if (this.active && this.onscreen) {
      this.nearby = Math.hypot(this.coords.x - x, this.coords.y - y) < this.boundingBox.nearbyThreshold;
      this.hover = (
        x >= this.coords.x - this.boundingBox.width &&
        x <= this.coords.x + this.boundingBox.width &&
        y >= this.coords.y - this.boundingBox.height &&
        y <= this.coords.y + this.boundingBox.height
      );
    } else {
      this.nearby = false;
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
    this.height = Math.abs((player.position.y + player.height) - this.position.y);
    if (this.distance < this.radius.min || this.distance > this.radius.max || this.height > this.maxVerticalDifference) {
      this.active = false;
    } else {
      this.active = true;
      if (this.distance < this.radius.min + this.radius.fadeThreshold) {
        this.opacity = (this.distance - this.radius.min) / this.radius.fadeThreshold;
      } else if (this.distance > this.radius.max - this.radius.fadeThreshold) {
        this.opacity = (this.radius.max - this.distance) / this.radius.fadeThreshold;
      } else {
        this.opacity = 1;
      }
    }
  }

  draw(ctx) {
    if (this.onscreen && this.active) {
      ctx.globalAlpha = this.opacity;
      this.eye.radius.current += ((this.hover ? this.eye.radius.max : this.eye.radius.min) - this.eye.radius.current) * 0.25;
      this.bez.offset.current += ((this.hover ? this.bez.offset.min : this.bez.offset.max) - this.bez.offset.current) * 0.25;
      ctx.beginPath();
      ctx.arc(this.coords.x, this.coords.y, this.nearby ? this.eye.radius.current : this.eye.radius.current * 0.75, Math.PI * 0.5, Math.PI * 2.5);

      /*
      if (this.nearby) {
        ctx.moveTo(this.coords.x + this.bez.p1.x, this.coords.y + this.bez.p1.y - this.bez.offset.current);
        ctx.bezierCurveTo(this.coords.x + this.bez.cp1.x, this.coords.y + this.bez.cp1.y - this.bez.offset.current, this.coords.x + this.bez.cp2.x, this.coords.y + this.bez.cp2.y - this.bez.offset.current, this.coords.x + this.bez.p2.x, this.coords.y + this.bez.p2.y - this.bez.offset.current);
        ctx.bezierCurveTo(this.coords.x - this.bez.cp2.x, this.coords.y + this.bez.cp2.y - this.bez.offset.current, this.coords.x - this.bez.cp1.x, this.coords.y + this.bez.cp1.y - this.bez.offset.current, this.coords.x - this.bez.p1.x, this.coords.y + this.bez.p1.y - this.bez.offset.current);
        ctx.moveTo(this.coords.x - this.bez.p1.x, this.coords.y - this.bez.p1.y + this.bez.offset.current);
        ctx.bezierCurveTo(this.coords.x - this.bez.cp1.x, this.coords.y - this.bez.cp1.y + this.bez.offset.current, this.coords.x - this.bez.cp2.x, this.coords.y - this.bez.cp2.y + this.bez.offset.current, this.coords.x - this.bez.p2.x, this.coords.y - this.bez.p2.y + this.bez.offset.current);
        ctx.bezierCurveTo(this.coords.x + this.bez.cp2.x, this.coords.y - this.bez.cp2.y + this.bez.offset.current, this.coords.x + this.bez.cp1.x, this.coords.y - this.bez.cp1.y + this.bez.offset.current, this.coords.x + this.bez.p1.x, this.coords.y - this.bez.p1.y + this.bez.offset.current);
      }
      */
      ctx.stroke();
    }
  }
}

export { InteractionNodeView };
