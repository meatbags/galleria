/**
 * Signify view location exists.
 **/

import { NodeBase } from './node_base';

class NodeView extends NodeBase {
  constructor(position, rotation, clipping) {
    super(position, clipping || null);
    this.rotation = rotation;
    this.active = true;
    this.hover = false;
    this.radius = {min: 5, max: 30, fadeThreshold: 5};
    this.boundingBox = {width: 40, height: 40};
    this.eye = {
      width: 18,
      height: 9,
      bez: 6,
      radius: {
        current: 7,
        min: 5,
        max: 7
      }
    };
    this.bez = {};
    this.bez.p1 = {x: this.eye.width, y: 2};
    this.bez.cp1 = {x: this.eye.width - this.eye.bez, y: 2 + this.eye.bez * 0.75};
    this.bez.cp2 = {x: this.eye.bez, y: this.eye.height};
    this.bez.p2 = {x: 0, y: this.eye.height};
    this.bez.offset = {current: 0, min: 0, max: 1.5};
    this.distance = -1;
    this.opacity = 1;
  }

  mouseOver(x, y) {
    if (this.active && this.onscreen) {
      this.hover = (
        x >= this.coords.x - this.boundingBox.width &&
        x <= this.coords.x + this.boundingBox.width &&
        y >= this.coords.y - this.boundingBox.height &&
        y <= this.coords.y + this.boundingBox.height
      );
    } else {
      this.hover = false;
    }
    return this.hover;
  }

  update(delta, player, camera, worldVec, centre) {
    this.calculateNodePosition(camera, worldVec, centre);

    // fade out and deactivate
    this.distance = player.position.distanceTo(this.position);
    if (this.distance < this.radius.min || this.distance > this.radius.max) {
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
      this.eye.radius.current += ((this.hover ? this.eye.radius.max : this.eye.radius.min) - this.eye.radius.current) * 0.25;
      this.bez.offset.current += ((this.hover ? this.bez.offset.min : this.bez.offset.max) - this.bez.offset.current) * 0.25;
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.coords.x, this.coords.y, this.eye.radius.current, Math.PI * 0.5, Math.PI * 2.5);
      ctx.moveTo(this.coords.x + this.bez.p1.x, this.coords.y + this.bez.p1.y - this.bez.offset.current);
      ctx.bezierCurveTo(this.coords.x + this.bez.cp1.x, this.coords.y + this.bez.cp1.y - this.bez.offset.current, this.coords.x + this.bez.cp2.x, this.coords.y + this.bez.cp2.y - this.bez.offset.current, this.coords.x + this.bez.p2.x, this.coords.y + this.bez.p2.y - this.bez.offset.current);
      ctx.bezierCurveTo(this.coords.x - this.bez.cp2.x, this.coords.y + this.bez.cp2.y - this.bez.offset.current, this.coords.x - this.bez.cp1.x, this.coords.y + this.bez.cp1.y - this.bez.offset.current, this.coords.x - this.bez.p1.x, this.coords.y + this.bez.p1.y - this.bez.offset.current);
      ctx.moveTo(this.coords.x - this.bez.p1.x, this.coords.y - this.bez.p1.y + this.bez.offset.current);
      ctx.bezierCurveTo(this.coords.x - this.bez.cp1.x, this.coords.y - this.bez.cp1.y + this.bez.offset.current, this.coords.x - this.bez.cp2.x, this.coords.y - this.bez.cp2.y + this.bez.offset.current, this.coords.x - this.bez.p2.x, this.coords.y - this.bez.p2.y + this.bez.offset.current);
      ctx.bezierCurveTo(this.coords.x + this.bez.cp2.x, this.coords.y - this.bez.cp2.y + this.bez.offset.current, this.coords.x + this.bez.cp1.x, this.coords.y - this.bez.cp1.y + this.bez.offset.current, this.coords.x + this.bez.p1.x, this.coords.y - this.bez.p1.y + this.bez.offset.current);
      ctx.stroke();

      if (this.hover) {
        //ctx.beginPath();
        //ctx.arc(this.coords.x, this.coords.y, this.eye.radius.current, 0, Math.PI * 2);
        //ctx.fill();
      }
    }
  }
}

export { NodeView };
