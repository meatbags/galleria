/** Custom exhibition */

import Loader from '../../loader/loader';
import InteractionPoint from '../../ui/interaction_point';
import { EaseInAndOut } from '../../maths/easing';
import PlayerPosition from '../../ui/player_position';
import PerlinNoise from '../../glsl/fragments/perlin_noise';
import IntestineVertexShader from '../../glsl/fragments/intestine_vertex_shader';
import WavesShader from '../../glsl/fragments/waves_shader';

class CustomXavier {
  constructor(root) {
    this.loader = new Loader('assets/xavier');
    this.ref = {
      scene: root.ref.scene,
      materials: root.ref.materials,
      camera: root.ref.camera,
      player: root.ref.player,
      canvas2d: root.ref.canvas2d,
    };
  }

  load() {
    return new Promise((resolve, reject) => {
      this.toLoad = 0;
      this.onLoad = () => {
        if (--this.toLoad <= 0) {
          resolve();
        }
      };

      // containers
      this.interactionPoints = [];
      this.updateCallbacks = [];
      this.meshes = [];

      // load peripherals & async artworks
      this.toLoad += 1;
      this.loader.loadFBX('final/peripherals').then(obj => {
        this.ref.materials.conformGroup(obj);
        this.ref.scene.scene.add(obj);
        this.meshes.push(obj);
        this.applyToMeshes(obj, mesh => {
          if (mesh.material.name.indexOf("transparent") !== -1) {
            this.ref.materials.applyAlphaMap(mesh.material, mesh.material.map);
            mesh.material.side = THREE.DoubleSide;
          }
        });
        this.onLoad();
      });

      // settings
      this.envMap = this.ref.materials.createEnvMap('xavier/env');

      // load sync artworks
      this.loadVectorField();
      this.loadExploders();
      this.loadOscillators();
      this.loadIntersectors();
      this.loadPlatformer();
      this.loadGameOfLife();
      this.loadPulses();
      this.loadMez();
    });
  }

  loadVectorField() {
    const fields = [];
    const fieldCentre = new THREE.Vector3(-8, 4.5, 8);
    this.updateCallbacks.push(delta => {
      if (
        this.ref.player.position.z > 8 &&
        Math.abs(this.ref.player.position.x - fieldCentre.x) <= 16 &&
        Math.cos(this.ref.player.rotation.x) < 0.5
      ) {
        const amt = delta * Math.PI / 8;
        fields.forEach(mesh => {
          mesh.rotation.x += amt;
          mesh.rotation.y -= amt;
          mesh.rotation.z += amt;
        });
      }
    });

    const step = 0.25;
    const w = 10.75;
    const h = 4;
    for (let x=fieldCentre.x - w/2; x <= fieldCentre.x + w/2; x+=step) {
      for (let y=fieldCentre.y - h/2; y<= fieldCentre.y + h/2; y+=step) {
        const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(0.045, 0.25, 0.045), this.ref.materials.mat.neon);
        const rx = Math.sin((x + y) / 5) * Math.PI;
        const ry = Math.cos(x /5 ) * Math.PI;
        const rz = Math.sin((x * 2 + y / 2) / 5) * Math.PI;
        mesh.rotation.set(rx, ry, rz);
        mesh.position.set(x, y, 8.05);
        this.ref.scene.scene.add(mesh);
        this.meshes.push(mesh);
        fields.push(mesh);
      }
    }

