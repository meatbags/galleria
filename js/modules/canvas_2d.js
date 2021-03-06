/** Render 2D Overlays */

import Config from './config';

class Canvas2D {
  constructor(root, domElement, canvasTarget) {
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    document.querySelector('#canvas-target').appendChild(this.cvs);
    this.resize();

    // draw settings
    this.prompt = {};
    this.prompt.touchMove = {alpha: {current: 0, min: 0, max: 1}, size: {current: 44, min: 44, max: 50}};
    this.prompt.click = {alpha: {current: 0, min: 0, max: 1}};
  }

  bind(root) {
    this.ref = {};
    this.ref.player = root.modules.player;
    this.ref.renderer = root.modules.renderer;

    // bind events
    window.addEventListener('resize', () => { this.resize(); });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.font = '16px Karla';
    this.ctx.strokeStyle = '#fff';
    this.ctx.fillStyle = '#fff';
    this.ctx.lineWidth = 1.5;
    this.ctx.lineCap = 'round';
  }

  resize() {
    this.cvs.width = Config.renderer.getWidth();
    this.cvs.height = Config.renderer.getHeight();
  }

  promptClick(text, active, x, y) {
    this.prompt.click.alpha.current += active
      ? (this.prompt.click.alpha.max - this.prompt.click.alpha.current) * 0.2
      : (this.prompt.click.alpha.min - this.prompt.click.alpha.current) * 0.2;

    if (this.prompt.click.alpha.current > 0) {
      this.ctx.globalAlpha = this.prompt.click.alpha.current;
      this.ctx.fillText(text, x + 12, y + 12);
    }
  }

  drawBoxHint(x, y, w, h, hint, label) {
    this.ctx.beginPath();
    this.ctx.moveTo(x - w, y - h + hint);
    this.ctx.lineTo(x - w, y - h);
    this.ctx.lineTo(x - w + hint, y - h);
    this.ctx.moveTo(x + w - hint, y - h);
    this.ctx.lineTo(x + w, y - h);
    this.ctx.lineTo(x + w, y - h + hint);
    this.ctx.moveTo(x + w, y + h - hint);
    this.ctx.lineTo(x + w, y + h);
    this.ctx.lineTo(x + w - hint, y + h);
    this.ctx.moveTo(x - w + hint, y + h);
    this.ctx.lineTo(x - w, y + h);
    this.ctx.lineTo(x - w, y + h - hint);
    this.ctx.stroke();
    if (label) {
      const tx = x - w + 5;
      const ty = y - h + 14;
      this.ctx.fillStyle = "#f00";
      this.ctx.fillText(label, tx + 2, ty + 2);
      this.ctx.fillStyle = "#fff";
      this.ctx.fillText(label, tx, ty);
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

    // draw touchmove prompt
    if (this.prompt.touchMove.alpha.current > 0) {
      const cx = this.cvs.width / 2;
      const cy = this.cvs.height / 2;
      const size = this.prompt.touchMove.size.current;
      this.ctx.globalAlpha = this.prompt.touchMove.alpha.current;
      this.drawBoxHint(cx, cy, size, size, 10);
    }
  }

  promptGodMode() {
    this.ctx.globalAlpha = 1;
    this.ctx.fillText('FREE MODE', 20, this.cvs.height - 60);
    const sx = Math.round(Math.sin(this.ref.player.rotation.x) * 100) / 100;
    const cx = Math.round(Math.cos(this.ref.player.rotation.x) * 100) / 100;
    this.ctx.fillText(`sinx ${sx}, cosx ${cx}`, 20, this.cvs.height - 40);
    const x = Math.round(this.ref.player.position.x * 10) / 10;
    const y = Math.round(this.ref.player.position.y * 10) / 10;
    const z = Math.round(this.ref.player.position.z * 10) / 10;
    this.ctx.fillText(`x ${x}, y ${y}, z ${z}`, 20, this.cvs.height - 20);
  }

  drawDevOverlay() {
    //
  }

  getContext() {
    return this.ctx;
  }
}

export default Canvas2D;
