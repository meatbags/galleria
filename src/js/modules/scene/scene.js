import '../../lib/postprocessing';

import Player from './player';
import { Globals } from '../config';
import { Artworks } from '../art';
import { v3 } from '../maths';
import { RoomLoader, LightHandler } from '../loader';

const Scene = function() {
  this.init();
};

Scene.prototype = {
  init: function() {
    const self = this;
    const isMonday = (((new Date()).getDay() == 1 || window.location.hash == '#monday') && (window.location.hash != '#tuesday'));

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

    // load !
    this.roomLoader = new RoomLoader(this.scene, this.collider, isMonday);

    // resize
    this.resize();

    // load gallery & lighting

    this.lightHandler = new LightHandler(this.scene, this.player);
    this.lightHandler.load(isMonday);
    this.artworks = new Artworks();

    if (!isMonday) {
      /*
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
      */

      // lighting
      //this.player.raytracer.object
    }

    // skybox
    const sky = new THREE.Sky();
    this.scene.add(sky.mesh);

    // postprocessing
    this.postprocessing();
  },

  isLoaded: function() {
    return (this.roomLoader.isLoaded() && this.artworks.toLoad === 0);
  },

  resize: function() {
    const width = window.innerWidth;
    const height = 520;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  postprocessing: function() {
    // post-processing passes
    this.renderPass = new THREE.RenderPass(this.scene, this.camera);
    //this.mechanicsPass = new THREE.MechanicsPass(this.size);
    //this.bloomPass = new THREE.UnrealBloomPass(this.size, 0.7, 1.0, 0.7); // res, strength, radius, threshold
    this.FXAAPass = new THREE.ShaderPass(THREE.FXAAShader);
    this.FXAAPass.renderToScreen = true;

    // set composer
    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.setSize(this.width, this.height);
    this.composer.addPass(this.renderPass);
    //this.composer.addPass(this.mechanicsPass);
    //this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.FXAAPass);

    // gamma
    //this.renderer.gammaInput = true;
    //this.renderer.gammaOutput = true;
  },

  update: function(delta) {
    this.player.update(delta, this.collider, this.artworks);
  },

  render: function(delta) {
    //this.composer.render(delta);
    this.renderer.render(this.scene, this.camera);
  },
};

export default Scene;