    // view point
    const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(-8, 0.5, 14), fieldCentre);
    this.interactionPoints.push(
      new InteractionPoint(fieldCentre, 4, 3, () => { pos.apply(); }, this.ref.camera.camera, new THREE.Vector3(0, 0, 1))
    );
  }

  loadExploders() {
    // create particles
    const w = 10.75;
    const h = 4;
    const snap = 0.5;
    const particles = [];
    const centre = new THREE.Vector3(8, 4.5, 8);
    for (let i=0; i<130; ++i) {
      const group = new THREE.Group();
      const size = 0.25;
      const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(0.05 + size, 0.05, 0.05), this.ref.materials.mat.neon);
      const mesh2 = new THREE.Mesh(new THREE.BoxBufferGeometry(0.05, 0.05 + size, 0.05), this.ref.materials.mat.neon);
      group.add(mesh);
      group.add(mesh2);
      const x = (Math.random() - 0.5) * w;
      const y = (Math.random() - 0.5) * h;
      group.position.set(centre.x + x, centre.y + y, centre.z);
      group.vec = new THREE.Vector2();
      group.rotation.z = Math.random() > 0.5 ? Math.PI / 4 : 0;
      this.ref.scene.scene.add(group);
      this.meshes.push(group);
      particles.push(group);
    }

    let age = 0;
    const friction = 0.4;
    this.updateCallbacks.push(delta => {
      if (
        this.ref.player.position.z > 8 &&
        Math.abs(this.ref.player.position.x - centre.x) <= 12 &&
        Math.cos(this.ref.player.rotation.x) < 0.5
      ) {
        // explode
        age += delta;
        if (age > 1) {
          const epicentre = new THREE.Vector3(centre.x + (Math.random() - 0.5) * w, centre.y + (Math.random() - 0.5) * h, centre.z);
          const radius = 0.5 + Math.random() * 3.5;
          particles.forEach(p => {
            const mag = p.position.distanceTo(epicentre);
            if (mag <= radius) {
              p.vec.set(p.position.x - epicentre.x, p.position.y - epicentre.y);
              p.vec.normalize();
              p.vec.multiplyScalar((radius - mag) * 2);
            }
          });
          age -= 1;
        }

        // motion
        particles.forEach(p => {
          p.position.x += p.vec.x * delta;
          p.position.y += p.vec.y * delta;
          p.rotation.z += (p.vec.x + p.vec.y) * delta;
          // limit
          if (Math.abs(p.position.x - centre.x) > w/2) {
            p.vec.x *= -1;
            p.position.x += p.vec.x * delta;
          }
          if (Math.abs(p.position.y - centre.y) > h/2) {
            p.vec.y *= -1;
            p.position.y += p.vec.y * delta;
          }
          // friction
          p.vec.x -= p.vec.x * friction * delta;
          p.vec.y -= p.vec.y * friction * delta;
        });
      }
    });

    // view point
    const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(8, 0.5, 14), centre);
    this.interactionPoints.push(
      new InteractionPoint(centre, 4, 3, () => { pos.apply(); }, this.ref.camera.camera, new THREE.Vector3(0, 0, 1))
    );
  }

  loadOscillators() {
    const group = [];
    let age = 0;
    this.updateCallbacks.push(delta => {
      if (this.ref.player.position.z > 8 && Math.abs(this.ref.player.position.x + 8) <= 16) {
        age += delta;
        for (let i=0; i<group.length; i++) {
          const f = age + i * 0.125;
          const t = (f % 2) / 2;
          const ease = EaseInAndOut((f % 4 < 2) ? 1 - t : t);
          const max = 0.3 + (i % 3) * 0.3;
          group[i].position.z = 23 - max * ease;
        }
      }
    });

    this.loader.loadFBX('final/oscillators/oscillators').then(obj => {
      this.ref.materials.conformGroup(obj);
      this.ref.scene.scene.add(obj);
      this.meshes.push(obj);
      let index = 1;
      this.applyToMeshes(obj, mesh => {
        mesh.scale.x = Math.random() > 0.5 ? 0.85 : 0.95;
        mesh.scale.y = Math.random() > 0.5 ? 0.85 : 0.95;
        group.push(mesh);
      });
      group.reverse();
    });

    // view point
    const centre = new THREE.Vector3(-8, 7.75, 23);
    const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(-8, 0.5, 14), centre);
    this.interactionPoints.push(
      new InteractionPoint(centre, 3, 6, () => { pos.apply(); }, this.ref.camera.camera, new THREE.Vector3(0, 0, -1))
    );
  }

  loadIntersectors() {
    const group = [];
    const min = 2.75;
    const max = 14.75;
    const range = max - min;

    // create bars
    for (let y=min; y<max; y+=0.125) {
      const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(3, 0.05, 0.05), this.ref.materials.mat.neon);
      mesh.position.set(8, y, 23);
      this.ref.scene.scene.add(mesh);
      this.meshes.push(mesh);
      group.push(mesh);
    };

    // group update callback
    const updateCallback = delta => {
      for (let i=0; i<group.length; ++i) {
        const mesh = group[i];
        mesh.position.y -= delta;
        if (mesh.position.y <= min) {
          mesh.position.y += range;
        }
        let t = 1 - (mesh.position.y - min) / range;
        t = i % 6 == 0 ? Math.sin(t * Math.PI) : t;
        mesh.scale.x = Math.max(0.001, t);
        mesh.position.x = 8 + (i % 2 ? 1 : -1) * (1 - t) * 1.5;
      }
    };
    this.updateCallbacks.push(delta => {
      if (this.ref.player.position.z > 8 && Math.abs(this.ref.player.position.x - 8) <= 32) {
        updateCallback(delta);
      }
    });

    // view point
    const centre = new THREE.Vector3(8, 7.75, 23);
    const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(8, 0.5, 14), centre);
    this.interactionPoints.push(
      new InteractionPoint(centre, 3, 6, () => { pos.apply(); }, this.ref.camera.camera, new THREE.Vector3(0, 0, -1))
    );
  }

  loadPlatformer() {
    const rotate = [];
    this.updateCallbacks.push(delta => {
      if (this.ref.player.position.z < 6) {
        rotate.forEach(mesh => {
          mesh.rotation.x -= delta * Math.PI / 12;
          if (Math.random() > 0.99) {
            mesh.material.emissiveIntensity = mesh.material.emissiveIntensity == 1 ? 0 : 1;
          }
        });
      }
    });

    this.loader.loadFBX('final/platformer/platformer').then(obj => {
      this.ref.materials.conformGroup(obj);
      this.applyToMeshes(obj, mesh => {
        mesh.material = mesh.material.clone();
        mesh.material.envMapIntensity = 0.25;
        mesh.material.emissive.setHex(0xffffff);
        if (mesh.name.indexOf('no_rotate') == -1) {
          mesh.material.envMap = this.envMap;
          mesh.material.envMapIntensity = 0.125;
          mesh.rotation.x = Math.random() * Math.PI * 2;
          rotate.push(mesh);
        }
      });
      this.ref.scene.scene.add(obj);
      this.meshes.push(obj);
    });

    // view point
    const pos1 = new PlayerPosition(this.ref.player, new THREE.Vector3(8, 0.5, -6), new THREE.Vector3(8, 4.5, -12));
    const pos2 = new PlayerPosition(this.ref.player, new THREE.Vector3(-8, 0.5, -6), new THREE.Vector3(-8, 4.5, -12));
    this.interactionPoints.push(
      new InteractionPoint( new THREE.Vector3(8, 4.5, -12), 2, 2, () => { pos1.apply(); }, this.ref.camera.camera, new THREE.Vector3(0, 0, 1)),
      new InteractionPoint( new THREE.Vector3(-8, 4.5, -12), 2, 2, () => { pos2.apply(); }, this.ref.camera.camera, new THREE.Vector3(0, 0, 1))
    );
  }

  loadGameOfLife() {
    // settings
    const centre = new THREE.Vector3(-8, 4.5, 4);
    const step = 0.5;
    const width = 10;
    const height = 3.5;
    const limX = Math.ceil(width / step) + 1;
    const limY = Math.ceil(height / step) + 1;
    const cells = [];

    // init cells
    for (let y=0; y<limY; ++y) {
      for (let x=0; x<limX; ++x) {
        const x1 = centre.x - width / 2 + step * x;
        const y1 = centre.y - height / 2 + step * y;
        const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(step, step), this.ref.materials.mat.neon);
        mesh.position.set(x1, y1, 3.95);
        mesh.rotation.x = Math.PI;
        mesh.state = {
          alive: Math.random() > 0.75 ? 1 : 0,
          nextAlive: 0, x: x, y: y, x1: x1, x2: x1 + 16,
        };
        this.ref.scene.scene.add(mesh);
        this.meshes.push(mesh);
        cells.push(mesh);
      }
    }

    // get cell
    const setCell = (x, y) => {
      x = x < 0 ? x + limX : x >= limX ? x - limX : x;
      y = y < 0 ? y + limY : y >= limY ? y - limY : y;
      cells[y * limX + x].state.alive = 1;
    };
    const getCell = (x, y) => {
      x = x < 0 ? x + limX : x >= limX ? x - limX : x;
      y = y < 0 ? y + limY : y >= limY ? y - limY : y;
      return cells[y * limX + x].state.alive;
    };
    const getScore = (x, y) => {
      return getCell(x-1, y-1) + getCell(x, y-1) + getCell(x+1, y-1) +
        getCell(x-1, y) + getCell(x+1, y) + getCell(x-1, y+1) +
        getCell(x, y+1) + getCell(x+1, y+1);
    };

    // update func
    let age = 0;
    let timeout = 10;
    let threshold = 0.18;
    const callback = delta => {
      age += delta;
      timeout -= delta;

      // run simulation
      if (age >= threshold) {
        age -= threshold;
        cells.forEach(cell => {
          const score = getScore(cell.state.x, cell.state.y);
          cell.state.nextAlive = score == 3 || (score == 2 && cell.state.alive) ? 1 : 0;
        });
        cells.forEach(cell => {
          cell.state.alive = cell.state.nextAlive;
          if (cell.state.alive) {
            cell.position.x = cell.state.x1;
          } else {
            cell.position.x = cell.state.x2;
            cell.scale.x
          }
        });
      }

      // create life
      if (timeout < 0) {
        timeout += 10;
        const startX = Math.floor(limX / 2 - 4);
        const startY = Math.floor(limY / 2 - 4);
        for (let x=startX; x<startX+8; x++) {
          for (let y=startY; y<startY+8; y++) {
            if (Math.random() > 0.5) {
              setCell(x, y);
            }
          }
        }
      }
    };
    this.updateCallbacks.push(delta => {
      if (
        this.ref.player.position.z < 4 &&
        this.ref.player.position.x < 18 &&
        this.ref.player.position.x > -18 &&
        Math.cos(this.ref.player.rotation.x) > -0.4
      ) {
        callback(delta)
      }
    });

    // view point
    const centre2 = new THREE.Vector3(centre.x + 16, centre.y, centre.z);
    const pos1 = new PlayerPosition(this.ref.player, new THREE.Vector3(-8, 0.5, -2), centre);
    const pos2 = new PlayerPosition(this.ref.player, new THREE.Vector3(8, 0.5, -2), centre2);
    this.interactionPoints.push(
      new InteractionPoint(centre, 4, 3, () => { pos1.apply(); }, this.ref.camera.camera, new THREE.Vector3(0, 0, -1)),
      new InteractionPoint(centre2, 4, 3, () => { pos2.apply(); }, this.ref.camera.camera, new THREE.Vector3(0, 0, -1))
    );

    // call once
    callback(threshold);
  }

  loadPulses() {
    const mesh1 = new THREE.Mesh(new THREE.BoxBufferGeometry(0.125, 0.5, 0.5), this.ref.materials.mat.neon);
    const mesh2 = new THREE.Mesh(new THREE.BoxBufferGeometry(0.125, 0.5, 0.5), this.ref.materials.mat.neon);
    mesh1.position.set(30.375, 5.625, 14);
    mesh2.position.set(30.375, 11.625, 14);
    this.ref.scene.scene.add(mesh1);
    this.ref.scene.scene.add(mesh2);
    this.meshes.push(mesh1);
    this.meshes.push(mesh2);

    // update callback
    const centre = new THREE.Vector3(30.275, 8.625, 14);
    const max = 24;
    const min = 8;
    const range = max - min;
    this.updateCallbacks.push(delta => {
      if (this.ref.player.position.x > 0) {
        const mag = this.ref.player.position.distanceTo(centre);
        const t = (mag < max) ? (mag > min ? 1 - ((mag - min) / range) : 1) : 0;
        const s1 = 1 + (t * 3) + (Math.random() * t * 0.5);
        const s2 = 1 + (t * 3) + (Math.random() * t * 0.5);
        mesh1.scale.set(1, s1, s1);
        mesh2.scale.set(1, s2, s2);
      }
    });

    // view point
    const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(20, 1, 14), centre);
    this.interactionPoints.push(
      new InteractionPoint(centre, 3, 4, () => { pos.apply(); }, this.ref.camera.camera, new THREE.Vector3(-1, 0, 0))
    );
  }

  loadMez() {
    const group1 = [];
    const group2 = [];
    const step = 0.25;
    const y1 = 9.425 + step * 2;
    const y2 = 13.925 - step * 3;
    let x = 8 - (y2 - y1) / 2;
    for (let y=y1; y<=y2; y+=step) {
      const mesh1 = new THREE.Mesh(new THREE.BoxBufferGeometry(4.4, 0.075, 0.075), this.ref.materials.mat.neon);
      const mesh2 = new THREE.Mesh(new THREE.BoxBufferGeometry(0.075, 4.3, 0.075), this.ref.materials.mat.neon);
      mesh1.position.set(-8, y, -11.5);
      mesh2.position.set(x, 11.75, -11.5);
      mesh1.refY = y;
      mesh2.refX = x;
      this.ref.scene.scene.add(mesh1);
      this.ref.scene.scene.add(mesh2);
      this.meshes.push(mesh1);
      this.meshes.push(mesh2);
      group1.push(mesh1);
      group2.push(mesh2);
      x += step;
    }

    // update
    let age = 0;
    const callback = delta => {
      age += delta;
      group1.forEach(mesh => {
        const t = Math.sin((mesh.refY + age) * Math.PI / 2);
        mesh.position.y = mesh.refY + t * 0.25;
      });
      group2.forEach(mesh => {
        const t = Math.sin((mesh.refX + age) * Math.PI / 2);
        mesh.position.x = mesh.refX + t * 0.25;
      });
    };
    this.updateCallbacks.push(delta => {
      if (this.ref.player.position.z < 6 && Math.cos(this.ref.player.rotation.x) < 0.5) {
        callback(delta);
      }
    });
    callback(0);

    // view point
    const pos1 = new PlayerPosition(this.ref.player, new THREE.Vector3(8, 7.7, -6), new THREE.Vector3(8, 11.675, -12));
    const pos2 = new PlayerPosition(this.ref.player, new THREE.Vector3(-8, 7.7, -6), new THREE.Vector3(-8, 11.675, -12));
    this.interactionPoints.push(
      new InteractionPoint( new THREE.Vector3(8, 11.675, -12), 2, 2, () => { pos1.apply(); }, this.ref.camera.camera, new THREE.Vector3(0, 0, 1)),
      new InteractionPoint( new THREE.Vector3(-8, 11.675, -12), 2, 2, () => { pos2.apply(); }, this.ref.camera.camera, new THREE.Vector3(0, 0, 1))
    );
  }

  unload() {
    this.interactionPoints.forEach(point => { point.delete(); });
    this.meshes.forEach(mesh => { this.ref.scene.scene.remove(mesh); });
  }

  isLoaded() {
    return this.toLoad <= 0;
  }

  applyToMeshes(obj, callback) {
    // apply function to meshes contained in object
    if (obj.isMesh) {
      callback(obj);
    } else if (obj.children) {
      obj.children.forEach(child => {
        this.applyToMeshes(child, callback);
      });
    }
  }

  mouseMove(x, y) {
    let res = false;
    if (this.interactionPoints) {
      this.interactionPoints.forEach(point => {
        res = point.mouseMove(x, y) || res;
      });
    }
    return res;
  }

  click(x, y) {
    if (this.interactionPoints) {
      const hovered = [];
      this.interactionPoints.forEach(point => {
        if (point.mouseMove(x, y)) {
          hovered.push(point);
        }
      });
      const point = this.getNearest(hovered);
      if (point) {
        point.click(x, y);
      }
    }
  }

  getNearest(nodes) {
    let res = null;
    let dist = null;
    nodes.forEach(node => {
      const d = node.position.distanceTo(this.ref.player.position);
      if (dist === null || d < dist) {
        res = node;
        dist = d;
      }
    });
    return res;
  }

  update(delta) {
    if (this.ribbons) {}
    if (this.interactionPoints) {
      this.interactionPoints.forEach(point => {
        point.update();
      });
    }
    this.updateCallbacks.forEach(callback => {
      callback(delta);
    });
  }

  render() {
    if (this.interactionPoints) {
      const ctx = this.ref.canvas2d.ctx;
      ctx.globalAlpha = 1;
      const hovered = [];
      this.interactionPoints.forEach(point => {
        if (point.onscreen && point.hover) {
          hovered.push(point);
        }
      });
      const point = this.getNearest(hovered);
      if (point) {
        this.ref.canvas2d.drawBoxHint(point.box.position.x, point.box.position.y, point.box.width / 2, point.box.height / 2, 5, point.label);
      }
    }
  }
}

export default CustomXavier;
