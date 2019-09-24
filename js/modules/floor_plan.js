/** Load, place and manage artworks. */

import Config from './config';
import Artwork from './artwork/artwork';
import IsMobileDevice from '../utils/is_mobile_device';

class FloorPlan {
  constructor() {
    this.isMobile = IsMobileDevice();
    this.artworks = [];
    this.artworkActiveRadius = 10;
  }

  bind(root) {
    this.ref = {};
    this.ref.player = root.modules.player;
    this.ref.camera = root.modules.camera;
    this.ref.scene = root.modules.scene.scene;
    this.ref.surface = root.modules.surface;
    this.ref.cameraDirection = new THREE.Vector3();
    this.ref.nav = root.ref.nav;
    this.ref.materials = root.modules.materials;
  }

  load(data) {
    this.unload();

    if (data && data.images) {
      // create new artworks
      const slots = [];
      data.images.forEach(imageData => {
        const artwork = new Artwork(this, this.artworks.length, imageData, this.isMobile);
        const slot = artwork.data.location - 1;

        // placement
        if (slot < Config.floorPlan.artworkPositions.length) {
          const pos = Config.floorPlan.artworkPositions[slot];

          // check for duplicate location
          if (slots.indexOf(slot) == -1) {
            slots.push(slot);
          } else {
            console.log('Warning: Duplicate slot reference:', slot);
          }

          // load artwork
          artwork.init(this.ref.scene, new THREE.Vector3(pos.x, pos.y, pos.z), new THREE.Vector3(pos.nx, 0, pos.nz));
          this.artworks.push(artwork);
        } else {
          console.log('Warning: No valid slot:', slot);
        }
      });
    }
  }

  unload() {
    // remove all artworks
    this.artworks.forEach(artwork => {
      try { artwork.destroy() } catch(err) { console.log(err); }
    });
    this.artworks = [];
  }

  mouseOver(x, y) {
    var isHovered = [];
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      this.artworks[i].mouseOver(x, y, this.ref.player.position);
      if (this.artworks[i].isClickable()) {
        isHovered.push(this.artworks[i]);
      }
    }

    if (isHovered.length > 1) {
      var dmax = 100;
      var res = isHovered[0];
      for (var i=0; i<isHovered.length; ++i) {
        isHovered[i].removeHover();
        const d = this.ref.player.position.distanceTo(isHovered[i].position);
        if (d < dmax) {
          dmax = d;
          res = isHovered[i];
        }
      }
      res.forceHover();
    }

    return isHovered.length > 0;
  }

  click(x, y) {
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      if (this.artworks[i].click(x, y, this.ref.player.position)) {
        break;
      }
    }
  }

  moveToArtwork(artwork) {
    this.ref.player.moveToArtwork(artwork);
  }

  update(delta) {
    this.ref.camera.camera.getWorldDirection(this.ref.cameraDirection);
    for (var i=0, lim=this.artworks.length; i<lim; ++i) {
      this.artworks[i].update(delta, this.ref.player, this.ref.camera.camera, this.ref.cameraDirection, this.ref.surface.centre);
    }
  }

  draw(ctx) {
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      if (this.artworks[i].draw(ctx)) {
        break;
      }
    }
  }

  resize() {
    this.artworks.forEach(e => {
      e.resize();
    });
  }
}

export default FloorPlan;
