/**
 * Render HUD/ 2d overlay.
 **/

class OverlayCanvas {
  constructor(root, domElement, canvasTarget) {
    this.root = root;
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.domElement = domElement;
    this.canvasTarget = canvasTarget;
    this.resize();
    this.domElement.append(this.cvs);

    // draw settings
    this.prompt = {};
    this.prompt.touchMove = {alpha: {current: 0, min: 0, max: 1}, size: {current: 12, min: 12, max: 24}};
    this.prompt.click = {alpha: {current: 0, min: 0, max: 1}};
  }

  clear() {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.font = '14px Karla';
    this.ctx.strokeStyle = '#fff';
    this.ctx.fillStyle = '#fff';
    this.ctx.lineWidth = 1.5;
    this.ctx.lineCap = 'round';
  }

  resize() {
    //const rect = this.domElement.getBoundingClientRect();
    this.cvs.width = this.canvasTarget.width;
    this.cvs.height = this.canvasTarget.height;
  }

  promptClick(text, active, x, y) {
    // animate click prompt
    if (active) {
      this.prompt.click.alpha.current += (this.prompt.click.alpha.max - this.prompt.click.alpha.current) * 0.2;
    } else {
      this.prompt.click.alpha.current += (this.prompt.click.alpha.min - this.prompt.click.alpha.current) * 0.2;
    }

    // draw
    if (this.prompt.click.alpha.current > 0) {
      this.ctx.globalAlpha = this.prompt.click.alpha.current;
      this.ctx.fillText(text, x + 12, y + 12);
    }
  }

  promptTouchMove(active) {
    // animate in/out prompt
    if (active) {
      this.prompt.touchMove.alpha.current += (this.prompt.touchMove.alpha.max - this.prompt.touchMove.alpha.current) * 0.2;
      this.prompt.touchMove.size.current += (this.prompt.touchMove.size.max - this.prompt.touchMove.size.current) * 0.2;
    } else {
      this.prompt.touchMove.alpha.current += (this.prompt.touchMove.alpha.min - this.prompt.touchMove.alpha.current) * 0.2;
      this.prompt.touchMove.size.current += (this.prompt.touchMove.size.min - this.prompt.touchMove.size.current) * 0.2;
    }

    // draw
    if (this.prompt.touchMove.alpha.current > 0) {
      const s1 = this.prompt.touchMove.size.current;
      const s2 = s1 * 2;
      const cx = this.cvs.width / 2;
      const cy = this.cvs.height / 2;
      this.ctx.globalAlpha = this.prompt.touchMove.alpha.current;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, s1, 0, Math.PI * 2, false);
      this.ctx.moveTo(cx - s1, cy);
      this.ctx.lineTo(cx + s1, cy);
      this.ctx.moveTo(cx, cy - 4);
      this.ctx.lineTo(cx, cy + 4);
      this.ctx.stroke();
    }
  }

  promptGodMode() {
    this.ctx.globalAlpha = 1;
    this.ctx.fillText('fly mode', 20, this.cvs.height - 40);
  }

  drawDevOverlay() {
    this.ctx.globalAlpha = 1;
    const x = Math.round(this.root.player.position.x * 10) / 10;
    const y = Math.round(this.root.player.position.y * 10) / 10;
    const z = Math.round(this.root.player.position.z * 10) / 10;
    const rx = Math.round(this.root.player.rotation.x * 100) / 100;
    this.ctx.fillText(`${x}, ${y}, ${z}, ${rx}`, 20, this.cvs.height - 20);
  }

  drawNode(node) {
    node.draw(this.ctx);
  }
}

export { OverlayCanvas };
