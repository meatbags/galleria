/** Site Navigation */

import CreateElement from '../utils/create_element';
import IsSafariMobile from '../utils/is_safari_mobile';
import IsMobileDevice from '../utils/is_mobile_device';
import Config from '../modules/config';

class Nav {
  constructor() {
    this.devMode = false;// true;
    this.isMobile = IsMobileDevice();
    this.el = {
      openGallery: document.querySelector('.open-gallery-prompt'),
      archiveItems: document.querySelectorAll('.section--archive'),
      preview: document.querySelector('.section--preview'),
      featured: document.querySelector('.section--featured'),
      default: document.querySelector('.section--default'),
      logo: document.querySelector('#logo'),
      gallery: {
        gallery: document.querySelector('.gallery'),
        controls: document.querySelector('#gallery-controls'),
        controlsPopup: document.querySelector('#popup-gallery-controls'),
        navItems: document.querySelector('.gallery .nav__item'),
        navItemGallery: document.querySelector('#nav-item-gallery'),
        navItemControls: document.querySelector('#nav-item-controls'),
        artworkInfoPopup: document.querySelector('#popup-artwork-info'),
        artworkInfoPopupInner: document.querySelector('#popup-artwork-info .popup-artwork-info__inner'),
        artworkInfoPopupDetails: document.querySelector('#popup-artwork-info .popup-artwork-info__details'),
        artworkInfoPopupImage: document.querySelector('#popup-artwork-info .image'),
        artworkInfoPopupTitle: document.querySelector('#popup-artwork-info .title'),
        artworkInfoPopupSubtitle: document.querySelector('#popup-artwork-info .subtitle'),
        artworkInfoPopupDesc: document.querySelector('#popup-artwork-info .desc'),
        artworkInfoPopupLink: document.querySelector('#popup-artwork-info .link'),
        artworkInfoPopupClose: document.querySelector('#popup-artwork-info-close'),
      }
    };

    // safari fix -- NOTE: check onscreen arrows Safari mobile
    if (IsSafariMobile()) {
      document.querySelectorAll('.fix-safari').forEach(el => { el.classList.add('safari'); });
    }
  }

  bind(root) {
    this.ref = {};
    this.ref.gallery = root.modules.gallery;
    this.ref.logo = root.modules.logo;

    // load initial exhibition
    const exhibition = this.el.preview ? this.el.preview : this.el.featured ? this.el.featured : this.el.default;
    let data = null;
    if (exhibition) {
      data = this.parseExhibitionDataTags(exhibition);
    }
    this.ref.gallery.load(data);

    // display default gallery (fallback)
    if (!this.el.preview && !this.el.featured && this.el.default) {
      this.el.default.classList.remove('hidden');
    }

    // dev -- open gallery
    if (this.devMode) {
      this.forceGalleryOpen();
    }

    // events
    this.bindEvents();

    // remove loading screen
    const loading = document.querySelector('.loading-screen');
    if (loading) {
      setTimeout(() => {
        loading.parentNode.removeChild(loading);
      }, 200);
    }
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

    // mobile menu
    document.querySelectorAll('.mobile-menu__item').forEach(el => {
      el.addEventListener('click', evt => {
        this.onMobileMenuItem(el);
      });
    })

    // bind archive
    this.el.archiveItems.forEach(el => {
      el.addEventListener('click', evt => {
        if (evt.target.tagName !== 'A') {
          const data = this.parseExhibitionDataTags(el);
          this.ref.gallery.load(data);

          // go to home page on mobile
          if (this.isMobile && window.innerWidth <= Config.mobileBreakpoint) {
            const target = document.querySelector('.mobile-menu__item[data-target="#page-home"]');
            if (target) {
              target.click();
            }
          }

          // enable featured click to reload
          const target = this.el.preview ? this.el.preview : this.el.featured ? this.el.featured : this.el.default;
          if (target && !target.classList.contains('clickable')) {
            target.classList.add('clickable');
            target.addEventListener('click', () => {
              const data = this.parseExhibitionDataTags(target);
              this.ref.gallery.load(data);
            });
          }
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
    this.el.gallery.controlsPopup.addEventListener('click', () => {
      this.closeControlsPopup();
    });
    this.el.gallery.artworkInfoPopupClose.addEventListener('click', () => {
      this.closeArtworkInfo();
    });
    this.el.gallery.artworkInfoPopup.addEventListener('click', evt => {
      this.closeArtworkInfo();
    });
    this.el.gallery.artworkInfoPopupDetails.addEventListener('click', evt => {
      evt.stopPropagation();
    });

    // bind mobile menu button
    document.querySelectorAll('.open-mobile-menu-button').forEach(el => {
      el.addEventListener('click', () => {
        if (el.classList.contains('active')) {
          this.closeMobileMenu();
        } else {
          this.openMobileMenu(el);
        }
      });
    });

    // trigger resize after orientationchange
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 500);
    });

    // get page from hash
    if (window.location.hash) {
      const id = `#page-${window.location.hash.replace('#', '')}`;
      const target = document.querySelector(`[data-target="${id}"]`);
      if (target) {
        target.click();
      }
    }
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
      res.imageWidth = parseInt(res.imageWidth);
      res.imageHeight = parseInt(res.imageHeight);
      data.images.push(res);
    });
    data.customValue = el.querySelector('.section__custom-value').dataset.customValue;

    return data;
  }

