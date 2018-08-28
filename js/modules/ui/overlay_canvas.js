/**
 * Render HUD/ 2d overlay.
 **/

class OverlayCanvas {
  constructor(root, domElement) {
    this.root = root;
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
    this.domElement = domElement;
    this.domElement.append(this.cvs);

    // draw settings
    this.prompt = {};
    this.prompt.touchMove = {
      alpha: {current: 0, min: 0, max: 1},
      size: {current: 32, min: 32, max: 64}
    };
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
    const rect = this.domElement.getBoundingClientRect();
    this.cvs.width = rect.width;
    this.cvs.height = rect.height;
  }

  promptClick(active, x, y) {
    // animate click prompt
    if (active) {
      this.prompt.click.alpha.current += (this.prompt.click.alpha.max - this.prompt.click.alpha.current) * 0.2;
    } else {
      this.prompt.click.alpha.current += (this.prompt.click.alpha.min - this.prompt.click.alpha.current) * 0.2;
    }

    // draw
    if (this.prompt.click.alpha.current > 0) {
      this.ctx.globalAlpha = this.prompt.click.alpha.current;
      this.ctx.fillText('view artwork', x + 12, y + 12);
    }
  }

  promptTouchMove(active) {
    // animate touch/move prompt
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
      this.ctx.globalAlpha = this.prompt.touchMove.alpha.current;
      this.ctx.setLineDash([5, 5]);
      this.ctx.strokeRect(s1, s1, this.cvs.width - s2, this.cvs.height - s2);
      this.ctx.setLineDash([]);
      this.ctx.fillText('pan', s1 + 7, s1 + 16);
    }
  }

  promptGodMode() {
    this.ctx.globalAlpha = 1;
    this.ctx.fillText('fly mode', 20, window.innerHeight - 40);
  }

  draw(objects) {
    this.clear();
    for (var i=0, len=objects.length; i<len; ++i) {
      objects[i].draw(this.ctx);
    }
    this.ctx.globalAlpha = 1;
    const x = Math.round(this.root.player.position.x * 10) / 10;
    const y = Math.round(this.root.player.position.y * 10) / 10;
    const z = Math.round(this.root.player.position.z * 10) / 10;
    this.ctx.fillText(`${x}, ${y}, ${z}`, 20, window.innerHeight - 20);
  }
}

export { OverlayCanvas };
