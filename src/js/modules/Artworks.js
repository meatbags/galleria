import { Materials } from './Loader';
import { v3 } from './Maths';
import { Focal } from './Focal';
import Globals from './Globals';

const Artworks = function() {
  this.sources = [];
  this.focalPoints = [];
  this.object = new THREE.Object3D();
};

Artworks.prototype = {
  add: function(title, caption, url, src) {
    // add an image source

    this.sources.push({
      title: title,
      caption: caption,
      url: url,
      src: src
    });
  },

  placeImages() {
    const self = this;
    const textureLoader = new THREE.TextureLoader();

    for (let i=0; i<this.sources.length; i+=1) {
      const index = i;
      const place = Globals.artworkPlacement[index];

      // add snap focal point
      self.focalPoints.push(new Focal(place.position, v3(1, 1, 1), place.eye));

      // create artwork mesh
      const mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1, 2, 2),
        Materials.canvas.clone()
      );
      const texture = textureLoader.load(this.sources[i].src, function(){
        mesh.scale.x = (texture.image.naturalWidth / 1000.) * place.scale;
        mesh.scale.y = (texture.image.naturalHeight / 1000.) * place.scale;
        self.focalPoints[index].scale(mesh.scale.x, mesh.scale.y, mesh.scale.x);
      });

      // apply texture
      mesh.material.map = texture;
      mesh.rotation.set(place.pitch, place.yaw, 0);
      mesh.position.set(place.position.x, place.position.y, place.position.z);

      // add to gallery
      self.object.add(mesh);
    }
  },
}

export default Artworks;
