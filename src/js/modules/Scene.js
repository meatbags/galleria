import Player from './Player';
import RayTracer from './RayTracer';
import HUD from './HUD.js';
import { Materials, Models } from './Loader';
import { Box, Ramp, PhysicsModel } from './Physics';
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
    this.player = new Player(new THREE.Vector3(0, 0, -15));
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 2000000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.raytracer = new RayTracer();
    this.resize();

    // world
    this.scene = new THREE.Scene();
    this.model = new PhysicsModel();

    this.model.add(
      // floors
      new Box(new THREE.Vector3(0, 0, -10), new THREE.Vector3(20, 1.05, 20)),
      new Box(new THREE.Vector3(0, 7.5, 10), new THREE.Vector3(20, 1.05, 20.5)),
      // stairway rear
      new Box(new THREE.Vector3(-7, 7.5, 22.5), new THREE.Vector3(4, 1.05, 5)),
      new Box(new THREE.Vector3(0, 0, 22.5), new THREE.Vector3(20, 1, 5)),
      new Ramp(new THREE.Vector3(0, 4.25, 22.5), new THREE.Vector3(10, 7.55, 5), 3),
      // stairway front
      new Box(new THREE.Vector3(-6, 4, -7), new THREE.Vector3(6, 0.5, 4)),
      new Ramp(new THREE.Vector3(-7.5, 6, -2.5), new THREE.Vector3(3, 4, 5), 0),
      new Ramp(new THREE.Vector3(-4.5, 2, -2.5), new THREE.Vector3(3, 4, 5), 2),
      // dev
      new Ramp(new THREE.Vector3(8, 4, -6), new THREE.Vector3(4, 8, 12), 0)
    );

    this.scene.add( this.player.object, Models.mainBuilding );

    // lighting

    const hemisphere = new THREE.HemisphereLight(0xffaabb, 0x080820, 0.1);
    const point1 = new THREE.PointLight(0xffffff, 0.5, 20, 1);
    const point2 = new THREE.PointLight(0xffffff, 0.5, 10, 1);
    const spot1 = new THREE.SpotLight(0xffffff, 1, 30, Math.PI / 10, 1, 2);
    const spot2 = new THREE.SpotLight(0xffffff, 1, 30, Math.PI / 10, 1, 2);

    spot1.position.set(0, 15, -10);
    spot1.target = new THREE.Object3D();
    spot1.target.position.set(0, 0, -10);
    point1.position.set(0, 5, -10);
    spot2.position.set(0, 20, 10);
    spot2.target = new THREE.Object3D();
    spot2.target.position.set(0, 0, 10);
    point2.position.set(0, 12, 10);

    this.scene.add(
      spot1,
      spot1.target,
      point1,
      hemisphere,
      spot2,
      spot2.target,
      point2
    );

    this.scene.fog = new THREE.FogExp2( 0xCCCFFF, 0.008 );

    const floor = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1000, 0.1, 1000),
      Materials.concrete
    );
    floor.position.set(0, -0.1, 0);

    let sky = new THREE.Sky();
    let sun = new THREE.PointLight(0xffffff, 0.9, 40500);

    sun.position.set(
      sky.uniforms.sunPosition.value.x,
      sky.uniforms.sunPosition.value.y,
      sky.uniforms.sunPosition.value.z
    )

    this.scene.add(floor, sun, this.raytracer.object, sky.mesh);
    this.scene.add(this.model.object);
  },

  resize: function() {
    const width = window.innerWidth;
    const height = 640;//Math.min(520, window.innerHeight * 0.75);
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
