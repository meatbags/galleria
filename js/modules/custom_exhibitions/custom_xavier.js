/** Custom exhibition */

import Loader from '../../loader/loader';
import InteractionPoint from '../../ui/interaction_point';
import PlayerPosition from '../../ui/player_position';
import PerlinNoise from '../../glsl/fragments/perlin_noise';
import IntestineVertexShader from '../../glsl/fragments/intestine_vertex_shader';

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

      // settings
      this.envMap = this.ref.materials.createEnvMap('xavier/env');

      // this.loadIntestines();
       //this.loadStaticArtworks();
       //this.loadDisplayCases();
       this.loadPlatformer();
      // this.loadWaves();

      this.loader.loadFBX('final/peripherals').then(obj => {
        this.ref.materials.conformGroup(obj);
        this.ref.scene.scene.add(obj);
      });

      this.loadVectorField();
    });
  }

  loadVectorField() {
    this.fields = [];
    this.fieldCentre = new THREE.Vector3(-8, 4.5, 8);
    this.updateCallbacks.push(delta => {
      if (this.ref.player.position.z > 8 && this.ref.player.position.distanceTo(this.fieldCentre) < 20) {
        const amt = delta * Math.PI / 8;
        this.fields.forEach(mesh => {
          mesh.rotation.x += amt;
          mesh.rotation.y -= amt;
          mesh.rotation.z += amt;
        });
      }
    });

    const step = 0.25;
    const w = 10.75;
    const h = 4;
    for (let x=this.fieldCentre.x - w/2; x <= this.fieldCentre.x + w/2; x+=step) {
      for (let y=this.fieldCentre.y - h/2; y<= this.fieldCentre.y + h/2; y+=step) {
        const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(0.045, 0.25, 0.045), this.ref.materials.mat.neon);
        const rx = Math.sin((x + y) / 5) * Math.PI;
        const ry = Math.cos(x /5 ) * Math.PI;
        const rz = Math.sin((x * 2 + y / 2) / 5) * Math.PI;
        mesh.rotation.set(rx, ry, rz);
        mesh.position.set(x, y, 8.05);
        this.ref.scene.scene.add(mesh);
        this.fields.push(mesh);
      }
    }

    // view point
    const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(-8, 0.5, 14), this.fieldCentre);
    this.interactionPoints.push(
      new InteractionPoint(this.fieldCentre, 3, 3, () => { pos.apply(); }, this.ref.camera.camera)
    );
  }

  loadWaves() {
    // ribbons
    const vertexShader = `
      vec3 p = position;
      float f = time * 0.2;
      float noise = perlinNoise(vec2(f + p.y, f + p.x));
      float t = 0.0;
      float tMin = 3.0;
      float tMax = 6.0;
      if (p.y < tMax && p.y > tMin) {
        t = sin((tMax - p.y) / (tMax - tMin) * 3.14159) * 0.12;
      }
      float x = t * noise;
      float z = t * ((noise + 1.0) / 2.0);
      vec3 noiseVec = vec3(x, 0.0, z);
      vec3 transformed = p + noiseVec;
      vNormal.y = sin(x) * 2.0;
      vNormal.z = cos(x) * 6.0;
    `;
    this.loader.loadFBX('final/waves/waves').then(obj => {
      this.ref.scene.scene.add(obj);
      this.ref.materials.conformGroup(obj);
      this.applyToMeshes(obj, child => {
        if (child.name.indexOf('frame') === -1) {
          child.material = this.ref.materials.createCustomMaterial(child.material, vertexShader, PerlinNoise);
          child.material.metalness = 1;
          child.material.roughness = 0.125;
          child.material.envMapIntensity = 1;
          child.material.color.setHex(0x0);
        }
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
    this.loader.loadFBX('final/display_case/display_case_1').then(obj => {
      //obj.position.set(-8, 2.5, 16);
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
    this.loader.loadFBX('final/display_case/display_case_2').then(obj => {
      //obj.position.set(8, 2.5, 16);
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

  loadStaticArtworks() {
    // load models
    this.toLoad += 2;
    this.loader.loadFBX('final/dunes/dunes_1').then(obj => {
      const p = new THREE.Vector3(-8, 5, 22.99);
      obj.position.copy(p);
      this.ref.materials.conformGroup(obj);
      this.ref.scene.scene.add(obj);
      // view point
      const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(p.x, 0.5, 18), p);
      this.interactionPoints.push(
        new InteractionPoint(p, 2, 2, () => { pos.apply(); }, this.ref.camera.camera )
      );
      this.onLoad();
    });
    this.loader.loadFBX('final/dunes/dunes_2').then(obj => {
      const p = new THREE.Vector3(8, 5, 22.99);
      obj.position.copy(p);
      this.ref.materials.conformGroup(obj);
      this.ref.scene.scene.add(obj);
      // view point
      const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(p.x, 0.5, 18), p);
      this.interactionPoints.push(
        new InteractionPoint(p, 2, 2, () => { pos.apply(); }, this.ref.camera.camera )
      );
      this.onLoad();
    });
  }

  loadPlatformer() {
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
      jitter.forEach(mesh => { mesh.rotation.x += delta * Math.PI / 12; });
    });

    this.loader.loadFBX('final/platformer/platformer').then(obj => {
      this.ref.materials.conformGroup(obj);
      this.applyToMeshes(obj, mesh => {
        mesh.material.envMapIntensity = 0.25;
        if (mesh.name.indexOf('frame') === -1) {
          mesh.material.envMap = this.envMap;
          mesh.material.envMapIntensity = 0.125;
          mesh.rotation.x = Math.random() * Math.PI * 2;
          jitter.push(mesh);
        }
      });
      this.ref.scene.scene.add(obj);
    });

    // view point
    const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(8, 0.5, 14), new THREE.Vector3(8, 4.5, 8));
    this.interactionPoints.push(
      new InteractionPoint( new THREE.Vector3(8, 4.5, 8), 2, 2, () => { pos.apply(); }, this.ref.camera.camera )
    );
  }

  loadIntestines() {
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

    this.loader.loadFBX('final/intestines/intestines_1').then(obj => {
      this.ref.materials.conformGroup(obj);
      this.applyToMeshes(obj, mesh => {
        if (mesh.material.name.indexOf('intestines') !== -1) {
          mesh.material = this.ref.materials.createCustomMaterial(mesh.material, IntestineVertexShader, PerlinNoise);
          console.log(mesh.material);
          this.ref.materials.applyAlphaMap(mesh.material, mesh.material.map);
        }
      });
      this.ref.scene.scene.add(obj);

      dwdadw
    });
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
        this.ref.canvas2d.drawBoxHint(point.box.position.x, point.box.position.y, point.box.width / 2, point.box.height / 2, 5);
      }
    }
  }
}

export default CustomXavier;
