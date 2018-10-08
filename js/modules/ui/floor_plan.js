/**
 ** Load, place and manage artworks.
 **/

import { InteractionNodeNote } from './interaction_nodes';
import { Artwork } from './artwork';

class FloorPlan {
  constructor(root) {
    this.root = root;
    this.player = this.root.scene.player;
    this.camera = this.root.scene.camera.camera;
    this.scene = this.root.scene.scene;
    this.centre = this.root.centre;
    this.cameraDirection = new THREE.Vector3();
    this.artworkActiveRadius = 10;
    this.artworks = [];
    this.isDev = window.location.host.indexOf('localhost') != -1;

    // get artworks
    var count = 0;
    document.querySelectorAll('#artworks .image').forEach(e => {
      this.artworks.push(new Artwork(this, ++count, e));
    });
    this.placeArtworks();
  }

  placeArtworks() {
    // 32
    const positions = [
      // brick wall (8)
      {x: -24, y: 4, z: 23, nx: 0, nz: -1}, {x: -10.5, y: 3.5, z: 23, nx: 0, nz: -1}, {x: -8, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: -5.5, y: 3.5, z: 23, nx: 0, nz: -1}, {x: 5.5, y: 3.5, z: 23, nx: 0, nz: -1}, {x: 8, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: 10.5, y: 3.5, z: 23, nx: 0, nz: -1}, {x: 24, y: 4, z: 23, nx: 0, nz: -1},
      // central block A (6)
      {x: -12, y: 3.5, z: 8, nx: 0, nz: 1}, {x: -8, y: 3.5, z: 8, nx: 0, nz: 1}, {x: -4, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: 4, y: 3.5, z: 8, nx: 0, nz: 1}, {x: 8, y: 3.5, z: 8, nx: 0, nz: 1}, {x: 12, y: 3.5, z: 8, nx: 0, nz: 1},
      // end walls (6)
      {x: -31, y: 4, z: 14, nx: 1, nz: 0}, {x: -29.5, y: 4, z: 6, nx: 1, nz: 0}, {x: -31, y: 4, z: -2, nx: 1, nz: 0},
      {x: 32, y: 4, z: 14, nx: -1, nz: 0}, {x: 30, y: 4, z: 6, nx: -1, nz: 0}, {x: 32, y: 4, z: -2, nx: -1, nz: 0},
      // central block B (6)
      {x: -12, y: 3.5, z: 4, nx: 0, nz: -1}, {x: -8, y: 3.5, z: 4, nx: 0, nz: -1}, {x: -4, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: 4, y: 3.5, z: 4, nx: 0, nz: -1}, {x: 8, y: 3.5, z: 4, nx: 0, nz: -1}, {x: 12, y: 3.5, z: 4, nx: 0, nz: -1},
      // white wall downstairs (2)
      {x: -8, y: 3.5, z: -11.5, nx: 0, nz: 1}, {x: 8, y: 3.5, z: -11.5, nx: 0, nz: 1},
      // upstairs (4)
      {x: -24, y: 11, z: -11, nx: 0, nz: 1, upstairs: true},  {x: -8, y: 11, z: -11.5, nx: 0, nz: 1, upstairs: true},
      {x: 8, y: 11, z: -11.5, nx: 0, nz: 1, upstairs: true}, {x: 24, y: 11, z: -11, nx: 0, nz: 1, upstairs: true}
    ];

    for (var i=0; i<this.artworks.length; i++) {
      const artwork = this.artworks[i];
      var p = null;

      // get position slot
      if (typeof(artwork.data.index) == 'number' && artwork.data.index < positions.length && positions[artwork.data.index].active == undefined) {
        p = positions[artwork.data.index];
        p.active = true;
      }

      // auto
      if (p == null) {
        for (var j=0; j<positions.length; j++) {
          if (!positions[j].active) {
            p = positions[j];
            p.active = true;
            break;
          }
        }
      }

      if (p != null) {
        const position = new THREE.Vector3(p.x, p.y, p.z);
        const direction = new THREE.Vector3(p.nx, 0, p.nz);
        artwork.init(this.scene, position, direction);
        if (p.upstairs !== undefined) {
          artwork.upstairs = true;
        }
      } else {
        console.log('Error: Duplicate artwork slot reference.');
        this.artworks.splice(i, 1);
        i -= 1;
      }
    }

    // placeholders
    if (this.isDev) {
      const mat = new THREE.MeshStandardMaterial({color: 0x0, roughness: 0.75, metalness: 0});
      positions.forEach(p => {
        if (!p.active) {
          const board = new THREE.Mesh(new THREE.BoxBufferGeometry(0.25, 0.25, 0.25), mat);
          board.position.set(p.x, p.y, p.z);
          this.scene.add(board);
        }
      });
    }
  }

  mouseOver(x, y) {
    var hover = false;
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      this.artworks[i].mouseOver(x, y, this.player.position);
      if (this.artworks[i].isHover()) {
        hover = true;
      }
    }

    if (hover) {
      this.root.domElement.classList.add('clickable');
    } else {
      this.root.domElement.classList.remove('clickable');
    }
  }

  click(x, y) {
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      this.artworks[i].click(x, y, this.player.position);
    }
  }

  openArtworkMenu(artwork) {
    /*
    this.domElement = document.querySelector('#artwork-target');
    this.el = {
      title: this.domElement.querySelector('.title'),
      subtitle: this.domElement.querySelector('.subtitle'),
      desc: this.domElement.querySelector('.desc'),
      link: this.domElement.querySelector('.link'),
    };
    if (res) {
      if (this.domElement.dataset.active === undefined || this.domElement.dataset.active != res.id || !this.domElement.classList.contains('active')) {
        this.domElement.dataset.active = res.id;
        this.domElement.classList.add('active');
        this.el.title.innerHTML = res.data.title;
        this.el.subtitle.innerHTML = res.data.subtitle;
        this.el.desc.innerHTML = res.data.desc;
        this.el.link.innerHTML = res.data.link ? `<a href='${res.data.link}' target='_blank'>Link</a>` : '';
      }
    } else {
      this.domElement.classList.remove('active');
    }
    */
  }

  update(delta) {
    // update artworks, notes
    this.camera.getWorldDirection(this.cameraDirection);
    for (var i=0; i<this.artworks.length; ++i) {
      this.artworks[i].update(delta, this.player, this.camera, this.cameraDirection, this.centre);
    }
  }

  draw(ctx) {
    // artwork interaction nodes
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      this.artworks[i].draw(ctx);
    }
  }
}

export { FloorPlan };
