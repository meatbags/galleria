/** 3D Logo */

import Loader from '../loader/loader';

class Logo {
  constructor() {
    // scene
    this.scene = new THREE.Scene();
    const size = 5;//8;
    this.camera = new THREE.OrthographicCamera(size * -0.5, size * 0.5, size * 0.5, size * -0.5, 1, 100);
    this.camera.position.set(10, 5, 10);
    this.camera.lookAt(0, 1.5, 0);
    this.scene.add(this.camera);

    // load logo model
    this.loaded = false;
    this.loader = new Loader('assets/logo');
    this.loader.loadFBX('logo').then(obj => {
      this.logo = obj;
      this.children = [];
      console.log(obj);
      obj.children.forEach(child => {
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0x333333,
          metalness: 0.75,
        });
        const mat = child.material;
        mat.emissive = new THREE.Color(0x333333);
        mat.emissiveIntensity = 1;
        /*
        mat.transparent = true;
        mat.depthTest = false;
        mat.side = THREE.DoubleSide;
        mat.color = new THREE.Color(0xffffff);
        mat.alphaMap = mat.metalnessMap;
        mat.blending = THREE.AdditiveBlending;
        mat.metalness = 0.1;
        this.children.push(child);
        */
      });
      this.scene.add(obj);
      this.loaded = true;
      this.start();
    });

    // add some lights
    this.dLight1 = new THREE.DirectionalLight(0xeeeeee, 1);
    this.dLight2 = new THREE.DirectionalLight(0xeeeeee, 1);
    this.dLight3 = new THREE.DirectionalLight(0xeeeeee, 1);
    this.dLight1.position.set(-1, -1, 0);
    this.dLight2.position.set(1, 0, -1);
    this.scene.add(this.dLight1);
    this.scene.add(this.dLight2);
    this.scene.add(this.dLight3);

    this.pointLight1 = new THREE.PointLight(0xeeeeee, 1, 30, 1);
    this.pointLight2 = new THREE.PointLight(0xeeeeee, 0, 30, 1);
    this.pointLight3 = new THREE.PointLight(0xeeeeee, 0, 30, 1);
    this.pointLight1.position.set(5, 5, 5);
    this.pointLight2.position.set(0, -5, -10);
    this.pointLight3.position.set(0, 0, 0);
    //this.scene.add(this.pointLight1);
    //this.scene.add(this.pointLight2);
    //this.scene.add(this.pointLight3);

    // renderer
    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    this.renderer.setClearColor(0x0, 0);

    // resize, bind, add to doc
    this.resize();
    window.addEventListener('resize', () => { this.resize(); });
    document.querySelector('#canvas-logo-target').appendChild(this.renderer.domElement);
    document.querySelector('#logo').addEventListener('mouseenter', () => {
      /**
      this.pointLight1.intensity = 1;
      this.pointLight2.intensity = 1;
      this.pointLight3.intensity = 1;
      this.pointLight1.color.setHex(0xffefe1);
      this.pointLight2.color.setHex(0xffefe1);
      this.pointLight3.color.setHex(0xffefe1);
      **/
    });
    document.querySelector('#logo').addEventListener('mouseleave', () => {
      /**
      this.pointLight1.intensity = 0.65;
      this.pointLight2.intensity = 0.65;
      this.pointLight3.intensity = 0.65;
      this.pointLight1.color.setHex(0xffffff);
      this.pointLight2.color.setHex(0xffffff);
      this.pointLight3.color.setHex(0xffffff);
      **/
    });

    // start loop
    this.loop();
  }

  bind(root) {}

  start() {
    this.timer = { previous: performance.now() };
    this.active = true;
    document.querySelector('#canvas-logo-target').classList.add('active');
  }

  pause() {
    this.active = false;
    document.querySelector('#canvas-logo-target').classList.remove('active');
  }

  resize() {
    this.screenSize = window.innerWidth > window.innerHeight ?
      Math.round(window.innerWidth * 0.35) :
      Math.round(window.innerHeight * 0.33);
    this.renderer.setSize(this.screenSize, this.screenSize);
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); });
    if (this.active) {
      const now = performance.now();
      const delta = Math.min(0.1, (now - this.timer.previous) / 1000);
      this.timer.previous = now;
      if (this.logo) {
        //this.logo.rotation.y += delta * Math.PI / 24;
        //const c = this.children[0];
        //const o = this.children[1];
        //const m = this.children[2];
        //c.rotation.x += delta * Math.PI / 32;
        //c.rotation.z += delta * Math.PI / 64;
        //o.rotation.y -= delta * Math.PI / 100;
        //m.rotation.y -= delta * Math.PI / 48;
      }
      this.renderer.render(this.scene, this.camera);
    }
  }
}

export default Logo;
