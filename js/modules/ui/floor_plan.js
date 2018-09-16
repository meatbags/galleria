/**
 ** Load, place and manage artworks.
 **/

import { Artwork } from './artwork';

class FloorPlan {
  constructor(scene) {
    this.scene = scene;
    this.artworks = [];
    document.querySelectorAll('#artworks .image').forEach(e => { this.artworks.push(new Artwork(e)); });
    this.placeArtworks();
  }

  placeArtworks() {
    // total (17)
    const positions = [
      // brick wall (6)
      {x: 30, y: 4, z: 6, nx: -1, nz: 0},
      {x: -29.5, y: 4, z: 6, nx: 1, nz: 0},
      {x: -10.5, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: -8, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: -5.5, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: 5.5, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: 8, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: 10.5, y: 3.5, z: 23, nx: 0, nz: -1},
      // central block (12)
      {x: -12, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: -8, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: -4, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: 4, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: 8, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: 12, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: 12, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: 8, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: 4, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: -4, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: -8, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: -12, y: 3.5, z: 4, nx: 0, nz: -1},
      // white wall downstairs (2)
      {x: -8, y: 3.5, z: -11.5, nx: 0, nz: 1},
      {x: 8, y: 3.5, z: -11.5, nx: 0, nz: 1},
      // upstairs (2)
      {x: -8, y: 11, z: -11.5, nx: 0, nz: 1},
      {x: 8, y: 11, z: -11.5, nx: 0, nz: 1},
      // front & back wall (2)


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
}

export { FloorPlan };
