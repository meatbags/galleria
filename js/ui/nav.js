/** Site Navigation */

import CreateElement from '../utils/create_element';
import IsSafariMobile from '../utils/is_safari_mobile';

class Nav {
  constructor() {
    this.el = {
      navItems: document.querySelectorAll('.nav__item'),
      archiveItems: document.querySelectorAll('.section--archive'),
      preview: document.querySelector('.section--preview'),
      featured: document.querySelector('.section--featured'),
      default: document.querySelector('.section--default'),
    };

    // bind nav
    this.el.navItems.forEach(el => {
      el.addEventListener('click', () => {
        this.onNavItem(el);
      });
    });

    // bind archive
    this.el.archiveItems.forEach(el => {
      el.addEventListener('click', evt => {
        if (evt.target.tagName !== 'A') {
          this.onArchive(el);
        }
      });
    });

    // page from hash
    if (window.location.hash) {
      const id = `#page-${window.location.hash.replace('#', '')}`;
      const target = document.querySelector(`[data-target="${id}"]`);
      if (target) {
        target.click();
      }
    }

    // safari fix
    if (IsSafariMobile()) {
      document.querySelectorAll('.fix-safari').forEach(el => { el.classList.add('safari'); });
    }
  }

  bind(root) {
    this.ref = {};
    this.ref.gallery = root.modules.gallery;

    // load initial exhibition
    const exhibition = this.el.preview ? this.el.preview : this.el.featured ? this.el.featured : this.el.default;
    const data = this.parseExhibitionDataTags(exhibition);
    this.ref.gallery.load(data);

    // display default gallery as fallback
    if (!this.el.preview && !this.el.featured) {
      this.el.default.classList.remove('hidden');
    }

    // remove loading screen
    const loading = document.querySelector('.loading-screen');
    loading.classList.remove('active');
    setTimeout(() => {
      loading.parentNode.removeChild(loading);
    }, 500);

    // trigger resize after orientationchange
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 500);
    });
  }

  parseExhibitionDataTags(el) {
    const data = {};
    data.id = el.querySelector('[data-id]').dataset.id;
    data.title = el.querySelector('.section__title').innerHTML;
    data.artistName = el.querySelector('.section__heading').innerHTML;
    data.date = el.querySelector('.section__date').innerHTML;
    data.images = [];
    el.querySelectorAll('.section__image').forEach(img => {
      const res = {};
      Object.keys(img.dataset).forEach(key => { res[key] = img.dataset[key]; });
      res.horizontalOffset = parseFloat(res.horizontalOffset);
      res.verticalOffset = parseFloat(res.verticalOffset);
      res.width = parseFloat(res.width);
      res.location = parseInt(res.location);
      data.images.push(res);
    });

    return data;
  }

  onNavItem(el) {
    if (el.dataset.target) {
      const target = document.querySelector(el.dataset.target);
      if (target) {
        document.querySelectorAll('.page.active, .nav__item.active').forEach(el => { el.classList.remove('active'); });
        target.classList.add('active');
        el.classList.add('active');
        window.location.hash = `${el.dataset.target.split('-')[1]}`;
      }
    }
  }

  onArchive(el) {
    console.log(el);
  }
}

export default Nav;
