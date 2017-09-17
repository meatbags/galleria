import { Materials } from './Loader';

const Artwork = function() {
  this.sources = [];
  this.object = new THREE.Object3D();
};

Artwork.prototype = {
  add: function(image, title, description, link) {
    // add an image source

    this.sources.push({
      image: image,
      title: title,
      description: description,
      link: link,
    });
  },

  convertTo3D() {
    for (let i=0; i<this.sources.length; i+=1) {
      const src = this.sources[i];

      // create plane
      const mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1, 2, 2),
        Materials.canvas
      );

      // create texture from image element
      const texture = App.textureLoader.load(src.image, function(){
        mesh.scale.x = texture.image.naturalWidth / 1000.;
        mesh.scale.y = texture.image.naturalHeight / 1000.;
      });

      // apply texture and transforms
      mesh.material.map = texture;
      mesh.rotation.set(0, Math.PI * 0.5, 0);
      mesh.position.set(-1, 1.8, i * 2);

      // add to gallery
      this.object.add(mesh);
    }
  },
}

export default Artwork;
