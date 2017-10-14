import Player from './Player';
import RayTracer from './RayTracer';
import HUD from './HUD';
import Artworks from './Artworks';
import Loader from './Loader';
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

    // threejs
    this.renderer = new THREE.WebGLRenderer({antialias: false});
    this.renderer.setSize(640, 480);
    this.renderer.setClearColor(0xf9e5a2, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    //this.renderer.domElement.addEventListener('mousemove', function(e){ self.onMouseMove(e) });
    //this.renderer.domElement.addEventListener('mousedown', function(e){ self.onMouseDown(e) });
    document.body.append(this.renderer.domElement);

    // player & scene
    this.player = new Player(this.renderer.domElement);
    this.camera = this.player.camera;
    this.raytracer = new RayTracer(this.renderer.domElement);

    // scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xCCCFFF, 0.008);
    this.scene.add(this.raytracer.object, this.player.object);

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

    //this.hud = new HUD(this.renderer.domElement);
    //this.player = new Player();
    //this.camera = new THREE.PerspectiveCamera(Globals.camera.fov, 1, Globals.camera.near, Globals.camera.far);
    //this.camera.up = new THREE.Vector3(0, 1, 0);
    // walls & floors
    //this.scene.add(this.model.object);

    // load gallery
    this.model = new PhysicsModel();
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
    const point3 = new THREE.PointLight(0xfeff87, 0.5, 12, 1);
    this.neonSign = new THREE.PointLight(0xff0000, 0.8, 15, 1);

    point1.position.set(0, 5, -10);
    point2.position.set(0, 14, 10);
    point3.position.set(-19, 8, 5);
    this.neonSign.position.set(0, 14, -32);

    this.scene.add(
      ambient,
      point1,
      //point2,
      point3,
      hemisphere,
      this.neonSign
    );

    // skybox
    const sky = new THREE.Sky();
    //const sun = new THREE.PointLight(0xffffff, 0.9, 40500);
    //sun.position.set(sky.uniforms.sunPosition.value.x, sky.uniforms.sunPosition.value.y, sky.uniforms.sunPosition.value.z);
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
    this.player.update(delta, this.collider);
    /*
    const yaw = this.player.getYaw();
    const pitch = this.player.getPitch();

    this.player.update(delta, this.model.contents);
    this.camera.position.set(this.player.position.x, this.player.position.y + this.player.height, this.player.position.z);
    this.camera.lookAt(new THREE.Vector3(
      this.player.position.x + Math.sin(yaw),
      this.player.position.y + this.player.height + Math.sin(pitch),
      this.player.position.z + Math.cos(yaw)
    ));
    */
  },

  render: function() {
    this.renderer.render(this.scene, this.camera);
  },
};

export default Scene;
