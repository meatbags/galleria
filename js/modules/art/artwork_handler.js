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

  activate(id) {
    // activate artwork with id

    for (let i=this.artworks.length-1; i>-1; i--) {
      if (this.artworks[i].meshHasId(id)) {
        this.artworks[i].activate();
      }
    }
  }

  update() {

  }
}

export default ArtworkHandler;
