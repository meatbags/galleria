/** Load, place and manage artworks. */

import Config from './config';
import Artwork from './artwork/artwork';
import IsMobileDevice from '../utils/is_mobile_device';

class FloorPlan {
  constructor() {
    this.isMobile = IsMobileDevice();
    this.artworks = [];
    this.artworkActiveRadius = 10;
    this.el = {}
    this.el.popup = document.querySelector('#artwork-target');
    this.el.image = this.el.popup.querySelector('.image');
    this.el.title = this.el.popup.querySelector('.title');
    this.el.subtitle = this.el.popup.querySelector('.subtitle');
    this.el.desc = this.el.popup.querySelector('.desc');
    this.el.link = this.el.popup.querySelector('.link');
    this.el.close = this.el.popup.querySelector('.close-artwork-menu');
  }

  bind(root) {
    this.ref = {};
    this.ref.player = root.modules.player;
    this.ref.camera = root.modules.camera;
    this.ref.scene = root.modules.scene.scene;
    this.ref.surface = root.modules.surface;
    this.ref.cameraDirection = new THREE.Vector3();

    // close popup
    this.el.close.addEventListener('click', () => {
      document.querySelector('#gallery-controls').classList.remove('display-none');
      this.el.popup.classList.remove('active');
    });
  }

  load(data) {
    this.unload();

    if (data.images) {
      // create new artworks
      const slots = [];
      data.images.forEach(imageData => {
        const artwork = new Artwork(this, this.artworks.length, imageData, this.isMobile);

        // placement
        if (artwork.data.location < Config.floorPlan.artworkPositions.length) {
          const pos = Config.floorPlan.artworkPositions[artwork.data.location];

          // check for duplicate location
          if (slots.indexOf(artwork.location) === -1) {
            slots.push(artwork.location);
          } else {
            console.log('Warning: Duplicate slot reference');
          }

          // load artwork
          artwork.init(this.ref.scene, new THREE.Vector3(p.x, p.y, p.z), new THREE.Vector3(p.nx, 0, p.nz));
          this.artworks.push(artwork);
        } else {
          console.log('Warning: No valid slot', imageData);
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

    if (isHovered.length) {
      this.ref.surface.domElement.classList.add('clickable');
    } else {
      this.ref.surface.domElement.classList.remove('clickable');
    }
  }

  click(x, y) {
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      if (this.artworks[i].click(x, y, this.ref.player.position)) {
        break;
      }
    }
  }

  openArtworkMenu(artwork) {
    // remove control arrows
    document.querySelector('#gallery-controls').classList.add('display-none');

    // remove open menus and remove sub active elements
    document.querySelectorAll('.gallery-menu .menu.active').forEach(e => {
      e.classList.remove('active');
      e.querySelectorAll('.requires-activate').forEach(f => {
        f.classList.remove('active');
      });
    });

    // change nav to gallery main
    const navItem = document.querySelector('#nav-item-gallery');
    if (!navItem.classList.contains('active')) {
      navItem.parentNode.querySelectorAll('.active').forEach(e => { e.classList.remove('active'); });
      navItem.classList.add('active');
    }

    // change info
    if (!artwork.isArtworkMenuMine()) {
      this.el.popup.dataset.active = artwork.id;
      this.el.image.innerHTML = `<img src="${artwork.data.url}"/>`;
      this.el.title.innerHTML = artwork.data.title;
      this.el.subtitle.innerHTML = artwork.data.subTitle;
      this.el.desc.innerHTML = artwork.data.description;
      this.el.link.innerHTML = artwork.data.link ? `<a href='${artwork.data.link}' target='_blank'>Link</a>` : '';

      // comments
      //this.el.comments.innerHTML = '[comments here]';
    }

    // show
    this.el.popup.classList.add('active');
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
