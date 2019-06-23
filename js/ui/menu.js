/** Menu */

import IsMobileDevice from '../utils/is_mobile_device';

class Menu {
  constructor() {
    this.isDev = (window.location.host.indexOf('localhost') != -1);

    this.el = {
      openGalleryButton: document.querySelector('#open-gallery'),
    }

    this.el.openGalleryButton.addEventListener('click', () => {
      if (!this.el.openGalleryButton.classList.contains('is-loading')) {
        this.el.openGalleryButton.classList.remove('flash');
        this.toggleGallery();
      }
    });

    document.querySelectorAll('.close-gallery').forEach(e => {
      e.addEventListener('click', () => {
        this.closeGalleryMenu();
        this.toggleGallery();
      });
    });

    document.querySelectorAll('.pane-content-nav .item').forEach(item => {
      item.addEventListener('click', evt => {
        this.onMenuItem(evt.currentTarget);
      });
    });

    document.querySelectorAll('.close-gallery-menu').forEach(item => {
      item.addEventListener('click', evt => {
        this.closeGalleryMenu();
      });
    });

    this.onMenuItem(document.querySelector('#nav-item-controls')); // ?
  }

  bind(root) {
    this.ref = {};
    this.ref.root = root;
  }

  toggleGallery() {
    if (!this.lock) {
      this.lock = true;
      this.toggleCount = this.toggleCount ? this.toggleCount + 1 : 1;
      const content = document.querySelector('#pane-content');
      const gallery = document.querySelector('#pane-gallery');
      const grid = document.querySelector('#background-grid');
      const nav = document.querySelector('.nav');
      const logo = document.querySelector('.logo-main');

      if (content.classList.contains('active')) {
        content.classList.remove('active');
        gallery.classList.add('active');
        grid.classList.add('active');
        nav.classList.add('active');
        logo.classList.add('active');
        document.documentElement.classList.add('freeze');
        if (this.toggleCount == 1) {
          setTimeout(() => {
            this.lock = false;
            gallery.querySelectorAll('canvas').forEach(e => { e.classList.add('active'); });
            this.ref.root.start();
          }, this.isDev ? 125 : 1000);
        } else {
          this.ref.root.start();
          this.lock = false;
        }
      } else {
        gallery.classList.remove('active');
        content.classList.add('active');
        grid.classList.remove('active');
        nav.classList.remove('active');
        logo.classList.remove('active');
        document.documentElement.classList.remove('freeze');
        this.ref.root.pause();
        this.lock = false;
      }
    }
  }

  closeGalleryMenu() {
    // de-activate nav items & menus
    document.querySelectorAll('#nav-gallery .item.active, .gallery-menu .active').forEach(e => {
      e.classList.remove('active');
    });
    document.querySelector('#nav-gallery .close-gallery-menu').classList.add('active');

    // show controls
    document.querySelector('#gallery-controls').classList.remove('display-none');
  }

  onMenuItem(el) {
    if (el.dataset.active) {
      const target = document.querySelector(el.dataset.active);

      if (target) {
        el.parentNode.querySelectorAll('.active').forEach(e => { e.classList.remove('active'); });
        el.classList.add('active');

        // close pages or menus
        if (el.parentNode.getAttribute('id') == 'nav-content') {
          document.querySelectorAll('.pane-content .page.active').forEach(e => {
            e.classList.remove('active');
          });
        } else {
          document.querySelectorAll('.gallery-menu .menu.active').forEach(e => {
            e.classList.remove('active');
            e.querySelectorAll('.requires-activate').forEach(f => {
              f.classList.remove('active');
            });
          });

          // hide controls & info
          document.querySelector('#gallery-controls').classList.add('display-none');
          document.querySelector('#artwork-target').classList.remove('active');
        }

        // open target
        target.classList.add('active');
        target.querySelectorAll('.requires-activate').forEach(e => {
          e.classList.add('active');
        });
      }
    }
  }
}

export default Menu;
