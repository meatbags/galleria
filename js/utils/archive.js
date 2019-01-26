/** Handle the gallery archive, trigger exhibition reloading. */

class Archive {
  constructor(root) {
    this.root = root;
    this.lock = false;
    this.active = false;

    // hook up archive ui
    document.querySelectorAll('.archive-item').forEach(e => {
      e.addEventListener('click', () => {
        this.loadArchive(e);
      })
    });

    // reference the current gallery
    this.featured = document.querySelector('.section-featured');
    if (this.featured) {
      this.featured.addEventListener('click', () => { this.reloadCurrentExhibition(); });
    }
  }

  /** Active exhibition. */
  activateGallery(data) {
    document.querySelectorAll('.active-exhibition-data').forEach(active => { active.classList.remove('active-exhibition-data'); });
    data.classList.add('active-exhibition-data');
    this.root.surface.floorPlan.reloadExhibition();
    this.root.scene.reloadExhibition();
  }

  /** Reload the current month's exhibition. */
  reloadCurrentExhibition() {
    const data = this.featured.querySelector('.exhibition-data');
    if (!this.lock && this.active && data) {
      this.active = false;
      this.lock = true;
      this.activateGallery(data);

      // notify user
      const target = document.querySelector('#open-gallery');
      target.innerHTML = 'Loading...';
      setTimeout(() => {
        target.classList.add('flash');
        target.innerHTML = '<span class="mobile-show">&larr;&nbsp;Open Gallery</span><span class="mobile-hide">Open Gallery</span>';
        this.lock = false;
      }, 500);

      // remove prompt
      this.featured.classList.remove('clickable');
    }
  }

  /** Unload the current exhibition and load archive exhibtion. */
  loadArchive(e) {
    const data = e.querySelector('.exhibition-data');
    if (!this.lock && data && !data.classList.contains('active-exhibition-data')) {
      this.active = true;
      this.lock = true;
      this.activateGallery(data);

      // notify user
      const target = document.querySelector('#open-gallery');
      target.innerHTML = 'Loading...';
      setTimeout(() => {
        target.classList.add('flash');
        target.innerHTML = '<span class="mobile-show">&larr;&nbsp;Open Archive</span><span class="mobile-hide">Open Archive</span>';
        this.lock = false;
      }, 500);

      // add prompts to reload original gallery
      this.featured.classList.add('clickable');
    }
  }
}

export { Archive };
