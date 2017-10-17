import { Materials } from './Materials';
import { v3 } from './Maths';
import { Focal } from './Focal';
import Globals from './Globals';

const Artworks = function() {
  this.sources = [];
  this.focalPoints = [];
  this.object = new THREE.Object3D();
  this.toLoad = 0;
};

Artworks.prototype = {
  add: function(title, description, url, image) {
    // add an image source

    this.sources.push({
      title: title,
      description: description,
      url: url,
      image: image,
    });
    this.toLoad += 1;
  },

  activate: function(artwork) {
    if (!artwork.active) {
      for (let i=0; i<this.focalPoints.length; i+=1) {
        if (this.focalPoints[i].id === artwork.id) {
          this.focalPoints[i].activate();
        } else {
          this.focalPoints[i].deactivate();
        }
      }

      // remove nav and show artwork information
      if (!$('#nav-default').hasClass('hidden')) {
        $('#nav-default').addClass('hidden');
      }

      // animate out and in
      let timeout = 1;

      if (!$('#nav-artwork').hasClass('hidden')) {
        $('#nav-artwork').addClass('hidden');
        timeout = 500;
      }

      setTimeout(function(){
        $('#nav-artwork .nav__title').text(artwork.source.title);
        $('#nav-artwork .nav__description').html(artwork.source.description);
        $('#nav-artwork .nav__links').html('<a target="_blank" href="' + artwork.source.url + '">Order print</a>');
        $('#nav-artwork').removeClass('hidden');
      }, timeout);
    }
  },

  deactivate: function() {
    // deactivate artworks
    for (let i=0; i<this.focalPoints.length; i+=1) {
      this.focalPoints[i].deactivate();
    }

    // show default nav
    if (!$('#nav-artwork').hasClass('hidden')) {
      $('#nav-artwork').addClass('hidden');
    }
    if ($('#nav-default').hasClass('hidden')) {
      $('#nav-default').removeClass('hidden');
    }
  },

  placeImages: function() {
    const self = this;
    const textureLoader = new THREE.TextureLoader();

    for (let i=0; i<this.sources.length; i+=1) {
      const index = i;
      const place = Globals.artworkPlacement[index];
      const id = 'UID' + i;

      // create collision object
      const focal = new Focal(id, place.position, v3(1, 1, 1), place.eye, this.sources[i]);
      self.focalPoints.push(focal);

      // create artwork mesh
      const mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1, 2, 2),
        Materials.canvas.clone()
      );
      const texture = textureLoader.load(this.sources[i].image, function(){
        self.toLoad -= 1;
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
      //self.object.add(focal.object);
    }
  },
}

export default Artworks;
