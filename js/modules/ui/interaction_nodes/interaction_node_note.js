import { InteractionNodeBase } from './interaction_node_base';

class InteractionNodeNote extends InteractionNodeBase {
  constructor(msg, position, clipping) {
    super(position, clipping || null);
    this.message = msg;
  }

  update(camera, worldVec, centre) {
    this.calculateNodePosition(camera, worldVec, centre);
  }

  draw(ctx) {
    if (this.onscreen) {
      ctx.globalAlpha = 1;
      ctx.fillText(this.message, this.coords.x, this.coords.y);
    }
  }
}

export { InteractionNodeNote };
