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
        new Artwork(this.object, $(e), Globals.artworkPlacement[i])
      );
    });

    // add to scene

    this.root = root;
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

    for (let i=this.artworks.length-1; i>-1; i--) {
      if (this.artworks[i].boxHasId(id)) {
        return this.artworks[i].getEyeTarget();
      }
    }

    return null;
  }

  hoverOver(id) {
    // activate artwork with id

    for (let i=this.artworks.length-1; i>-1; i--) {
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

    for (let i=this.artworks.length-1; i>-1; i--) {
      this.artworks[i].deactivate();
    }
  }

  update(playerPosition) {
    // update artwork animations

    for (let i=this.artworks.length-1; i>-1; i--) {
      this.artworks[i].update(playerPosition);
    }
  }
}

export default ArtworkHandler;
