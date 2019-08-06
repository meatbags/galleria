/** 3D Logo */

import Loader from '../loader/loader';
import Config from '../modules/config';

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

    // add some lights
    this.dLight1 = new THREE.DirectionalLight(0xffffff, 1);
    this.dLight2 = new THREE.DirectionalLight(0x40c1ac, 1);
    this.dLight3 = new THREE.DirectionalLight(0xffffff, 1);
    this.dLight3.position.set(1, 0.5, -0.25);
    this.scene.add(this.dLight1);
    this.scene.add(this.dLight2);
    this.scene.add(this.dLight3);

    // renderer
    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    this.renderer.setClearColor(0x0, 0);

    // resize, bind, add to doc
    this.domTarget = document.querySelector('#canvas-logo-target');
    this.resize();
    window.addEventListener('resize', () => { this.resize(); });
    this.domTarget.appendChild(this.renderer.domElement);
    document.querySelector('#logo').addEventListener('mouseenter', () => {
      if (this.children) {
        this.children.forEach(child => {
          child.material.color.setHex(0x40c1ac);
        });
      }
    });
    document.querySelector('#logo').addEventListener('mouseleave', () => {
      if (this.children) {
        this.children.forEach(child => {
          child.material.color.setHex(0x333333);
          child.position.set(0, 0, 0);
        });
      }
    });

    // start loop
    this.loop();
  }

  bind(root) {
    this.ref = {};
    this.ref.nav = root.modules.nav;

    // load logo model
    this.loader.loadFBX('logo').then(obj => {
      this.logo = obj;
      this.children = [];
      const mat = new THREE.MeshPhysicalMaterial({color: 0x333333, metalness: 0.75, emissive: 0x333333, emissiveIntensity: 1, side: THREE.DoubleSide});
      const box = new THREE.Box3();
      const process = child => {
        if (child.type === 'Group') {
          child.children.forEach(c => { process(c); });
        } else {
          child.material = mat;
          box.setFromObject(child);
          if (box.max.z - box.min.z < 2) {
            child.customVector = new THREE.Vector3(0, 0, 0);
            if (child.name.indexOf('x_pos') !== -1) {
              child.customVector.x = 1;
            } else if (child.name.indexOf('y_neg') !== -1) {
              child.customVector.y = -1;
            } else if (child.name.indexOf('y_pos') !== -1) {
              child.customVector.y = 1;
            } else if (child.name.indexOf('z_pos') !== -1) {
              child.customVector.z = 1;
            }
            this.children.push(child);
          }
        }
      };
      process(obj);

      // start scene
      this.scene.add(obj);
      this.loaded = true;
      this.start();

      // remove loading screen
      this.ref.nav.removeLoadingScreen();
    });
  }

  start() {
    this.age = this.age ? this.age : 0;
    this.timer = { previous: performance.now() };
    this.active = true;
    document.querySelector('#canvas-logo-target').classList.add('active');
  }

  pause() {
    this.active = false;
    document.querySelector('#canvas-logo-target').classList.remove('active');
  }

  resize() {
    if (window.innerWidth <= Config.mobileBreakpoint) {
      this.screenSize = window.innerWidth - 10;
    } else {
      this.screenSize = window.innerWidth > window.innerHeight ? Math.round(window.innerWidth * 0.3) : Math.round(window.innerHeight * 0.3);
    }

    // resize container
    this.domTarget.style.width = `${this.screenSize}px`;
    this.domTarget.style.height = `${this.screenSize}px`;

    // adjust for mobile devices
    if (window.devicePixelRatio > 1) {
      this.screenSize *= window.devicePixelRatio;
    }

    // resize renderer
    this.renderer.setSize(this.screenSize, this.screenSize);
  }

  updateChild(child, delta) {
    // animate
    if (child.customAnimation) {
      const anim = child.customAnimation;
      anim.age += delta;
      const t = Math.max(anim.minT, Math.min(anim.maxT, anim.age / anim.duration));
      child.position.x = anim.from.x + (anim.to.x - anim.from.x) * t;
      child.position.y = anim.from.y + (anim.to.y - anim.from.y) * t;
      child.position.z = anim.from.z + (anim.to.z - anim.from.z) * t;
    }

    // set new animation
    if (Math.random() > 0.97) {
      child.customAnimation = {
        duration: 0.1 + Math.random() * 1,
        from: child.position.clone(),
        minT: Math.random() > 0.25 ? 0 : Math.random(),
        maxT: Math.random() > 0.25 ? 1 : 1 + Math.random() * 0.25,
        age: 0,
      };

      // set target
      if (Math.random() > 0.65) {
        child.customAnimation.to = new THREE.Vector3(0, 0, 0);
      } else {
        const n = 0.025 + Math.random() * 0.125;
        child.customAnimation.to = child.customVector.clone();
        child.customAnimation.to.multiplyScalar(n);
      }
    }
  }

  update() {
    if (this.active) {
      const now = performance.now();
      const delta = Math.min(0.1, (now - this.timer.previous) / 1000);
      this.timer.previous = now;
      this.age += delta * 0.125;
      this.dLight1.position.set(Math.sin(this.age), Math.cos(this.age), 0);
      this.dLight2.position.set(Math.cos(this.age), 0, -Math.sin(this.age));
      if (this.children) {
        this.children.forEach(child => {
          this.updateChild(child, delta);
        });
      }
      this.renderer.render(this.scene, this.camera);
    }
  }

  mobileLoop() {
    setTimeout(() => { this.mobileLoop(); }, Math.round(1000 / 30));
    this.update();
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); });
    this.update();
  }
}

export default Logo;
