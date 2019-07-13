/** Custom exhibition */

import Loader from '../../loader/loader';
import PerlinNoise from '../../glsl/fragments/perlin_noise';
import InteractionPoint from '../../ui/interaction_point';
import PlayerPosition from '../../ui/player_position';

class CustomXavier {
  constructor(root) {
    this.ref = {
      scene: root.ref.scene,
      materials: root.ref.materials,
      camera: root.ref.camera,
      player: root.ref.player,
      canvas2d: root.ref.canvas2d,
    };
    this.load();
  }

  load() {
    const loader = new Loader('assets/xavier');
    this.scales = [];

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

    loader.loadFBX('ribbon').then(obj => {
      this.ref.scene.scene.add(obj);
      obj.position.set(-8, 0, 8);
      this.ref.materials.conformGroup(obj);
      this.ribbons = [];
      this.applyToMeshes(obj, child => {
        child.material = this.ref.materials.createCustomMaterial(child.material, vertexShader, PerlinNoise);
        child.material.color.setHex(0x888888);
        child.material.metalness = 1;
        child.material.envMapIntensity = 0;
        this.ribbons.push(child);
      });
    });

    const pos = new PlayerPosition(this.ref.player, new THREE.Vector3(-8, 0.5, 14), new THREE.Vector3(-8, 4.5, 8));
    this.interactionPoints = [];
    this.interactionPoints.push(
      new InteractionPoint(
        new THREE.Vector3(-8, 4.5, 8), 100, () => { pos.apply(); }, this.ref.camera.camera
      )
    );
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

  update(delta) {
    if (this.ribbons) {}
    if (this.interactionPoints) {
      this.interactionPoints.forEach(point => {
        point.update();
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
      this.interactionPoints.forEach(point => {
        point.click(x, y);
      });
    }
  }

  render() {
    if (this.interactionPoints) {
      const ctx = this.ref.canvas2d.ctx;
      ctx.globalAlpha = 1;
      this.interactionPoints.forEach(point => {
        if (point.onscreen && point.hover) {
          this.ref.canvas2d.drawBoxHint(point.screenPosition.x, point.screenPosition.y, 30, 4);
        }
      });
    }
  }
}

export default CustomXavier;
