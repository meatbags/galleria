import Player from './Player';
import Artworks from './Artworks';
import Loader from './Loader';
import { v3 } from './Maths';
import Globals from './Globals';
import './SkyShader.js';

const Scene = function() {
  this.init();
};

Scene.prototype = {
  init: function() {
    const self = this;
    const isMonday = ((new Date()).getDay() == 1);

    // threejs
    this.renderer = new THREE.WebGLRenderer({antialias: false});
    this.renderer.setSize(640, 480);
    this.renderer.setClearColor(0xf9e5a2, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    $('.wrapper .content').append(this.renderer.domElement);

    // player & scene
    this.player = new Player(this.renderer.domElement);
    this.camera = this.player.camera;

    // scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xCCCFFF, 0.008);

    // collision map
    this.collider = new Collider.System();
    this.loader = new Loader(appRoot + 'assets/3d/');
    this.toLoad = 2;

    if (!isMonday) {
      // get gallery open maps

      this.loader.loadOBJ('hangar_collision_map').then(function(map){
        for (let i=0; i<map.children.length; i+=1) {
          self.collider.add(new Collider.Mesh(map.children[i].geometry));
        }
        self.toLoad -= 1;
      }, function(err){ console.log(err); });

      // models
      this.loader.loadOBJ('hangar').then(function(map) {
        self.scene.add(map);
        self.toLoad -= 1;
      }, function(err){ console.log(err); });
    } else {
      // get gallery closed maps

      this.loader.loadOBJ('hangar_collision_map_monday').then(function(map){
        for (let i=0; i<map.children.length; i+=1) {
          self.collider.add(new Collider.Mesh(map.children[i].geometry));
        }
        self.toLoad -= 1;
      }, function(err){ console.log(err); });

      // models
      this.loader.loadOBJ('hangar_monday').then(function(map) {
        self.scene.add(map);
        self.toLoad -= 1;
      }, function(err){ console.log(err); });
    }

    // resize
    this.resize();

    // load gallery
    this.artworks = new Artworks();

    if (!isMonday) {
      $('.im').each(function(i, e){
        self.artworks.add(
          $(e).find('.im__title').html(),
          $(e).find('.im__description').html(),
          $(e).find('.im__url').html(),
          $(e).find('.im__image').html()
        );
      });

      this.artworks.placeImages();
      this.scene.add(this.artworks.object);
    }

    // lighting
    const ambient = new THREE.AmbientLight(0xffffff, .08);
    const hemisphere = new THREE.HemisphereLight(0xffaabb, 0x080820, 0.1);
    const point1 = new THREE.PointLight(0xffffff, 0.5, 13, 1);
    const point2 = new THREE.PointLight(0xfeff87, 0.5, 12, 1);
    this.neonSign = new THREE.PointLight(0xff0000, 0.8, 15, 1);

    point1.position.set(0, 5, -10);
    point2.position.set(-19, 8, 5);
    this.neonSign.position.set(0, 14, -32);

    this.scene.add(
      ambient,
      point1,
      point2,
      hemisphere,
      this.neonSign,
      this.player.object,
      this.player.raytracer.object
    );

    // skybox
    const sky = new THREE.Sky();
    this.scene.add(sky.mesh);
  },

  isLoaded: function() {
    return (this.toLoad === 0 && this.artworks.toLoad === 0);
  },

  resize: function() {
    const width = window.innerWidth;
    const height = 540;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  update: function(delta) {
    this.player.update(delta, this.collider, this.artworks);
  },

  render: function() {
    this.renderer.render(this.scene, this.camera);
  },
};

export default Scene;
