import '../../lib/postprocessing';
import Player from './player';
import { Globals } from '../config';
import { Artworks } from '../art';
import { v3 } from '../maths';
import { RoomLoader, LightHandler } from '../loader';

class Scene {
  constructor(width, height) {
    // scene handler

    this.isMonday = (((new Date()).getDay() == 1 || window.location.hash == '#monday') && (window.location.hash != '#tuesday'));

    // set up

    this._initRenderer();
    this._initScene();
    this.resize(width, height);

    // set up post processing, load

    this._initProcessing();
    this._initLoaders();
  }

  resize(width, height) {
    // resize scene, element

    this.width = width;
    this.height = height;
    this.size = new THREE.Vector2(this.width, this.height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  _initRenderer() {
    // render objects, methods

    this.renderer = new THREE.WebGLRenderer({antialias: false});
    this.renderer.setClearColor(0xf9e5a2, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    $('.wrapper .content').append(this.renderer.domElement);

    // main render func

    this.render = (delta) => {
      this.composer.render();
    };
  }

  _initScene() {
    // scene objects, methods

    this.player = new Player(this.renderer.domElement);
    this.camera = this.player.camera;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xCCCFFF, 0.008);

    this.collider = new Collider.System();

    this.lightHandler = new LightHandler(this.scene, this.player);
    this.lightHandler.load(this.isMonday);
    this.artworks = new Artworks();
    this.sky = new THREE.Sky();
    this.scene.add(this.sky.mesh);

    // get artworks

    if (!this.isMonday) {
      /*
      $('.im').each((i, e) => {
        this.artworks.add(
          $(e).find('.im__title').html(),
          $(e).find('.im__description').html(),
          $(e).find('.im__url').html(),
          $(e).find('.im__image').html()
        );
      });

      this.artworks.placeImages();
      this.scene.add(this.artworks.object);
      */
    }

    // main update func

    this.update = (delta) => {
      this.player.updatePlayer(delta, this.collider, this.artworks);
    }
  }

  _initLoaders() {
    // load the scene

    this.roomLoader = new RoomLoader(this.scene, this.collider, this.isMonday);

    // checks

    this.isLoaded = () => {
      this.roomLoader.isLoaded() && this.artworks.toLoad == 0
    }
  }

  _initProcessing() {
    // post processing

    this.renderPass = new THREE.RenderPass(this.scene, this.camera);
    this.posterPass = new THREE.PosterPass(this.size);
    this.bloomPass = new THREE.UnrealBloomPass(this.size, .75, 1.2, 0.9); // res, strength, radius, threshold
    this.bloomPass.renderToScreen = true;

    // add passes to composer

    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.setSize(this.width, this.height);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.posterPass);
    this.composer.addPass(this.bloomPass);
  }
}

export default Scene;
