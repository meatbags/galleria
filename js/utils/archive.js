/**
 ** Handle archive loading.
 **/

class Archive {
  constructor(root) {
    this.root = root;
    this.active = false;

    // hook up archive ui
    document.querySelectorAll('.archive-item').forEach(e => {
      e.addEventListener('click', () => {
        this.loadArchive(e);
      })
    });
  }

  reloadCurrentExhibition() {
    if (this.active) {

    }
  }

  loadArchive(e) {
    const data = e.querySelector('.exhibition-data');
    if (data && !data.classList.contains('active-exhibition-data')) {
      this.active = true;

      // de-activate current exhibition data, activate archive
      document.querySelectorAll('.active-exhibition-data').forEach(active => { active.classList.remove('active-exhibition-data'); });
      data.classList.add('active-exhibition-data');

      // reload gallery
      this.root.surface.floorPlan.reloadExhibition();
      this.root.scene.map.reloadInstallation();
    }
  }
}

export { Archive };
