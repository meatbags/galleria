/** Site Navigation */

import CreateElement from '../utils/create_element';
import IsSafariMobile from '../utils/is_safari_mobile';

class Nav {
  constructor() {
    this.el = {
      openGallery: document.querySelector('#open-gallery-prompt'),
      archiveItems: document.querySelectorAll('.section--archive'),
      preview: document.querySelector('.section--preview'),
      featured: document.querySelector('.section--featured'),
      default: document.querySelector('.section--default'),
      gallery: {
        controls: document.querySelector('#gallery-controls'),
        controlsPopup: document.querySelector('#popup-gallery-controls'),
        navItems: document.querySelector('.gallery .nav__item'),
        navItemGallery: document.querySelector('#nav-item-gallery'),
        navItemControls: document.querySelector('#nav-item-controls'),
        artworkInfoPopup: document.querySelector('#popup-artwork-info'),
        artworkInfoPopupImage: document.querySelector('#popup-artwork-info .image'),
        artworkInfoPopupTitle: document.querySelector('#popup-artwork-info .title'),
        artworkInfoPopupSubtitle: document.querySelector('#popup-artwork-info .subtitle'),
        artworkInfoPopupDesc: document.querySelector('#popup-artwork-info .desc'),
        artworkInfoPopupLink: document.querySelector('#popup-artwork-info .link'),
        artworkInfoPopupClose: document.querySelector('#popup-artwork-info-close'),
      }
    };

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

    // display default gallery (fallback)
    if (!this.el.preview && !this.el.featured) {
      this.el.default.classList.remove('hidden');
    }

    // events
    this.bindEvents();

    // get page from hash
    if (window.location.hash) {
      const id = `#page-${window.location.hash.replace('#', '')}`;
      const target = document.querySelector(`[data-target="${id}"]`);
      if (target) {
        target.click();
      }
    }

    // remove loading screen
    const loading = document.querySelector('.loading-screen');
    loading.classList.remove('active');
    setTimeout(() => {
      loading.parentNode.removeChild(loading);
    }, 500);
  }

  bindEvents() {
    // gallery open/ close
    this.el.openGallery.addEventListener('click', () => {
      this.onOpenGallery();
    });
    document.querySelectorAll('.close-gallery').forEach(el => {
      el.addEventListener('click', () => {
        this.onCloseGallery();
      });
    });

    // bind wrapper nav items
    document.querySelectorAll('.wrapper .nav__item').forEach(el => {
      el.addEventListener('click', evt => {
        this.onWrapperNavItem(evt.target);
      });
    });

    // bind archive
    this.el.archiveItems.forEach(el => {
      el.addEventListener('click', evt => {
        if (evt.target.tagName !== 'A') {
          const data = this.parseExhibitionDataTags(el);
          this.ref.gallery.load(data);
        }
      });
    });

    // bind gallery nav items
    this.el.gallery.navItemGallery.addEventListener('click', () => {
      this.closeControlsPopup();
      this.closeArtworkInfo();
    });
    this.el.gallery.navItemControls.addEventListener('click', evt => {
      if (evt.target.classList.contains('active')) {
        this.closeControlsPopup();
      } else {
        this.openControlsPopup();
        this.closeArtworkInfo();
      }
    });
    this.el.gallery.artworkInfoPopupClose.addEventListener('click', () => {
      this.closeArtworkInfo();
    });

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
    data.customValue = el.querySelector('.section__custom-value').dataset.customValue;

    return data;
  }

  onOpenGallery() {
    if (!this.el.openGallery.classList.contains('loading')) {
      this.el.openGallery.classList.remove('prompt-action');
      document.querySelector('html').classList.add('freeze');
      document.querySelector('.gallery').classList.add('active');
      document.querySelector('.wrapper').classList.remove('active');
      document.querySelector('.logo').classList.remove('active');
      document.documentElement.scrollTop = 0;
      setTimeout(() => {
        this.ref.gallery.start();
      }, 500);
    }
  }

  onCloseGallery() {
    this.ref.gallery.pause();
    document.querySelector('html').classList.remove('freeze');
    document.querySelector('.gallery').classList.remove('active');
    document.querySelector('.wrapper').classList.add('active');
    document.querySelector('.logo').classList.add('active');
  }

  openArtworkInfo(artwork) {
    // open popup
    if (!artwork.isArtworkMenuMine()) {
      this.el.gallery.artworkInfoPopup.dataset.id = artwork.id;
      this.el.gallery.artworkInfoPopupImage.innerHTML = `<img src="${artwork.data.url}"/>`;
      this.el.gallery.artworkInfoPopupTitle.innerHTML = artwork.data.title;
      this.el.gallery.artworkInfoPopupSubtitle.innerHTML = artwork.data.subTitle;
      this.el.gallery.artworkInfoPopupDesc.innerHTML = artwork.data.description;
      this.el.gallery.artworkInfoPopupLink.innerHTML = artwork.data.link ? `<a href='${artwork.data.link}' target='_blank'>Link</a>` : '';
    }
    this.el.gallery.artworkInfoPopup.classList.add('active');

    // rm controls & controls help, update nav
    this.el.gallery.controls.classList.remove('active');
    this.el.gallery.controlsPopup.classList.remove('active');
    this.el.gallery.navItemControls.classList.remove('active');
    this.el.gallery.navItemGallery.classList.add('active');
  }

  closeArtworkInfo() {
    this.el.gallery.artworkInfoPopup.classList.remove('active');
    this.el.gallery.controls.classList.add('active');
  }

  openControlsPopup() {
    // open controls popup, rm controls, update nav
    this.el.gallery.controlsPopup.classList.add('active');
    this.el.gallery.controls.classList.remove('active');
    this.el.gallery.navItemControls.classList.add('active');
    this.el.gallery.navItemGallery.classList.remove('active');
  }

  closeControlsPopup() {
    // rm controls popup, show controls, update nav
    this.el.gallery.controlsPopup.classList.remove('active');
    this.el.gallery.controls.classList.add('active');
    this.el.gallery.navItemControls.classList.remove('active');
    this.el.gallery.navItemGallery.classList.add('active');
  }

  onWrapperNavItem(el) {
    if (el.dataset.target) {
      const target = document.querySelector(el.dataset.target);
      if (target) {
        document.querySelectorAll('.page.active, .wrapper .nav__item.active').forEach(el => { el.classList.remove('active'); });
        target.classList.add('active');
        el.classList.add('active');
        window.location.hash = `${el.dataset.target.split('-')[1]}`;
      }
    }
  }
}

export default Nav;
