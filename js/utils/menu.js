/**
 * Hook up menus.
 **/

class Menu {
  constructor(root) {
    this.root = root;
    this.openGalleryButton = document.querySelector('#open-gallery');
    this.openGalleryButton.onclick = () => {
      if (!this.openGalleryButton.classList.contains('is-loading')) {
        this.openGalleryButton.classList.remove('flash');
        this.toggleGallery();
      }
    };
    document.querySelectorAll('.close-gallery').forEach(e => {
      e.addEventListener('click', () => {
        this.closeGalleryMenu();
        this.toggleGallery();
      });
    });
    this.initMenus();
    //this.toggleGallery();
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
            this.root.activate();
          }, 1250);
        } else {
          this.root.activate();
          this.lock = false;
        }
      } else {
        gallery.classList.remove('active');
        content.classList.add('active');
        grid.classList.remove('active');
        nav.classList.remove('active');
        logo.classList.remove('active');
        document.documentElement.classList.remove('freeze');
        this.root.deactivate();
        this.lock = false;
      }
    }
  }

  closeGalleryMenu() {
    document.querySelectorAll('#nav-gallery .item.active, .gallery-menu .active').forEach(e => {
      e.classList.remove('active');
    });
    document.querySelector('#nav-gallery .close-gallery-menu').classList.add('active');
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
          });
        }

        // open target
        target.classList.add('active');
      }
    }
  }

  initMenus() {
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
  }
}

export { Menu };
