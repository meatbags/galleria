import Player from './Player';
import RayTracer from './RayTracer';
import { Materials } from './Loader';
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
    this.player = new Player(new THREE.Vector3(0, 0, 0));
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 2000000);
    this.raytracer = new RayTracer();
    this.resize();

    // world
    this.scene = new THREE.Scene();
    this.scene.add(
      new THREE.Mesh(
        new THREE.BoxBufferGeometry(100, 0.1, 100),
        Materials.concrete
      ),
      new THREE.AmbientLight(0xffffff, 0.5)
    );
    let sky = new THREE.Sky();
    let sun = new THREE.PointLight(0xffffff, 0.9, 100);//55000);

    sun.position.set(
      sky.uniforms.sunPosition.value.x,
      sky.uniforms.sunPosition.value.y,
      sky.uniforms.sunPosition.value.z
    )

    this.scene.add(sun, sky.mesh, this.raytracer.object);
  },

  resize: function() {
    const width = window.innerWidth;
    const height = Math.min(480, window.innerHeight * 0.75);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  onMouseDown: function(e) {
    this.raytracer.emitRayFromScreen(e, this.renderer.domElement, this.camera, []);
  },

  onMouseMove: function(e) {
    this.raytracer.emitRayFromScreen(e, this.renderer.domElement, this.camera, []);
  },

  update: function(delta) {
    this.player.update(delta);
    this.camera.position.set(this.player.position.x, this.player.position.y + this.player.height, this.player.position.z);
    this.camera.rotation.y = this.player.yaw;
  },

  render: function() {
    this.renderer.render(this.scene, this.camera);
  },
};

export default Scene;