  onOpenGallery() {
    if (!this.el.openGallery.classList.contains('loading')) {
      this.ref.logo.pause();
      this.el.openGallery.classList.remove('prompt-action');
      document.querySelector('html').classList.add('freeze');
      document.querySelector('.wrapper').classList.remove('active');
      this.el.logo.classList.remove('active');
      document.querySelectorAll('.mobile-menu__item.active').forEach(el => { el.classList.remove('active'); });
      document.documentElement.scrollTop = 0;
      this.el.gallery.gallery.classList.add('transition');
      setTimeout(() => {
        this.el.gallery.gallery.classList.add('active');
      }, 100);
      setTimeout(() => {
        this.el.logo.classList.remove('transition');
        this.ref.gallery.start();
      }, 1000);

      // show controls on mobile
      if (this.isMobile && window.innerWidth <= Config.mobileBreakpoint) {
        this.openControlsPopup();
      }
    }
  }

  onCloseGallery() {
    this.ref.gallery.pause();
    this.ref.logo.start();
    this.closeArtworkInfo();
    document.querySelector('html').classList.remove('freeze');
    document.querySelector('.gallery').classList.remove('active');
    this.el.logo.classList.add('transition');
    setTimeout(() => {
      document.querySelector('.wrapper').classList.add('active');
      this.el.logo.classList.add('active');
    }, 100);
    setTimeout(() => {
      document.querySelector('.gallery').classList.remove('transition');
    }, 1100);
  }

  forceGalleryOpen() {
    this.ref.logo.pause();
    this.el.openGallery.classList.remove('prompt-action');
    document.querySelector('html').classList.add('freeze');
    document.querySelector('.wrapper').classList.remove('active');
    document.querySelector('.logo').classList.remove('active');
    document.documentElement.scrollTop = 0;
    this.el.gallery.gallery.classList.add('active');
    //this.el.gallery.gallery.classList.add('transition');
    this.ref.gallery.start();
  }

  openArtworkInfo(artwork) {
    // open popup
    if (!artwork.isArtworkMenuMine()) {
      // set details
      this.el.gallery.artworkInfoPopup.dataset.id = artwork.id;
      this.el.gallery.artworkInfoPopupTitle.innerHTML = artwork.data.title;
      this.el.gallery.artworkInfoPopupSubtitle.innerHTML = artwork.data.subTitle;
      this.el.gallery.artworkInfoPopupDesc.innerHTML = artwork.data.description;
      this.el.gallery.artworkInfoPopupLink.innerHTML = artwork.data.link ? `<a href='${artwork.data.link}' target='_blank'>Link</a>` : '';

      // set image
      if (artwork.data.imageHeight && artwork.data.imageWidth) {
        const w = artwork.data.imageWidth;
        const h = artwork.data.imageHeight;
        const ratio = w / h;
        const windowRatio = window.innerWidth / window.innerHeight;
        if (ratio < windowRatio) {
          const y = window.innerHeight * 0.75;
          const x = Math.min(y * (w / h), window.innerWidth * 0.95);
          this.el.gallery.artworkInfoPopupInner.style.width = `${Math.round(x)}px`;
          this.el.gallery.artworkInfoPopupInner.style.height = `${Math.round(y)}px`;
        } else {
          const x = window.innerWidth * 0.85;
          const y = Math.min(x * (h / w), window.innerHeight * 0.75);
          this.el.gallery.artworkInfoPopupInner.style.width = `${Math.round(x)}px`;
          this.el.gallery.artworkInfoPopupInner.style.height = `${Math.round(y)}px`;
        }

        this.el.gallery.artworkInfoPopupImage.innerHTML = `<img src="${artwork.data.url}"/>`;
      }
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

  openMobileMenu(el) {
    el.classList.add('active');
    const target = document.querySelector(el.dataset.target);
    if (target) {
      target.classList.add('active');
    }
  }

  closeMobileMenu() {
    document.querySelectorAll('.mobile-menu__button').forEach(el => { el.classList.remove('active'); });
    document.querySelectorAll('.mobile-menu').forEach(el => { el.classList.remove('active'); });
  }

  onMobileMenuItem(el) {
    if (el.dataset.target) {
      const target = document.querySelector(el.dataset.target);
      if (target) {
        document.querySelectorAll('.page.active, .mobile-menu__item').forEach(el => { el.classList.remove('active'); });
        target.classList.add('active');
        el.classList.add('active');
        window.location.hash = `${el.dataset.target.split('-')[1]}`;

        // close menu
        this.closeMobileMenu();

        // go to top
        document.documentElement.scrollTop = 0;

        // close gallery
        if (this.ref.gallery.active) {
          this.onCloseGallery();
        }

        // hide logo if not home
        if (el.dataset.target === '#page-home') {
          this.el.logo.classList.remove('hidden');
        } else {
          this.el.logo.classList.add('hidden');
        }
      }
    }
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
