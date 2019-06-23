/** Archive loading */

class Archive {
  constructor(root) {
    this.lock = false;
    this.active = false;

    // ?
    this.el = {
      archives: document.querySelectorAll('.archive'),
      featured: document.querySelector('.section-featured'),
    };

    // hook up archive ui
    document.querySelectorAll('.archive-item').forEach(el => {
      el.addEventListener('click', () => {
        this.loadExhibitionFromArchive(el);
      })
    });

    // reference the current gallery
    if (this.el.featured) {
      this.el.featured.addEventListener('click', () => {
        this.reloadCurrentFeaturedExhibition();
      });
    }
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene;
    this.ref.floorPlan = root.modules.floorPlan;
    this.ref.map = root.modules.map;
    this.ref.lighting = root.modules.lighting;
    this.ref.player = root.modules.player;
  }

  loadExhibition(data) {
    document.querySelectorAll('.active-exhibition-data').forEach(active => { active.classList.remove('active-exhibition-data'); });
    data.classList.add('active-exhibition-data');

    // reload scene first
    this.ref.scene.onReload();

    // reload other modules
    this.ref.floorPlan.onReload();
    this.ref.map.onReload();
    this.ref.lighting.onReload();
    this.ref.player.onReload();
  }

  reloadCurrentFeaturedExhibition() {
    const data = this.el.featured.querySelector('.exhibition-data');

    // load
    if (!this.lock && this.active && data) {
      this.active = false;
      this.lock = true;
      this.loadExhibition(data);

      // notify user
      const target = document.querySelector('#open-gallery');
      target.innerHTML = 'Loading...';
      setTimeout(() => {
        target.classList.add('flash');
        target.innerHTML = '<span class="mobile-show">&larr;&nbsp;Open Gallery</span><span class="mobile-hide">Open Gallery</span>';
        this.lock = false;
      }, 500);

      // remove prompt
      this.el.featured.classList.remove('clickable');
    }
  }

  loadExhibitionFromArchive(el) {
    const data = el.querySelector('.exhibition-data');

    // load
    if (!this.lock && data && !data.classList.contains('active-exhibition-data')) {
      this.active = true;
      this.lock = true;
      this.loadExhibition(data);

      // notify user
      const target = document.querySelector('#open-gallery');
      target.innerHTML = 'Loading...';
      setTimeout(() => {
        target.classList.add('flash');
        target.innerHTML = '<span class="mobile-show">&larr;&nbsp;Open Archive</span><span class="mobile-hide">Open Archive</span>';
        this.lock = false;
      }, 500);

      // add prompts to reload original gallery
      // this.el.featured.classList.add('clickable');
    }
  }
}

export default Archive;
