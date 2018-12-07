/**
 ** Handle archive loading and data.
 **/

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

    this.featured = document.querySelector('.section-featured');
    this.featured.addEventListener('click', () => { this.reloadCurrentExhibition(); });
  }

  activateGallery(data) {
    // activate gallery data and reload
    document.querySelectorAll('.active-exhibition-data').forEach(active => { active.classList.remove('active-exhibition-data'); });
    data.classList.add('active-exhibition-data');

    // reload gallery
    this.root.surface.floorPlan.reloadExhibition();
    this.root.scene.map.reloadInstallation();
    this.root.scene.player.resetPosition();
  }

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
