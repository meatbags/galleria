import Player from './Player';
import RayTracer from './RayTracer';
import './SkyShader.js';

const Scene = function() {
  this.init();
};

Scene.prototype = {
  init: function() {
    // threejs set up
    this.renderer = new THREE.WebGLRenderer({antialias: false});
    this.renderer.setSize(640, 480);
    this.renderer.setClearColor(0xf9e5a2, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown);
    document.body.append(this.renderer.domElement);

    // user
    this.player = new Player(new THREE.Vector3(0, 0, 0));
    this.camera = new THREE.PerspectiveCamera(65, 1, 0.1, 2000000);
    this.camera.position.set(0, 10, 0);
    this.resize();

    // world
    this.scene = new THREE.Scene();
    this.scene.add(
      new THREE.Mesh(
        new THREE.BoxBufferGeometry(10, 0.5, 10),
        new THREE.MeshPhysicalMaterial({
          color: 0xaaaaaa
        })
      ),
      new THREE.AmbientLight(0xffffff, 0.5)
    );
    let sky = new THREE.Sky();
    let sun = new THREE.PointLight(0xffffff, 0.9, 55000);
    sun.position.set(
      sky.uniforms.sunPosition.value.x,
      sky.uniforms.sunPosition.value.y,
      sky.uniforms.sunPosition.value.z
    )

    this.scene.add(sun, sky.mesh);
  },

  resize: function() {
    const width = window.innerWidth,
      height = Math.min(480, window.innerHeight * 0.75);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  onMouseDown: function(e) {
    // raytrace
  },

  onMouseMove: function(e) {
    // raytrace
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
