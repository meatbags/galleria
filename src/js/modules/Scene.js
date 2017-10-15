import Player from './Player';
import Artworks from './Artworks';
import Loader from './Loader';
import { Focal, FocalSystem } from './Focal';
import { v3 } from './Maths';
import Globals from './Globals';
import './SkyShader.js';

const Scene = function() {
  this.init();
};

Scene.prototype = {
  init: function() {
    const self = this;

    // threejs
    this.renderer = new THREE.WebGLRenderer({antialias: false});
    this.renderer.setSize(640, 480);
    this.renderer.setClearColor(0xf9e5a2, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.append(this.renderer.domElement);

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

    // resize
    this.resize();
    window.addEventListener('resize', function() {
      self.resize();
    });

    // load gallery
    this.focalPoints = new FocalSystem();
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
      this.focalPoints.add(this.artworks.focalPoints[i]);
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
    return (this.toLoad === 0);
  },

  resize: function() {
    const width = window.innerWidth;
    const height = 540;//Math.min(520, window.innerHeight * 0.75);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  update: function(delta) {
    this.player.update(delta, this.collider);
  },

  render: function() {
    this.renderer.render(this.scene, this.camera);
  },
};

export default Scene;
