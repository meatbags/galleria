import Player from './Player';
import RayTracer from './RayTracer';
import HUD from './HUD';
import Artworks from './Artworks';
import { Materials, Models } from './Loader';
import { Box, Ramp, PhysicsModel } from './Physics';
import { Focal } from './Focal';
import { v3 } from './Maths';
import Globals from './Globals';
import './SkyShader.js';

const Scene = function() {
  this.init();
};

Scene.prototype = {
  init: function() {
    const self = this;

    // threejs set up
    this.renderer = new THREE.WebGLRenderer({antialias: false});
    this.renderer.setSize(640, 480);
    this.renderer.setClearColor(0xf9e5a2, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.domElement.addEventListener('mousemove', function(e){ self.onMouseMove(e) });
    this.renderer.domElement.addEventListener('mousedown', function(e){ self.onMouseDown(e) });
    document.body.append(this.renderer.domElement);

    // user
    this.hud = new HUD(this.renderer.domElement);
    this.player = new Player();
    this.camera = new THREE.PerspectiveCamera(Globals.camera.fov, 1, Globals.camera.near, Globals.camera.far);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.raytracer = new RayTracer();
    this.resize();
    window.addEventListener('resize', function() {
      self.resize();
    });

    // scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xCCCFFF, 0.008);
    this.scene.add(this.player.object, Models.mainBuilding, this.raytracer.object);

    // walls & floors
    this.model = new PhysicsModel();
    this.model.add(
      // floors
      new Box(v3(0, 0, -10.75), v3(23, 1.05, 21.5)),
      new Box(v3(0, 7.5, 10), v3(20, 1.05, 20.5)),
      // main gallery walls
      new Box(v3(-9.5, 8, 0), v3(2.75, 16, 40)),
      new Box(v3(9.5, 8, 0), v3(2.75, 16, 40)),
      // outer walls
      new Box(v3(15, 8, -5), v3(2, 20, 79)),
      new Box(v3(-26, 8, -5), v3(2, 20, 79)),
      new Box(v3(-5.5, 8, 34.5), v3(41, 20, 2)),
      new Box(v3(-5.5, 8, -44.5), v3(41, 20, 2)),
      // outer fences + blockades
      new Box(v3(12.25, 8, 5.125), v3(5, 20, 22)),
      new Box(v3(-20.75, 8, -9.5), v3(11.5, 20, 2.5)),
      new Box(v3(-10.75, 8, -10), v3(2.5, 20, 1.75)),
      // side platforms
      new Box(v3(-11, 0.25, 10.5), v3(1, 0.5, 21)),
      new Box(v3( 11, 0.25, 10.5), v3(1, 0.5, 21)),
      // central posts
      new Box(v3(3, 8, 0), v3(1, 16, 1)),
      new Box(v3(-3, 8, 0), v3(1, 16, 1)),
      new Box(v3(0, 8, 10), v3(7, 16, 1.5)),
      //new Box(v3(-3, 8, 10), v3(1, 16, 1)),
      // front entrance
      new Ramp(v3(0, 0.25, -23), v3(10, 0.5, 3), 0),
      new Box(v3(7.875, 8, -19.5), v3(6, 16, 2.5)),
      new Box(v3(-7.875, 8, -19.5), v3(6, 16, 2.5)),
      // stairs front
      new Box(v3(-6, 4, -7), v3(6, 0.5, 4)),
      new Ramp(v3(-7.5, 6, -2.5), v3(3, 4, 5), 0),
      new Ramp(v3(-4.5, 2, -2.5), v3(3, 4, 5), 2),
      // stairs front -- posts & walls
      new Box(v3(2, 10, 0), v3(16, 5, 0.75)),
      new Box(v3(-3, 3.25, -9), v3(1, 16, 1)),
      new Box(v3(-3, 3.25, -5), v3(1, 16, 1)),
      new Box(v3(-6, 3.25, -5), v3(0.5, 16, 1)),
      new Box(v3(-6, 5.25, -9), v3(6, 3, 1)),
      new Box(v3(-3, 5.25, -7), v3(1, 3, 4)),
      new Box(v3(-3, 3.25, -2.5), v3(1, 6, 4.5)),
      new Box(v3(-6, 7.5, -2.5), v3(0.5, 7, 5)),
      // stairs back
      new Box(v3(-7, 7.5, 22.5), v3(4, 1.05, 5)),
      new Box(v3(0, 0, 22.5), v3(20, 1, 5)),
      new Ramp(v3(0, 4.25, 22.5), v3(10, 7.55, 5), 3),
      // stairs back -- walls
      new Box(v3(0, 8, 25.375), v3(18, 16, 1)),
      new Box(v3(9.5, 8, 22.75), v3(2.75, 16, 6)),
      new Box(v3(-9.5, 8, 22.75), v3(2.75, 16, 6)),
      new Box(v3(-2, 4, 20), v3(13, 8, 1.5)),
      new Box(v3(2, 12, 20), v3(14, 8, 1.5))
    );
    //this.scene.add(this.model.object);

    // load gallery
    const tags = document.getElementsByClassName('im');
    this.artworks = new Artworks();

    for (let i=0; i<tags.length; i+=1) {
      const im = tags[i];
      let title = '';
      let caption = '';
      let url = '';
      let src = '';

      for (let j=0; j<im.childNodes.length; j+=1) {
        const node = im.childNodes[j];

        switch (node.className) {
          case 'im__title':
            title = node.textContent;
            break;
          case 'im__caption':
            caption = node.textContent;
            break;
          case 'im__url':
            url = node.textContent;
            break;
          case 'im__src':
            src = node.textContent;
            break;
          default:
            break;
        }
      }

      this.artworks.add(title, caption, url, src);
    }

    this.artworks.placeImages();
    this.scene.add(this.artworks.object);

    for (let i=0; i<this.artworks.focalPoints.length; i+=1) {
      this.model.add(this.artworks.focalPoints[i]);
    }

    // lighting
    const ambient = new THREE.AmbientLight(0xffffff, .08);
    const hemisphere = new THREE.HemisphereLight(0xffaabb, 0x080820, 0.1);
    const point1 = new THREE.PointLight(0xffffff, 0.5, 13, 1);
    const point2 = new THREE.PointLight(0xffffff, 0.5, 10, 1);
    const spot1 = new THREE.SpotLight(0xffffff, 1, 30, Math.PI / 10, 1, 2);
    const spot2 = new THREE.SpotLight(0xffffff, 1, 10, Math.PI / 10, 1, 2);
    const spot3 = new THREE.SpotLight(0xffffff, 1, 8, Math.PI / 2, 1);
    const spot4 = new THREE.SpotLight(0xffffff, 1, 8, Math.PI / 2, 1);
    const spot5 = new THREE.SpotLight(0xffffff, 1, 8, Math.PI / 2, 1);
    const spot6 = new THREE.SpotLight(0xffffff, 1, 8, Math.PI / 2, 1);
    const spot7 = new THREE.SpotLight(0xfeff87, 1, 12, Math.PI / 2, 1);
    this.neonSign = new THREE.PointLight(0xff0000, 0.8, 15, 1);

    spot1.position.set(0, 15, -10);
    spot1.target = new THREE.Object3D();
    spot1.target.position.set(0, 0, -10);
    point1.position.set(0, 5, -10);
    spot2.position.set(0, 20, 10);
    spot2.target = new THREE.Object3D();
    spot2.target.position.set(0, 0, 10);
    point2.position.set(0, 14, 10);
    spot3.position.set(8, 6, 5);
    spot3.target = new THREE.Object3D();
    spot3.target.position.set(9.25, 0, 5);
    spot4.position.set(8, 6, 14.75);
    spot4.target = new THREE.Object3D();
    spot4.target.position.set(9.25, 0, 14.75);
    spot5.position.set(-8, 6, 14.75);
    spot5.target = new THREE.Object3D();
    spot5.target.position.set(-9.25, 0, 14.75);
    spot6.position.set(-8, 6, 5);
    spot6.target = new THREE.Object3D();
    spot6.target.position.set(-9.25, 0, 5);
    spot7.position.set(-22, 12, 15);
    spot7.target = new THREE.Object3D();
    spot7.target.position.set(-22, 0, 15);
    this.neonSign.position.set(0, 14, -32);

    this.scene.add(
      ambient,
      spot1,
      spot1.target,
      point1,
      point2,
      hemisphere,
      spot2,
      spot2.target,
      point2,
      spot3,
      spot3.target,
      spot4,
      spot4.target,
      spot5,
      spot5.target,
      spot6,
      spot6.target,
      spot7,
      spot7.target,
      this.neonSign
    );

    // skybox
    const sky = new THREE.Sky();
    //const sun = new THREE.PointLight(0xffffff, 0.9, 40500);
    //sun.position.set(sky.uniforms.sunPosition.value.x, sky.uniforms.sunPosition.value.y, sky.uniforms.sunPosition.value.z);
    this.scene.add(sky.mesh);//,sun);
  },

  resize: function() {
    const width = window.innerWidth;
    const height = 540;//Math.min(520, window.innerHeight * 0.75);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  onMouseDown: function(e) {
    const ray = this.raytracer.emitRayFromScreen(e, this.renderer.domElement, this.camera, this.player, this.model.contents);

    if (this.hud.isLeftOrRight(e.clientX)) {
      this.player.setTarget(this.player.position, ray.yaw);
    } else {
      this.player.setTarget({x: ray.end.x, y: ray.end.y, z: ray.end.z}, ray.yaw);
    }
  },

  onMouseMove: function(e) {
    const ray = this.raytracer.emitRayFromScreen(e, this.renderer.domElement, this.camera, this.player, this.model.contents);

    // adjust camera X
    if (this.hud.isLeft(e.clientX)) {
      if (!this.hud.left.classList.contains('active')) {
        this.hud.left.classList.add('active');
      }
      this.player.setTargetYawOffset(0.5 * this.hud.getLeftFactor(e.clientX));
    } else if (this.hud.isRight(e.clientX)) {
      if (!this.hud.right.classList.contains('active')) {
        this.hud.right.classList.add('active');
      }
      this.player.setTargetYawOffset(-0.5 * this.hud.getRightFactor(e.clientX));
    } else {
      this.player.setTargetYawOffset(0);
      if (this.hud.left.classList.contains('active')) {
        this.hud.left.classList.remove('active');
      }
      if (this.hud.right.classList.contains('active')) {
        this.hud.right.classList.remove('active');
      }
    }

    // adjust camera Y
    if (this.hud.isHigh(e.clientY)) {
      this.player.setTargetPitchOffset(0.5 * this.hud.getHighFactor(e.clientY));
    } else if (this.hud.isLow(e.clientY)) {
      this.player.setTargetPitchOffset(-0.5 * this.hud.getLowFactor(e.clientY));
    } else {
      this.player.setTargetPitchOffset(0);
    }
  },

  update: function(delta) {
    const yaw = this.player.getYaw();
    const pitch = this.player.getPitch();

    this.player.update(delta, this.model.contents);
    this.camera.position.set(this.player.position.x, this.player.position.y + this.player.height, this.player.position.z);
    this.camera.lookAt(new THREE.Vector3(
      this.player.position.x + Math.sin(yaw),
      this.player.position.y + this.player.height + Math.sin(pitch),
      this.player.position.z + Math.cos(yaw)
    ));
  },

  render: function() {
    this.renderer.render(this.scene, this.camera);
  },
};

export default Scene;
