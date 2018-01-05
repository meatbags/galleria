import '../../lib/postprocessing';

import Player from './player';
import { Globals } from '../config';
import { Artworks } from '../art';
import { v3 } from '../maths';
import { LoadFBX, LoadOBJ } from '../loader';

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
    //this.loadOBJ = new LoadOBJ(appRoot + 'assets/3d/');
    //this.toLoad = 1;

    this.roomLoader = new LoadRoom(this.scene, this.collider, isMonday);

    /*
    if (!isMonday) {
      const path = appRoot + 'assets/3d/gallery.fbx';

      console.log(path);

      LoadFBX(path, new THREE.ShaderMaterial(THREE.DepthShader)).then((meshes) => {
        this.toLoad -= 1;
        meshes.forEach((mesh) => {
          this.scene.add(mesh)
        });
      }, (err) => { throw(err); });
    }
    */

    // resize
    this.resize();

    // load gallery & lighting

    this.artworks = new Artworks();
    /*
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
        this.player.object
      );
      //this.player.raytracer.object
    } else {
      // gallery closed, minimal lighting

      const ambient = new THREE.AmbientLight(0xffffff, .08);
      const hemisphere = new THREE.HemisphereLight(0xffaabb, 0x080820, 0.1);

      this.scene.add(
        ambient,
        hemisphere,
        this.player.object
      );
    }
    */

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
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
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
