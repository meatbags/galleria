/** Custom exhibition handler */

import CustomXavier from './custom_exhibitions/custom_xavier';
import CustomJack from './custom_exhibitions/custom_jack';
import CustomTiyan from './custom_exhibitions/custom_tiyan';
import CustomBrenton from './custom_exhibitions/custom_brenton';
import CustomCement from './custom_exhibitions/custom_cement';

class CustomExhibition {
  constructor() {}

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene;
    this.ref.materials = root.modules.materials;
    this.ref.player = root.modules.player;
    this.ref.camera = root.modules.camera;
    this.ref.canvas2d = root.modules.canvas2d;
  }

  load(data, callback) {
    // unload current exhibition
    if (this.exhibition && this.exhibition.unload !== undefined) {
      this.exhibition.unload();
    }
    this.exhibition = null;

    // new installation
    if (data) {
      switch (data.customValue) {
        case 'CEMENT':
          this.exhibition = new CustomCement(this);
          break;
        case 'XAVIER':
          this.exhibition = new CustomXavier(this);
          break;
        case 'JACK_DE_LACY':
          this.exhibition = new CustomJack(this);
          break;
        case 'TIYAN':
          this.exhibition = new CustomTiyan(this);
          break;
        case 'BRENTON':
          this.exhibition = new CustomBrenton(this);
          break;
        default:
          break;
      }
    }

    // load exhibition
    if (this.exhibition) {
      this.exhibition.load().then(() => {
        console.log('Custom exhibition loaded:', data.customValue);
        callback();
      });
    } else {
      callback();
    }
  }

  isLoaded() {
    if (this.exhibition === null || this.exhibition.isLoaded === undefined) {
      return true;
    } else {
      return this.exhibition.isLoaded();
    }
  }

  mouseMove(x, y) {
    if (this.exhibition && this.exhibition.mouseMove !== undefined) {
      return this.exhibition.mouseMove(x, y);
    } else {
      return false;
    }
  }

  click(x, y) {
    if (this.exhibition && this.exhibition.click !== undefined) {
      this.exhibition.click(x, y);
    }
  }

  update(delta) {
    if (this.exhibition && this.exhibition.update !== undefined) {
      this.exhibition.update(delta);
    }
  }

  render() {
    if (this.exhibition && this.exhibition.render !== undefined) {
      this.exhibition.render();
    }
  }
}

export default CustomExhibition;
