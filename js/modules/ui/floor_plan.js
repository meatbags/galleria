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
    this.artworkActiveRadius = 7;
    this.artworks = [];

    // get artworks
    var count = 0;
    document.querySelectorAll('#artworks .image').forEach(e => { this.artworks.push(new Artwork(++count, e)); });
    this.placeArtworks();

    // doc
    this.domElement = document.querySelector('#artwork-target');
    this.el = {
      title: this.domElement.querySelector('.title'),
      subtitle: this.domElement.querySelector('.subtitle'),
      desc: this.domElement.querySelector('.desc'),
      link: this.domElement.querySelector('.link'),
    };

    // make notes
    this.notes = [];
    this.notes.push(
      new InteractionNodeNote('[ logo here ]', new THREE.Vector3(28, 12, 6), null),
      new InteractionNodeNote('[ door here ]', new THREE.Vector3(-28, 5, 15), null)
    );
  }

  placeArtworks() {
    // 26
    const positions = [
      // brick wall (8)
      {x: -24, y: 4, z: 23, nx: 0, nz: -1},
      {x: -10.5, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: -8, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: -5.5, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: 5.5, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: 8, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: 10.5, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: 24, y: 4, z: 23, nx: 0, nz: -1},
      // central block A (6)
      {x: -12, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: -8, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: -4, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: 4, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: 8, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: 12, y: 3.5, z: 8, nx: 0, nz: 1},
      // end walls (2)
      {x: -29.5, y: 4, z: 6, nx: 1, nz: 0},
      {x: 30, y: 4, z: 6, nx: -1, nz: 0},
      // central block B (6)
      {x: -12, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: -8, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: -4, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: 4, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: 8, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: 12, y: 3.5, z: 4, nx: 0, nz: -1},
      // white wall downstairs (2)
      {x: -8, y: 3.5, z: -11.5, nx: 0, nz: 1},
      {x: 8, y: 3.5, z: -11.5, nx: 0, nz: 1},
      // upstairs (2)
      {x: -8, y: 11, z: -11.5, nx: 0, nz: 1},
      {x: 8, y: 11, z: -11.5, nx: 0, nz: 1},
    ];

    this.artworks.forEach(artwork => {
      var p = false;

      // get position slot
      if (typeof(artwork.data.index) != 'number') {
        for (var i=0; i<positions.length; ++i) {
          if (!positions[i].active) {
            p = positions[i];
            p.active = true;
            break;
          }
        }
      } else {
        if (artwork.data.index < positions.length && !positions[artwork.data.index].active) {
          p = positions[artwork.data.index];
          p.active = true;
        }
      }

      if (p) {
        const position = new THREE.Vector3(p.x, p.y, p.z);
        const direction = new THREE.Vector3(p.nx, 0, p.nz);
        artwork.init(this.scene, position, direction);
      }
    });

    // placeholders
    const mat = new THREE.MeshStandardMaterial({color: 0x0, roughness: 0.75, metalness: 0});
    positions.forEach(p => {
      if (!p.active) {
        const board = new THREE.Mesh(new THREE.BoxBufferGeometry(0.25, 0.25, 0.25), mat);
        board.position.set(p.x, p.y, p.z);
        this.scene.add(board);
      }
    })
  }

  mouseOver(x, y) {
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      this.artworks[i].node.mouseOver(x, y);
    }
  }

  update(delta) {
    // get closest artwork, update interaction nodes, get active artwork node
    this.camera.getWorldDirection(this.cameraDirection);
    var res = false;
    var maxDot = -1;
    this.activeArtwork = null;

    for (var i=0; i<this.artworks.length; ++i) {
      // check if artwork in range, facing camera
      if (this.artworks[i].getDistanceTo(this.camera.position) < this.artworkActiveRadius) {
        const dot = this.artworks[i].getCameraDot(this.camera.position, this.cameraDirection);
        if (dot >= 0 && dot > maxDot) {
          maxDot = dot;
          res = this.artworks[i];
        }
      }

      // update node
      this.artworks[i].node.update(delta, this.player, this.camera, this.cameraDirection, this.centre);
      if (this.artworks[i].node.isHover()) {
        this.activeArtwork = this.artworks[i];
      }
    }

    // display
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

    // update notes
    for (var i=0, len=this.notes.length; i<len; ++i) {
      this.notes[i].update(this.camera, this.cameraDirection, this.centre);
    }
  }

  draw(cvs) {
    // artwork interaction nodes
    for (var i=0, len=this.artworks.length; i<len; ++i) {
      cvs.drawNode(this.artworks[i].node);
    }

    // notes
    for (var i=0, len=this.notes.length; i<len; ++i) {
      cvs.drawNode(this.notes[i]);
    }
  }
}

export { FloorPlan };
