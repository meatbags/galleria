import { Globals } from '../config';
import Artwork from './artwork';

class ArtworkHandler {
  constructor(root) {
    // artwork handler
    this.object = new THREE.Object3D();

    // generate artworks
    this.artworks = [];
    $('.im').each((i, e) => {
      this.artworks.push(
        new Artwork(this.object, this.newUid(), $(e), Globals.artworkPlacement[i])
      );
    });

    // add to scene
    this.root = root;
    this.$label = $('.label__inner');
    this.$label.data('id', 'id-none');
    this.root.add(this.object);
  }

  getCollisionBoxes() {
    // get artwork boxes
    return this.artworks.map((obj) => { return obj.getBox(); });
  }

  parseCollisions(res) {
    // handle collision data
    if (res.length) {
      this.hoverOver(res[0].object.uuid);
      $('.canvas-target').addClass('clickable');
    } else {
      this.deactivate();
      $('.canvas-target').removeClass('clickable');
    }
  }

  getEyeTarget(id) {
    // get eye target for player
    for (var i=this.artworks.length-1; i>-1; i--) {
      if (this.artworks[i].boxHasId(id)) {
        return this.artworks[i].getEyeTarget();
      }
    }

    return null;
  }

  hoverOver(id) {
    // activate artwork
    for (var i=this.artworks.length-1; i>-1; i--) {
      if (this.artworks[i].boxHasId(id)) {
        this.artworks[i].activate();
        this.artworks[i].activateText();
      } else {
        this.artworks[i].deactivate();
      }
    }
  }

  deactivate() {
    // deactivate all
    for (var i=this.artworks.length-1; i>-1; i--) {
      this.artworks[i].deactivate();
    }
  }

  update(playerPosition) {
    // update artwork animations
    var active = false;
    for (var i=this.artworks.length-1; i>-1; i--) {
      this.artworks[i].update(playerPosition);
      if (this.artworks[i].isTextActive() && !this.artworks[i].isActive()) {
        this.$label.html('_');
        this.$label.data('id', 'id-none');
      }
    }
  }

  newUid() {
    this.uid = this.uid ? this.uid + 1 : 1;
    return 'artwork-id-' + this.uid;
  }
}

export default ArtworkHandler;
