/** Load, place and manage artworks. */

import Config from './config';
import Artwork from './artwork/artwork';

class FloorPlan {
  constructor() {
    this.artworkActiveRadius = 10;
    this.isDev = window.location.host.indexOf('localhost') != -1;

    // load exhibition artworks
    this.onReload();

    // dom target
    this.domElement = document.querySelector('#artwork-target');
    this.el = {
      image: this.domElement.querySelector('.image'),
      title: this.domElement.querySelector('.title'),
      subtitle: this.domElement.querySelector('.subtitle'),
      desc: this.domElement.querySelector('.desc'),
      link: this.domElement.querySelector('.link'),
      close: this.domElement.querySelector('.close-artwork-menu')
    };
    this.el.close.addEventListener('click', () => {
      this.closeArtworkMenu();
    });
  }

  bind(root) {
    this.ref = {};
    this.ref.player = root.modules.player;
    this.ref.camera = root.modules.camera;
    this.ref.scene = root.modules.scene.scene;
    this.ref.surface = root.modules.surface;
    this.ref.cameraDirection = new THREE.Vector3();
  }

  onReload() {
    // remove artworks
    if (this.artworks) {
      this.artworks.forEach(e => {
        try {
          e.destroy();
        } catch (err) {
          console.log(err);
        }
      });
    }

    // create new artworks from data
    this.domTarget = '.active-exhibition-data';
    this.artworks = [];
    var count = 0;
    document.querySelectorAll(`${this.domTarget} .image`).forEach(e => {
      this.artworks.push(new Artwork(this, ++count, e, this.isMobile));
    });
    this.placeArtworks();

    // exhibition-specific changes
    const target = document.querySelector('.active-exhibition-data .custom-exhibition-installation');
    if (target) {
      switch (target.dataset.value) {
        case 'TIYAN':
          //this.artworks.forEach(el => { el.disableArtworkMenu(); });
          break;
        default:
          break;
      }
    }
  }

  placeArtworks() {
    const slots = [];

    for (let i=this.artworks.length-1; i >= 0; i--) {
      const artwork = this.artworks[i];

      // find artwork slot & init
      if (
        typeof(artwork.data.index) == 'number' &&
        artwork.data.index >= 0 &&
        artwork.data.index < Config.floorPlan.artworkPositions.length
      ){
        const p = Config.floorPlan.artworkPositions[artwork.data.index];

        // check for duplicates
        if (slots.indexOf(artwork.data.index) != -1) {
          console.log('Warning: duplicate slot reference');
        } else {
          slots.push(artwork.data.index);
        }

        // initialise artwork
        artwork.init(this.ref.scene, new THREE.Vector3(p.x, p.y, p.z), new THREE.Vector3(p.nx, 0, p.nz));
      } else {
        // no valid slot: remove artwork reference
        console.log('Warning: no slot found.');
        console.log(this.artworks.splice(i, 1));
      }
    }
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
      this.domElement.dataset.active = artwork.id;
      this.el.image.innerHTML = `<img src="${artwork.data.url}"/>`;
      this.el.title.innerHTML = artwork.data.title;
      this.el.subtitle.innerHTML = artwork.data.subtitle;
      this.el.desc.innerHTML = artwork.data.desc;
      this.el.link.innerHTML = artwork.data.link ? `<a href='${artwork.data.link}' target='_blank'>Link</a>` : '';

      // comments
      //this.el.comments.innerHTML = '[comments here]';
    }

    // show
    this.domElement.classList.add('active');
  }

  closeArtworkMenu() {
    document.querySelector('#gallery-controls').classList.remove('display-none');
    this.domElement.classList.remove('active');
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
