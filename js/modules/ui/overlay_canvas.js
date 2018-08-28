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
    this.prompt = {
      alpha: {current: 0, max: 0.5, min: 0},
      size: {current: 32, max: 64, min: 32}
    };
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

  promptTouchMove(active) {
    // animate touch/move prompt
    if (active) {
      this.prompt.alpha.current += (this.prompt.alpha.max - this.prompt.alpha.current) * 0.2;
      this.prompt.size.current += (this.prompt.size.max - this.prompt.size.current) * 0.2;
    } else {
      this.prompt.alpha.current += (this.prompt.alpha.min - this.prompt.alpha.current) * 0.2;
      this.prompt.size.current += (this.prompt.size.min - this.prompt.size.current) * 0.2;
    }

    // draw
    if (this.prompt.alpha.current > 0) {
      const s1 = this.prompt.size.current;
      const s2 = s1 * 2;
      this.ctx.globalAlpha = this.prompt.alpha.current;
      this.ctx.setLineDash([5, 5]);
      this.ctx.strokeRect(s1, s1, this.cvs.width - s2, this.cvs.height - s2);
      this.ctx.setLineDash([]);
      this.ctx.fillText('view', s1 + 7, s1 + 16);
    }
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
