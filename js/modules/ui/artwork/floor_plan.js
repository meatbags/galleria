/** Load, place and manage artworks. */
import Artwork from './artwork';
import config from './config';

class FloorPlan {

  /** Read data from DOM and load artworks. */
  constructor(root, isMobile) {
    this.root = root;
    this.isMobile = isMobile;
    this.player = this.root.scene.player;
    this.camera = this.root.scene.camera.camera;
    this.scene = this.root.scene.scene;
    this.centre = this.root.centre;
    this.cameraDirection = new THREE.Vector3();
    this.artworkActiveRadius = 10;
    this.isDev = window.location.host.indexOf('localhost') != -1;

    // get artworks
    this.reloadExhibition();

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

  /** Remove current artwork and load next exhibition. */
  reloadExhibition() {
    // remove artworks
    if (this.artworks) {
      this.artworks.forEach(e => { e.destroy(); });
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

  /** Place artworks in pre-defined positions. (see config.js) */
  placeArtworks() {
    const slots = [];

    for (let i=this.artworks.length-1; i >= 0; i--) {
      const artwork = this.artworks[i];

      // find artwork slot & init
      if (typeof(artwork.data.index) == 'number' && artwork.data.index >= 0 && artwork.data.index < config.artworkPositions.length) {
        const p = config.artworkPositions[artwork.data.index];

        // check for duplicates
        if (slots.indexOf(artwork.data.index) != -1) {
          console.log('Warning: duplicate slot reference');
        } else {
          slots.push(artwork.data.index);
        }

        // initialise artwork
        artwork.init(this.scene, new THREE.Vector3(p.x, p.y, p.z), new THREE.Vector3(p.nx, 0, p.nz));
      } else {
        // no valid slot: remove artwork reference
        console.log('Warning: no slot found.');
        console.log(this.artworks.splice(i, 1));
      }
    }
  }

  /** Set mouse over state. */
  mouseOver(x, y) {
    var isHovered = [];
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      this.artworks[i].mouseOver(x, y, this.player.position);
      if (this.artworks[i].isHover()) {
        isHovered.push(this.artworks[i]);
      }
    }

    if (isHovered.length > 1) {
      var dmax = 100;
      var res = isHovered[0];
      for (var i=0; i<isHovered.length; ++i) {
        isHovered[i].removeHover();
        const d = this.player.position.distanceTo(isHovered[i].position);
        if (d < dmax) {
          dmax = d;
          res = isHovered[i];
        }
      }
      res.forceHover();
    }

    if (isHovered.length) {
      this.root.domElement.classList.add('clickable');
    } else {
      this.root.domElement.classList.remove('clickable');
    }
  }

  /** On click. */
  click(x, y) {
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      this.artworks[i].click(x, y, this.player.position);
    }
  }

  /** Display the artwork menu/ overlay. */
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
    if (this.domElement.dataset.active != artwork.id) {
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

  /** Remove the artwork overlay/ menu. */
  closeArtworkMenu() {
    document.querySelector('#gallery-controls').classList.remove('display-none');
    this.domElement.classList.remove('active');
  }

  /** Move player toward artwork. */
  moveToArtwork(artwork) {
    this.player.moveToArtwork(artwork);
  }

  /** Update artworks. */
  update(delta) {
    this.camera.getWorldDirection(this.cameraDirection);
    for (var i=0, lim=this.artworks.length; i<lim; ++i) {
      this.artworks[i].update(delta, this.player, this.camera, this.cameraDirection, this.centre);
    }
  }

  /** Pass draw context to interaction nodes. */
  draw(ctx) {
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      this.artworks[i].draw(ctx);
    }
  }

}

export default FloorPlan;
