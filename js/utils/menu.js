/**
 * Hook up menus.
 **/

class Menu {
  constructor(root) {
    this.root = root;
    document.querySelector('#open-gallery').onclick = () => { this.toggleGallery(true); };
    document.querySelectorAll('.close-gallery').forEach(e => {
      e.addEventListener('click', () => { this.toggleGallery(false); });
    });

    this.initMenus();
    //this.toggleGallery(true);
  }

  toggleGallery(active) {
    if (!this.lock) {
      this.lock = true;
      this.toggleCount = this.toggleCount ? this.toggleCount + 1 : 1;
      const content = document.querySelector('#pane-content');
      const gallery = document.querySelector('#pane-gallery');
      const grid = document.querySelector('#background-grid');
      const nav = document.querySelector('.nav');

      if (content.classList.contains('active')) {
        content.classList.remove('active');
        gallery.classList.add('active');
        grid.classList.add('active');
        nav.classList.add('active');
        document.documentElement.classList.add('freeze');
        if (this.toggleCount == 1) {
          setTimeout(() => {
            this.lock = false;
            this.root.activate();
          }, 1000);
        } else {
          this.root.activate();
          this.lock = false;
        }
      } else {
        gallery.classList.remove('active');
        content.classList.add('active');
        grid.classList.remove('active');
        nav.classList.remove('active');
        document.documentElement.classList.remove('freeze');
        this.root.deactivate();
        this.lock = false;
      }
    }
  }

  initMenus() {
    document.querySelectorAll('.pane-content-nav .item').forEach(item => {
      item.addEventListener('click', e => {
        const el = e.currentTarget;
        if (el.dataset.active) {
          const target = document.querySelector(el.dataset.active);
          if (target) {
            el.parentNode.querySelectorAll('.active').forEach(e => { e.classList.remove('active'); });
            el.classList.add('active');
            document.querySelectorAll('.pane-content .page.active').forEach(page => { page.classList.remove('active'); });
            target.classList.add('active');
          }
        }
      });
    });
  }
}

export { Menu };
