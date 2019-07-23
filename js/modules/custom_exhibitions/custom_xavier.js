/** Custom exhibition */

import Loader from '../../loader/loader';
import PerlinNoise from '../../glsl/fragments/perlin_noise';
import InteractionPoint from '../../ui/interaction_point';
import PlayerPosition from '../../ui/player_position';

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
        this.toLoad -=1;
        if (this.toLoad <= 0) {
          resolve();
        }
      };

      // containers
      this.interactionPoints = [];
      this.updateCallbacks = [];

      // load
      this.loadIntestines();
      //this.loadRibbons();
      this.loadDisplayCases();
      this.loadStatic();
    });
  }

  isLoaded() {
    return this.toLoad <= 0;
  }

  loadRibbons() {
    // ribbons
    const vertexShader = `
      vec3 p = position;
      float f = time * 0.2;
      float noise = perlinNoise(vec2(f + p.y, f + p.x));
      float t = 0.0;
      float tMin = 2.5;
      float tMax = 6.5;
      if (p.y < tMax && p.y > tMin) {
        t = sin((tMax - p.y) / (tMax - tMin) * 3.14159) * 0.5;
      }
      float x = t * noise;
      float z = t * ((noise + 1.0) / 2.0);
      vec3 noiseVec = vec3(x, 0.0, z);
      vec3 transformed = p + noiseVec;
      vNormal.y = sin(x);
    `;
    this.loader.loadFBX('ribbons').then(obj => {
      this.ref.scene.scene.add(obj);
      obj.position.set(-8, 0, 8);
      this.ref.materials.conformGroup(obj);
      this.ribbons = [];
      this.applyToMeshes(obj, child => {
        child.material = this.ref.materials.createCustomMaterial(child.material, vertexShader, PerlinNoise);
        child.material.metalness = 0.25;
        child.material.roughness = 0.125;
        child.material.envMapIntensity = 1;
        child.material.color.setHex(0x0);
        this.ribbons.push(child);
      });
      // view point
      const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(-8, 0.5, 14), new THREE.Vector3(-8, 4.5, 8));
      this.interactionPoints.push(
        new InteractionPoint( new THREE.Vector3(-8, 4.5, 8), 2, 2, () => { pos.apply(); }, this.ref.camera.camera )
      );
    });
  }

  loadDisplayCases() {
    // display case callback
    this.displayCaseRotate = [];
    this.updateCallbacks.push(delta => {
      this.displayCaseRotate.forEach(obj => {
        obj.rotation.y += delta * obj.rotationHerz;
      });
    })

    // load assets
    this.toLoad += 2;
    this.loader.loadFBX('display-case-1').then(obj => {
      obj.position.set(-8, 2.5, 16);
      this.ref.materials.conformGroup(obj);
      this.ref.scene.scene.add(obj);
      this.applyToMeshes(obj, mesh => {
        mesh.material.envMapIntensity = 1;
        if (mesh.name.indexOf('rotate') !== -1) {
          this.displayCaseRotate.push(mesh);
          mesh.rotationHerz = Math.PI / 15;
        }
      });
      this.onLoad();
    });
    this.loader.loadFBX('display-case-2').then(obj => {
      obj.position.set(8, 2.5, 16);
      this.ref.materials.conformGroup(obj);
      this.ref.scene.scene.add(obj);
      this.applyToMeshes(obj, mesh => {
        mesh.material.envMapIntensity = 1;
        if (mesh.name.indexOf('rotate') !== -1) {
          this.displayCaseRotate.push(mesh);
          mesh.rotationHerz = Math.PI / 15;
        }
      });
      this.onLoad();
    });

    // display stands collision & view position
    const viewOffset = 4.5;
    const box1 = new THREE.Mesh(new THREE.BoxBufferGeometry(2, 2, 2), new THREE.MeshPhysicalMaterial({color: 0xffffff}));
    box1.position.set(-8, 1.5, 16);
    const boxView1 = new PlayerPosition(this.ref.player, new THREE.Vector3(-8 - viewOffset, 0.5, 16), new THREE.Vector3(-8, 4.25, 16));
    const boxViewAlt1 = new PlayerPosition(this.ref.player, new THREE.Vector3(-8 + viewOffset, 0.5, 16), new THREE.Vector3(-8, 4.25, 16));
    const boxCallback1 = () => {
      if (this.ref.player.position.x < box1.position.x) {
        boxView1.apply();
      } else {
        boxViewAlt1.apply();
      }
    };
    const boxNode1 = new InteractionPoint(new THREE.Vector3(-8, 4.5, 16), 1.25, 2.5, boxCallback1, this.ref.camera.camera);
    this.interactionPoints.push(boxNode1);
    this.ref.scene.colliderSystem.add(box1);

    const box2 = box1.clone();
    box2.position.set(8, 1.5, 16);
    const boxView2 = new PlayerPosition(this.ref.player, new THREE.Vector3(8 - viewOffset, 0.5, 16), new THREE.Vector3(8, 4.25, 16));
    const boxViewAlt2 = new PlayerPosition(this.ref.player, new THREE.Vector3(8 + viewOffset, 0.5, 16), new THREE.Vector3(8, 4.25, 16));
    const boxCallback2 = () => {
      if (this.ref.player.position.x < box2.position.x) {
        boxView2.apply();
      } else {
        boxViewAlt2.apply();
      }
    }
    const boxNode2 = new InteractionPoint(new THREE.Vector3(8, 4.5, 16), 1.25, 2.5, boxCallback2, this.ref.camera.camera);
    this.interactionPoints.push(boxNode2);
    this.ref.scene.colliderSystem.add(box2);
  }

  loadStatic() {
    /*
    const ballBearings = [];
    this.updateCallbacks.push(delta => {
      ballBearings.forEach(ball => {
        const p = ball.mesh.position;
        const dx = ball.vec.x * delta;
        const dy = ball.vec.y * delta;
        p.x += dx;
        p.y += dy;
        if (p.x < ball.box.outer.min.x || p.x > ball.box.outer.max.x) {
          ball.vec.x *= -1;
          p.x -= dx;
        }
        if (p.y < ball.box.outer.min.y || p.y > ball.box.outer.max.y) {
          ball.vec.y *= -1;
          p.y -= dy;
        }
        if (ball.box.inner.containsPoint(p)) {
          if (p.x - dx < ball.box.inner.min.x || p.x - dx > ball.box.inner.max.x) {
            ball.vec.x *= -1;
            p.x -= dx;
          } else {
            ball.vec.y *= -1;
            p.y -= dy;
          }
        }
      });
    });
    const createBallBearings = (p, size, n, innerSize, outerSize) => {
      const mat = this.ref.materials.mat.neon;
      for (let i=0; i<n; ++i) {
        const mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(size, 8, 8), mat);
        mesh.position.set(p.x, p.y + innerSize + (outerSize - innerSize) / 2, p.z - size / 2);
        const vec = new THREE.Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
        vec.normalize();
        //vec.multiplyScalar(0.1);
        const outer = new THREE.Box2(new THREE.Vector2(p.x - outerSize, p.y - outerSize), new THREE.Vector2(p.x + outerSize, p.y + outerSize));
        const inner = new THREE.Box2(new THREE.Vector2(p.x - innerSize, p.y - innerSize), new THREE.Vector2(p.x + innerSize, p.y + innerSize));
        ballBearings.push({mesh: mesh, vec: vec, box: { outer: outer, inner: inner }});
        this.ref.scene.scene.add(mesh);
      }
    };
    */

    // load models
    this.toLoad += 2;
    this.loader.loadFBX('abstract-1').then(obj => {
      const x = -8;
      const y = 5;
      const z = 22.99;
      obj.position.set(x, y, z);
      this.ref.materials.conformGroup(obj);
      this.ref.scene.scene.add(obj);
      // view point
      const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(x, 0.5, 18), new THREE.Vector3(x, y, z));
      this.interactionPoints.push(
        new InteractionPoint( new THREE.Vector3(x, y, z), 2, 2, () => { pos.apply(); }, this.ref.camera.camera )
      );
      // create some ball bearings
      this.onLoad();
    });
    this.loader.loadFBX('abstract-2').then(obj => {
      const x = 8;
      const y = 5;
      const z = 22.99;
      obj.position.set(x, y, z);
      this.ref.materials.conformGroup(obj);
      this.ref.scene.scene.add(obj);
      // view point
      const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(x, 0.5, 18), new THREE.Vector3(x, y, z));
      this.interactionPoints.push(
        new InteractionPoint( new THREE.Vector3(x, y, z), 2, 2, () => { pos.apply(); }, this.ref.camera.camera )
      );
      this.onLoad();
    });
  }

  loadIntestines() {
    const vertexShader = `
      vec3 p = position;
      float f = time * 0.5 + 0.5 * sin(time * 0.25);
      float noise = perlinNoise(vec2(f + p.y, f + p.z));
      float x = sin(f + p.y * 3.0 + p.z / 4.0) * 0.2;
      float y = 0.0;
      float z = noise * 0.1;
      vec3 noiseVec = vec3(x, y, z);
      vec3 transformed = p + noiseVec;
      vNormal.y += noise * 0.75;
      vNormal.x += noise * -0.5;
    `;
    const jitter = [];
    this.updateCallbacks.push(delta => {
      jitter.forEach(mesh => {
        if (Math.random() > 0.97) {
        mesh.rotation.x += (Math.random() * 2 - 1) * 0.05;
        mesh.rotation.y += (Math.random() * 2 - 1) * 0.05;
        mesh.rotation.z += (Math.random() * 2 - 1) * 0.05;
      }
      });
    });

    this.loader.loadFBX('intestines_1').then(obj => {
      this.ref.materials.conformGroup(obj);
      this.applyToMeshes(obj, mesh => {
        mesh.material.envMapIntensity = 0.25;
        if (mesh.material.name.indexOf('neon') == -1) {
          jitter.push(mesh);
        }
        if (mesh.material.name.indexOf('intestines') !== -1) {
          mesh.material = this.ref.materials.createCustomMaterial(mesh.material, vertexShader, PerlinNoise);
        }
      });
      this.ref.scene.scene.add(obj);

      // view point
      const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(23, 1, 13), new THREE.Vector3(31.5, 7.25, 13));
      this.interactionPoints.push(
        new InteractionPoint( new THREE.Vector3(31.5, 7.25, 13), 2, 2, () => { pos.apply(); }, this.ref.camera.camera )
      );
    });
  }

  unload() {
    this.interactionPoints.forEach(point => {
      point.delete();
    });
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
        this.ref.canvas2d.drawBoxHint(point.box.position.x, point.box.position.y, point.box.width / 2, point.box.height / 2, 5);
      }
    }
  }
}

export default CustomXavier;
