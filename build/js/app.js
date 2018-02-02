var closedmondays =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalise = exports.reverseVector = exports.crossProduct = exports.scaleVector = exports.subtractVector = exports.addVector = exports.dotProduct = exports.distanceBetween2D = exports.distanceBetween = exports.twoPi = exports.pitchBetween = exports.isVectorEqual = exports.copyVector = exports.getMagnitude2D = exports.getMagnitude = exports.getDistanceVec3 = exports.getDistanceVec2 = exports.getMagnitudeVec3 = exports.getYaw = exports.getPitch = exports.getNormalisedVec3 = exports.minAngleDifference = exports.v3 = undefined;

var _general = __webpack_require__(21);

var _vector = __webpack_require__(22);

exports.v3 = _general.v3;
exports.minAngleDifference = _general.minAngleDifference;
exports.getNormalisedVec3 = _general.getNormalisedVec3;
exports.getPitch = _general.getPitch;
exports.getYaw = _general.getYaw;
exports.getMagnitudeVec3 = _general.getMagnitudeVec3;
exports.getDistanceVec2 = _general.getDistanceVec2;
exports.getDistanceVec3 = _general.getDistanceVec3;
exports.getMagnitude = _vector.getMagnitude;
exports.getMagnitude2D = _vector.getMagnitude2D;
exports.copyVector = _vector.copyVector;
exports.isVectorEqual = _vector.isVectorEqual;
exports.pitchBetween = _vector.pitchBetween;
exports.twoPi = _vector.twoPi;
exports.distanceBetween = _vector.distanceBetween;
exports.distanceBetween2D = _vector.distanceBetween2D;
exports.dotProduct = _vector.dotProduct;
exports.addVector = _vector.addVector;
exports.subtractVector = _vector.subtractVector;
exports.scaleVector = _vector.scaleVector;
exports.crossProduct = _vector.crossProduct;
exports.reverseVector = _vector.reverseVector;
exports.normalise = _vector.normalise;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Materials = exports.Globals = undefined;

var _globals = __webpack_require__(23);

var _globals2 = _interopRequireDefault(_globals);

var _materials = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Globals = _globals2.default;
exports.Materials = _materials.Materials;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPE_FOCAL = exports.Focal = undefined;

var _maths = __webpack_require__(0);

var _config = __webpack_require__(1);

var TYPE_FOCAL = 'TYPE_FOCAL';

var Focal = function Focal(id, pos, dim, eye, source) {
  this.id = id;
  this.type = TYPE_FOCAL;
  this.position = pos;
  this.dimensions = dim;
  this.eye = eye;
  this.source = source;
  this.active = false;
  this.init();
};

Focal.prototype = {
  init: function init() {
    this.pitch = (0, _maths.getPitch)(this.eye, new THREE.Vector3(this.position.x, this.position.y - _config.Globals.player.height, this.position.z));
    this.yaw = (0, _maths.getYaw)(this.eye, this.position);
    this.direction = Math.abs(Math.sin(this.yaw)) < 0.5 ? 'z' : 'x';
    this.object = new THREE.Mesh(new THREE.BoxBufferGeometry(this.dimensions.x, this.dimensions.y, this.dimensions.z), _config.Materials.dev2);
    this.object.position.set(this.position.x, this.position.y, this.position.z);
    this.box = new THREE.Box3();
    this.setBox();
  },

  activate: function activate() {
    this.active = true;
  },

  deactivate: function deactivate() {
    this.active = false;
  },

  setBox: function setBox() {
    // set collision box size
    var min = (0, _maths.subtractVector)(this.object.position, (0, _maths.scaleVector)(this.dimensions, 0.5));
    var max = (0, _maths.addVector)(this.object.position, (0, _maths.scaleVector)(this.dimensions, 0.5));
    this.box.set(min, max);
  },

  collision: function collision(point) {
    return this.box.containsPoint(point);
  },

  scale: function scale(x, y, z) {
    var s = _config.Globals.artwork.clickBoxScale;
    var zScale = this.direction == 'z' ? 0.25 : 1;
    var xScale = this.direction == 'x' ? 0.25 : 1;

    this.dimensions.x *= x * s * xScale;
    this.dimensions.y *= y * s;
    this.dimensions.z *= z * s * zScale;
    this.object.scale.x = x * s * xScale;
    this.object.scale.y = y * s;
    this.object.scale.z = z * s * zScale;
    this.object.position.set(this.position.x - Math.sin(this.yaw) * (x * xScale * 0.5), this.position.y, this.position.z - Math.cos(this.yaw) * (z * zScale * 0.5));
    this.setBox();
  }
};

exports.Focal = Focal;
exports.TYPE_FOCAL = TYPE_FOCAL;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(1);

var LoadOBJ = function LoadOBJ(basePath) {
  this.basePath = basePath;
  this.init();
};

LoadOBJ.prototype = {
  init: function init() {
    this.materialLoader = new THREE.MTLLoader();
    this.objectLoader = new THREE.OBJLoader();
    this.materialLoader.setPath(this.basePath);
    this.objectLoader.setPath(this.basePath);
  },

  process: function process(obj, materials) {
    // fix materials
    var self = this;

    for (var i = 0; i < obj.children.length; i += 1) {
      var child = obj.children[i];
      var meta = materials.materialsInfo[child.material.name];

      child.material = new THREE.MeshPhongMaterial({ color: 0x888888 });

      /*
      // set from material loader
      child.material = materials.materials[child.material.name];
        // load lightmaps
      if (meta.map_ka) {
        const uvs = child.geometry.attributes.uv.array;
        const src = meta.map_ka;
        const tex = new THREE.TextureLoader().load(self.basePath + src);
          child.material.lightMap = tex;
        child.material.lightMapIntensity = Globals.loader.lightMapIntensity;
        child.geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs, 2));
      }
        child.material.bumpScale = Globals.loader.bumpScale;
        // make glass translucent
        if (child.material.map) {
        // if textured, set full colour
        child.material.color = new THREE.Color(0xffffff);
          // set transparent for .png
          if (child.material.map.image.src.indexOf('.png') !== -1) {
          child.material.transparent = true;
          child.material.side = THREE.DoubleSide;
        }
          // for glass
          if (child.material.map.image.src.indexOf('glass') != -1) {
          child.material.transparent = true;
          child.material.opacity = 0.4;
        }
      } else {
        // no texture, set colour
        child.material.emissive = child.material.color;
      }
      */
    }
  },

  loadOBJ: function loadOBJ(filename) {
    var self = this;

    return new Promise(function (resolve, reject) {
      try {
        self.materialLoader.load(filename + '.mtl', function (materials) {
          materials.preload();
          //self.objectLoader.setMaterials(materials);
          self.objectLoader.load(filename + '.obj', function (obj) {
            self.process(obj, materials);
            resolve(obj);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};

exports.default = LoadOBJ;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _performance = __webpack_require__(5);

var _scene = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		// main app

		this.mode = window.location.port === '8080' ? 'dev' : 'production';
		this.timer = new _performance.Timer();
		this.scene = new _scene.Scene();

		// set up controls, events

		this.events();

		// set, go to loading screen

		this.resize();
		$('.pre-loading').fadeOut(1000);
		this.loading();
	}

	_createClass(App, [{
		key: 'events',
		value: function events() {
			var _this = this;

			// doc events
			// open, close menu

			$('.nav-menu').on('click', function (e) {
				var $target = $($(e.currentTarget).data('menu'));

				if ($target.hasClass('hidden')) {
					$('.menu').removeClass('active').addClass('hidden');
					$target.addClass('active').removeClass('hidden');
				} else {
					$('.menu').removeClass('active').addClass('hidden');
				}
			});

			$('.menu-close').on('click', function () {
				$('.menu').removeClass('active').addClass('hidden');
			});

			// on resize

			$(window).on('resize', function () {
				_this.resize();
			});

			// pause, resume

			$(window).on('focus', function () {
				_this.paused = false;
				_this.loop();
			});

			$(window).on('blur', function () {
				_this.paused = true;
			});
		}
	}, {
		key: 'resize',
		value: function resize() {
			// resize canvas, nav

			var width = Math.floor(window.innerWidth / 2);
			var height = 520;

			this.scene.resize(width, height);
			$('.nav').css({ top: window.innerHeight / 2 + height / 2 + 'px' });
		}
	}, {
		key: 'loading',
		value: function loading() {
			var _this2 = this;

			// wait while loading

			this.timer.update();

			if (!this.scene.isLoaded() && this.mode != 'dev') {
				requestAnimationFrame(function () {
					_this2.loading();
				});
			} else {
				$('#nav-default').removeClass('hidden');
				$('.loading').fadeOut(1000);
				this.loop();
			}
		}
	}, {
		key: 'loop',
		value: function loop() {
			var _this3 = this;

			// main loop

			if (!this.paused) {
				requestAnimationFrame(function () {
					_this3.loop();
				});

				var delta = this.timer.getDelta();

				this.timer.update();
				this.scene.update(delta);
				this.scene.render(delta);
			}
		}
	}]);

	return App;
}();

window.onload = function () {
	var app = new App();
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = undefined;

var _timer = __webpack_require__(6);

var _timer2 = _interopRequireDefault(_timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Timer = _timer2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
	function Timer() {
		_classCallCheck(this, Timer);

		// timing and performance

		this.delta = 0;
		this.maxDelta = 1 / 30;
		this.now = 0;
		this.then = 0;

		// set

		this.reset();
	}

	_createClass(Timer, [{
		key: "update",
		value: function update() {
			// update timer

			this.then = this.now;
			this.now = new Date().getTime();
			this.delta = (this.now - this.then) / 1000.;
		}
	}, {
		key: "getDelta",
		value: function getDelta() {
			// get delta

			return Math.min(this.delta, this.maxDelta);
		}
	}, {
		key: "reset",
		value: function reset() {
			// reset timer

			this.now = new Date().getTime();
			this.then = this.now;
		}
	}]);

	return Timer;
}();

exports.default = Timer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = undefined;

var _scene = __webpack_require__(8);

var _scene2 = _interopRequireDefault(_scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Scene = _scene2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(9);

var _player = __webpack_require__(20);

var _player2 = _interopRequireDefault(_player);

var _config = __webpack_require__(1);

var _art = __webpack_require__(26);

var _maths = __webpack_require__(0);

var _loader = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scene = function Scene() {
  this.init();
};

Scene.prototype = {
  init: function init() {
    var self = this;
    var isMonday = (new Date().getDay() == 1 || window.location.hash == '#monday') && window.location.hash != '#tuesday';

    // threejs

    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setClearColor(0xf9e5a2, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    $('.wrapper .content').append(this.renderer.domElement);

    // player & scene
    this.player = new _player2.default(this.renderer.domElement);
    this.camera = this.player.camera;

    // scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xCCCFFF, 0.008);

    // collision map
    this.collider = new Collider.System();

    // load !
    this.roomLoader = new _loader.RoomLoader(this.scene, this.collider, isMonday);

    // resize
    this.resize();

    // load gallery & lighting
    this.lightHandler = new _loader.LightHandler(this.scene, this.player);
    this.lightHandler.load(isMonday);
    this.artworks = new _art.Artworks();

    if (!isMonday) {}
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
      // lighting
    //this.player.raytracer.object
    */


    // skybox
    //const sky = new THREE.Sky();
    //this.scene.add(sky.mesh);

    // postprocessing
    this.postprocessing();
  },

  isLoaded: function isLoaded() {
    return this.roomLoader.isLoaded() && this.artworks.toLoad === 0;
  },

  resize: function resize(width, height) {
    // resize

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.width = width;
    this.height = height;
  },

  postprocessing: function postprocessing() {
    // post-processing passes
    this.renderPass = new THREE.RenderPass(this.scene, this.camera);
    this.mechanicsPass = new THREE.MechanicsPass(this.size);
    this.bloomPass = new THREE.UnrealBloomPass(this.size, .75, 1.2, 0.9); // res, strength, radius, threshold
    //this.ssaoPass = new THREE.SSAOPass(this.scene, this.camera);
    this.bloomPass.renderToScreen = true;

    // set composer
    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.setSize(this.width, this.height);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.mechanicsPass);
    //this.composer.addPass(this.ssaoPass);
    this.composer.addPass(this.bloomPass);

    // gamma
    //this.renderer.gammaInput = true;
    //this.renderer.gammaOutput = true;
  },

  update: function update(delta) {
    this.player.update(delta, this.collider, this.artworks);
  },

  render: function render(delta) {
    this.composer.render(delta);
    //this.renderer.render(this.scene, this.camera);
  }
};

exports.default = Scene;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);

__webpack_require__(16);

__webpack_require__(17);

__webpack_require__(18);

__webpack_require__(19);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

THREE.CopyShader = {

		uniforms: {

				"tDiffuse": { value: null },
				"opacity": { value: 1.0 }

		},

		vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

		fragmentShader: ["uniform float opacity;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "gl_FragColor = opacity * texel;", "}"].join("\n")

};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.EffectComposer = function (renderer, renderTarget) {

	this.renderer = renderer;

	if (renderTarget === undefined) {

		var parameters = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			stencilBuffer: false
		};

		var size = renderer.getDrawingBufferSize();
		renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, parameters);
		renderTarget.texture.name = 'EffectComposer.rt1';
	}

	this.renderTarget1 = renderTarget;
	this.renderTarget2 = renderTarget.clone();
	this.renderTarget2.texture.name = 'EffectComposer.rt2';

	this.writeBuffer = this.renderTarget1;
	this.readBuffer = this.renderTarget2;

	this.passes = [];

	// dependencies

	if (THREE.CopyShader === undefined) {

		console.error('THREE.EffectComposer relies on THREE.CopyShader');
	}

	if (THREE.ShaderPass === undefined) {

		console.error('THREE.EffectComposer relies on THREE.ShaderPass');
	}

	this.copyPass = new THREE.ShaderPass(THREE.CopyShader);
};

Object.assign(THREE.EffectComposer.prototype, {

	swapBuffers: function swapBuffers() {

		var tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;
	},

	addPass: function addPass(pass) {

		this.passes.push(pass);

		var size = this.renderer.getDrawingBufferSize();
		pass.setSize(size.width, size.height);
	},

	insertPass: function insertPass(pass, index) {

		this.passes.splice(index, 0, pass);
	},

	render: function render(delta) {

		var maskActive = false;

		var pass,
		    i,
		    il = this.passes.length;

		for (i = 0; i < il; i++) {

			pass = this.passes[i];

			if (pass.enabled === false) continue;

			pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive);

			if (pass.needsSwap) {

				if (maskActive) {

					var context = this.renderer.context;

					context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff);

					this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, delta);

					context.stencilFunc(context.EQUAL, 1, 0xffffffff);
				}

				this.swapBuffers();
			}

			if (THREE.MaskPass !== undefined) {

				if (pass instanceof THREE.MaskPass) {

					maskActive = true;
				} else if (pass instanceof THREE.ClearMaskPass) {

					maskActive = false;
				}
			}
		}
	},

	reset: function reset(renderTarget) {

		if (renderTarget === undefined) {

			var size = this.renderer.getDrawingBufferSize();

			renderTarget = this.renderTarget1.clone();
			renderTarget.setSize(size.width, size.height);
		}

		this.renderTarget1.dispose();
		this.renderTarget2.dispose();
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;
	},

	setSize: function setSize(width, height) {

		this.renderTarget1.setSize(width, height);
		this.renderTarget2.setSize(width, height);

		for (var i = 0; i < this.passes.length; i++) {

			this.passes[i].setSize(width, height);
		}
	}

});

THREE.Pass = function () {

	// if set to true, the pass is processed by the composer
	this.enabled = true;

	// if set to true, the pass indicates to swap read and write buffer after rendering
	this.needsSwap = true;

	// if set to true, the pass clears its buffer before rendering
	this.clear = false;

	// if set to true, the result of the pass is rendered to screen
	this.renderToScreen = false;
};

Object.assign(THREE.Pass.prototype, {

	setSize: function setSize(width, height) {},

	render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

		console.error('THREE.Pass: .render() must be implemented in derived pass.');
	}

});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author alteredq / http://alteredqualia.com/
 * @author davidedc / http://www.sketchpatch.net/
 *
 * NVIDIA FXAA by Timothy Lottes
 * http://timothylottes.blogspot.com/2011/06/fxaa3-source-released.html
 * - WebGL port by @supereggbert
 * http://www.glge.org/demos/fxaa/
 */

THREE.FXAAShader = {

  uniforms: {

    "tDiffuse": { value: null },
    "resolution": { value: new THREE.Vector2(1 / 1024, 1 / 512) }

  },

  vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

  fragmentShader: ["precision highp float;", "", "uniform sampler2D tDiffuse;", "", "uniform vec2 resolution;", "", "varying vec2 vUv;", "", "// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)", "", "//----------------------------------------------------------------------------------", "// File:        es3-kepler\FXAA\assets\shaders/FXAA_DefaultES.frag", "// SDK Version: v3.00", "// Email:       gameworks@nvidia.com", "// Site:        http://developer.nvidia.com/", "//", "// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.", "//", "// Redistribution and use in source and binary forms, with or without", "// modification, are permitted provided that the following conditions", "// are met:", "//  * Redistributions of source code must retain the above copyright", "//    notice, this list of conditions and the following disclaimer.", "//  * Redistributions in binary form must reproduce the above copyright", "//    notice, this list of conditions and the following disclaimer in the", "//    documentation and/or other materials provided with the distribution.", "//  * Neither the name of NVIDIA CORPORATION nor the names of its", "//    contributors may be used to endorse or promote products derived", "//    from this software without specific prior written permission.", "//", "// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ``AS IS'' AND ANY", "// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE", "// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR", "// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR", "// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,", "// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,", "// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR", "// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY", "// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT", "// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE", "// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.", "//", "//----------------------------------------------------------------------------------", "", "#define FXAA_PC 1", "#define FXAA_GLSL_100 1", "#define FXAA_QUALITY_PRESET 12", "", "#define FXAA_GREEN_AS_LUMA 1", "", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_PC_CONSOLE", "    //", "    // The console algorithm for PC is included", "    // for developers targeting really low spec machines.", "    // Likely better to just run FXAA_PC, and use a really low preset.", "    //", "    #define FXAA_PC_CONSOLE 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_GLSL_120", "    #define FXAA_GLSL_120 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_GLSL_130", "    #define FXAA_GLSL_130 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_HLSL_3", "    #define FXAA_HLSL_3 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_HLSL_4", "    #define FXAA_HLSL_4 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_HLSL_5", "    #define FXAA_HLSL_5 0", "#endif", "/*==========================================================================*/", "#ifndef FXAA_GREEN_AS_LUMA", "    //", "    // For those using non-linear color,", "    // and either not able to get luma in alpha, or not wanting to,", "    // this enables FXAA to run using green as a proxy for luma.", "    // So with this enabled, no need to pack luma in alpha.", "    //", "    // This will turn off AA on anything which lacks some amount of green.", "    // Pure red and blue or combination of only R and B, will get no AA.", "    //", "    // Might want to lower the settings for both,", "    //    fxaaConsoleEdgeThresholdMin", "    //    fxaaQualityEdgeThresholdMin", "    // In order to insure AA does not get turned off on colors", "    // which contain a minor amount of green.", "    //", "    // 1 = On.", "    // 0 = Off.", "    //", "    #define FXAA_GREEN_AS_LUMA 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_EARLY_EXIT", "    //", "    // Controls algorithm's early exit path.", "    // On PS3 turning this ON adds 2 cycles to the shader.", "    // On 360 turning this OFF adds 10ths of a millisecond to the shader.", "    // Turning this off on console will result in a more blurry image.", "    // So this defaults to on.", "    //", "    // 1 = On.", "    // 0 = Off.", "    //", "    #define FXAA_EARLY_EXIT 1", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_DISCARD", "    //", "    // Only valid for PC OpenGL currently.", "    // Probably will not work when FXAA_GREEN_AS_LUMA = 1.", "    //", "    // 1 = Use discard on pixels which don't need AA.", "    //     For APIs which enable concurrent TEX+ROP from same surface.", "    // 0 = Return unchanged color on pixels which don't need AA.", "    //", "    #define FXAA_DISCARD 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_FAST_PIXEL_OFFSET", "    //", "    // Used for GLSL 120 only.", "    //", "    // 1 = GL API supports fast pixel offsets", "    // 0 = do not use fast pixel offsets", "    //", "    #ifdef GL_EXT_gpu_shader4", "        #define FXAA_FAST_PIXEL_OFFSET 1", "    #endif", "    #ifdef GL_NV_gpu_shader5", "        #define FXAA_FAST_PIXEL_OFFSET 1", "    #endif", "    #ifdef GL_ARB_gpu_shader5", "        #define FXAA_FAST_PIXEL_OFFSET 1", "    #endif", "    #ifndef FXAA_FAST_PIXEL_OFFSET", "        #define FXAA_FAST_PIXEL_OFFSET 0", "    #endif", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_GATHER4_ALPHA", "    //", "    // 1 = API supports gather4 on alpha channel.", "    // 0 = API does not support gather4 on alpha channel.", "    //", "    #if (FXAA_HLSL_5 == 1)", "        #define FXAA_GATHER4_ALPHA 1", "    #endif", "    #ifdef GL_ARB_gpu_shader5", "        #define FXAA_GATHER4_ALPHA 1", "    #endif", "    #ifdef GL_NV_gpu_shader5", "        #define FXAA_GATHER4_ALPHA 1", "    #endif", "    #ifndef FXAA_GATHER4_ALPHA", "        #define FXAA_GATHER4_ALPHA 0", "    #endif", "#endif", "", "", "/*============================================================================", "                        FXAA QUALITY - TUNING KNOBS", "------------------------------------------------------------------------------", "NOTE the other tuning knobs are now in the shader function inputs!", "============================================================================*/", "#ifndef FXAA_QUALITY_PRESET", "    //", "    // Choose the quality preset.", "    // This needs to be compiled into the shader as it effects code.", "    // Best option to include multiple presets is to", "    // in each shader define the preset, then include this file.", "    //", "    // OPTIONS", "    // -----------------------------------------------------------------------", "    // 10 to 15 - default medium dither (10=fastest, 15=highest quality)", "    // 20 to 29 - less dither, more expensive (20=fastest, 29=highest quality)", "    // 39       - no dither, very expensive", "    //", "    // NOTES", "    // -----------------------------------------------------------------------", "    // 12 = slightly faster then FXAA 3.9 and higher edge quality (default)", "    // 13 = about same speed as FXAA 3.9 and better than 12", "    // 23 = closest to FXAA 3.9 visually and performance wise", "    //  _ = the lowest digit is directly related to performance", "    // _  = the highest digit is directly related to style", "    //", "    #define FXAA_QUALITY_PRESET 12", "#endif", "", "", "/*============================================================================", "", "                           FXAA QUALITY - PRESETS", "", "============================================================================*/", "", "/*============================================================================", "                     FXAA QUALITY - MEDIUM DITHER PRESETS", "============================================================================*/", "#if (FXAA_QUALITY_PRESET == 10)", "    #define FXAA_QUALITY_PS 3", "    #define FXAA_QUALITY_P0 1.5", "    #define FXAA_QUALITY_P1 3.0", "    #define FXAA_QUALITY_P2 12.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 11)", "    #define FXAA_QUALITY_PS 4", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 3.0", "    #define FXAA_QUALITY_P3 12.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 12)", "    #define FXAA_QUALITY_PS 5", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 4.0", "    #define FXAA_QUALITY_P4 12.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 13)", "    #define FXAA_QUALITY_PS 6", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 4.0", "    #define FXAA_QUALITY_P5 12.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 14)", "    #define FXAA_QUALITY_PS 7", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 4.0", "    #define FXAA_QUALITY_P6 12.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 15)", "    #define FXAA_QUALITY_PS 8", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 4.0", "    #define FXAA_QUALITY_P7 12.0", "#endif", "", "/*============================================================================", "                     FXAA QUALITY - LOW DITHER PRESETS", "============================================================================*/", "#if (FXAA_QUALITY_PRESET == 20)", "    #define FXAA_QUALITY_PS 3", "    #define FXAA_QUALITY_P0 1.5", "    #define FXAA_QUALITY_P1 2.0", "    #define FXAA_QUALITY_P2 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 21)", "    #define FXAA_QUALITY_PS 4", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 22)", "    #define FXAA_QUALITY_PS 5", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 23)", "    #define FXAA_QUALITY_PS 6", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 24)", "    #define FXAA_QUALITY_PS 7", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 3.0", "    #define FXAA_QUALITY_P6 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 25)", "    #define FXAA_QUALITY_PS 8", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 4.0", "    #define FXAA_QUALITY_P7 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 26)", "    #define FXAA_QUALITY_PS 9", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 2.0", "    #define FXAA_QUALITY_P7 4.0", "    #define FXAA_QUALITY_P8 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 27)", "    #define FXAA_QUALITY_PS 10", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 2.0", "    #define FXAA_QUALITY_P7 2.0", "    #define FXAA_QUALITY_P8 4.0", "    #define FXAA_QUALITY_P9 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 28)", "    #define FXAA_QUALITY_PS 11", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 2.0", "    #define FXAA_QUALITY_P7 2.0", "    #define FXAA_QUALITY_P8 2.0", "    #define FXAA_QUALITY_P9 4.0", "    #define FXAA_QUALITY_P10 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 29)", "    #define FXAA_QUALITY_PS 12", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 2.0", "    #define FXAA_QUALITY_P7 2.0", "    #define FXAA_QUALITY_P8 2.0", "    #define FXAA_QUALITY_P9 2.0", "    #define FXAA_QUALITY_P10 4.0", "    #define FXAA_QUALITY_P11 8.0", "#endif", "", "/*============================================================================", "                     FXAA QUALITY - EXTREME QUALITY", "============================================================================*/", "#if (FXAA_QUALITY_PRESET == 39)", "    #define FXAA_QUALITY_PS 12", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.0", "    #define FXAA_QUALITY_P2 1.0", "    #define FXAA_QUALITY_P3 1.0", "    #define FXAA_QUALITY_P4 1.0", "    #define FXAA_QUALITY_P5 1.5", "    #define FXAA_QUALITY_P6 2.0", "    #define FXAA_QUALITY_P7 2.0", "    #define FXAA_QUALITY_P8 2.0", "    #define FXAA_QUALITY_P9 2.0", "    #define FXAA_QUALITY_P10 4.0", "    #define FXAA_QUALITY_P11 8.0", "#endif", "", "", "", "/*============================================================================", "", "                                API PORTING", "", "============================================================================*/", "#if (FXAA_GLSL_100 == 1) || (FXAA_GLSL_120 == 1) || (FXAA_GLSL_130 == 1)", "    #define FxaaBool bool", "    #define FxaaDiscard discard", "    #define FxaaFloat float", "    #define FxaaFloat2 vec2", "    #define FxaaFloat3 vec3", "    #define FxaaFloat4 vec4", "    #define FxaaHalf float", "    #define FxaaHalf2 vec2", "    #define FxaaHalf3 vec3", "    #define FxaaHalf4 vec4", "    #define FxaaInt2 ivec2", "    #define FxaaSat(x) clamp(x, 0.0, 1.0)", "    #define FxaaTex sampler2D", "#else", "    #define FxaaBool bool", "    #define FxaaDiscard clip(-1)", "    #define FxaaFloat float", "    #define FxaaFloat2 float2", "    #define FxaaFloat3 float3", "    #define FxaaFloat4 float4", "    #define FxaaHalf half", "    #define FxaaHalf2 half2", "    #define FxaaHalf3 half3", "    #define FxaaHalf4 half4", "    #define FxaaSat(x) saturate(x)", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_GLSL_100 == 1)", "  #define FxaaTexTop(t, p) texture2D(t, p, 0.0)", "  #define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), 0.0)", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_GLSL_120 == 1)", "    // Requires,", "    //  #version 120", "    // And at least,", "    //  #extension GL_EXT_gpu_shader4 : enable", "    //  (or set FXAA_FAST_PIXEL_OFFSET 1 to work like DX9)", "    #define FxaaTexTop(t, p) texture2DLod(t, p, 0.0)", "    #if (FXAA_FAST_PIXEL_OFFSET == 1)", "        #define FxaaTexOff(t, p, o, r) texture2DLodOffset(t, p, 0.0, o)", "    #else", "        #define FxaaTexOff(t, p, o, r) texture2DLod(t, p + (o * r), 0.0)", "    #endif", "    #if (FXAA_GATHER4_ALPHA == 1)", "        // use #extension GL_ARB_gpu_shader5 : enable", "        #define FxaaTexAlpha4(t, p) textureGather(t, p, 3)", "        #define FxaaTexOffAlpha4(t, p, o) textureGatherOffset(t, p, o, 3)", "        #define FxaaTexGreen4(t, p) textureGather(t, p, 1)", "        #define FxaaTexOffGreen4(t, p, o) textureGatherOffset(t, p, o, 1)", "    #endif", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_GLSL_130 == 1)", "    // Requires \"#version 130\" or better", "    #define FxaaTexTop(t, p) textureLod(t, p, 0.0)", "    #define FxaaTexOff(t, p, o, r) textureLodOffset(t, p, 0.0, o)", "    #if (FXAA_GATHER4_ALPHA == 1)", "        // use #extension GL_ARB_gpu_shader5 : enable", "        #define FxaaTexAlpha4(t, p) textureGather(t, p, 3)", "        #define FxaaTexOffAlpha4(t, p, o) textureGatherOffset(t, p, o, 3)", "        #define FxaaTexGreen4(t, p) textureGather(t, p, 1)", "        #define FxaaTexOffGreen4(t, p, o) textureGatherOffset(t, p, o, 1)", "    #endif", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_HLSL_3 == 1)", "    #define FxaaInt2 float2", "    #define FxaaTex sampler2D", "    #define FxaaTexTop(t, p) tex2Dlod(t, float4(p, 0.0, 0.0))", "    #define FxaaTexOff(t, p, o, r) tex2Dlod(t, float4(p + (o * r), 0, 0))", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_HLSL_4 == 1)", "    #define FxaaInt2 int2", "    struct FxaaTex { SamplerState smpl; Texture2D tex; };", "    #define FxaaTexTop(t, p) t.tex.SampleLevel(t.smpl, p, 0.0)", "    #define FxaaTexOff(t, p, o, r) t.tex.SampleLevel(t.smpl, p, 0.0, o)", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_HLSL_5 == 1)", "    #define FxaaInt2 int2", "    struct FxaaTex { SamplerState smpl; Texture2D tex; };", "    #define FxaaTexTop(t, p) t.tex.SampleLevel(t.smpl, p, 0.0)", "    #define FxaaTexOff(t, p, o, r) t.tex.SampleLevel(t.smpl, p, 0.0, o)", "    #define FxaaTexAlpha4(t, p) t.tex.GatherAlpha(t.smpl, p)", "    #define FxaaTexOffAlpha4(t, p, o) t.tex.GatherAlpha(t.smpl, p, o)", "    #define FxaaTexGreen4(t, p) t.tex.GatherGreen(t.smpl, p)", "    #define FxaaTexOffGreen4(t, p, o) t.tex.GatherGreen(t.smpl, p, o)", "#endif", "", "", "/*============================================================================", "                   GREEN AS LUMA OPTION SUPPORT FUNCTION", "============================================================================*/", "#if (FXAA_GREEN_AS_LUMA == 0)", "    FxaaFloat FxaaLuma(FxaaFloat4 rgba) { return rgba.w; }", "#else", "    FxaaFloat FxaaLuma(FxaaFloat4 rgba) { return rgba.y; }", "#endif", "", "", "", "", "/*============================================================================", "", "                             FXAA3 QUALITY - PC", "", "============================================================================*/", "#if (FXAA_PC == 1)", "/*--------------------------------------------------------------------------*/", "FxaaFloat4 FxaaPixelShader(", "    //", "    // Use noperspective interpolation here (turn off perspective interpolation).", "    // {xy} = center of pixel", "    FxaaFloat2 pos,", "    //", "    // Used only for FXAA Console, and not used on the 360 version.", "    // Use noperspective interpolation here (turn off perspective interpolation).", "    // {xy_} = upper left of pixel", "    // {_zw} = lower right of pixel", "    FxaaFloat4 fxaaConsolePosPos,", "    //", "    // Input color texture.", "    // {rgb_} = color in linear or perceptual color space", "    // if (FXAA_GREEN_AS_LUMA == 0)", "    //     {__a} = luma in perceptual color space (not linear)", "    FxaaTex tex,", "    //", "    // Only used on the optimized 360 version of FXAA Console.", "    // For everything but 360, just use the same input here as for \"tex\".", "    // For 360, same texture, just alias with a 2nd sampler.", "    // This sampler needs to have an exponent bias of -1.", "    FxaaTex fxaaConsole360TexExpBiasNegOne,", "    //", "    // Only used on the optimized 360 version of FXAA Console.", "    // For everything but 360, just use the same input here as for \"tex\".", "    // For 360, same texture, just alias with a 3nd sampler.", "    // This sampler needs to have an exponent bias of -2.", "    FxaaTex fxaaConsole360TexExpBiasNegTwo,", "    //", "    // Only used on FXAA Quality.", "    // This must be from a constant/uniform.", "    // {x_} = 1.0/screenWidthInPixels", "    // {_y} = 1.0/screenHeightInPixels", "    FxaaFloat2 fxaaQualityRcpFrame,", "    //", "    // Only used on FXAA Console.", "    // This must be from a constant/uniform.", "    // This effects sub-pixel AA quality and inversely sharpness.", "    //   Where N ranges between,", "    //     N = 0.50 (default)", "    //     N = 0.33 (sharper)", "    // {x__} = -N/screenWidthInPixels", "    // {_y_} = -N/screenHeightInPixels", "    // {_z_} =  N/screenWidthInPixels", "    // {__w} =  N/screenHeightInPixels", "    FxaaFloat4 fxaaConsoleRcpFrameOpt,", "    //", "    // Only used on FXAA Console.", "    // Not used on 360, but used on PS3 and PC.", "    // This must be from a constant/uniform.", "    // {x__} = -2.0/screenWidthInPixels", "    // {_y_} = -2.0/screenHeightInPixels", "    // {_z_} =  2.0/screenWidthInPixels", "    // {__w} =  2.0/screenHeightInPixels", "    FxaaFloat4 fxaaConsoleRcpFrameOpt2,", "    //", "    // Only used on FXAA Console.", "    // Only used on 360 in place of fxaaConsoleRcpFrameOpt2.", "    // This must be from a constant/uniform.", "    // {x__} =  8.0/screenWidthInPixels", "    // {_y_} =  8.0/screenHeightInPixels", "    // {_z_} = -4.0/screenWidthInPixels", "    // {__w} = -4.0/screenHeightInPixels", "    FxaaFloat4 fxaaConsole360RcpFrameOpt2,", "    //", "    // Only used on FXAA Quality.", "    // This used to be the FXAA_QUALITY_SUBPIX define.", "    // It is here now to allow easier tuning.", "    // Choose the amount of sub-pixel aliasing removal.", "    // This can effect sharpness.", "    //   1.00 - upper limit (softer)", "    //   0.75 - default amount of filtering", "    //   0.50 - lower limit (sharper, less sub-pixel aliasing removal)", "    //   0.25 - almost off", "    //   0.00 - completely off", "    FxaaFloat fxaaQualitySubpix,", "    //", "    // Only used on FXAA Quality.", "    // This used to be the FXAA_QUALITY_EDGE_THRESHOLD define.", "    // It is here now to allow easier tuning.", "    // The minimum amount of local contrast required to apply algorithm.", "    //   0.333 - too little (faster)", "    //   0.250 - low quality", "    //   0.166 - default", "    //   0.125 - high quality", "    //   0.063 - overkill (slower)", "    FxaaFloat fxaaQualityEdgeThreshold,", "    //", "    // Only used on FXAA Quality.", "    // This used to be the FXAA_QUALITY_EDGE_THRESHOLD_MIN define.", "    // It is here now to allow easier tuning.", "    // Trims the algorithm from processing darks.", "    //   0.0833 - upper limit (default, the start of visible unfiltered edges)", "    //   0.0625 - high quality (faster)", "    //   0.0312 - visible limit (slower)", "    // Special notes when using FXAA_GREEN_AS_LUMA,", "    //   Likely want to set this to zero.", "    //   As colors that are mostly not-green", "    //   will appear very dark in the green channel!", "    //   Tune by looking at mostly non-green content,", "    //   then start at zero and increase until aliasing is a problem.", "    FxaaFloat fxaaQualityEdgeThresholdMin,", "    //", "    // Only used on FXAA Console.", "    // This used to be the FXAA_CONSOLE_EDGE_SHARPNESS define.", "    // It is here now to allow easier tuning.", "    // This does not effect PS3, as this needs to be compiled in.", "    //   Use FXAA_CONSOLE_PS3_EDGE_SHARPNESS for PS3.", "    //   Due to the PS3 being ALU bound,", "    //   there are only three safe values here: 2 and 4 and 8.", "    //   These options use the shaders ability to a free *|/ by 2|4|8.", "    // For all other platforms can be a non-power of two.", "    //   8.0 is sharper (default!!!)", "    //   4.0 is softer", "    //   2.0 is really soft (good only for vector graphics inputs)", "    FxaaFloat fxaaConsoleEdgeSharpness,", "    //", "    // Only used on FXAA Console.", "    // This used to be the FXAA_CONSOLE_EDGE_THRESHOLD define.", "    // It is here now to allow easier tuning.", "    // This does not effect PS3, as this needs to be compiled in.", "    //   Use FXAA_CONSOLE_PS3_EDGE_THRESHOLD for PS3.", "    //   Due to the PS3 being ALU bound,", "    //   there are only two safe values here: 1/4 and 1/8.", "    //   These options use the shaders ability to a free *|/ by 2|4|8.", "    // The console setting has a different mapping than the quality setting.", "    // Other platforms can use other values.", "    //   0.125 leaves less aliasing, but is softer (default!!!)", "    //   0.25 leaves more aliasing, and is sharper", "    FxaaFloat fxaaConsoleEdgeThreshold,", "    //", "    // Only used on FXAA Console.", "    // This used to be the FXAA_CONSOLE_EDGE_THRESHOLD_MIN define.", "    // It is here now to allow easier tuning.", "    // Trims the algorithm from processing darks.", "    // The console setting has a different mapping than the quality setting.", "    // This only applies when FXAA_EARLY_EXIT is 1.", "    // This does not apply to PS3,", "    // PS3 was simplified to avoid more shader instructions.", "    //   0.06 - faster but more aliasing in darks", "    //   0.05 - default", "    //   0.04 - slower and less aliasing in darks", "    // Special notes when using FXAA_GREEN_AS_LUMA,", "    //   Likely want to set this to zero.", "    //   As colors that are mostly not-green", "    //   will appear very dark in the green channel!", "    //   Tune by looking at mostly non-green content,", "    //   then start at zero and increase until aliasing is a problem.", "    FxaaFloat fxaaConsoleEdgeThresholdMin,", "    //", "    // Extra constants for 360 FXAA Console only.", "    // Use zeros or anything else for other platforms.", "    // These must be in physical constant registers and NOT immedates.", "    // Immedates will result in compiler un-optimizing.", "    // {xyzw} = float4(1.0, -1.0, 0.25, -0.25)", "    FxaaFloat4 fxaaConsole360ConstDir", ") {", "/*--------------------------------------------------------------------------*/", "    FxaaFloat2 posM;", "    posM.x = pos.x;", "    posM.y = pos.y;", "    #if (FXAA_GATHER4_ALPHA == 1)", "        #if (FXAA_DISCARD == 0)", "            FxaaFloat4 rgbyM = FxaaTexTop(tex, posM);", "            #if (FXAA_GREEN_AS_LUMA == 0)", "                #define lumaM rgbyM.w", "            #else", "                #define lumaM rgbyM.y", "            #endif", "        #endif", "        #if (FXAA_GREEN_AS_LUMA == 0)", "            FxaaFloat4 luma4A = FxaaTexAlpha4(tex, posM);", "            FxaaFloat4 luma4B = FxaaTexOffAlpha4(tex, posM, FxaaInt2(-1, -1));", "        #else", "            FxaaFloat4 luma4A = FxaaTexGreen4(tex, posM);", "            FxaaFloat4 luma4B = FxaaTexOffGreen4(tex, posM, FxaaInt2(-1, -1));", "        #endif", "        #if (FXAA_DISCARD == 1)", "            #define lumaM luma4A.w", "        #endif", "        #define lumaE luma4A.z", "        #define lumaS luma4A.x", "        #define lumaSE luma4A.y", "        #define lumaNW luma4B.w", "        #define lumaN luma4B.z", "        #define lumaW luma4B.x", "    #else", "        FxaaFloat4 rgbyM = FxaaTexTop(tex, posM);", "        #if (FXAA_GREEN_AS_LUMA == 0)", "            #define lumaM rgbyM.w", "        #else", "            #define lumaM rgbyM.y", "        #endif", "        #if (FXAA_GLSL_100 == 1)", "          FxaaFloat lumaS = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 0.0, 1.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0, 0.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaN = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 0.0,-1.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0, 0.0), fxaaQualityRcpFrame.xy));", "        #else", "          FxaaFloat lumaS = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 0, 1), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1, 0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaN = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 0,-1), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 0), fxaaQualityRcpFrame.xy));", "        #endif", "    #endif", "/*--------------------------------------------------------------------------*/", "    FxaaFloat maxSM = max(lumaS, lumaM);", "    FxaaFloat minSM = min(lumaS, lumaM);", "    FxaaFloat maxESM = max(lumaE, maxSM);", "    FxaaFloat minESM = min(lumaE, minSM);", "    FxaaFloat maxWN = max(lumaN, lumaW);", "    FxaaFloat minWN = min(lumaN, lumaW);", "    FxaaFloat rangeMax = max(maxWN, maxESM);", "    FxaaFloat rangeMin = min(minWN, minESM);", "    FxaaFloat rangeMaxScaled = rangeMax * fxaaQualityEdgeThreshold;", "    FxaaFloat range = rangeMax - rangeMin;", "    FxaaFloat rangeMaxClamped = max(fxaaQualityEdgeThresholdMin, rangeMaxScaled);", "    FxaaBool earlyExit = range < rangeMaxClamped;", "/*--------------------------------------------------------------------------*/", "    if(earlyExit)", "        #if (FXAA_DISCARD == 1)", "            FxaaDiscard;", "        #else", "            return rgbyM;", "        #endif", "/*--------------------------------------------------------------------------*/", "    #if (FXAA_GATHER4_ALPHA == 0)", "        #if (FXAA_GLSL_100 == 1)", "          FxaaFloat lumaNW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0,-1.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaSE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0, 1.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0,-1.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0, 1.0), fxaaQualityRcpFrame.xy));", "        #else", "          FxaaFloat lumaNW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1,-1), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaSE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1, 1), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1,-1), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 1), fxaaQualityRcpFrame.xy));", "        #endif", "    #else", "        FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(1, -1), fxaaQualityRcpFrame.xy));", "        FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 1), fxaaQualityRcpFrame.xy));", "    #endif", "/*--------------------------------------------------------------------------*/", "    FxaaFloat lumaNS = lumaN + lumaS;", "    FxaaFloat lumaWE = lumaW + lumaE;", "    FxaaFloat subpixRcpRange = 1.0/range;", "    FxaaFloat subpixNSWE = lumaNS + lumaWE;", "    FxaaFloat edgeHorz1 = (-2.0 * lumaM) + lumaNS;", "    FxaaFloat edgeVert1 = (-2.0 * lumaM) + lumaWE;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat lumaNESE = lumaNE + lumaSE;", "    FxaaFloat lumaNWNE = lumaNW + lumaNE;", "    FxaaFloat edgeHorz2 = (-2.0 * lumaE) + lumaNESE;", "    FxaaFloat edgeVert2 = (-2.0 * lumaN) + lumaNWNE;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat lumaNWSW = lumaNW + lumaSW;", "    FxaaFloat lumaSWSE = lumaSW + lumaSE;", "    FxaaFloat edgeHorz4 = (abs(edgeHorz1) * 2.0) + abs(edgeHorz2);", "    FxaaFloat edgeVert4 = (abs(edgeVert1) * 2.0) + abs(edgeVert2);", "    FxaaFloat edgeHorz3 = (-2.0 * lumaW) + lumaNWSW;", "    FxaaFloat edgeVert3 = (-2.0 * lumaS) + lumaSWSE;", "    FxaaFloat edgeHorz = abs(edgeHorz3) + edgeHorz4;", "    FxaaFloat edgeVert = abs(edgeVert3) + edgeVert4;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat subpixNWSWNESE = lumaNWSW + lumaNESE;", "    FxaaFloat lengthSign = fxaaQualityRcpFrame.x;", "    FxaaBool horzSpan = edgeHorz >= edgeVert;", "    FxaaFloat subpixA = subpixNSWE * 2.0 + subpixNWSWNESE;", "/*--------------------------------------------------------------------------*/", "    if(!horzSpan) lumaN = lumaW;", "    if(!horzSpan) lumaS = lumaE;", "    if(horzSpan) lengthSign = fxaaQualityRcpFrame.y;", "    FxaaFloat subpixB = (subpixA * (1.0/12.0)) - lumaM;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat gradientN = lumaN - lumaM;", "    FxaaFloat gradientS = lumaS - lumaM;", "    FxaaFloat lumaNN = lumaN + lumaM;", "    FxaaFloat lumaSS = lumaS + lumaM;", "    FxaaBool pairN = abs(gradientN) >= abs(gradientS);", "    FxaaFloat gradient = max(abs(gradientN), abs(gradientS));", "    if(pairN) lengthSign = -lengthSign;", "    FxaaFloat subpixC = FxaaSat(abs(subpixB) * subpixRcpRange);", "/*--------------------------------------------------------------------------*/", "    FxaaFloat2 posB;", "    posB.x = posM.x;", "    posB.y = posM.y;", "    FxaaFloat2 offNP;", "    offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;", "    offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;", "    if(!horzSpan) posB.x += lengthSign * 0.5;", "    if( horzSpan) posB.y += lengthSign * 0.5;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat2 posN;", "    posN.x = posB.x - offNP.x * FXAA_QUALITY_P0;", "    posN.y = posB.y - offNP.y * FXAA_QUALITY_P0;", "    FxaaFloat2 posP;", "    posP.x = posB.x + offNP.x * FXAA_QUALITY_P0;", "    posP.y = posB.y + offNP.y * FXAA_QUALITY_P0;", "    FxaaFloat subpixD = ((-2.0)*subpixC) + 3.0;", "    FxaaFloat lumaEndN = FxaaLuma(FxaaTexTop(tex, posN));", "    FxaaFloat subpixE = subpixC * subpixC;", "    FxaaFloat lumaEndP = FxaaLuma(FxaaTexTop(tex, posP));", "/*--------------------------------------------------------------------------*/", "    if(!pairN) lumaNN = lumaSS;", "    FxaaFloat gradientScaled = gradient * 1.0/4.0;", "    FxaaFloat lumaMM = lumaM - lumaNN * 0.5;", "    FxaaFloat subpixF = subpixD * subpixE;", "    FxaaBool lumaMLTZero = lumaMM < 0.0;", "/*--------------------------------------------------------------------------*/", "    lumaEndN -= lumaNN * 0.5;", "    lumaEndP -= lumaNN * 0.5;", "    FxaaBool doneN = abs(lumaEndN) >= gradientScaled;", "    FxaaBool doneP = abs(lumaEndP) >= gradientScaled;", "    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P1;", "    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P1;", "    FxaaBool doneNP = (!doneN) || (!doneP);", "    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P1;", "    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P1;", "/*--------------------------------------------------------------------------*/", "    if(doneNP) {", "        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "        doneN = abs(lumaEndN) >= gradientScaled;", "        doneP = abs(lumaEndP) >= gradientScaled;", "        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P2;", "        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P2;", "        doneNP = (!doneN) || (!doneP);", "        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P2;", "        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P2;", "/*--------------------------------------------------------------------------*/", "        #if (FXAA_QUALITY_PS > 3)", "        if(doneNP) {", "            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "            doneN = abs(lumaEndN) >= gradientScaled;", "            doneP = abs(lumaEndP) >= gradientScaled;", "            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P3;", "            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P3;", "            doneNP = (!doneN) || (!doneP);", "            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P3;", "            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P3;", "/*--------------------------------------------------------------------------*/", "            #if (FXAA_QUALITY_PS > 4)", "            if(doneNP) {", "                if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                doneN = abs(lumaEndN) >= gradientScaled;", "                doneP = abs(lumaEndP) >= gradientScaled;", "                if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P4;", "                if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P4;", "                doneNP = (!doneN) || (!doneP);", "                if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P4;", "                if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P4;", "/*--------------------------------------------------------------------------*/", "                #if (FXAA_QUALITY_PS > 5)", "                if(doneNP) {", "                    if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                    if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                    if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                    if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                    doneN = abs(lumaEndN) >= gradientScaled;", "                    doneP = abs(lumaEndP) >= gradientScaled;", "                    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P5;", "                    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P5;", "                    doneNP = (!doneN) || (!doneP);", "                    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P5;", "                    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P5;", "/*--------------------------------------------------------------------------*/", "                    #if (FXAA_QUALITY_PS > 6)", "                    if(doneNP) {", "                        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                        doneN = abs(lumaEndN) >= gradientScaled;", "                        doneP = abs(lumaEndP) >= gradientScaled;", "                        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P6;", "                        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P6;", "                        doneNP = (!doneN) || (!doneP);", "                        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P6;", "                        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P6;", "/*--------------------------------------------------------------------------*/", "                        #if (FXAA_QUALITY_PS > 7)", "                        if(doneNP) {", "                            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                            doneN = abs(lumaEndN) >= gradientScaled;", "                            doneP = abs(lumaEndP) >= gradientScaled;", "                            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P7;", "                            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P7;", "                            doneNP = (!doneN) || (!doneP);", "                            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P7;", "                            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P7;", "/*--------------------------------------------------------------------------*/", "    #if (FXAA_QUALITY_PS > 8)", "    if(doneNP) {", "        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "        doneN = abs(lumaEndN) >= gradientScaled;", "        doneP = abs(lumaEndP) >= gradientScaled;", "        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P8;", "        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P8;", "        doneNP = (!doneN) || (!doneP);", "        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P8;", "        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P8;", "/*--------------------------------------------------------------------------*/", "        #if (FXAA_QUALITY_PS > 9)", "        if(doneNP) {", "            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "            doneN = abs(lumaEndN) >= gradientScaled;", "            doneP = abs(lumaEndP) >= gradientScaled;", "            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P9;", "            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P9;", "            doneNP = (!doneN) || (!doneP);", "            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P9;", "            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P9;", "/*--------------------------------------------------------------------------*/", "            #if (FXAA_QUALITY_PS > 10)", "            if(doneNP) {", "                if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                doneN = abs(lumaEndN) >= gradientScaled;", "                doneP = abs(lumaEndP) >= gradientScaled;", "                if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P10;", "                if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P10;", "                doneNP = (!doneN) || (!doneP);", "                if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P10;", "                if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P10;", "/*--------------------------------------------------------------------------*/", "                #if (FXAA_QUALITY_PS > 11)", "                if(doneNP) {", "                    if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                    if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                    if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                    if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                    doneN = abs(lumaEndN) >= gradientScaled;", "                    doneP = abs(lumaEndP) >= gradientScaled;", "                    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P11;", "                    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P11;", "                    doneNP = (!doneN) || (!doneP);", "                    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P11;", "                    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P11;", "/*--------------------------------------------------------------------------*/", "                    #if (FXAA_QUALITY_PS > 12)", "                    if(doneNP) {", "                        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                        doneN = abs(lumaEndN) >= gradientScaled;", "                        doneP = abs(lumaEndP) >= gradientScaled;", "                        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P12;", "                        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P12;", "                        doneNP = (!doneN) || (!doneP);", "                        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P12;", "                        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P12;", "/*--------------------------------------------------------------------------*/", "                    }", "                    #endif", "/*--------------------------------------------------------------------------*/", "                }", "                #endif", "/*--------------------------------------------------------------------------*/", "            }", "            #endif", "/*--------------------------------------------------------------------------*/", "        }", "        #endif", "/*--------------------------------------------------------------------------*/", "    }", "    #endif", "/*--------------------------------------------------------------------------*/", "                        }", "                        #endif", "/*--------------------------------------------------------------------------*/", "                    }", "                    #endif", "/*--------------------------------------------------------------------------*/", "                }", "                #endif", "/*--------------------------------------------------------------------------*/", "            }", "            #endif", "/*--------------------------------------------------------------------------*/", "        }", "        #endif", "/*--------------------------------------------------------------------------*/", "    }", "/*--------------------------------------------------------------------------*/", "    FxaaFloat dstN = posM.x - posN.x;", "    FxaaFloat dstP = posP.x - posM.x;", "    if(!horzSpan) dstN = posM.y - posN.y;", "    if(!horzSpan) dstP = posP.y - posM.y;", "/*--------------------------------------------------------------------------*/", "    FxaaBool goodSpanN = (lumaEndN < 0.0) != lumaMLTZero;", "    FxaaFloat spanLength = (dstP + dstN);", "    FxaaBool goodSpanP = (lumaEndP < 0.0) != lumaMLTZero;", "    FxaaFloat spanLengthRcp = 1.0/spanLength;", "/*--------------------------------------------------------------------------*/", "    FxaaBool directionN = dstN < dstP;", "    FxaaFloat dst = min(dstN, dstP);", "    FxaaBool goodSpan = directionN ? goodSpanN : goodSpanP;", "    FxaaFloat subpixG = subpixF * subpixF;", "    FxaaFloat pixelOffset = (dst * (-spanLengthRcp)) + 0.5;", "    FxaaFloat subpixH = subpixG * fxaaQualitySubpix;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat pixelOffsetGood = goodSpan ? pixelOffset : 0.0;", "    FxaaFloat pixelOffsetSubpix = max(pixelOffsetGood, subpixH);", "    if(!horzSpan) posM.x += pixelOffsetSubpix * lengthSign;", "    if( horzSpan) posM.y += pixelOffsetSubpix * lengthSign;", "    #if (FXAA_DISCARD == 1)", "        return FxaaTexTop(tex, posM);", "    #else", "        return FxaaFloat4(FxaaTexTop(tex, posM).xyz, lumaM);", "    #endif", "}", "/*==========================================================================*/", "#endif", "", "void main() {", "  gl_FragColor = FxaaPixelShader(", "    vUv,", "    vec4(0.0),", "    tDiffuse,", "    tDiffuse,", "    tDiffuse,", "    resolution,", "    vec4(0.0),", "    vec4(0.0),", "    vec4(0.0),", "    0.75,", "    0.166,", "    0.0833,", "    0.0,", "    0.0,", "    0.0,", "    vec4(0.0)", "  );", "", "  // TODO avoid querying texture twice for same texel", "  gl_FragColor.a = texture2D(tDiffuse, vUv).a;", "}"].join("\n")

};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author bhouston / http://clara.io/
 *
 * Luminosity
 * http://en.wikipedia.org/wiki/Luminosity
 */

THREE.LuminosityHighPassShader = {

		shaderID: "luminosityHighPass",

		uniforms: {

				"tDiffuse": { type: "t", value: null },
				"luminosityThreshold": { type: "f", value: 1.0 },
				"smoothWidth": { type: "f", value: 1.0 },
				"defaultColor": { type: "c", value: new THREE.Color(0x000000) },
				"defaultOpacity": { type: "f", value: 0.0 }

		},

		vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

		fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec3 defaultColor;", "uniform float defaultOpacity;", "uniform float luminosityThreshold;", "uniform float smoothWidth;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "vec3 luma = vec3( 0.299, 0.587, 0.114 );", "float v = dot( texel.xyz, luma );", "vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );", "float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );", "gl_FragColor = mix( outputColor, texel, alpha );", "}"].join("\n")

};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.mobilecheck = function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.RenderPass = function (scene, camera, overrideMaterial, clearColor, clearAlpha) {

		THREE.Pass.call(this);

		this.scene = scene;
		this.camera = camera;

		this.overrideMaterial = overrideMaterial;

		this.clearColor = clearColor;
		this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0;

		this.clear = true;
		this.clearDepth = false;
		this.needsSwap = false;
};

THREE.RenderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

		constructor: THREE.RenderPass,

		render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

				var oldAutoClear = renderer.autoClear;
				renderer.autoClear = false;

				this.scene.overrideMaterial = this.overrideMaterial;

				var oldClearColor, oldClearAlpha;

				if (this.clearColor) {

						oldClearColor = renderer.getClearColor().getHex();
						oldClearAlpha = renderer.getClearAlpha();

						renderer.setClearColor(this.clearColor, this.clearAlpha);
				}

				if (this.clearDepth) {

						renderer.clearDepth();
				}

				renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);

				if (this.clearColor) {

						renderer.setClearColor(oldClearColor, oldClearAlpha);
				}

				this.scene.overrideMaterial = null;
				renderer.autoClear = oldAutoClear;
		}

});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShaderPass = function (shader, textureID) {

	THREE.Pass.call(this);

	this.textureID = textureID !== undefined ? textureID : "tDiffuse";

	if (shader instanceof THREE.ShaderMaterial) {

		this.uniforms = shader.uniforms;

		this.material = shader;
	} else if (shader) {

		this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

		this.material = new THREE.ShaderMaterial({

			defines: shader.defines || {},
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		});
	}

	this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	this.scene = new THREE.Scene();

	this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
	this.quad.frustumCulled = false; // Avoid getting clipped
	this.scene.add(this.quad);
};

THREE.ShaderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

	constructor: THREE.ShaderPass,

	render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

		if (this.uniforms[this.textureID]) {

			this.uniforms[this.textureID].value = readBuffer.texture;
		}

		this.quad.material = this.material;

		if (this.renderToScreen) {

			renderer.render(this.scene, this.camera);
		} else {

			renderer.render(this.scene, this.camera, writeBuffer, this.clear);
		}
	}

});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author spidersharma / http://eduperiment.com/
 *
 * Inspired from Unreal Engine
 * https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/Bloom/
 */
THREE.UnrealBloomPass = function (resolution, strength, radius, threshold) {

	THREE.Pass.call(this);

	this.strength = strength !== undefined ? strength : 1;
	this.radius = radius;
	this.threshold = threshold;
	this.resolution = resolution !== undefined ? new THREE.Vector2(resolution.x, resolution.y) : new THREE.Vector2(256, 256);

	// render targets
	var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };
	this.renderTargetsHorizontal = [];
	this.renderTargetsVertical = [];
	this.nMips = 5;
	var resx = Math.round(this.resolution.x / 2);
	var resy = Math.round(this.resolution.y / 2);

	this.renderTargetBright = new THREE.WebGLRenderTarget(resx, resy, pars);
	this.renderTargetBright.texture.name = "UnrealBloomPass.bright";
	this.renderTargetBright.texture.generateMipmaps = false;

	for (var i = 0; i < this.nMips; i++) {

		var renderTarget = new THREE.WebGLRenderTarget(resx, resy, pars);

		renderTarget.texture.name = "UnrealBloomPass.h" + i;
		renderTarget.texture.generateMipmaps = false;

		this.renderTargetsHorizontal.push(renderTarget);

		var renderTarget = new THREE.WebGLRenderTarget(resx, resy, pars);

		renderTarget.texture.name = "UnrealBloomPass.v" + i;
		renderTarget.texture.generateMipmaps = false;

		this.renderTargetsVertical.push(renderTarget);

		resx = Math.round(resx / 2);

		resy = Math.round(resy / 2);
	}

	// luminosity high pass material

	if (THREE.LuminosityHighPassShader === undefined) console.error("THREE.UnrealBloomPass relies on THREE.LuminosityHighPassShader");

	var highPassShader = THREE.LuminosityHighPassShader;
	this.highPassUniforms = THREE.UniformsUtils.clone(highPassShader.uniforms);

	this.highPassUniforms["luminosityThreshold"].value = threshold;
	this.highPassUniforms["smoothWidth"].value = 0.01;

	this.materialHighPassFilter = new THREE.ShaderMaterial({
		uniforms: this.highPassUniforms,
		vertexShader: highPassShader.vertexShader,
		fragmentShader: highPassShader.fragmentShader,
		defines: {}
	});

	// Gaussian Blur Materials
	this.separableBlurMaterials = [];
	var kernelSizeArray = [3, 5, 7, 9, 11];
	var resx = Math.round(this.resolution.x / 2);
	var resy = Math.round(this.resolution.y / 2);

	for (var i = 0; i < this.nMips; i++) {

		this.separableBlurMaterials.push(this.getSeperableBlurMaterial(kernelSizeArray[i]));

		this.separableBlurMaterials[i].uniforms["texSize"].value = new THREE.Vector2(resx, resy);

		resx = Math.round(resx / 2);

		resy = Math.round(resy / 2);
	}

	// Composite material
	this.compositeMaterial = this.getCompositeMaterial(this.nMips);
	this.compositeMaterial.uniforms["blurTexture1"].value = this.renderTargetsVertical[0].texture;
	this.compositeMaterial.uniforms["blurTexture2"].value = this.renderTargetsVertical[1].texture;
	this.compositeMaterial.uniforms["blurTexture3"].value = this.renderTargetsVertical[2].texture;
	this.compositeMaterial.uniforms["blurTexture4"].value = this.renderTargetsVertical[3].texture;
	this.compositeMaterial.uniforms["blurTexture5"].value = this.renderTargetsVertical[4].texture;
	this.compositeMaterial.uniforms["bloomStrength"].value = strength;
	this.compositeMaterial.uniforms["bloomRadius"].value = 0.1;
	this.compositeMaterial.needsUpdate = true;

	var bloomFactors = [1.0, 0.8, 0.6, 0.4, 0.2];
	this.compositeMaterial.uniforms["bloomFactors"].value = bloomFactors;
	this.bloomTintColors = [new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1)];
	this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;

	// copy material
	if (THREE.CopyShader === undefined) {

		console.error("THREE.BloomPass relies on THREE.CopyShader");
	}

	var copyShader = THREE.CopyShader;

	this.copyUniforms = THREE.UniformsUtils.clone(copyShader.uniforms);
	this.copyUniforms["opacity"].value = 1.0;

	this.materialCopy = new THREE.ShaderMaterial({
		uniforms: this.copyUniforms,
		vertexShader: copyShader.vertexShader,
		fragmentShader: copyShader.fragmentShader,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		depthWrite: false,
		transparent: true
	});

	this.enabled = true;
	this.needsSwap = false;

	this.oldClearColor = new THREE.Color();
	this.oldClearAlpha = 1;

	this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	this.scene = new THREE.Scene();

	this.basic = new THREE.MeshBasicMaterial();

	this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
	this.quad.frustumCulled = false; // Avoid getting clipped
	this.scene.add(this.quad);
};

THREE.UnrealBloomPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

	constructor: THREE.UnrealBloomPass,

	dispose: function dispose() {

		for (var i = 0; i < this.renderTargetsHorizontal.length; i++) {

			this.renderTargetsHorizontal[i].dispose();
		}

		for (var i = 0; i < this.renderTargetsVertical.length; i++) {

			this.renderTargetsVertical[i].dispose();
		}

		this.renderTargetBright.dispose();
	},

	setSize: function setSize(width, height) {

		var resx = Math.round(width / 2);
		var resy = Math.round(height / 2);

		this.renderTargetBright.setSize(resx, resy);

		for (var i = 0; i < this.nMips; i++) {

			this.renderTargetsHorizontal[i].setSize(resx, resy);
			this.renderTargetsVertical[i].setSize(resx, resy);

			this.separableBlurMaterials[i].uniforms["texSize"].value = new THREE.Vector2(resx, resy);

			resx = Math.round(resx / 2);
			resy = Math.round(resy / 2);
		}
	},

	render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

		this.oldClearColor.copy(renderer.getClearColor());
		this.oldClearAlpha = renderer.getClearAlpha();
		var oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		renderer.setClearColor(new THREE.Color(0, 0, 0), 0);

		if (maskActive) renderer.context.disable(renderer.context.STENCIL_TEST);

		// Render input to screen

		if (this.renderToScreen) {

			this.quad.material = this.basic;
			this.basic.map = readBuffer.texture;

			renderer.render(this.scene, this.camera, undefined, true);
		}

		// 1. Extract Bright Areas

		this.highPassUniforms["tDiffuse"].value = readBuffer.texture;
		this.highPassUniforms["luminosityThreshold"].value = this.threshold;
		this.quad.material = this.materialHighPassFilter;

		renderer.render(this.scene, this.camera, this.renderTargetBright, true);

		// 2. Blur All the mips progressively

		var inputRenderTarget = this.renderTargetBright;

		for (var i = 0; i < this.nMips; i++) {

			this.quad.material = this.separableBlurMaterials[i];

			this.separableBlurMaterials[i].uniforms["colorTexture"].value = inputRenderTarget.texture;
			this.separableBlurMaterials[i].uniforms["direction"].value = THREE.UnrealBloomPass.BlurDirectionX;
			renderer.render(this.scene, this.camera, this.renderTargetsHorizontal[i], true);

			this.separableBlurMaterials[i].uniforms["colorTexture"].value = this.renderTargetsHorizontal[i].texture;
			this.separableBlurMaterials[i].uniforms["direction"].value = THREE.UnrealBloomPass.BlurDirectionY;
			renderer.render(this.scene, this.camera, this.renderTargetsVertical[i], true);

			inputRenderTarget = this.renderTargetsVertical[i];
		}

		// Composite All the mips

		this.quad.material = this.compositeMaterial;
		this.compositeMaterial.uniforms["bloomStrength"].value = this.strength;
		this.compositeMaterial.uniforms["bloomRadius"].value = this.radius;
		this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;

		renderer.render(this.scene, this.camera, this.renderTargetsHorizontal[0], true);

		// Blend it additively over the input texture

		this.quad.material = this.materialCopy;
		this.copyUniforms["tDiffuse"].value = this.renderTargetsHorizontal[0].texture;

		if (maskActive) renderer.context.enable(renderer.context.STENCIL_TEST);

		if (this.renderToScreen) {

			renderer.render(this.scene, this.camera, undefined, false);
		} else {

			renderer.render(this.scene, this.camera, readBuffer, false);
		}

		// Restore renderer settings

		renderer.setClearColor(this.oldClearColor, this.oldClearAlpha);
		renderer.autoClear = oldAutoClear;
	},

	getSeperableBlurMaterial: function getSeperableBlurMaterial(kernelRadius) {

		return new THREE.ShaderMaterial({

			defines: {
				"KERNEL_RADIUS": kernelRadius,
				"SIGMA": kernelRadius
			},

			uniforms: {
				"colorTexture": { value: null },
				"texSize": { value: new THREE.Vector2(0.5, 0.5) },
				"direction": { value: new THREE.Vector2(0.5, 0.5) }
			},

			vertexShader: "varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",

			fragmentShader: "#include <common>\
				varying vec2 vUv;\n\
				uniform sampler2D colorTexture;\n\
				uniform vec2 texSize;\
				uniform vec2 direction;\
				\
				float gaussianPdf(in float x, in float sigma) {\
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\
				}\
				void main() {\n\
					vec2 invSize = 1.0 / texSize;\
					float fSigma = float(SIGMA);\
					float weightSum = gaussianPdf(0.0, fSigma);\
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {\
						float x = float(i);\
						float w = gaussianPdf(x, fSigma);\
						vec2 uvOffset = direction * invSize * x;\
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\
						diffuseSum += (sample1 + sample2) * w;\
						weightSum += 2.0 * w;\
					}\
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\
				}"
		});
	},

	getCompositeMaterial: function getCompositeMaterial(nMips) {

		return new THREE.ShaderMaterial({

			defines: {
				"NUM_MIPS": nMips
			},

			uniforms: {
				"blurTexture1": { value: null },
				"blurTexture2": { value: null },
				"blurTexture3": { value: null },
				"blurTexture4": { value: null },
				"blurTexture5": { value: null },
				"dirtTexture": { value: null },
				"bloomStrength": { value: 1.0 },
				"bloomFactors": { value: null },
				"bloomTintColors": { value: null },
				"bloomRadius": { value: 0.0 }
			},

			vertexShader: "varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",

			fragmentShader: "varying vec2 vUv;\
				uniform sampler2D blurTexture1;\
				uniform sampler2D blurTexture2;\
				uniform sampler2D blurTexture3;\
				uniform sampler2D blurTexture4;\
				uniform sampler2D blurTexture5;\
				uniform sampler2D dirtTexture;\
				uniform float bloomStrength;\
				uniform float bloomRadius;\
				uniform float bloomFactors[NUM_MIPS];\
				uniform vec3 bloomTintColors[NUM_MIPS];\
				\
				float lerpBloomFactor(const in float factor) { \
					float mirrorFactor = 1.2 - factor;\
					return mix(factor, mirrorFactor, bloomRadius);\
				}\
				\
				void main() {\
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) + \
													 lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) + \
													 lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) + \
													 lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) + \
													 lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\
				}"
		});
	}

});

THREE.UnrealBloomPass.BlurDirectionX = new THREE.Vector2(1.0, 0.0);
THREE.UnrealBloomPass.BlurDirectionY = new THREE.Vector2(0.0, 1.0);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
  @author meatbags / https://github.com/meatbags
  **/

THREE.MechanicsShader = {
  uniforms: {
    'time': { value: 0.0 },
    'width': { value: 100.0 },
    'height': { value: 100.0 },
    'tDiffuse': { value: null }
  },
  vertexShader: '\n    varying vec2 vUv;\n\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n  ',
  fragmentShader: '\n    #define PI 3.14159\n    #define UV_SCALE 0.02\n    #define MAX_HEIGHT 6.0\n\n    varying vec2 vUv;\n    uniform sampler2D tDiffuse;\n    uniform float time;\n\n    float rand(vec2 seed) {\n      return fract(sin(dot(seed.xy, vec2(12.9898,78.233))) * 43758.5453);\n    }\n\n    vec2 randVec2() {\n      return vec2(rand(vUv + time), rand(vUv + time + 1.));\n    }\n\n    vec3 getPosition(vec2 coords) {\n      vec4 sample = texture2D(tDiffuse, coords);\n      vec3 res = vec3(coords.x / UV_SCALE, sample.y * MAX_HEIGHT, coords.y / UV_SCALE);\n      return res;\n    }\n\n    float computeAO(vec2 uvOff, vec3 P, vec3 N) {\n      vec3 Vpos = getPosition(vUv + uvOff * UV_SCALE) - P;\n      vec3 Vnorm = normalize(Vpos);\n      float dist = length(Vpos);\n      return max(dot(N, Vnorm) * (1.0 / (1.0 + dist)), 0.0);\n    }\n\n    float sampleAO(vec3 P) {\n      vec3 N = vec3(0., 1., 0.);\n      vec2 randOffset = randVec2();\n      const int iterations = 4;\n      float totalAO = 0.0;\n\n      for (int i=0; i<iterations; i++) {\n        vec2 coord1 = reflect(vec2(\n          (i < 2) ? ((i == 0) ? 1.0 : -1.0) : 0.0,\n          (i > 1) ? ((i == 2) ? 1.0 : -1.0) : 0.0\n        ), randOffset);\n        vec2 coord2 = vec2(\n          coord1.x * 0.707 - coord1.y * 0.707,\n          coord1.x * 0.707 + coord1.y * 0.707\n        );\n        totalAO += computeAO(coord1 * 0.25, P, N);\n        totalAO += computeAO(coord2 * 0.5, P, N);\n        totalAO += computeAO(coord1 * 0.75, P, N);\n        totalAO += computeAO(coord2, P, N);\n      }\n\n      return (totalAO / (float(iterations) * 4.));\n    }\n\n    void main() {\n      vec4 tex = texture2D(tDiffuse, vUv);\n      vec3 P = getPosition(vUv);\n      float ao = sampleAO(P);\n      vec4 frag = tex - ao * 0.25;\n\n      gl_FragColor = frag;\n    }\n  '
};

// render pass
THREE.MechanicsPass = function (size) {
  THREE.Pass.call(this);

  this.shader = THREE.MechanicsShader;
  this.material = new THREE.ShaderMaterial(this.shader);
  this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new THREE.Scene();
  this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.material);
  this.quad.frustumCulled = false;
  this.scene.add(this.quad);
  this.time = 0;
};

THREE.MechanicsPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
  constructor: THREE.MechanicsPass,
  render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {
    this.shader.uniforms['tDiffuse'].value = readBuffer.texture;
    this.time = (this.time + delta) % 10.;
    this.shader.uniforms['time'].value = this.time;

    if (this.renderToScreen) {
      renderer.render(this.scene, this.camera);
    } else {
      renderer.render(this.scene, this.camera, writeBuffer, this.clear);
    }
  }
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author zz85 / https://github.com/zz85
 *
 * Based on "A Practical Analytic Model for Daylight"
 * aka The Preetham Model, the de facto standard analytic skydome model
 * http://www.cs.utah.edu/~shirley/papers/sunsky/sunsky.pdf
 *
 * First implemented by Simon Wallner
 * http://www.simonwallner.at/projects/atmospheric-scattering
 *
 * Improved by Martin Upitis
 * http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR
 *
 * Three.js integration by zz85 http://twitter.com/blurspline
*/

THREE.Sky = function () {
		var skyShader = THREE.Sky.SkyShader;
		var skyUniforms = THREE.UniformsUtils.clone(skyShader.uniforms);
		var skyMat = new THREE.ShaderMaterial({
				fragmentShader: skyShader.fragmentShader,
				vertexShader: skyShader.vertexShader,
				uniforms: skyUniforms,
				side: THREE.BackSide
		});

		var skyGeo = new THREE.SphereBufferGeometry(450000, 32, 15);
		var skyMesh = new THREE.Mesh(skyGeo, skyMat);
		skyMesh.position.y = 24;

		// Expose variables
		this.mesh = skyMesh;
		this.uniforms = skyUniforms;
		this.inclination = 0.4;
		this.azimuth = .38;
		this.updateSun = function () {
				var distance = 40000;
				var theta = Math.PI * (this.inclination - 0.5);
				var phi = 2 * Math.PI * (this.azimuth - 0.5);
				var sun = new THREE.Vector3();
				sun.x = distance * Math.cos(phi);
				sun.y = distance * Math.sin(phi) * Math.sin(theta) + 24;
				sun.z = distance * Math.sin(phi) * Math.cos(theta);
				this.uniforms.sunPosition.value.copy(sun);
		};

		this.updateSun();
};

THREE.Sky.SkyShader = {

		uniforms: {
				luminance: { value: 1 },
				turbidity: { value: 12.5 },
				rayleigh: { value: 0.6 },
				mieCoefficient: { value: 0.05 },
				mieDirectionalG: { value: 0.431 },
				sunPosition: { value: new THREE.Vector3() }
		},

		vertexShader: ['uniform vec3 sunPosition;', 'uniform float rayleigh;', 'uniform float turbidity;', 'uniform float mieCoefficient;', 'varying vec3 vWorldPosition;', 'varying vec3 vSunDirection;', 'varying float vSunfade;', 'varying vec3 vBetaR;', 'varying vec3 vBetaM;', 'varying float vSunE;', 'const vec3 up = vec3( 0.0, 1.0, 0.0 );',

		// constants for atmospheric scattering
		'const float e = 2.71828182845904523536028747135266249775724709369995957;', 'const float pi = 3.141592653589793238462643383279502884197169;',

		// wavelength of used primaries, according to preetham
		'const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );',
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		'const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );',

		// mie stuff
		// K coefficient for the primaries
		'const float v = 4.0;', 'const vec3 K = vec3( 0.686, 0.678, 0.666 );',
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		'const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );',

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		'const float cutoffAngle = 1.6110731556870734;', 'const float steepness = 1.5;', 'const float EE = 1000.0;', 'float sunIntensity( float zenithAngleCos ) {', '	zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );', '	return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );', '}', 'vec3 totalMie( float T ) {', '	float c = ( 0.2 * T ) * 10E-18;', '	return 0.434 * c * MieConst;', '}', 'void main() {', '	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );', '	vWorldPosition = worldPosition.xyz;', '	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );', '	vSunDirection = normalize( sunPosition );', '	vSunE = sunIntensity( dot( vSunDirection, up ) );', '	vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );', '	float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );',

		// extinction (absorbtion + out scattering)
		// rayleigh coefficients
		'	vBetaR = totalRayleigh * rayleighCoefficient;',

		// mie coefficients
		'	vBetaM = totalMie( turbidity ) * mieCoefficient;', '}'].join('\n'),

		fragmentShader: ['varying vec3 vWorldPosition;', 'varying vec3 vSunDirection;', 'varying float vSunfade;', 'varying vec3 vBetaR;', 'varying vec3 vBetaM;', 'varying float vSunE;', 'uniform float luminance;', 'uniform float mieDirectionalG;', 'const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );',

		// constants for atmospheric scattering
		'const float pi = 3.141592653589793238462643383279502884197169;', 'const float n = 1.0003;', // refractive index of air
		'const float N = 2.545E25;', // number of molecules per unit volume for air at
		// 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		'const float rayleighZenithLength = 8.4E3;', 'const float mieZenithLength = 1.25E3;', 'const vec3 up = vec3( 0.0, 1.0, 0.0 );',
		// 66 arc seconds -> degrees, and the cosine of that
		'const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;',

		// 3.0 / ( 16.0 * pi )
		'const float THREE_OVER_SIXTEENPI = 0.05968310365946075;',
		// 1.0 / ( 4.0 * pi )
		'const float ONE_OVER_FOURPI = 0.07957747154594767;', 'float rayleighPhase( float cosTheta ) {', '	return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );', '}', 'float hgPhase( float cosTheta, float g ) {', '	float g2 = pow( g, 2.0 );', '	float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );', '	return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );', '}',

		// Filmic ToneMapping http://filmicgames.com/archives/75
		'const float A = 0.15;', 'const float B = 0.50;', 'const float C = 0.10;', 'const float D = 0.20;', 'const float E = 0.02;', 'const float F = 0.30;', 'const float whiteScale = 1.0748724675633854;', // 1.0 / Uncharted2Tonemap(1000.0)

		'vec3 Uncharted2Tonemap( vec3 x ) {', '	return ( ( x * ( A * x + C * B ) + D * E ) / ( x * ( A * x + B ) + D * F ) ) - E / F;', '}', 'void main() {',
		// optical length
		// cutoff angle at 90 to avoid singularity in next formula.
		'	float zenithAngle = acos( max( 0.0, dot( up, normalize( vWorldPosition - cameraPos ) ) ) );', '	float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );', '	float sR = rayleighZenithLength * inverse;', '	float sM = mieZenithLength * inverse;',

		// combined extinction factor
		'	vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );',

		// in scattering
		'	float cosTheta = dot( normalize( vWorldPosition - cameraPos ), vSunDirection );', '	float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );', '	vec3 betaRTheta = vBetaR * rPhase;', '	float mPhase = hgPhase( cosTheta, mieDirectionalG );', '	vec3 betaMTheta = vBetaM * mPhase;', '	vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );', '	Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );',

		// nightsky
		'	vec3 direction = normalize( vWorldPosition - cameraPos );', '	float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]', '	float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]', '	vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );', '	vec3 L0 = vec3( 0.1 ) * Fex;',

		// composition + solar disc
		'	float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );', '	L0 += ( vSunE * 19000.0 * Fex ) * sundisk;', '	vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );', '	vec3 curr = Uncharted2Tonemap( ( log2( 2.0 / pow( luminance, 4.0 ) ) ) * texColor );', '	vec3 color = curr * whiteScale;', '	vec3 retColor = pow( color, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );', '	gl_FragColor = vec4( retColor, 1.0 );', '}'].join('\n')

};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maths = __webpack_require__(0);

var Maths = _interopRequireWildcard(_maths);

var _config = __webpack_require__(1);

var _ray_tracer = __webpack_require__(25);

var _ray_tracer2 = _interopRequireDefault(_ray_tracer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//import HUD from './HUD';

var Player = function Player(domElement) {
  this.domElement = domElement;
  //this.hud = new HUD();
  this.object = new THREE.Object3D();
  this.position = new THREE.Vector3(_config.Globals.player.position.x, _config.Globals.player.position.y, _config.Globals.player.position.z);
  this.movement = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(_config.Globals.player.rotation.x * 1.1, _config.Globals.player.rotation.y, _config.Globals.player.rotation.z);
  this.offset = {
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.target = {
    position: new THREE.Vector3(this.position.x, this.position.y, this.position.z),
    movement: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(_config.Globals.player.rotation.x, _config.Globals.player.rotation.y, _config.Globals.player.rotation.z),
    offset: {
      rotation: new THREE.Vector3(0, 0, 0)
    }
  };
  this.autoMove = {
    active: false,
    position: new THREE.Vector3(),
    rotation: new THREE.Vector3(),
    threshold: 1,
    trackingArtwork: false
  };
  this.attributes = {
    speed: _config.Globals.player.speed,
    speedWhileJumping: _config.Globals.player.speed / 2,
    height: _config.Globals.player.height,
    rotation: _config.Globals.player.rotationSpeed,
    camera: {
      fov: _config.Globals.camera.fov,
      near: _config.Globals.camera.near,
      far: _config.Globals.camera.far
    },
    cameraThreshold: 0.4,
    maxRotationOffset: Math.PI * 0.35,
    maxRotationOffsetLower: Math.PI * 0.35,
    falling: false,
    adjust: {
      slow: 0.025,
      medium: 0.04,
      normal: 0.05,
      fast: 0.09,
      veryFast: 0.15
    },
    climb: {
      up: 1,
      down: 0.5,
      minYNormal: 0.5
    },
    gravity: {
      accel: 10,
      maxVelocity: 50,
      jumpVelocity: 5
    }
  };
  this.camera = new THREE.PerspectiveCamera(this.attributes.camera.fov, 1, this.attributes.camera.near, this.attributes.camera.far);
  this.camera.up = new THREE.Vector3(0, 1, 0);
  this.raytracer = new _ray_tracer2.default();
  this.init();
};

Player.prototype = {
  init: function init() {
    this.object = new THREE.Mesh(new THREE.SphereBufferGeometry(0.05), new THREE.MeshPhongMaterial());
    this.bindControls();
    this.resizeCamera();
    this.light = new THREE.PointLight(0xffffff, 0.8, 10, 2);
    this.light.position.set(0, 2, 0);
    this.object.add(this.light);
  },

  resizeCamera: function resizeCamera() {
    var w = this.domElement.width;
    var h = this.domElement.height;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  },

  bindControls: function bindControls() {
    var self = this;

    // store
    self.keys = { up: false, down: false, left: false, right: false, jump: false, click: false };
    self.mouse = {
      x: 0,
      y: 0,
      time: 0,
      clickTimeThreshold: 0.2,
      clickMagnitudeThreshold: 0.1,
      active: false,
      locked: false,
      lockTime: 100, //ms
      start: {
        x: 0,
        y: 0
      },
      delta: {
        x: 0,
        y: 0
      },
      rotation: {
        x: 0,
        y: 0
      }
    };

    // mouse events
    self.domElement.addEventListener('mousemove', function (e) {
      self.handleMouseMove(e);
    });
    self.domElement.addEventListener('click', function (e) {
      self.handleMouseClick(e);
    });
    self.domElement.addEventListener('mousedown', function (e) {
      self.handleMouseDown(e);
    });
    document.addEventListener('mouseup', function (e) {
      self.handleMouseUp(e);
    });
    document.addEventListener('mouseleave', function (e) {
      self.handleMouseOut(e);
    });

    // tablet events
    self.domElement.addEventListener('touchstart', function (e) {
      self.handleMouseDown(e.touches[0]);
    });
    self.domElement.addEventListener('touchmove', function (e) {
      self.handleMouseMove(e.touches[0]);
    });
    self.domElement.addEventListener('touchend', function (e) {
      self.handleMouseClick(e.touches[0]);
      self.handleMouseUp(e.touches[0]);
    });

    // keyboard events
    document.addEventListener("keydown", function (e) {
      self.handleKeyDown(e);
    });
    document.addEventListener("keyup", function (e) {
      self.handleKeyUp(e);
    });
  },

  update: function update(delta, collider, artworks) {
    // handle input & move player
    // raytracer
    var ray = this.raytracer.getRayVector(this.camera, this.mouse.x, this.mouse.y);
    var collision = this.raytracer.trace(this.camera.position, ray, _config.Globals.raytracer.length, artworks); //collider

    // controls
    this.handleInput(delta, artworks);

    // check next position for collision
    var next = Maths.addVector(Maths.scaleVector(this.movement, delta), this.target.position);

    // apply gravity
    this.movement.y = Math.max(this.movement.y - this.attributes.gravity.accel * delta, -this.attributes.gravity.maxVelocity);

    // collisions
    this.processCollisions(next, collider);

    // set new position target
    this.target.position.x = next.x;
    this.target.position.y = next.y;
    this.target.position.z = next.z;

    // move & rotate camera
    this.setPosition();
  },

  processCollisions: function processCollisions(next, collider) {
    // handle collision cases

    var collisions = collider.collisions(next);

    if (collisions.length > 0) {

      // check for floor

      for (var i = 0; i < collisions.length; i += 1) {
        var ceiling = collisions[i].ceilingPlane(next);

        if (ceiling.y != null && ceiling.plane.normal.y >= this.attributes.climb.minYNormal && ceiling.y - this.target.position.y <= this.attributes.climb.up) {
          // ground
          this.movement.y = 0;

          // ascend
          if (ceiling.y >= next.y) {
            next.y = ceiling.y;
          }
        }
      }

      // check for walls

      collisions = collider.collisions(next);
      var walls = [];

      for (var _i = 0; _i < collisions.length; _i += 1) {
        var _ceiling = collisions[_i].ceilingPlane(next);

        if (_ceiling.y != null && (_ceiling.plane.normal.y < this.attributes.climb.minYNormal || _ceiling.y - this.target.position.y > this.attributes.climb.up)) {
          walls.push(collisions[_i]);
        }
      }

      // if inside a wall, extrude out

      if (walls.length > 0) {
        var extrude = Maths.copyVector(next);

        for (var _i2 = 0; _i2 < walls.length; _i2 += 1) {
          var mesh = walls[_i2];
          extrude = mesh.nearest2DIntersect(this.target.position, next);
        }

        next.x = extrude.x;
        next.z = extrude.z;

        // helper

        this.object.position.set(next.x, next.y, next.z);

        // check extruded point for collisions

        var hits = 0;
        collisions = collider.collisions(next);

        for (var _i3 = 0; _i3 < collisions.length; _i3 += 1) {
          var _ceiling2 = collisions[_i3].ceilingPlane(next);

          if (_ceiling2.y != null && (_ceiling2.plane.normal.y < this.attributes.climb.minYNormal || _ceiling2.y - this.target.position.y > this.attributes.climb.up)) {
            hits += 1;
          }
        }

        // if contact with > 1 walls, stop motion

        if (hits > 1) {
          next.x = this.target.position.x;
          next.z = this.target.position.z;
        }
      }
    } else {
      // check if on downward slope
      var testUnder = Maths.copyVector(next);
      testUnder.y -= this.attributes.climb.down;

      if (!this.falling && collider.collision(testUnder)) {
        var _ceiling3 = collider.ceilingPlane(testUnder);

        // snap to slope if not too steep
        if (_ceiling3.plane.normal.y >= this.attributes.climb.minYNormal) {
          next.y = _ceiling3.y;
          this.movement.y = 0;
        }
      }
    }

    if (next.y < 0) {
      next.y = 0;
      this.movement.y = 0;
    }
  },

  handleInput: function handleInput(delta, artworks) {
    // handle controls
    // click
    if (this.keys.click) {
      this.keys.click = false;

      // if centre clicked
      this.autoMove.active = true;

      if (this.raytracer.lastCollision.type === _config.Globals.type.TYPE_NONE) {
        var yaw = this.rotation.y;

        // remove description
        artworks.deactivate();
        this.autoMove.trackingArtwork = false;

        this.autoMove.position.x = this.position.x + Math.sin(yaw) * _config.Globals.player.autowalkDistance;
        this.autoMove.position.z = this.position.z + Math.cos(yaw) * _config.Globals.player.autowalkDistance;
        this.autoMove.rotation.x = 0;
        this.autoMove.rotation.y = yaw;
        //this.target.rotation.x = this.autoMove.rotation.x;
        this.target.rotation.y = this.autoMove.rotation.y;
      } else {
        var artwork = this.raytracer.lastCollision.artwork;

        // add new description
        artworks.deactivate();
        artworks.activate(artwork);

        // move to artwork
        this.autoMove.position.x = artwork.eye.x;
        this.autoMove.position.z = artwork.eye.z;
        this.autoMove.rotation.x = artwork.pitch;
        this.autoMove.rotation.y = artwork.yaw;
        this.target.rotation.x = this.autoMove.rotation.x;
        this.target.offset.rotation.x = 0;
        this.target.rotation.y = this.autoMove.rotation.y;
      }
    }

    // update rotation vector
    if (this.keys.left || this.keys.right) {
      // disable automove
      this.autoMove.active = false;

      var dir = (this.keys.left ? 1 : 0) + (this.keys.right ? -1 : 0);
      this.target.rotation.y += this.attributes.rotation * delta * dir;

      // reset pitch
      this.target.rotation.x = 0;

      // remove description
      artworks.deactivate();
    }

    // up/ down keys
    if (this.keys.up || this.keys.down) {
      // disable automove
      this.autoMove.active = false;

      // get next move vector
      var _dir = (this.keys.up ? 1 : 0) + (this.keys.down ? -1 : 0);
      var _yaw = this.rotation.y + this.offset.rotation.y;
      var dx = Math.sin(_yaw) * this.attributes.speed * _dir;
      var dz = Math.cos(_yaw) * this.attributes.speed * _dir;
      this.target.movement.x = dx;
      this.target.movement.z = dz;

      // reset pitch
      this.target.rotation.x = 0;

      // remove description
      artworks.deactivate();
    } else {
      this.target.movement.x = 0;
      this.target.movement.z = 0;
    }

    // move and look automatically
    if (this.autoMove.active) {
      var dist = Maths.distanceBetween2D(this.target.position, this.autoMove.position);

      if (dist < this.autoMove.threshold) {
        //this.autoMove.active = false;
        this.target.movement.x = 0;
        this.target.movement.z = 0;
      } else {
        var vec = Maths.scaleVector(Maths.normalise(Maths.subtractVector(this.autoMove.position, this.position)), this.attributes.speed);
        var mag = Maths.getMagnitude2D(vec);

        if (mag > dist) {
          vec = Maths.scaleVector(vec, dist / mag);
        }

        this.target.movement.x = vec.x;
        this.target.movement.z = vec.z;
      }
    }

    // jump key
    if (this.keys.jump) {
      this.keys.jump = false;

      // jump if not falling
      if (this.movement.y == 0) {
        this.movement.y = this.attributes.gravity.jumpVelocity;
      }
    }

    // set falling
    this.falling = this.movement.y != 0;

    // adjust movement if falling
    if (this.autoMove.active) {
      this.movement.x += (this.target.movement.x - this.movement.x) * this.attributes.adjust.medium;
      this.movement.z += (this.target.movement.z - this.movement.z) * this.attributes.adjust.medium;
    } else if (this.falling) {
      this.movement.x += (this.target.movement.x - this.movement.x) * this.attributes.adjust.slow;
      this.movement.z += (this.target.movement.z - this.movement.z) * this.attributes.adjust.slow;
    } else {
      this.movement.x = this.target.movement.x;
      this.movement.z = this.target.movement.z;
    }
  },

  setPosition: function setPosition() {
    // move and rotate player

    // smooth motion
    this.position.x += (this.target.position.x - this.position.x) * this.attributes.adjust.veryFast;
    this.position.y += (this.target.position.y - this.position.y) * this.attributes.adjust.veryFast;
    this.position.z += (this.target.position.z - this.position.z) * this.attributes.adjust.veryFast;

    // rotate
    var factor = this.autoMove.active && !this.mouse.active ? this.attributes.adjust.slow : this.attributes.adjust.veryFast;

    this.rotation.y += Maths.minAngleDifference(this.rotation.y, this.target.rotation.y) * factor;
    this.rotation.x += Maths.minAngleDifference(this.rotation.x, this.target.rotation.x) * this.attributes.adjust.normal;
    this.offset.rotation.y += (this.target.offset.rotation.y - this.offset.rotation.y) * this.attributes.adjust.normal;
    this.offset.rotation.x += (this.target.offset.rotation.x - this.offset.rotation.x) * this.attributes.adjust.fast;

    // limit rotation
    this.rotation.y += this.rotation.y < 0 ? Maths.twoPi : this.rotation.y > Maths.twoPi ? -Maths.twoPi : 0;

    // set new camera position
    var yaw = this.rotation.y + this.offset.rotation.y;
    var pitch = this.rotation.x + this.offset.rotation.x;
    var height = this.position.y + this.attributes.height;
    var halfHeight = this.position.y + this.attributes.height * 0.5;

    // move camera and world object
    this.object.position.set(this.position.x, halfHeight, this.position.z);
    this.camera.position.set(this.position.x, height, this.position.z);
    this.camera.lookAt(new THREE.Vector3(this.position.x + Math.sin(yaw), height + Math.sin(pitch), this.position.z + Math.cos(yaw)));
  },

  handleKeyDown: function handleKeyDown(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        this.keys.up = true;
        break;
      case 37:
      case 65:
        this.keys.left = true;
        break;
      case 40:
      case 83:
        this.keys.down = true;
        break;
      case 39:
      case 68:
        this.keys.right = true;
        break;
      case 32:
        this.keys.jump = true;
        break;
      default:
        break;
    }
  },

  handleKeyUp: function handleKeyUp(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        this.keys.up = false;
        break;
      case 37:
      case 65:
        this.keys.left = false;
        break;
      case 40:
      case 83:
        this.keys.down = false;
        break;
      case 39:
      case 68:
        this.keys.right = false;
        break;
    }
  },

  handleMouseClick: function handleMouseClick(e) {
    var self = this;
    var t = (new Date().getTime() - this.mouse.time) / 1000.;
    var mag = Math.sqrt(Math.pow(this.mouse.x - this.mouse.start.x, 2) + Math.pow(this.mouse.y - this.mouse.start.y, 2));

    if (t < this.mouse.clickTimeThreshold && (_config.Globals.isMobile || mag < this.mouse.clickMagnitudeThreshold)) {
      this.keys.click = true;
    }
  },

  handleMouseDown: function handleMouseDown(e) {
    if (!this.mouse.locked) {
      var self = this;
      var bound = this.domElement.getBoundingClientRect();

      this.mouse.active = true;
      this.mouse.rotation.x = this.offset.rotation.x;
      this.mouse.rotation.y = this.rotation.y;
      this.mouse.time = new Date().getTime();
      this.mouse.start.x = e.clientX / this.domElement.width * 2 - 1;
      this.mouse.start.y = (e.clientY - bound.y) / this.domElement.height * 2 - 1;

      // lock mouse (prevent double click)
      this.mouse.locked = true;
      setTimeout(function () {
        self.mouse.locked = false;
      }, self.mouse.lockTime);
    }
  },

  handleMouseMove: function handleMouseMove(e) {
    var bound = this.domElement.getBoundingClientRect();

    this.mouse.x = e.clientX / this.domElement.width * 2 - 1;
    this.mouse.y = (e.clientY - bound.y) / this.domElement.height * 2 - 1;

    if (this.mouse.active) {
      this.mouse.delta.x = this.mouse.x - this.mouse.start.x;
      this.mouse.delta.y = this.mouse.y - this.mouse.start.y;

      // target rotation yaw
      this.target.rotation.y = this.mouse.rotation.y + this.mouse.delta.x * 1;

      // pitch is dependent, so set it to offset.rotation
      if (!_config.Globals.isMobile) {
        var pitch = this.mouse.rotation.x + this.mouse.delta.y * 0.75;

        // if limit reached, reset start point
        if (pitch > this.attributes.maxRotationOffset) {
          pitch = this.attributes.maxRotationOffset;
          this.mouse.start.y = this.mouse.y;
          this.mouse.rotation.x = pitch;
        } else if (pitch < -this.attributes.maxRotationOffsetLower) {
          pitch = -this.attributes.maxRotationOffsetLower;
          this.mouse.start.y = this.mouse.y;
          this.mouse.rotation.x = pitch;
        }

        this.target.offset.rotation.x = pitch;
      }
    }
  },

  handleMouseOut: function handleMouseOut(e) {
    this.mouse.active = false;
  },

  handleMouseUp: function handleMouseUp(e) {
    this.mouse.active = false;
  }
};

exports.default = Player;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getNormalisedVec3 = function getNormalisedVec3(vec) {
  var mag = getMagnitudeVec3(vec);

  if (mag != 0) {
    vec.x /= mag;
    vec.y /= mag;
    vec.z /= mag;
  }

  return vec;
};

var v3 = function v3(x, y, z) {
  return new THREE.Vector3(x, y, z);
};

var getPitch = function getPitch(a, b) {
  var dist = getDistanceVec2(a, b);

  return Math.atan2(b.y - a.y, dist);
};

var minAngleDifference = function minAngleDifference(a1, a2) {
  var angle = Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1));

  return angle;
};

var getYaw = function getYaw(a, b) {
  return Math.atan2(b.x - a.x, b.z - a.z);
};

var getMagnitudeVec3 = function getMagnitudeVec3(vec) {
  var mag = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);

  return mag;
};

var getDistanceVec3 = function getDistanceVec3(a, b) {
  var dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2));

  return dist;
};

var getDistanceVec2 = function getDistanceVec2(a, b) {
  var dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2));

  return dist;
};

exports.v3 = v3;
exports.minAngleDifference = minAngleDifference;
exports.getNormalisedVec3 = getNormalisedVec3;
exports.getPitch = getPitch;
exports.getYaw = getYaw;
exports.getMagnitudeVec3 = getMagnitudeVec3;
exports.getDistanceVec2 = getDistanceVec2;
exports.getDistanceVec3 = getDistanceVec3;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var twoPi = Math.PI * 2;

var copyVector = function copyVector(vec) {
  var copied = new THREE.Vector3(vec.x, vec.y, vec.z);

  return copied;
};

var getMagnitude = function getMagnitude(vec) {
  var mag = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);

  return mag;
};

var getMagnitude2D = function getMagnitude2D(vec) {
  var mag = Math.sqrt(vec.x * vec.x + vec.z * vec.z);

  return mag;
};

var addVector = function addVector(a, b) {
  var c = new THREE.Vector3(a.x + b.x, a.y + b.y, a.z + b.z);

  return c;
};

var subtractVector = function subtractVector(a, b) {
  var c = new THREE.Vector3(a.x - b.x, a.y - b.y, a.z - b.z);

  return c;
};

var normalise = function normalise(a) {
  var mag = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);

  if (mag == 0) {
    return a;
  }

  var normal = new THREE.Vector3(a.x / mag, a.y / mag, a.z / mag);

  return normal;
};

var reverseVector = function reverseVector(a) {
  a.x *= -1;
  a.y *= -1;
  a.z *= -1;

  return a;
};

var distanceBetween = function distanceBetween(a, b) {
  var d = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2));

  return d;
};

var distanceBetween2D = function distanceBetween2D(a, b) {
  var dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2));

  return dist;
};

var pitchBetween = function pitchBetween(a, b) {
  var xz = distanceBetween2D(a, b);
  var y = b.y - a.y;
  var pitch = Math.atan2(y, xz);

  return pitch;
};

var scaleVector = function scaleVector(v, scale) {
  var vec = new THREE.Vector3(v.x * scale, v.y * scale, v.z * scale);

  return vec;
};

var isVectorEqual = function isVectorEqual(a, b) {
  return a.x === b.x && a.y === b.y & a.z === b.z;
};

var crossProduct = function crossProduct(a, b) {
  var c = new THREE.Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);

  return c;
};

var minAngleDifference = function minAngleDifference(a1, a2) {
  var angle = Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1));

  return angle;
};

var dotProduct = function dotProduct(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

exports.getMagnitude = getMagnitude;
exports.getMagnitude2D = getMagnitude2D;
exports.copyVector = copyVector;
exports.isVectorEqual = isVectorEqual;
exports.pitchBetween = pitchBetween;
exports.twoPi = twoPi;
exports.distanceBetween = distanceBetween;
exports.distanceBetween2D = distanceBetween2D;
exports.minAngleDifference = minAngleDifference;
exports.dotProduct = dotProduct;
exports.addVector = addVector;
exports.subtractVector = subtractVector;
exports.scaleVector = scaleVector;
exports.crossProduct = crossProduct;
exports.reverseVector = reverseVector;
exports.normalise = normalise;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maths = __webpack_require__(0);

var halfPI = Math.PI / 2;

window.mobileAndTabletcheck = function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

var Globals = {
  isMobile: window.mobileAndTabletcheck(),
  type: {
    TYPE_ARTWORK: 'TYPE_ARTWORK',
    TYPE_COLLISION: 'TYPE_COLLISION',
    TYPE_NONE: 'TYPE_NONE'
  },
  player: {
    position: {
      x: -15.75,
      y: 0,
      z: -40
    },
    rotation: {
      x: Math.PI * 0.12,
      y: 0.3086,
      z: 0
    },
    height: 2.5,
    speed: 8,
    rotationSpeed: Math.PI * 0.75,
    autowalkDistance: 10
  },
  raytracer: {
    precision: 0.5,
    length: 15
  },
  camera: {
    fov: 58,
    near: 0.1,
    far: 2000000
  },
  loader: {
    bumpScale: 0.02,
    lightMapIntensity: 0.6
  },
  artwork: {
    clickBoxScale: 1.25
  },
  artworkPlacement: {
    '0': { scale: 5, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(8.8, 6, -10), eye: (0, _maths.v3)(0, 0, -10) },
    '1': { scale: 4, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(-9.1, 4, -15), eye: (0, _maths.v3)(-2, 0, -15) },
    '2': { scale: 2.5, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(9.1, 3.25, 4.75), eye: (0, _maths.v3)(5.5, 0, 4.75) },
    '3': { scale: 2.75, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(9.1, 3.25, 15), eye: (0, _maths.v3)(5.5, 0, 15) },
    '4': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(-9.1, 3.5, 4.75), eye: (0, _maths.v3)(-5.5, 0, 4.75) },
    '5': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(-9.1, 3.5, 15), eye: (0, _maths.v3)(-5.5, 0, 15) },
    '6': { scale: 2, pitch: 0, yaw: 0, position: (0, _maths.v3)(0, 3, 9.75), eye: (0, _maths.v3)(0, 0, 4.5) },
    '7': { scale: 2, pitch: 0, yaw: 0, position: (0, _maths.v3)(0, 3, 10.25), eye: (0, _maths.v3)(0, 0, 14.5) },
    '8': { scale: 2.5, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(9.1, 11, 5), eye: (0, _maths.v3)(5.5, 8, 5) },
    '9': { scale: 2.5, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(9.1, 11, 15), eye: (0, _maths.v3)(5.5, 8, 15) },
    '10': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(-9.1, 11, 5), eye: (0, _maths.v3)(-5.5, 8, 5) },
    '11': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(-9.1, 11, 15), eye: (0, _maths.v3)(-5.5, 8, 15) },
    '12': { scale: 3, pitch: 0, yaw: 0, position: (0, _maths.v3)(0, 11, 9.75), eye: (0, _maths.v3)(0, 8, 5.5) },
    '13': { scale: 2, pitch: 0, yaw: 0, position: (0, _maths.v3)(0, 11, 10.25), eye: (0, _maths.v3)(0, 8, 14.5) }
  }
};

exports.default = Globals;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Materials = {
  concrete: new THREE.MeshPhysicalMaterial({
    clearCoat: 0,
    clearCoatRoughness: 1,
    reflectivity: 0,
    color: 0xffffff,
    emissive: 0x888888
  }),
  canvas: new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  }),
  dev: new THREE.MeshLambertMaterial({
    color: 0xff0000,
    opacity: 0.25,
    transparent: true,
    side: THREE.DoubleSide
  }),
  dev2: new THREE.MeshLambertMaterial({
    color: 0xffaa88,
    opacity: 0.25,
    transparent: true,
    side: THREE.DoubleSide
  }),
  wireframe: new THREE.MeshLambertMaterial({
    color: 0xff0000,
    wireframe: true
  })
};

exports.Materials = Materials;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(1);

var _maths = __webpack_require__(0);

var RayTracer = function RayTracer() {
  this.position = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(0, 0, 0);
  this.smoothing = 0.25;
  this.target = {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.lastCollision = null;
  this.precision = _config.Globals.raytracer.precision;
  this.init();
};

RayTracer.prototype = {
  init: function init() {
    this.object = new THREE.Object3D();
    this.object.add(new THREE.Mesh(new THREE.SphereBufferGeometry(0.25), new THREE.MeshPhongMaterial({})));
  },

  getRayVector: function getRayVector(camera, h, v) {
    // h, v should be in the range [-1, 1]

    var vec = camera.getWorldDirection();
    var fovVertical = camera.fov * 0.5 * (Math.PI / 180.);
    var fovHorizontal = camera.fov * camera.aspect * 0.5 * (Math.PI / 180.);
    var yaw = Math.atan2(vec.x, vec.z) - h * fovHorizontal;
    var pitch = vec.y - v * fovVertical;

    vec.x = Math.sin(yaw);
    vec.y = Math.sin(pitch);
    vec.z = Math.cos(yaw);

    return vec;
  },

  trace: function trace(point, vector, length, artworks) {
    // check ray against artworks and geometry

    var travelled = 0;
    var collision = false;
    var artwork = false;
    var last = new THREE.Vector3();

    vector = (0, _maths.scaleVector)((0, _maths.normalise)(vector), this.precision);

    while (collision === false && artwork === false && travelled < length) {
      travelled += this.precision;
      last = (0, _maths.copyVector)(point);
      point = (0, _maths.addVector)(point, vector);

      for (var i = 0; i < artworks.focalPoints.length; i += 1) {
        if (artworks.focalPoints[i].collision(point)) {
          artwork = artworks.focalPoints[i];
        }
      }

      /*
      if (!artwork) {
        collision = collider.collision(point);
         if (collision) {
          const intersect = collider.intersect(last, point);
           if (intersect != null) {
            point = intersect.intersect;
            this.target.rotation = intersect.plane.normal;
          }
        }
      }
      */
    }

    // smooth motion
    this.target.position.x = point.x;
    this.target.position.y = point.y;
    this.target.position.z = point.z;
    this.position.x += (this.target.position.x - this.position.x) * this.smoothing;
    this.position.y += (this.target.position.y - this.position.y) * this.smoothing;
    this.position.z += (this.target.position.z - this.position.z) * this.smoothing;
    this.object.position.set(this.position.x, this.position.y, this.position.z);

    if (artwork) {
      this.lastCollision = {
        type: _config.Globals.type.TYPE_ARTWORK,
        position: point,
        artwork: artwork,
        vector: vector
      };
    } else {
      this.lastCollision = {
        type: _config.Globals.type.TYPE_NONE,
        position: point,
        collision: collision,
        vector: vector
      };
    }
  }
};

exports.default = RayTracer;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Artworks = exports.Focal = undefined;

var _focal = __webpack_require__(2);

var _focal2 = _interopRequireDefault(_focal);

var _artworks = __webpack_require__(27);

var _artworks2 = _interopRequireDefault(_artworks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Focal = _focal2.default;
exports.Artworks = _artworks2.default;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(1);

var _maths = __webpack_require__(0);

var _focal = __webpack_require__(2);

var Artworks = function Artworks() {
  this.sources = [];
  this.focalPoints = [];
  this.object = new THREE.Object3D();
  this.toLoad = 0;
  this.active = false;
};

Artworks.prototype = {
  add: function add(title, description, url, image) {
    // add an image source

    this.toLoad += 1;
    this.sources.push({
      title: title,
      description: description,
      url: url,
      image: image
    });
  },

  activate: function activate(artwork) {
    if (!this.active) {
      this.active = true;

      if (!artwork.active) {
        for (var i = 0; i < this.focalPoints.length; i += 1) {
          if (this.focalPoints[i].id === artwork.id) {
            this.focalPoints[i].activate();
          } else {
            this.focalPoints[i].deactivate();
          }
        }

        // remove nav and show artwork information
        if (!$('#nav-default').hasClass('hidden')) {
          $('#nav-default').addClass('hidden');
        }

        // animate out and in
        var timeout = 1;

        if (!$('#nav-artwork').hasClass('hidden')) {
          $('#nav-artwork').addClass('hidden');
          timeout = 500;
        }

        setTimeout(function () {
          $('#nav-artwork .nav__title').text(artwork.source.title);
          $('#nav-artwork .nav__description').html(artwork.source.description);
          $('#nav-artwork .nav__links').html('<a target="_blank" href="' + artwork.source.url + '">Order print</a>');
          $('#nav-artwork').removeClass('hidden');
        }, timeout);
      }
    }
  },

  deactivate: function deactivate() {
    if (this.active) {
      this.active = false;

      // deactivate artworks
      for (var i = 0; i < this.focalPoints.length; i += 1) {
        this.focalPoints[i].deactivate();
      }

      // show default nav
      if (!$('#nav-artwork').hasClass('hidden')) {
        $('#nav-artwork').addClass('hidden');
      }
      if ($('#nav-default').hasClass('hidden')) {
        $('#nav-default').removeClass('hidden');
      }
    }
  },

  placeImages: function placeImages() {
    var _this = this;

    var self = this;
    var textureLoader = new THREE.TextureLoader();

    var _loop = function _loop(i) {
      var index = i;
      var place = _config.Globals.artworkPlacement[index];
      var id = 'UID' + i;

      // create collision object
      var focal = new _focal.Focal(id, place.position, (0, _maths.v3)(1, 1, 1), place.eye, _this.sources[i]);
      self.focalPoints.push(focal);

      // create artwork mesh
      var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 2, 2), _config.Materials.canvas.clone());
      var texture = textureLoader.load(_this.sources[i].image, function () {
        self.toLoad -= 1;
        mesh.scale.x = texture.image.naturalWidth / 1000. * place.scale;
        mesh.scale.y = texture.image.naturalHeight / 1000. * place.scale;
        self.focalPoints[index].scale(mesh.scale.x, mesh.scale.y, mesh.scale.x);
      });

      // apply texture
      mesh.material.map = texture;
      mesh.rotation.set(place.pitch, place.yaw, 0);
      mesh.position.set(place.position.x, place.position.y, place.position.z);

      // add to gallery
      self.object.add(mesh);
      // helper
      //self.object.add(focal.object);
    };

    for (var i = 0; i < this.sources.length; i += 1) {
      _loop(i);
    }
  }
};

exports.default = Artworks;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightHandler = exports.RoomLoader = exports.LoadOBJ = exports.LoadFBX = undefined;

var _load_fbx = __webpack_require__(29);

var _load_fbx2 = _interopRequireDefault(_load_fbx);

var _load_obj = __webpack_require__(3);

var _load_obj2 = _interopRequireDefault(_load_obj);

var _room_loader = __webpack_require__(31);

var _room_loader2 = _interopRequireDefault(_room_loader);

var _light_handler = __webpack_require__(32);

var _light_handler2 = _interopRequireDefault(_light_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.LoadFBX = _load_fbx2.default;
exports.LoadOBJ = _load_obj2.default;
exports.RoomLoader = _room_loader2.default;
exports.LightHandler = _light_handler2.default;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(30);

var FBXLoader = new THREE.FBXLoader();
var LoadFBX = function LoadFBX(path, material) {
  // load fbx file
  return new Promise(function (resolve, reject) {
    try {
      FBXLoader.load(path, function (object) {
        var meshes = [];

        // extract meshes from object
        for (var i = 0; i < object.children.length; i++) {
          if (object.children[i].type == 'Mesh') {
            meshes.push(object.children[i]);
          } else if (object.children[i].type == 'Group') {
            for (var j = 0; j < object.children[i].children.length; j++) {
              if (object.children[i].children[j].type == 'Mesh') {
                meshes.push(object.children[i].children[j]);
              }
            }
          }
        }

        // material settings
        if (material) {
          for (var _i = 0; _i < meshes.length; _i++) {
            // replace default material
            if (meshes[_i].material.type == 'MeshLambertMaterial') {
              meshes[_i].material = material;
            }
          }
        } else {
          // set defaults
          for (var _i2 = 0; _i2 < meshes.length; _i2 += 1) {
            //meshes[i].material.envMap = self.envTextureCube;
            //meshes[i].material.envMapIntensity = 0.25;
            console.log(meshes[_i2].material);
            meshes[_i2].material.bumpScale = 0.01;
            meshes[_i2].material.normalScale = new THREE.Vector2(0.1, 0.1);
          }
        }

        resolve(meshes);
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.default = LoadFBX;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @author Kyle-Larson https://github.com/Kyle-Larson
 * @author Takahiro https://github.com/takahirox
 *
 *
 * Loader loads FBX file and generates Group representing FBX scene.
 * Requires FBX file to be >= 7.0 and in ASCII or to be any version in Binary format.
 *
 * Supports:
 * 	Mesh Generation (Positional Data)
 * 	Normal Data (Per Vertex Drawing Instance)
 *	UV Data (Per Vertex Drawing Instance)
 *	Skinning
 *	Animation
 * 	- Separated Animations based on stacks.
 * 	- Skeletal & Non-Skeletal Animations
 *	NURBS (Open, Closed and Periodic forms)
 *
 * Needs Support:
 * 	Indexed Buffers
 * 	PreRotation support.
 *	Euler rotation order
 *
 * FBX format references:
 * 	https://wiki.blender.org/index.php/User:Mont29/Foundation/FBX_File_Structure
 *
 * 	Binary format specification:
 *		https://code.blender.org/2013/08/fbx-binary-file-format-specification/
 *		https://wiki.rogiken.org/specifications/file-format/fbx/ (more detail but Japanese)
 *
 *
 * Modifications
 * @author github.com/meatbags
 *
 * Added support for Maya 2018 Stingray PBR Shaders -> MeshStandardMaterial
 */

(function () {
		THREE.FBXLoader = function (manager) {
				this.manager = manager !== undefined ? manager : THREE.DefaultLoadingManager;
		};

		Object.assign(THREE.FBXLoader.prototype, {
				load: function load(url, onLoad, onProgress, onError) {
						var self = this;
						var resourceDirectory = THREE.LoaderUtils.extractUrlBase(url); //THREE.Loader.prototype.extractUrlBase( url );
						var loader = new THREE.FileLoader(this.manager);
						loader.setResponseType('arraybuffer');
						loader.load(url, function (buffer) {
								try {
										var scene = self.parse(buffer, resourceDirectory);
										onLoad(scene);
								} catch (error) {
										window.setTimeout(function () {
												if (onError) onError(error);
												self.manager.itemError(url);
										}, 0);
								}
						}, onProgress, onError);
				},

				parse: function parse(FBXBuffer, resourceDirectory) {
						var FBXTree;
						if (isFbxFormatBinary(FBXBuffer)) {
								FBXTree = new BinaryParser().parse(FBXBuffer);
						} else {
								var FBXText = convertArrayBufferToString(FBXBuffer);
								if (!isFbxFormatASCII(FBXText)) {
										throw new Error('THREE.FBXLoader: Unknown format.');
								}
								if (getFbxVersion(FBXText) < 7000) {
										throw new Error('THREE.FBXLoader: FBX version not supported, FileVersion: ' + getFbxVersion(FBXText));
								}
								FBXTree = new TextParser().parse(FBXText);
						}

						var connections = parseConnections(FBXTree);
						var images = parseImages(FBXTree);
						var textures = parseTextures(FBXTree, new THREE.TextureLoader(this.manager).setPath(resourceDirectory), images, connections);
						var materials = parseMaterials(FBXTree, textures, connections);
						var deformers = parseDeformers(FBXTree, connections);
						var geometryMap = parseGeometries(FBXTree, connections, deformers);
						var sceneGraph = parseScene(FBXTree, connections, deformers, geometryMap, materials);
						return sceneGraph;
				}

		});

		// Parses FBXTree.Connections which holds parent-child connections between objects (e.g. material -> texture, model->geometry )
		// and details the connection type
		function parseConnections(FBXTree) {
				var connectionMap = new Map();
				if ('Connections' in FBXTree) {
						var connectionArray = FBXTree.Connections.properties.connections;
						for (var connectionArrayIndex = 0, connectionArrayLength = connectionArray.length; connectionArrayIndex < connectionArrayLength; ++connectionArrayIndex) {
								var connection = connectionArray[connectionArrayIndex];
								if (!connectionMap.has(connection[0])) {
										connectionMap.set(connection[0], {
												parents: [],
												children: []
										});
								}
								var parentRelationship = { ID: connection[1], relationship: connection[2] };
								connectionMap.get(connection[0]).parents.push(parentRelationship);
								if (!connectionMap.has(connection[1])) {
										connectionMap.set(connection[1], {
												parents: [],
												children: []
										});
								}

								var childRelationship = { ID: connection[0], relationship: connection[2] };
								connectionMap.get(connection[1]).children.push(childRelationship);
						}
				}

				return connectionMap;
		}

		// Parses map of images referenced in FBXTree.Objects.subNodes.Video
		// Images can either be referenced externally or embedded in the file
		// These images are connected to textures in FBXTree.Objects.subNodes.Textures
		// via FBXTree.Connections. Note that images can be duplicated here, in which case only one
		// will will have a .Content field
		function parseImages(FBXTree) {

				var imageMap = new Map();

				if ('Video' in FBXTree.Objects.subNodes) {

						var videoNodes = FBXTree.Objects.subNodes.Video;

						for (var nodeID in videoNodes) {

								var videoNode = videoNodes[nodeID];

								// raw image data is in videoNode.properties.Content
								if ('Content' in videoNode.properties) {

										var image = parseImage(videoNodes[nodeID]);
										imageMap.set(parseInt(nodeID), image);
								}
						}
				}

				return imageMap;
		}

		// Parse embedded image data in FBXTree.Video.properties.Content
		function parseImage(videoNode) {

				var content = videoNode.properties.Content;
				var fileName = videoNode.properties.RelativeFilename || videoNode.properties.Filename;
				var extension = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase();

				var type;

				switch (extension) {

						case 'bmp':

								type = 'image/bmp';
								break;

						case 'jpg':
						case 'jpeg':

								type = 'image/jpeg';
								break;

						case 'png':

								type = 'image/png';
								break;

						case 'tif':

								type = 'image/tiff';
								break;

						default:

								console.warn('FBXLoader: Image type "' + extension + '" is not supported.');
								return;

				}

				if (typeof content === 'string') {

						return 'data:' + type + ';base64,' + content;
				} else {

						var array = new Uint8Array(content);
						return window.URL.createObjectURL(new Blob([array], { type: type }));
				}
		}

		// Parse nodes in FBXTree.Objects.subNodes.Texture
		// These contain details such as UV scaling, cropping, rotation etc and are connected
		// to images in FBXTree.Objects.subNodes.Video
		function parseTextures(FBXTree, loader, imageMap, connections) {

				var textureMap = new Map();
				var extensionWhitelist = ['jpg', 'jpeg', 'png', 'bmp'];

				if ('Texture' in FBXTree.Objects.subNodes) {

						var textureNodes = FBXTree.Objects.subNodes.Texture;

						for (var nodeID in textureNodes) {
								var textureNode = textureNodes[nodeID];
								var extension = textureNode.properties.FileName.slice(textureNode.properties.FileName.lastIndexOf('.') + 1).toLowerCase();
								if (extensionWhitelist.indexOf(extension) != -1) {
										var texture = parseTexture(textureNode, loader, imageMap, connections);
										textureMap.set(parseInt(nodeID), texture);
								}
						}
				}

				return textureMap;
		}

		// Parse individual node in FBXTree.Objects.subNodes.Texture
		function parseTexture(textureNode, loader, imageMap, connections) {

				var FBX_ID = textureNode.id;
				var name = textureNode.attrName;
				var fileName;
				var filePath = textureNode.properties.FileName;

				var relativeFilePath = textureNode.properties.RelativeFilename;
				var children = connections.get(FBX_ID).children;

				if (children !== undefined && children.length > 0 && imageMap.has(children[0].ID)) {
						fileName = imageMap.get(children[0].ID);
				} else if (relativeFilePath !== undefined && relativeFilePath[0] !== '/' && relativeFilePath.match(/^[a-zA-Z]:/) === null) {

						// use textureNode.properties.RelativeFilename
						// if it exists and it doesn't seem an absolute path

						fileName = relativeFilePath;
				} else {

						var split = filePath.split(/[\\\/]/);

						if (split.length > 0) {

								fileName = split[split.length - 1];
						} else {

								fileName = filePath;
						}
				}

				var currentPath = loader.path;

				if (fileName.indexOf('blob:') === 0 || fileName.indexOf('data:') === 0) {

						loader.setPath(undefined);
				}

				var texture = loader.load(fileName);
				texture.name = name;
				texture.FBX_ID = FBX_ID;

				var wrapModeU = textureNode.properties.WrapModeU;
				var wrapModeV = textureNode.properties.WrapModeV;

				var valueU = wrapModeU !== undefined ? wrapModeU.value : 0;
				var valueV = wrapModeV !== undefined ? wrapModeV.value : 0;

				// http://download.autodesk.com/us/fbx/SDKdocs/FBX_SDK_Help/files/fbxsdkref/class_k_fbx_texture.html#889640e63e2e681259ea81061b85143a
				// 0: repeat(default), 1: clamp

				texture.wrapS = valueU === 0 ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
				texture.wrapT = valueV === 0 ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;

				if ('Scaling' in textureNode.properties) {

						var values = textureNode.properties.Scaling.value;

						texture.repeat.x = values[0];
						texture.repeat.y = values[1];
				}

				loader.setPath(currentPath);

				return texture;
		}

		// Parse nodes in FBXTree.Objects.subNodes.Material
		function parseMaterials(FBXTree, textureMap, connections) {
				var materialMap = new Map();

				if ('Material' in FBXTree.Objects.subNodes) {

						var materialNodes = FBXTree.Objects.subNodes.Material;
						for (var nodeID in materialNodes) {

								var material = parseMaterial(materialNodes[nodeID], textureMap, connections);
								if (material !== null) materialMap.set(parseInt(nodeID), material);
						}
				}

				return materialMap;
		}

		// Parse single node in FBXTree.Objects.subNodes.Material
		// Materials are connected to texture maps in FBXTree.Objects.subNodes.Textures
		// FBX format currently only supports Lambert and Phong shading models
		function parseMaterial(materialNode, textureMap, connections) {

				//console.log('NODE', materialNode, textureMap, connections);

				var FBX_ID = materialNode.id;
				var name = materialNode.attrName;
				var type = materialNode.properties.ShadingModel;

				// Case where FBX wraps shading model in property object.
				if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
						type = type.value;
				}

				// Ignore unused materials which don't have any connections.
				if (!connections.has(FBX_ID)) return null;

				var children = connections.get(FBX_ID).children;

				var parameters = parseParameters(materialNode.properties, textureMap, children);
				var material;

				switch (type.toLowerCase()) {
						case 'phong':
								material = new THREE.MeshPhongMaterial();
								break;
						case 'lambert':
								material = new THREE.MeshLambertMaterial();
								break;
						case 'unknown':
								material = new THREE.MeshStandardMaterial();
								break;
						default:
								console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', type);
								material = new THREE.MeshPhongMaterial({ color: 0x3300ff });
								break;
				}

				material.setValues(parameters);
				material.name = name;

				return material;
		}

		// Parse FBX material and return parameters suitable for a three.js material
		// Also parse the texture map and return any textures associated with the material
		function parseParameters(properties, textureMap, childrenRelationships) {
				var parameters = {};

				if (properties.BumpFactor) {
						parameters.bumpScale = properties.BumpFactor.value;
				}
				if (properties.Diffuse) {
						parameters.color = parseColor(properties.Diffuse);
				}
				if (properties.DisplacementFactor) {
						parameters.displacementScale = properties.DisplacementFactor.value;
				}
				if (properties.ReflectionFactor) {
						parameters.reflectivity = properties.ReflectionFactor.value;
				}
				if (properties.Specular) {
						parameters.specular = parseColor(properties.Specular);
				}
				if (properties.Shininess) {
						parameters.shininess = properties.Shininess.value;
				}
				if (properties.Emissive) {
						parameters.emissive = parseColor(properties.Emissive);
				}
				if (properties.EmissiveFactor) {
						parameters.emissiveIntensity = parseFloat(properties.EmissiveFactor.value);
				}
				if (properties.Opacity) {
						parameters.opacity = parseFloat(properties.Opacity.value);
				}
				if (parameters.opacity < 1.0) {
						parameters.transparent = true;
				}

				// Maya PBR export
				if (properties['Maya|base_color']) {
						var c = properties['Maya|base_color'].value;
						parameters.color = new THREE.Color(c[0], c[1], c[2]);
				}
				if (properties['Maya|emissive']) {
						var c = properties['Maya|emissive'];
						parameters.emissive = new THREE.Color(c[0], c[1], c[2]);
				}
				if (properties['Maya|emissive_intensity']) {
						parameters.emissiveIntensity = properties['Maya|emissive_intensity'].value;
				}
				if (properties['Maya|metallic']) {
						parameters.metalness = properties['Maya|metallic'].value;
				}
				if (properties['Maya|roughness']) {
						parameters.roughness = properties['Maya|roughness'].value;
				}

				// UV scale
				var uvScale = 1;
				if (properties['Maya|uv_scale']) {
						var uvScale = properties['Maya|uv_scale'].value;
				}

				for (var childrenRelationshipsIndex = 0, childrenRelationshipsLength = childrenRelationships.length; childrenRelationshipsIndex < childrenRelationshipsLength; ++childrenRelationshipsIndex) {
						var relationship = childrenRelationships[childrenRelationshipsIndex];
						var type = relationship.relationship;

						switch (type) {
								// Maya PBR material exports
								//case 'Maya|base_color':
								case 'Maya|TEX_color_map':
										var prop = 'Maya|use_color_map';
										if (properties[prop] && properties[prop].value == 1) {
												parameters.map = textureMap.get(relationship.ID);

												if (uvScale != 1) {
														parameters.map.wrapS = THREE.RepeatWrapping;
														parameters.map.wrapT = THREE.RepeatWrapping;
														parameters.map.repeat.set(uvScale, uvScale);
												}
										}
										break;
								case 'Maya|TEX_emissive_map':
										var prop = 'Maya|use_emissive_map';
										if (properties[prop] && properties[prop].value == 1) {
												parameters.emissiveMap = textureMap.get(relationship.ID);

												if (uvScale != 1) {
														parameters.emissiveMap.wrapS = THREE.RepeatWrapping;
														parameters.emissiveMap.wrapT = THREE.RepeatWrapping;
														parameters.emissiveMap.repeat.set(uvScale, uvScale);
												}
										}
										break;
								case 'Maya|TEX_roughness_map':
										var prop = 'Maya|use_roughness_map';
										if (properties[prop] && properties[prop].value == 1) {
												parameters.roughnessMap = textureMap.get(relationship.ID);

												if (uvScale != 1) {
														parameters.roughnessMap.wrapS = THREE.RepeatWrapping;
														parameters.roughnessMap.wrapT = THREE.RepeatWrapping;
														parameters.roughnessMap.repeat.set(uvScale, uvScale);
												}
										}
										break;
								case 'Maya|TEX_normal_map':
										var prop = 'Maya|use_normal_map';
										if (properties[prop] && properties[prop].value == 1) {
												parameters.normalMap = textureMap.get(relationship.ID);

												if (uvScale != 1) {
														parameters.normalMap.wrapS = THREE.RepeatWrapping;
														parameters.normalMap.wrapT = THREE.RepeatWrapping;
														parameters.normalMap.repeat.set(uvScale, uvScale);
												}
										}
										break;
								case 'Maya|TEX_metallic_map':
										var prop = 'Maya|use_metallic_map';
										if (properties[prop] && properties[prop].value == 1) {
												parameters.metalnessMap = textureMap.get(relationship.ID);

												if (uvScale != 1) {
														parameters.metalnessMap.wrapS = THREE.RepeatWrapping;
														parameters.metalnessMap.wrapT = THREE.RepeatWrapping;
														parameters.metalnessMap.repeat.set(uvScale, uvScale);
												}
										}
										break;
								case 'Maya|TEX_ao_map':
										var prop = 'Maya|use_ao_map';
										if (properties[prop] && properties[prop].value == 1) {
												parameters.aoMap = textureMap.get(relationship.ID);

												if (uvScale != 1) {
														parameters.aoMap.wrapS = THREE.RepeatWrapping;
														parameters.aoMap.wrapT = THREE.RepeatWrapping;
														parameters.aoMap.repeat.set(uvScale, uvScale);
												}
										}
										break;
								case 'Maya|TEX_brdf_lut':
								case 'Maya|TEX_global_specular_cube':
								case 'Maya|TEX_global_diffuse_cube':
										break;

								case 'Bump':
										parameters.bumpMap = textureMap.get(relationship.ID);
										break;
								case 'DiffuseColor':
										parameters.map = textureMap.get(relationship.ID);
										break;
								case 'DisplacementColor':
										parameters.displacementMap = textureMap.get(relationship.ID);
										break;
								case 'EmissiveColor':
										parameters.emissiveMap = textureMap.get(relationship.ID);
										break;
								case 'NormalMap':
										parameters.normalMap = textureMap.get(relationship.ID);
										break;
								case 'ReflectionColor':
										parameters.envMap = textureMap.get(relationship.ID);
										parameters.envMap.mapping = THREE.EquirectangularReflectionMapping;
										break;
								case 'SpecularColor':
										parameters.specularMap = textureMap.get(relationship.ID);
										break;
								case 'TransparentColor':
										parameters.alphaMap = textureMap.get(relationship.ID);
										parameters.transparent = true;
										break;
								case 'AmbientColor':
								case 'ShininessExponent': // AKA glossiness map
								case 'SpecularFactor': // AKA specularLevel
								case 'VectorDisplacementColor': // NOTE: Seems to be a copy of DisplacementColor
								default:
										console.warn('THREE.FBXLoader: %s map is not supported in three.js, skipping texture.', type);
										break;

						}
				}

				return parameters;
		}

		// Parse nodes in FBXTree.Objects.subNodes.Deformer
		// Deformer node can contain skinning or Vertex Cache animation data, however only skinning is supported here
		// Generates map of Skeleton-like objects for use later when generating and binding skeletons.
		function parseDeformers(FBXTree, connections) {

				var deformers = {};

				if ('Deformer' in FBXTree.Objects.subNodes) {

						var DeformerNodes = FBXTree.Objects.subNodes.Deformer;

						for (var nodeID in DeformerNodes) {

								var deformerNode = DeformerNodes[nodeID];

								if (deformerNode.attrType === 'Skin') {

										var conns = connections.get(parseInt(nodeID));
										var skeleton = parseSkeleton(conns, DeformerNodes);
										skeleton.FBX_ID = parseInt(nodeID);

										deformers[nodeID] = skeleton;
								}
						}
				}

				return deformers;
		}

		// Parse single nodes in FBXTree.Objects.subNodes.Deformer
		// Generates a "Skeleton Representation" of FBX nodes based on an FBX Skin Deformer's connections
		// and an object containing SubDeformer nodes.
		function parseSkeleton(connections, DeformerNodes) {

				var subDeformers = {};
				var children = connections.children;

				for (var i = 0, l = children.length; i < l; ++i) {

						var child = children[i];

						var subDeformerNode = DeformerNodes[child.ID];

						var subDeformer = {
								FBX_ID: child.ID,
								index: i,
								indices: [],
								weights: [],
								transform: new THREE.Matrix4().fromArray(subDeformerNode.subNodes.Transform.properties.a),
								transformLink: new THREE.Matrix4().fromArray(subDeformerNode.subNodes.TransformLink.properties.a),
								linkMode: subDeformerNode.properties.Mode
						};

						if ('Indexes' in subDeformerNode.subNodes) {

								subDeformer.indices = subDeformerNode.subNodes.Indexes.properties.a;
								subDeformer.weights = subDeformerNode.subNodes.Weights.properties.a;
						}

						subDeformers[child.ID] = subDeformer;
				}

				return {
						map: subDeformers,
						bones: []
				};
		}

		// Parse nodes in FBXTree.Objects.subNodes.Geometry
		function parseGeometries(FBXTree, connections, deformers) {

				var geometryMap = new Map();

				if ('Geometry' in FBXTree.Objects.subNodes) {

						var geometryNodes = FBXTree.Objects.subNodes.Geometry;

						for (var nodeID in geometryNodes) {

								var relationships = connections.get(parseInt(nodeID));
								var geo = parseGeometry(geometryNodes[nodeID], relationships, deformers);
								geometryMap.set(parseInt(nodeID), geo);
						}
				}

				return geometryMap;
		}

		// Parse single node in FBXTree.Objects.subNodes.Geometry
		function parseGeometry(geometryNode, relationships, deformers) {

				switch (geometryNode.attrType) {

						case 'Mesh':
								return parseMeshGeometry(geometryNode, relationships, deformers);
								break;

						case 'NurbsCurve':
								return parseNurbsGeometry(geometryNode);
								break;

				}
		}

		// Parse single node mesh geometry in FBXTree.Objects.subNodes.Geometry
		function parseMeshGeometry(geometryNode, relationships, deformers) {

				for (var i = 0; i < relationships.children.length; ++i) {

						var deformer = deformers[relationships.children[i].ID];
						if (deformer !== undefined) break;
				}

				return genGeometry(geometryNode, deformer);
		}

		// Generate a THREE.BufferGeometry from a node in FBXTree.Objects.subNodes.Geometry
		function genGeometry(geometryNode, deformer) {

				var subNodes = geometryNode.subNodes;

				var vertexPositions = subNodes.Vertices.properties.a;
				var vertexIndices = subNodes.PolygonVertexIndex.properties.a;

				// create arrays to hold the final data used to build the buffergeometry
				var vertexBuffer = [];
				var normalBuffer = [];
				var colorsBuffer = [];
				var uvsBuffer = [];
				var materialIndexBuffer = [];
				var vertexWeightsBuffer = [];
				var weightsIndicesBuffer = [];

				if (subNodes.LayerElementColor) {

						var colorInfo = getColors(subNodes.LayerElementColor[0]);
				}

				if (subNodes.LayerElementMaterial) {

						var materialInfo = getMaterials(subNodes.LayerElementMaterial[0]);
				}

				if (subNodes.LayerElementNormal) {

						var normalInfo = getNormals(subNodes.LayerElementNormal[0]);
				}

				if (subNodes.LayerElementUV) {

						var uvInfo = [];
						var i = 0;
						while (subNodes.LayerElementUV[i]) {

								uvInfo.push(getUVs(subNodes.LayerElementUV[i]));
								i++;
						}
				}

				var weightTable = {};

				if (deformer) {

						var subDeformers = deformer.map;

						for (var key in subDeformers) {

								var subDeformer = subDeformers[key];
								var indices = subDeformer.indices;

								for (var j = 0; j < indices.length; j++) {

										var index = indices[j];
										var weight = subDeformer.weights[j];

										if (weightTable[index] === undefined) weightTable[index] = [];

										weightTable[index].push({
												id: subDeformer.index,
												weight: weight
										});
								}
						}
				}

				var polygonIndex = 0;
				var faceLength = 0;
				var displayedWeightsWarning = false;

				// these will hold data for a single face
				var vertexPositionIndexes = [];
				var faceNormals = [];
				var faceColors = [];
				var faceUVs = [];
				var faceWeights = [];
				var faceWeightIndices = [];

				for (var polygonVertexIndex = 0; polygonVertexIndex < vertexIndices.length; polygonVertexIndex++) {

						var vertexIndex = vertexIndices[polygonVertexIndex];

						var endOfFace = false;

						// Face index and vertex index arrays are combined in a single array
						// A cube with quad faces looks like this:
						// PolygonVertexIndex: *24 {
						//  a: 0, 1, 3, -3, 2, 3, 5, -5, 4, 5, 7, -7, 6, 7, 1, -1, 1, 7, 5, -4, 6, 0, 2, -5
						//  }
						// Negative numbers mark the end of a face - first face here is 0, 1, 3, -3
						// to find index of last vertex multiply by -1 and subtract 1: -3 * - 1 - 1 = 2
						if (vertexIndex < 0) {

								vertexIndex = vertexIndex ^ -1; // equivalent to ( x * -1 ) - 1
								vertexIndices[polygonVertexIndex] = vertexIndex;
								endOfFace = true;
						}

						var weightIndices = [];
						var weights = [];

						vertexPositionIndexes.push(vertexIndex * 3, vertexIndex * 3 + 1, vertexIndex * 3 + 2);

						if (colorInfo) {

								var data = getData(polygonVertexIndex, polygonIndex, vertexIndex, colorInfo);

								faceColors.push(data[0], data[1], data[2]);
						}

						if (deformer) {

								if (weightTable[vertexIndex] !== undefined) {

										var array = weightTable[vertexIndex];

										for (var j = 0, jl = array.length; j < jl; j++) {

												weights.push(array[j].weight);
												weightIndices.push(array[j].id);
										}
								}

								if (weights.length > 4) {

										if (!displayedWeightsWarning) {

												console.warn('THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights.');
												displayedWeightsWarning = true;
										}

										var WIndex = [0, 0, 0, 0];
										var Weight = [0, 0, 0, 0];

										weights.forEach(function (weight, weightIndex) {

												var currentWeight = weight;
												var currentIndex = weightIndices[weightIndex];

												Weight.forEach(function (comparedWeight, comparedWeightIndex, comparedWeightArray) {

														if (currentWeight > comparedWeight) {

																comparedWeightArray[comparedWeightIndex] = currentWeight;
																currentWeight = comparedWeight;

																var tmp = WIndex[comparedWeightIndex];
																WIndex[comparedWeightIndex] = currentIndex;
																currentIndex = tmp;
														}
												});
										});

										weightIndices = WIndex;
										weights = Weight;
								}

								// if the weight array is shorter than 4 pad with 0s
								for (var i = weights.length; i < 4; ++i) {

										weights[i] = 0;
										weightIndices[i] = 0;
								}

								for (var i = 0; i < 4; ++i) {

										faceWeights.push(weights[i]);
										faceWeightIndices.push(weightIndices[i]);
								}
						}

						if (normalInfo) {

								var data = getData(polygonVertexIndex, polygonIndex, vertexIndex, normalInfo);

								faceNormals.push(data[0], data[1], data[2]);
						}

						if (uvInfo) {

								for (var i = 0; i < uvInfo.length; i++) {

										var data = getData(polygonVertexIndex, polygonIndex, vertexIndex, uvInfo[i]);

										if (faceUVs[i] === undefined) {

												faceUVs[i] = [];
										}

										faceUVs[i].push(data[0], data[1]);
								}
						}

						faceLength++;

						// we have reached the end of a face - it may have 4 sides though
						// in which case the data is split into to represent 3 sides faces
						if (endOfFace) {

								for (var i = 2; i < faceLength; i++) {

										vertexBuffer.push(vertexPositions[vertexPositionIndexes[0]]);
										vertexBuffer.push(vertexPositions[vertexPositionIndexes[1]]);
										vertexBuffer.push(vertexPositions[vertexPositionIndexes[2]]);

										vertexBuffer.push(vertexPositions[vertexPositionIndexes[(i - 1) * 3]]);
										vertexBuffer.push(vertexPositions[vertexPositionIndexes[(i - 1) * 3 + 1]]);
										vertexBuffer.push(vertexPositions[vertexPositionIndexes[(i - 1) * 3 + 2]]);

										vertexBuffer.push(vertexPositions[vertexPositionIndexes[i * 3]]);
										vertexBuffer.push(vertexPositions[vertexPositionIndexes[i * 3 + 1]]);
										vertexBuffer.push(vertexPositions[vertexPositionIndexes[i * 3 + 2]]);
								}

								if (deformer) {

										for (var i = 2; i < faceLength; i++) {

												vertexWeightsBuffer.push(faceWeights[0]);
												vertexWeightsBuffer.push(faceWeights[1]);
												vertexWeightsBuffer.push(faceWeights[2]);
												vertexWeightsBuffer.push(faceWeights[3]);

												vertexWeightsBuffer.push(faceWeights[(i - 1) * 4]);
												vertexWeightsBuffer.push(faceWeights[(i - 1) * 4 + 1]);
												vertexWeightsBuffer.push(faceWeights[(i - 1) * 4 + 2]);
												vertexWeightsBuffer.push(faceWeights[(i - 1) * 4 + 3]);

												vertexWeightsBuffer.push(faceWeights[i * 4]);
												vertexWeightsBuffer.push(faceWeights[i * 4 + 1]);
												vertexWeightsBuffer.push(faceWeights[i * 4 + 2]);
												vertexWeightsBuffer.push(faceWeights[i * 4 + 3]);

												weightsIndicesBuffer.push(faceWeightIndices[0]);
												weightsIndicesBuffer.push(faceWeightIndices[1]);
												weightsIndicesBuffer.push(faceWeightIndices[2]);
												weightsIndicesBuffer.push(faceWeightIndices[3]);

												weightsIndicesBuffer.push(faceWeightIndices[(i - 1) * 4]);
												weightsIndicesBuffer.push(faceWeightIndices[(i - 1) * 4 + 1]);
												weightsIndicesBuffer.push(faceWeightIndices[(i - 1) * 4 + 2]);
												weightsIndicesBuffer.push(faceWeightIndices[(i - 1) * 4 + 3]);

												weightsIndicesBuffer.push(faceWeightIndices[i * 4]);
												weightsIndicesBuffer.push(faceWeightIndices[i * 4 + 1]);
												weightsIndicesBuffer.push(faceWeightIndices[i * 4 + 2]);
												weightsIndicesBuffer.push(faceWeightIndices[i * 4 + 3]);
										}
								}

								if (normalInfo) {

										for (var i = 2; i < faceLength; i++) {

												normalBuffer.push(faceNormals[0]);
												normalBuffer.push(faceNormals[1]);
												normalBuffer.push(faceNormals[2]);

												normalBuffer.push(faceNormals[(i - 1) * 3]);
												normalBuffer.push(faceNormals[(i - 1) * 3 + 1]);
												normalBuffer.push(faceNormals[(i - 1) * 3 + 2]);

												normalBuffer.push(faceNormals[i * 3]);
												normalBuffer.push(faceNormals[i * 3 + 1]);
												normalBuffer.push(faceNormals[i * 3 + 2]);
										}
								}

								if (uvInfo) {

										for (var j = 0; j < uvInfo.length; j++) {

												if (uvsBuffer[j] === undefined) uvsBuffer[j] = [];

												for (var i = 2; i < faceLength; i++) {

														uvsBuffer[j].push(faceUVs[j][0]);
														uvsBuffer[j].push(faceUVs[j][1]);

														uvsBuffer[j].push(faceUVs[j][(i - 1) * 2]);
														uvsBuffer[j].push(faceUVs[j][(i - 1) * 2 + 1]);

														uvsBuffer[j].push(faceUVs[j][i * 2]);
														uvsBuffer[j].push(faceUVs[j][i * 2 + 1]);
												}
										}
								}

								if (colorInfo) {

										for (var i = 2; i < faceLength; i++) {

												colorsBuffer.push(faceColors[0]);
												colorsBuffer.push(faceColors[1]);
												colorsBuffer.push(faceColors[2]);

												colorsBuffer.push(faceColors[(i - 1) * 3]);
												colorsBuffer.push(faceColors[(i - 1) * 3 + 1]);
												colorsBuffer.push(faceColors[(i - 1) * 3 + 2]);

												colorsBuffer.push(faceColors[i * 3]);
												colorsBuffer.push(faceColors[i * 3 + 1]);
												colorsBuffer.push(faceColors[i * 3 + 2]);
										}
								}

								if (materialInfo && materialInfo.mappingType !== 'AllSame') {

										var materialIndex = getData(polygonVertexIndex, polygonIndex, vertexIndex, materialInfo)[0];

										for (var i = 2; i < faceLength; i++) {

												materialIndexBuffer.push(materialIndex);
												materialIndexBuffer.push(materialIndex);
												materialIndexBuffer.push(materialIndex);
										}
								}

								polygonIndex++;

								endOfFace = false;
								faceLength = 0;

								// reset arrays for the next face
								vertexPositionIndexes = [];
								faceNormals = [];
								faceColors = [];
								faceUVs = [];
								faceWeights = [];
								faceWeightIndices = [];
						}
				}

				var geo = new THREE.BufferGeometry();
				geo.name = geometryNode.name;

				geo.addAttribute('position', new THREE.Float32BufferAttribute(vertexBuffer, 3));

				if (colorsBuffer.length > 0) {

						geo.addAttribute('color', new THREE.Float32BufferAttribute(colorsBuffer, 3));
				}

				if (deformer) {

						geo.addAttribute('skinIndex', new THREE.Float32BufferAttribute(weightsIndicesBuffer, 4));

						geo.addAttribute('skinWeight', new THREE.Float32BufferAttribute(vertexWeightsBuffer, 4));

						// used later to bind the skeleton to the model
						geo.FBX_Deformer = deformer;
				}

				if (normalBuffer.length > 0) {

						geo.addAttribute('normal', new THREE.Float32BufferAttribute(normalBuffer, 3));
				}
				if (uvsBuffer.length > 0) {

						for (var i = 0; i < uvsBuffer.length; i++) {

								var name = 'uv' + (i + 1).toString();
								if (i == 0) {

										name = 'uv';
								}

								geo.addAttribute(name, new THREE.Float32BufferAttribute(uvsBuffer[i], 2));
						}
				}

				if (materialInfo && materialInfo.mappingType !== 'AllSame') {

						// Convert the material indices of each vertex into rendering groups on the geometry.
						var prevMaterialIndex = materialIndexBuffer[0];
						var startIndex = 0;

						for (var i = 0; i < materialIndexBuffer.length; ++i) {

								if (materialIndexBuffer[i] !== prevMaterialIndex) {

										geo.addGroup(startIndex, i - startIndex, prevMaterialIndex);

										prevMaterialIndex = materialIndexBuffer[i];
										startIndex = i;
								}
						}

						// the loop above doesn't add the last group, do that here.
						if (geo.groups.length > 0) {

								var lastGroup = geo.groups[geo.groups.length - 1];
								var lastIndex = lastGroup.start + lastGroup.count;

								if (lastIndex !== materialIndexBuffer.length) {

										geo.addGroup(lastIndex, materialIndexBuffer.length - lastIndex, prevMaterialIndex);
								}
						}

						// case where there are multiple materials but the whole geometry is only
						// using one of them
						if (geo.groups.length === 0) {

								geo.addGroup(0, materialIndexBuffer.length, materialIndexBuffer[0]);
						}
				}

				return geo;
		}

		// Parse normal from FBXTree.Objects.subNodes.Geometry.subNodes.LayerElementNormal if it exists
		function getNormals(NormalNode) {

				var mappingType = NormalNode.properties.MappingInformationType;
				var referenceType = NormalNode.properties.ReferenceInformationType;
				var buffer = NormalNode.subNodes.Normals.properties.a;
				var indexBuffer = [];
				if (referenceType === 'IndexToDirect') {

						if ('NormalIndex' in NormalNode.subNodes) {

								indexBuffer = NormalNode.subNodes.NormalIndex.properties.a;
						} else if ('NormalsIndex' in NormalNode.subNodes) {

								indexBuffer = NormalNode.subNodes.NormalsIndex.properties.a;
						}
				}

				return {
						dataSize: 3,
						buffer: buffer,
						indices: indexBuffer,
						mappingType: mappingType,
						referenceType: referenceType
				};
		}

		// Parse UVs from FBXTree.Objects.subNodes.Geometry.subNodes.LayerElementUV if it exists
		function getUVs(UVNode) {

				var mappingType = UVNode.properties.MappingInformationType;
				var referenceType = UVNode.properties.ReferenceInformationType;
				var buffer = UVNode.subNodes.UV.properties.a;
				var indexBuffer = [];
				if (referenceType === 'IndexToDirect') {

						indexBuffer = UVNode.subNodes.UVIndex.properties.a;
				}

				return {
						dataSize: 2,
						buffer: buffer,
						indices: indexBuffer,
						mappingType: mappingType,
						referenceType: referenceType
				};
		}

		// Parse Vertex Colors from FBXTree.Objects.subNodes.Geometry.subNodes.LayerElementColor if it exists
		function getColors(ColorNode) {

				var mappingType = ColorNode.properties.MappingInformationType;
				var referenceType = ColorNode.properties.ReferenceInformationType;
				var buffer = ColorNode.subNodes.Colors.properties.a;
				var indexBuffer = [];
				if (referenceType === 'IndexToDirect') {

						indexBuffer = ColorNode.subNodes.ColorIndex.properties.a;
				}

				return {
						dataSize: 4,
						buffer: buffer,
						indices: indexBuffer,
						mappingType: mappingType,
						referenceType: referenceType
				};
		}

		// Parse mapping and material data in FBXTree.Objects.subNodes.Geometry.subNodes.LayerElementMaterial if it exists
		function getMaterials(MaterialNode) {

				var mappingType = MaterialNode.properties.MappingInformationType;
				var referenceType = MaterialNode.properties.ReferenceInformationType;

				if (mappingType === 'NoMappingInformation') {

						return {
								dataSize: 1,
								buffer: [0],
								indices: [0],
								mappingType: 'AllSame',
								referenceType: referenceType
						};
				}

				var materialIndexBuffer = MaterialNode.subNodes.Materials.properties.a;

				// Since materials are stored as indices, there's a bit of a mismatch between FBX and what
				// we expect.So we create an intermediate buffer that points to the index in the buffer,
				// for conforming with the other functions we've written for other data.
				var materialIndices = [];

				for (var materialIndexBufferIndex = 0, materialIndexBufferLength = materialIndexBuffer.length; materialIndexBufferIndex < materialIndexBufferLength; ++materialIndexBufferIndex) {

						materialIndices.push(materialIndexBufferIndex);
				}

				return {
						dataSize: 1,
						buffer: materialIndexBuffer,
						indices: materialIndices,
						mappingType: mappingType,
						referenceType: referenceType
				};
		}

		// Functions use the infoObject and given indices to return value array of geometry.
		// infoObject can be materialInfo, normalInfo, UVInfo or colorInfo
		// polygonVertexIndex - Index of vertex in draw order (which index of the index buffer refers to this vertex).
		// polygonIndex - Index of polygon in geometry.
		// vertexIndex - Index of vertex inside vertex buffer (used because some data refers to old index buffer that we don't use anymore).
		var dataArray = [];

		var GetData = {

				ByPolygonVertex: {

						Direct: function Direct(polygonVertexIndex, polygonIndex, vertexIndex, infoObject) {

								var from = polygonVertexIndex * infoObject.dataSize;
								var to = polygonVertexIndex * infoObject.dataSize + infoObject.dataSize;

								// return infoObject.buffer.slice( from, to );
								return slice(dataArray, infoObject.buffer, from, to);
						},

						IndexToDirect: function IndexToDirect(polygonVertexIndex, polygonIndex, vertexIndex, infoObject) {

								var index = infoObject.indices[polygonVertexIndex];
								var from = index * infoObject.dataSize;
								var to = index * infoObject.dataSize + infoObject.dataSize;

								// return infoObject.buffer.slice( from, to );
								return slice(dataArray, infoObject.buffer, from, to);
						}

				},

				ByPolygon: {

						Direct: function Direct(polygonVertexIndex, polygonIndex, vertexIndex, infoObject) {

								var from = polygonIndex * infoObject.dataSize;
								var to = polygonIndex * infoObject.dataSize + infoObject.dataSize;

								// return infoObject.buffer.slice( from, to );
								return slice(dataArray, infoObject.buffer, from, to);
						},

						IndexToDirect: function IndexToDirect(polygonVertexIndex, polygonIndex, vertexIndex, infoObject) {

								var index = infoObject.indices[polygonIndex];
								var from = index * infoObject.dataSize;
								var to = index * infoObject.dataSize + infoObject.dataSize;

								// return infoObject.buffer.slice( from, to );
								return slice(dataArray, infoObject.buffer, from, to);
						}

				},

				ByVertice: {

						Direct: function Direct(polygonVertexIndex, polygonIndex, vertexIndex, infoObject) {

								var from = vertexIndex * infoObject.dataSize;
								var to = vertexIndex * infoObject.dataSize + infoObject.dataSize;

								// return infoObject.buffer.slice( from, to );
								return slice(dataArray, infoObject.buffer, from, to);
						}

				},

				AllSame: {

						IndexToDirect: function IndexToDirect(polygonVertexIndex, polygonIndex, vertexIndex, infoObject) {

								var from = infoObject.indices[0] * infoObject.dataSize;
								var to = infoObject.indices[0] * infoObject.dataSize + infoObject.dataSize;

								// return infoObject.buffer.slice( from, to );
								return slice(dataArray, infoObject.buffer, from, to);
						}

				}

		};

		function getData(polygonVertexIndex, polygonIndex, vertexIndex, infoObject) {

				return GetData[infoObject.mappingType][infoObject.referenceType](polygonVertexIndex, polygonIndex, vertexIndex, infoObject);
		}

		// Generate a NurbGeometry from a node in FBXTree.Objects.subNodes.Geometry
		function parseNurbsGeometry(geometryNode) {

				if (THREE.NURBSCurve === undefined) {

						console.error('THREE.FBXLoader: The loader relies on THREE.NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry.');
						return new THREE.BufferGeometry();
				}

				var order = parseInt(geometryNode.properties.Order);

				if (isNaN(order)) {

						console.error('THREE.FBXLoader: Invalid Order %s given for geometry ID: %s', geometryNode.properties.Order, geometryNode.id);
						return new THREE.BufferGeometry();
				}

				var degree = order - 1;

				var knots = geometryNode.subNodes.KnotVector.properties.a;
				var controlPoints = [];
				var pointsValues = geometryNode.subNodes.Points.properties.a;

				for (var i = 0, l = pointsValues.length; i < l; i += 4) {

						controlPoints.push(new THREE.Vector4().fromArray(pointsValues, i));
				}

				var startKnot, endKnot;

				if (geometryNode.properties.Form === 'Closed') {

						controlPoints.push(controlPoints[0]);
				} else if (geometryNode.properties.Form === 'Periodic') {

						startKnot = degree;
						endKnot = knots.length - 1 - startKnot;

						for (var i = 0; i < degree; ++i) {

								controlPoints.push(controlPoints[i]);
						}
				}

				var curve = new THREE.NURBSCurve(degree, knots, controlPoints, startKnot, endKnot);
				var vertices = curve.getPoints(controlPoints.length * 7);

				var positions = new Float32Array(vertices.length * 3);

				for (var i = 0, l = vertices.length; i < l; ++i) {

						vertices[i].toArray(positions, i * 3);
				}

				var geometry = new THREE.BufferGeometry();
				geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

				return geometry;
		}

		// parse nodes in FBXTree.Objects.subNodes.Model and generate a THREE.Group
		function parseScene(FBXTree, connections, deformers, geometryMap, materialMap) {

				var sceneGraph = new THREE.Group();

				var ModelNode = FBXTree.Objects.subNodes.Model;

				var modelArray = [];

				var modelMap = new Map();

				for (var nodeID in ModelNode) {

						var id = parseInt(nodeID);
						var node = ModelNode[nodeID];
						var conns = connections.get(id);
						var model = null;

						for (var i = 0; i < conns.parents.length; ++i) {

								for (var FBX_ID in deformers) {

										var deformer = deformers[FBX_ID];
										var subDeformers = deformer.map;
										var subDeformer = subDeformers[conns.parents[i].ID];

										if (subDeformer) {

												var model2 = model;
												model = new THREE.Bone();
												deformer.bones[subDeformer.index] = model;

												// seems like we need this not to make non-connected bone, maybe?
												// TODO: confirm
												if (model2 !== null) model.add(model2);
										}
								}
						}

						if (!model) {

								switch (node.attrType) {

										// create a THREE.PerspectiveCamera or THREE.OrthographicCamera
										case 'Camera':

												var cameraAttribute;

												for (var childrenIndex = 0, childrenLength = conns.children.length; childrenIndex < childrenLength; ++childrenIndex) {

														var childID = conns.children[childrenIndex].ID;

														var attr = FBXTree.Objects.subNodes.NodeAttribute[childID];

														if (attr !== undefined && attr.properties !== undefined) {

																cameraAttribute = attr.properties;
														}
												}

												if (cameraAttribute === undefined) {

														model = new THREE.Object3D();
												} else {

														var type = 0;
														if (cameraAttribute.CameraProjectionType !== undefined && cameraAttribute.CameraProjectionType.value === 1) {

																type = 1;
														}

														var nearClippingPlane = 1;
														if (cameraAttribute.NearPlane !== undefined) {

																nearClippingPlane = cameraAttribute.NearPlane.value / 1000;
														}

														var farClippingPlane = 1000;
														if (cameraAttribute.FarPlane !== undefined) {

																farClippingPlane = cameraAttribute.FarPlane.value / 1000;
														}

														var width = window.innerWidth;
														var height = window.innerHeight;

														if (cameraAttribute.AspectWidth !== undefined && cameraAttribute.AspectHeight !== undefined) {

																width = cameraAttribute.AspectWidth.value;
																height = cameraAttribute.AspectHeight.value;
														}

														var aspect = width / height;

														var fov = 45;
														if (cameraAttribute.FieldOfView !== undefined) {

																fov = cameraAttribute.FieldOfView.value;
														}

														switch (type) {

																case 0:
																		// Perspective
																		model = new THREE.PerspectiveCamera(fov, aspect, nearClippingPlane, farClippingPlane);
																		break;

																case 1:
																		// Orthographic
																		model = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, nearClippingPlane, farClippingPlane);
																		break;

																default:
																		console.warn('THREE.FBXLoader: Unknown camera type ' + type + '.');
																		model = new THREE.Object3D();
																		break;

														}
												}

												break;

										// Create a THREE.DirectionalLight, THREE.PointLight or THREE.SpotLight
										case 'Light':

												var lightAttribute;

												for (var childrenIndex = 0, childrenLength = conns.children.length; childrenIndex < childrenLength; ++childrenIndex) {

														var childID = conns.children[childrenIndex].ID;

														var attr = FBXTree.Objects.subNodes.NodeAttribute[childID];

														if (attr !== undefined && attr.properties !== undefined) {

																lightAttribute = attr.properties;
														}
												}

												if (lightAttribute === undefined) {

														model = new THREE.Object3D();
												} else {

														var type;

														// LightType can be undefined for Point lights
														if (lightAttribute.LightType === undefined) {

																type = 0;
														} else {

																type = lightAttribute.LightType.value;
														}

														var color = 0xffffff;

														if (lightAttribute.Color !== undefined) {

																color = parseColor(lightAttribute.Color.value);
														}

														var intensity = lightAttribute.Intensity === undefined ? 1 : lightAttribute.Intensity.value / 100;

														// light disabled
														if (lightAttribute.CastLightOnObject !== undefined && lightAttribute.CastLightOnObject.value === 0) {

																intensity = 0;
														}

														var distance = 0;
														if (lightAttribute.FarAttenuationEnd !== undefined) {

																if (lightAttribute.EnableFarAttenuation !== undefined && lightAttribute.EnableFarAttenuation.value === 0) {

																		distance = 0;
																} else {

																		distance = lightAttribute.FarAttenuationEnd.value / 1000;
																}
														}

														// TODO: could this be calculated linearly from FarAttenuationStart to FarAttenuationEnd?
														var decay = 1;

														switch (type) {

																case 0:
																		// Point
																		model = new THREE.PointLight(color, intensity, distance, decay);
																		break;

																case 1:
																		// Directional
																		model = new THREE.DirectionalLight(color, intensity);
																		break;

																case 2:
																		// Spot
																		var angle = Math.PI / 3;

																		if (lightAttribute.InnerAngle !== undefined) {

																				angle = THREE.Math.degToRad(lightAttribute.InnerAngle.value);
																		}

																		var penumbra = 0;
																		if (lightAttribute.OuterAngle !== undefined) {

																				// TODO: this is not correct - FBX calculates outer and inner angle in degrees
																				// with OuterAngle > InnerAngle && OuterAngle <= Math.PI
																				// while three.js uses a penumbra between (0, 1) to attenuate the inner angle
																				penumbra = THREE.Math.degToRad(lightAttribute.OuterAngle.value);
																				penumbra = Math.max(penumbra, 1);
																		}

																		model = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
																		break;

																default:
																		console.warn('THREE.FBXLoader: Unknown light type ' + lightAttribute.LightType.value + ', defaulting to a THREE.PointLight.');
																		model = new THREE.PointLight(color, intensity);
																		break;

														}

														if (lightAttribute.CastShadows !== undefined && lightAttribute.CastShadows.value === 1) {

																model.castShadow = true;
														}
												}

												break;

										case 'Mesh':

												var geometry = null;
												var material = null;
												var materials = [];

												for (var childrenIndex = 0, childrenLength = conns.children.length; childrenIndex < childrenLength; ++childrenIndex) {

														var child = conns.children[childrenIndex];

														if (geometryMap.has(child.ID)) {

																geometry = geometryMap.get(child.ID);
														}

														if (materialMap.has(child.ID)) {

																materials.push(materialMap.get(child.ID));
														}
												}
												if (materials.length > 1) {

														material = materials;
												} else if (materials.length > 0) {

														material = materials[0];
												} else {

														material = new THREE.MeshPhongMaterial({ color: 0xcccccc });
														materials.push(material);
												}
												if ('color' in geometry.attributes) {

														for (var materialIndex = 0, numMaterials = materials.length; materialIndex < numMaterials; ++materialIndex) {

																materials[materialIndex].vertexColors = THREE.VertexColors;
														}
												}
												if (geometry.FBX_Deformer) {

														for (var materialsIndex = 0, materialsLength = materials.length; materialsIndex < materialsLength; ++materialsIndex) {

																materials[materialsIndex].skinning = true;
														}
														model = new THREE.SkinnedMesh(geometry, material);
												} else {

														model = new THREE.Mesh(geometry, material);
												}
												break;

										case 'NurbsCurve':
												var geometry = null;

												for (var childrenIndex = 0, childrenLength = conns.children.length; childrenIndex < childrenLength; ++childrenIndex) {

														var child = conns.children[childrenIndex];

														if (geometryMap.has(child.ID)) {

																geometry = geometryMap.get(child.ID);
														}
												}

												// FBX does not list materials for Nurbs lines, so we'll just put our own in here.
												material = new THREE.LineBasicMaterial({ color: 0x3300ff, linewidth: 5 });
												model = new THREE.Line(geometry, material);
												break;

										default:
												model = new THREE.Group();
												break;

								}
						}

						model.name = THREE.PropertyBinding.sanitizeNodeName(node.attrName);
						model.FBX_ID = id;

						modelArray.push(model);
						modelMap.set(id, model);
				}

				for (var modelArrayIndex = 0, modelArrayLength = modelArray.length; modelArrayIndex < modelArrayLength; ++modelArrayIndex) {

						var model = modelArray[modelArrayIndex];

						var node = ModelNode[model.FBX_ID];

						if ('Lcl_Translation' in node.properties) {

								model.position.fromArray(node.properties.Lcl_Translation.value);
						}

						if ('Lcl_Rotation' in node.properties) {

								var rotation = node.properties.Lcl_Rotation.value.map(THREE.Math.degToRad);
								rotation.push('ZYX');
								model.rotation.fromArray(rotation);
						}

						if ('Lcl_Scaling' in node.properties) {

								model.scale.fromArray(node.properties.Lcl_Scaling.value);
						}

						if ('PreRotation' in node.properties) {

								var array = node.properties.PreRotation.value.map(THREE.Math.degToRad);
								array[3] = 'ZYX';

								var preRotations = new THREE.Euler().fromArray(array);

								preRotations = new THREE.Quaternion().setFromEuler(preRotations);
								var currentRotation = new THREE.Quaternion().setFromEuler(model.rotation);
								preRotations.multiply(currentRotation);
								model.rotation.setFromQuaternion(preRotations, 'ZYX');
						}

						// allow transformed pivots - see https://github.com/mrdoob/three.js/issues/11895
						if ('GeometricTranslation' in node.properties) {

								var array = node.properties.GeometricTranslation.value;

								model.traverse(function (child) {

										if (child.geometry) {

												child.geometry.translate(array[0], array[1], array[2]);
										}
								});
						}

						if ('LookAtProperty' in node.properties) {

								var conns = connections.get(model.FBX_ID);

								for (var childrenIndex = 0, childrenLength = conns.children.length; childrenIndex < childrenLength; ++childrenIndex) {

										var child = conns.children[childrenIndex];

										if (child.relationship === 'LookAtProperty') {

												var lookAtTarget = FBXTree.Objects.subNodes.Model[child.ID];

												if ('Lcl_Translation' in lookAtTarget.properties) {

														var pos = lookAtTarget.properties.Lcl_Translation.value;

														// DirectionalLight, SpotLight
														if (model.target !== undefined) {

																model.target.position.set(pos[0], pos[1], pos[2]);
																sceneGraph.add(model.target);
														} else {
																// Cameras and other Object3Ds

																model.lookAt(new THREE.Vector3(pos[0], pos[1], pos[2]));
														}
												}
										}
								}
						}

						var conns = connections.get(model.FBX_ID);
						for (var parentIndex = 0; parentIndex < conns.parents.length; parentIndex++) {

								var pIndex = findIndex(modelArray, function (mod) {

										return mod.FBX_ID === conns.parents[parentIndex].ID;
								});
								if (pIndex > -1) {

										modelArray[pIndex].add(model);
										break;
								}
						}
						if (model.parent === null) {

								sceneGraph.add(model);
						}
				}

				// Now with the bones created, we can update the skeletons and bind them to the skinned meshes.
				sceneGraph.updateMatrixWorld(true);

				var worldMatrices = new Map();

				// Put skeleton into bind pose.
				if ('Pose' in FBXTree.Objects.subNodes) {

						var BindPoseNode = FBXTree.Objects.subNodes.Pose;
						for (var nodeID in BindPoseNode) {

								if (BindPoseNode[nodeID].attrType === 'BindPose') {

										BindPoseNode = BindPoseNode[nodeID];
										break;
								}
						}

						var PoseNode = BindPoseNode.subNodes.PoseNode;

						for (var PoseNodeIndex = 0, PoseNodeLength = PoseNode.length; PoseNodeIndex < PoseNodeLength; ++PoseNodeIndex) {

								var node = PoseNode[PoseNodeIndex];

								var rawMatWrd = new THREE.Matrix4().fromArray(node.subNodes.Matrix.properties.a);

								worldMatrices.set(parseInt(node.properties.Node), rawMatWrd);
						}
				}

				for (var FBX_ID in deformers) {

						var deformer = deformers[FBX_ID];
						var subDeformers = deformer.map;

						for (var key in subDeformers) {

								var subDeformer = subDeformers[key];
								var subDeformerIndex = subDeformer.index;

								var bone = deformer.bones[subDeformerIndex];
								if (!worldMatrices.has(bone.FBX_ID)) {

										break;
								}
								var mat = worldMatrices.get(bone.FBX_ID);
								bone.matrixWorld.copy(mat);
						}

						// Now that skeleton is in bind pose, bind to model.
						deformer.skeleton = new THREE.Skeleton(deformer.bones);

						var conns = connections.get(deformer.FBX_ID);
						var parents = conns.parents;

						for (var parentsIndex = 0, parentsLength = parents.length; parentsIndex < parentsLength; ++parentsIndex) {

								var parent = parents[parentsIndex];

								if (geometryMap.has(parent.ID)) {

										var geoID = parent.ID;
										var geoConns = connections.get(geoID);

										for (var i = 0; i < geoConns.parents.length; ++i) {

												if (modelMap.has(geoConns.parents[i].ID)) {

														var model = modelMap.get(geoConns.parents[i].ID);

														model.bind(deformer.skeleton, model.matrixWorld);
														break;
												}
										}
								}
						}
				}

				//Skeleton is now bound, return objects to starting world positions.
				sceneGraph.updateMatrixWorld(true);

				// Silly hack with the animation parsing. We're gonna pretend the scene graph has a skeleton
				// to attach animations to, since FBX treats animations as animations for the entire scene,
				// not just for individual objects.
				sceneGraph.skeleton = {
						bones: modelArray
				};

				var animations = parseAnimations(FBXTree, connections, sceneGraph);

				addAnimations(sceneGraph, animations);

				// Parse ambient color - if it's not set to black (default), create an ambient light
				if ('GlobalSettings' in FBXTree && 'AmbientColor' in FBXTree.GlobalSettings.properties) {

						var ambientColor = FBXTree.GlobalSettings.properties.AmbientColor.value;
						var r = ambientColor[0];
						var g = ambientColor[1];
						var b = ambientColor[2];

						if (r !== 0 || g !== 0 || b !== 0) {

								var color = new THREE.Color(r, g, b);
								sceneGraph.add(new THREE.AmbientLight(color, 1));
						}
				}

				return sceneGraph;
		}

		// Parses animation information from nodes in
		// FBXTree.Objects.subNodes.AnimationCurve ( connected to AnimationCurveNode )
		// FBXTree.Objects.subNodes.AnimationCurveNode ( connected to AnimationLayer and an animated property in some other node )
		// FBXTree.Objects.subNodes.AnimationLayer ( connected to AnimationStack )
		// FBXTree.Objects.subNodes.AnimationStack
		function parseAnimations(FBXTree, connections, sceneGraph) {

				var rawNodes = FBXTree.Objects.subNodes.AnimationCurveNode;
				var rawCurves = FBXTree.Objects.subNodes.AnimationCurve;
				var rawLayers = FBXTree.Objects.subNodes.AnimationLayer;
				var rawStacks = FBXTree.Objects.subNodes.AnimationStack;

				var fps = 30; // default framerate

				if ('GlobalSettings' in FBXTree && 'TimeMode' in FBXTree.GlobalSettings.properties) {

						/* Autodesk time mode documentation can be found here:
      *	http://docs.autodesk.com/FBX/2014/ENU/FBX-SDK-Documentation/index.html?url=cpp_ref/class_fbx_time.html,topicNumber=cpp_ref_class_fbx_time_html
      */
						var timeModeEnum = [30, // 0: eDefaultMode
						120, // 1: eFrames120
						100, // 2: eFrames100
						60, // 3: eFrames60
						50, // 4: eFrames50
						48, // 5: eFrames48
						30, // 6: eFrames30 (black and white NTSC )
						30, // 7: eFrames30Drop
						29.97, // 8: eNTSCDropFrame
						29.97, // 90: eNTSCFullFrame
						25, // 10: ePal ( PAL/SECAM )
						24, // 11: eFrames24 (Film/Cinema)
						1, // 12: eFrames1000 (use for date time))
						23.976, // 13: eFilmFullFrame
						30, // 14: eCustom: use GlobalSettings.properties.CustomFrameRate.value
						96, // 15: eFrames96
						72, // 16: eFrames72
						59.94];

						var eMode = FBXTree.GlobalSettings.properties.TimeMode.value;

						if (eMode === 14) {

								if ('CustomFrameRate' in FBXTree.GlobalSettings.properties) {

										fps = FBXTree.GlobalSettings.properties.CustomFrameRate.value;

										fps = fps === -1 ? 30 : fps;
								}
						} else if (eMode <= 17) {
								// for future proofing - if more eModes get added, they will default to 30fps

								fps = timeModeEnum[eMode];
						}
				}

				var returnObject = {
						curves: new Map(),
						layers: {},
						stacks: {},
						length: 0,
						fps: fps,
						frames: 0
				};

				var animationCurveNodes = [];
				for (var nodeID in rawNodes) {

						if (nodeID.match(/\d+/)) {

								var animationNode = parseAnimationNode(FBXTree, rawNodes[nodeID], connections, sceneGraph);
								animationCurveNodes.push(animationNode);
						}
				}

				var tmpMap = new Map();
				for (var animationCurveNodeIndex = 0; animationCurveNodeIndex < animationCurveNodes.length; ++animationCurveNodeIndex) {

						if (animationCurveNodes[animationCurveNodeIndex] === null) {

								continue;
						}
						tmpMap.set(animationCurveNodes[animationCurveNodeIndex].id, animationCurveNodes[animationCurveNodeIndex]);
				}

				var animationCurves = [];
				for (nodeID in rawCurves) {

						if (nodeID.match(/\d+/)) {

								var animationCurve = parseAnimationCurve(rawCurves[nodeID]);

								// seems like this check would be necessary?
								if (!connections.has(animationCurve.id)) continue;

								animationCurves.push(animationCurve);

								var firstParentConn = connections.get(animationCurve.id).parents[0];
								var firstParentID = firstParentConn.ID;
								var firstParentRelationship = firstParentConn.relationship;
								var axis = '';

								if (firstParentRelationship.match(/X/)) {

										axis = 'x';
								} else if (firstParentRelationship.match(/Y/)) {

										axis = 'y';
								} else if (firstParentRelationship.match(/Z/)) {

										axis = 'z';
								} else {

										continue;
								}

								tmpMap.get(firstParentID).curves[axis] = animationCurve;
						}
				}

				tmpMap.forEach(function (curveNode) {

						var id = curveNode.containerBoneID;
						if (!returnObject.curves.has(id)) {

								returnObject.curves.set(id, { T: null, R: null, S: null });
						}
						returnObject.curves.get(id)[curveNode.attr] = curveNode;

						if (curveNode.attr === 'R') {

								var curves = curveNode.curves;

								// Some FBX files have an AnimationCurveNode
								// which isn't any connected to any AnimationCurve.
								// Setting animation parameter for them here.

								if (curves.x === null) {

										curves.x = {
												version: null,
												times: [0.0],
												values: [0.0]
										};
								}

								if (curves.y === null) {

										curves.y = {
												version: null,
												times: [0.0],
												values: [0.0]
										};
								}

								if (curves.z === null) {

										curves.z = {
												version: null,
												times: [0.0],
												values: [0.0]
										};
								}

								curves.x.values = curves.x.values.map(THREE.Math.degToRad);
								curves.y.values = curves.y.values.map(THREE.Math.degToRad);
								curves.z.values = curves.z.values.map(THREE.Math.degToRad);

								if (curveNode.preRotations !== null) {

										var preRotations = new THREE.Euler().setFromVector3(curveNode.preRotations, 'ZYX');
										preRotations = new THREE.Quaternion().setFromEuler(preRotations);
										var frameRotation = new THREE.Euler();
										var frameRotationQuaternion = new THREE.Quaternion();
										for (var frame = 0; frame < curves.x.times.length; ++frame) {

												frameRotation.set(curves.x.values[frame], curves.y.values[frame], curves.z.values[frame], 'ZYX');
												frameRotationQuaternion.setFromEuler(frameRotation).premultiply(preRotations);
												frameRotation.setFromQuaternion(frameRotationQuaternion, 'ZYX');
												curves.x.values[frame] = frameRotation.x;
												curves.y.values[frame] = frameRotation.y;
												curves.z.values[frame] = frameRotation.z;
										}
								}
						}
				});

				for (var nodeID in rawLayers) {

						var layer = [];
						var children = connections.get(parseInt(nodeID)).children;

						for (var childIndex = 0; childIndex < children.length; childIndex++) {

								// Skip lockInfluenceWeights
								if (tmpMap.has(children[childIndex].ID)) {

										var curveNode = tmpMap.get(children[childIndex].ID);
										var boneID = curveNode.containerBoneID;
										if (layer[boneID] === undefined) {

												layer[boneID] = {
														T: null,
														R: null,
														S: null
												};
										}

										layer[boneID][curveNode.attr] = curveNode;
								}
						}

						returnObject.layers[nodeID] = layer;
				}

				for (var nodeID in rawStacks) {

						var layers = [];
						var children = connections.get(parseInt(nodeID)).children;
						var timestamps = { max: 0, min: Number.MAX_VALUE };

						for (var childIndex = 0; childIndex < children.length; ++childIndex) {

								var currentLayer = returnObject.layers[children[childIndex].ID];

								if (currentLayer !== undefined) {

										layers.push(currentLayer);

										for (var currentLayerIndex = 0, currentLayerLength = currentLayer.length; currentLayerIndex < currentLayerLength; ++currentLayerIndex) {

												var layer = currentLayer[currentLayerIndex];

												if (layer) {

														getCurveNodeMaxMinTimeStamps(layer, timestamps);
												}
										}
								}
						}

						// Do we have an animation clip with actual length?
						if (timestamps.max > timestamps.min) {

								returnObject.stacks[nodeID] = {
										name: rawStacks[nodeID].attrName,
										layers: layers,
										length: timestamps.max - timestamps.min,
										frames: (timestamps.max - timestamps.min) * returnObject.fps
								};
						}
				}

				return returnObject;
		}

		function parseAnimationNode(FBXTree, animationCurveNode, connections, sceneGraph) {

				var rawModels = FBXTree.Objects.subNodes.Model;

				var returnObject = {

						id: animationCurveNode.id,
						attr: animationCurveNode.attrName,
						internalID: animationCurveNode.id,
						attrX: false,
						attrY: false,
						attrZ: false,
						containerBoneID: -1,
						containerID: -1,
						curves: {
								x: null,
								y: null,
								z: null
						},
						preRotations: null

				};

				if (returnObject.attr.match(/S|R|T/)) {

						for (var attributeKey in animationCurveNode.properties) {

								if (attributeKey.match(/X/)) {

										returnObject.attrX = true;
								}
								if (attributeKey.match(/Y/)) {

										returnObject.attrY = true;
								}
								if (attributeKey.match(/Z/)) {

										returnObject.attrZ = true;
								}
						}
				} else {

						return null;
				}

				var conns = connections.get(returnObject.id);
				var containerIndices = conns.parents;

				for (var containerIndicesIndex = containerIndices.length - 1; containerIndicesIndex >= 0; --containerIndicesIndex) {

						var boneID = findIndex(sceneGraph.skeleton.bones, function (bone) {

								return bone.FBX_ID === containerIndices[containerIndicesIndex].ID;
						});
						if (boneID > -1) {

								returnObject.containerBoneID = boneID;
								returnObject.containerID = containerIndices[containerIndicesIndex].ID;
								var model = rawModels[returnObject.containerID.toString()];
								if ('PreRotation' in model.properties) {

										returnObject.preRotations = parseVector3(model.properties.PreRotation).multiplyScalar(Math.PI / 180);
								}
								break;
						}
				}

				return returnObject;
		}

		function parseAnimationCurve(animationCurve) {

				return {
						version: null,
						id: animationCurve.id,
						internalID: animationCurve.id,
						times: animationCurve.subNodes.KeyTime.properties.a.map(convertFBXTimeToSeconds),
						values: animationCurve.subNodes.KeyValueFloat.properties.a,

						attrFlag: animationCurve.subNodes.KeyAttrFlags.properties.a,
						attrData: animationCurve.subNodes.KeyAttrDataFloat.properties.a
				};
		}

		// Sets the maxTimeStamp and minTimeStamp variables if it has timeStamps that are either larger or smaller
		// than the max or min respectively.
		function getCurveNodeMaxMinTimeStamps(layer, timestamps) {

				if (layer.R) {

						getCurveMaxMinTimeStamp(layer.R.curves, timestamps);
				}
				if (layer.S) {

						getCurveMaxMinTimeStamp(layer.S.curves, timestamps);
				}
				if (layer.T) {

						getCurveMaxMinTimeStamp(layer.T.curves, timestamps);
				}
		}

		// Sets the maxTimeStamp and minTimeStamp if one of the curve's time stamps
		// exceeds the maximum or minimum.
		function getCurveMaxMinTimeStamp(curve, timestamps) {

				if (curve.x) {

						getCurveAxisMaxMinTimeStamps(curve.x, timestamps);
				}
				if (curve.y) {

						getCurveAxisMaxMinTimeStamps(curve.y, timestamps);
				}
				if (curve.z) {

						getCurveAxisMaxMinTimeStamps(curve.z, timestamps);
				}
		}

		// Sets the maxTimeStamp and minTimeStamp if one of its timestamps exceeds the maximum or minimum.
		function getCurveAxisMaxMinTimeStamps(axis, timestamps) {

				timestamps.max = axis.times[axis.times.length - 1] > timestamps.max ? axis.times[axis.times.length - 1] : timestamps.max;
				timestamps.min = axis.times[0] < timestamps.min ? axis.times[0] : timestamps.min;
		}

		function addAnimations(group, animations) {

				if (group.animations === undefined) {

						group.animations = [];
				}

				var stacks = animations.stacks;

				for (var key in stacks) {

						var stack = stacks[key];

						var animationData = {
								name: stack.name,
								fps: animations.fps,
								length: stack.length,
								hierarchy: []
						};

						var bones = group.skeleton.bones;

						for (var bonesIndex = 0, bonesLength = bones.length; bonesIndex < bonesLength; ++bonesIndex) {

								var bone = bones[bonesIndex];

								var name = bone.name.replace(/.*:/, '');
								var parentIndex = findIndex(bones, function (parentBone) {

										return bone.parent === parentBone;
								});
								animationData.hierarchy.push({ parent: parentIndex, name: name, keys: [] });
						}

						for (var frame = 0; frame <= stack.frames; frame++) {

								for (var bonesIndex = 0, bonesLength = bones.length; bonesIndex < bonesLength; ++bonesIndex) {

										var bone = bones[bonesIndex];
										var boneIndex = bonesIndex;

										var animationNode = stack.layers[0][boneIndex];

										for (var hierarchyIndex = 0, hierarchyLength = animationData.hierarchy.length; hierarchyIndex < hierarchyLength; ++hierarchyIndex) {

												var node = animationData.hierarchy[hierarchyIndex];

												if (node.name === bone.name) {

														node.keys.push(generateKey(animations, animationNode, bone, frame));
												}
										}
								}
						}

						group.animations.push(THREE.AnimationClip.parseAnimation(animationData, bones));
				}
		}

		var euler = new THREE.Euler();
		var quaternion = new THREE.Quaternion();

		function generateKey(animations, animationNode, bone, frame) {

				var key = {
						time: frame / animations.fps,
						pos: bone.position.toArray(),
						rot: bone.quaternion.toArray(),
						scl: bone.scale.toArray()
				};

				if (animationNode === undefined) return key;

				euler.setFromQuaternion(bone.quaternion, 'ZYX', false);

				try {

						if (hasCurve(animationNode, 'T') && hasKeyOnFrame(animationNode.T, frame)) {

								if (animationNode.T.curves.x.values[frame]) {

										key.pos[0] = animationNode.T.curves.x.values[frame];
								}

								if (animationNode.T.curves.y.values[frame]) {

										key.pos[1] = animationNode.T.curves.y.values[frame];
								}

								if (animationNode.T.curves.z.values[frame]) {

										key.pos[2] = animationNode.T.curves.z.values[frame];
								}
						}

						if (hasCurve(animationNode, 'R') && hasKeyOnFrame(animationNode.R, frame)) {

								// Only update the euler's values if rotation is defined for the axis on this frame
								if (animationNode.R.curves.x.values[frame]) {

										euler.x = animationNode.R.curves.x.values[frame];
								}

								if (animationNode.R.curves.y.values[frame]) {

										euler.y = animationNode.R.curves.y.values[frame];
								}

								if (animationNode.R.curves.z.values[frame]) {

										euler.z = animationNode.R.curves.z.values[frame];
								}

								quaternion.setFromEuler(euler);
								key.rot = quaternion.toArray();
						}

						if (hasCurve(animationNode, 'S') && hasKeyOnFrame(animationNode.S, frame)) {

								if (animationNode.T.curves.x.values[frame]) {

										key.scl[0] = animationNode.S.curves.x.values[frame];
								}

								if (animationNode.T.curves.y.values[frame]) {

										key.scl[1] = animationNode.S.curves.y.values[frame];
								}

								if (animationNode.T.curves.z.values[frame]) {

										key.scl[2] = animationNode.S.curves.z.values[frame];
								}
						}
				} catch (error) {

						// Curve is not fully plotted.
						console.log('THREE.FBXLoader: ', bone);
						console.log('THREE.FBXLoader: ', error);
				}

				return key;
		}

		var AXES = ['x', 'y', 'z'];

		function hasCurve(animationNode, attribute) {

				if (animationNode === undefined) {

						return false;
				}

				var attributeNode = animationNode[attribute];

				if (!attributeNode) {

						return false;
				}

				return AXES.every(function (key) {

						return attributeNode.curves[key] !== null;
				});
		}

		function hasKeyOnFrame(attributeNode, frame) {

				return AXES.every(function (key) {

						return isKeyExistOnFrame(attributeNode.curves[key], frame);
				});
		}

		function isKeyExistOnFrame(curve, frame) {

				return curve.values[frame] !== undefined;
		}

		// parse an FBX file in ASCII format
		function TextParser() {}

		Object.assign(TextParser.prototype, {

				getPrevNode: function getPrevNode() {

						return this.nodeStack[this.currentIndent - 2];
				},

				getCurrentNode: function getCurrentNode() {

						return this.nodeStack[this.currentIndent - 1];
				},

				getCurrentProp: function getCurrentProp() {

						return this.currentProp;
				},

				pushStack: function pushStack(node) {

						this.nodeStack.push(node);
						this.currentIndent += 1;
				},

				popStack: function popStack() {

						this.nodeStack.pop();
						this.currentIndent -= 1;
				},

				setCurrentProp: function setCurrentProp(val, name) {

						this.currentProp = val;
						this.currentPropName = name;
				},

				parse: function parse(text) {

						this.currentIndent = 0;
						this.allNodes = new FBXTree();
						this.nodeStack = [];
						this.currentProp = [];
						this.currentPropName = '';

						var split = text.split('\n');

						for (var lineNum = 0, lineLength = split.length; lineNum < lineLength; lineNum++) {

								var l = split[lineNum];

								// skip comment line
								if (l.match(/^[\s\t]*;/)) {

										continue;
								}

								// skip empty line
								if (l.match(/^[\s\t]*$/)) {

										continue;
								}

								// beginning of node
								var beginningOfNodeExp = new RegExp('^\\t{' + this.currentIndent + '}(\\w+):(.*){', '');
								var match = l.match(beginningOfNodeExp);

								if (match) {

										var nodeName = match[1].trim().replace(/^"/, '').replace(/"$/, '');
										var nodeAttrs = match[2].split(',');

										for (var i = 0, l = nodeAttrs.length; i < l; i++) {

												nodeAttrs[i] = nodeAttrs[i].trim().replace(/^"/, '').replace(/"$/, '');
										}

										this.parseNodeBegin(l, nodeName, nodeAttrs || null);
										continue;
								}

								// node's property
								var propExp = new RegExp('^\\t{' + this.currentIndent + '}(\\w+):[\\s\\t\\r\\n](.*)');
								var match = l.match(propExp);

								if (match) {

										var propName = match[1].replace(/^"/, '').replace(/"$/, '').trim();
										var propValue = match[2].replace(/^"/, '').replace(/"$/, '').trim();

										// for special case: base64 image data follows "Content: ," line
										//	Content: ,
										//	 "iVB..."
										if (propName === 'Content' && propValue === ',') {

												propValue = split[++lineNum].replace(/"/g, '').replace(/,$/, '').trim();
										}

										this.parseNodeProperty(l, propName, propValue);
										continue;
								}

								// end of node
								var endOfNodeExp = new RegExp('^\\t{' + (this.currentIndent - 1) + '}}');

								if (l.match(endOfNodeExp)) {

										this.nodeEnd();
										continue;
								}

								// large arrays are split over multiple lines terminated with a ',' character
								// if this is encountered the line needs to be joined to the previous line
								if (l.match(/^[^\s\t}]/)) {

										this.parseNodePropertyContinued(l);
								}
						}

						return this.allNodes;
				},

				parseNodeBegin: function parseNodeBegin(line, nodeName, nodeAttrs) {

						var node = { 'name': nodeName, properties: {}, 'subNodes': {} };
						var attrs = this.parseNodeAttr(nodeAttrs);
						var currentNode = this.getCurrentNode();

						// a top node
						if (this.currentIndent === 0) {
								this.allNodes.add(nodeName, node);
						} else {
								// a subnode

								// if the subnode already exists, append it
								if (nodeName in currentNode.subNodes) {

										var tmp = currentNode.subNodes[nodeName];

										if (this.isFlattenNode(currentNode.subNodes[nodeName])) {
												if (attrs.id === '') {
														currentNode.subNodes[nodeName] = [];
														currentNode.subNodes[nodeName].push(tmp);
												} else {
														currentNode.subNodes[nodeName] = {};
														currentNode.subNodes[nodeName][tmp.id] = tmp;
												}
										}

										if (attrs.id === '') {
												currentNode.subNodes[nodeName].push(node);
										} else {
												currentNode.subNodes[nodeName][attrs.id] = node;
										}
								} else if (typeof attrs.id === 'number' || attrs.id.match(/^\d+$/)) {
										currentNode.subNodes[nodeName] = {};
										currentNode.subNodes[nodeName][attrs.id] = node;
								} else {
										currentNode.subNodes[nodeName] = node;
								}
						}

						// for this	↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
						// NodeAttribute: 1001463072, "NodeAttribute::", "LimbNode" {
						if (nodeAttrs) {
								node.id = attrs.id;
								node.attrName = attrs.name;
								node.attrType = attrs.type;
						}

						this.pushStack(node);
				},

				parseNodeAttr: function parseNodeAttr(attrs) {
						var id = attrs[0];

						if (attrs[0] !== '') {
								id = parseInt(attrs[0]);

								if (isNaN(id)) {
										id = attrs[0];
								}
						}

						var name = '',
						    type = '';

						if (attrs.length > 1) {
								name = attrs[1].replace(/^(\w+)::/, '');
								type = attrs[2];
						}

						return { id: id, name: name, type: type };
				},

				parseNodeProperty: function parseNodeProperty(line, propName, propValue) {
						var currentNode = this.getCurrentNode();
						var parentName = currentNode.name;

						// special case where the parent node is something like "Properties70"
						// these children nodes must treated carefully
						if (parentName !== undefined) {
								var propMatch = parentName.match(/Properties(\d)+/);
								if (propMatch) {
										this.parseNodeSpecialProperty(line, propName, propValue);
										return;
								}
						}

						// Connections
						if (propName === 'C') {

								var connProps = propValue.split(',').slice(1);
								var from = parseInt(connProps[0]);
								var to = parseInt(connProps[1]);
								var rest = propValue.split(',').slice(3);

								rest = rest.map(function (elem) {
										return elem.trim().replace(/^"/, '');
								});

								propName = 'connections';
								propValue = [from, to];
								append(propValue, rest);

								if (currentNode.properties[propName] === undefined) {
										currentNode.properties[propName] = [];
								}
						}

						// Node
						if (propName === 'Node') {
								var id = parseInt(propValue);
								currentNode.properties.id = id;
								currentNode.id = id;
						}

						// already exists in properties, then append this
						if (propName in currentNode.properties) {
								if (Array.isArray(currentNode.properties[propName])) {
										currentNode.properties[propName].push(propValue);
								} else {
										currentNode.properties[propName] += propValue;
								}
						} else {
								if (Array.isArray(currentNode.properties[propName])) {
										currentNode.properties[propName].push(propValue);
								} else {
										currentNode.properties[propName] = propValue;
								}
						}

						this.setCurrentProp(currentNode.properties, propName);

						// convert string to array, unless it ends in ',' in which case more will be added to it
						if (propName === 'a' && propValue.slice(-1) !== ',') {
								currentNode.properties.a = parseNumberArray(propValue);
						}
				},

				parseNodePropertyContinued: function parseNodePropertyContinued(line) {
						this.currentProp[this.currentPropName] += line;

						// if the line doesn't end in ',' we have reached the end of the property value
						// so convert the string to an array
						if (line.slice(-1) !== ',') {
								var currentNode = this.getCurrentNode();
								currentNode.properties.a = parseNumberArray(currentNode.properties.a);
						}
				},

				parseNodeSpecialProperty: function parseNodeSpecialProperty(line, propName, propValue) {
						// split this
						// P: "Lcl Scaling", "Lcl Scaling", "", "A",1,1,1
						// into array like below
						// ["Lcl Scaling", "Lcl Scaling", "", "A", "1,1,1" ]
						var props = propValue.split('",');

						for (var i = 0, l = props.length; i < l; i++) {
								props[i] = props[i].trim().replace(/^\"/, '').replace(/\s/, '_');
						}

						var innerPropName = props[0];
						var innerPropType1 = props[1];
						var innerPropType2 = props[2];
						var innerPropFlag = props[3];
						var innerPropValue = props[4];

						// cast value to its type
						switch (innerPropType1) {
								case 'int':
								case 'enum':
								case 'bool':
								case 'ULongLong':
										innerPropValue = parseInt(innerPropValue);
										break;
								case 'double':
								case 'Number':
								case 'FieldOfView':
										innerPropValue = parseFloat(innerPropValue);
										break;
								case 'ColorRGB':
								case 'Vector3D':
								case 'Lcl_Translation':
								case 'Lcl_Rotation':
								case 'Lcl_Scaling':
										innerPropValue = parseNumberArray(innerPropValue);
										break;
						}

						// CAUTION: these props must append to parent's parent
						this.getPrevNode().properties[innerPropName] = {
								'type': innerPropType1,
								'type2': innerPropType2,
								'flag': innerPropFlag,
								'value': innerPropValue
						};
						this.setCurrentProp(this.getPrevNode().properties, innerPropName);
				},

				nodeEnd: function nodeEnd() {
						this.popStack();
				},

				isFlattenNode: function isFlattenNode(node) {
						return 'subNodes' in node && 'properties' in node ? true : false;
				}
		});

		// Parse an FBX file in Binary format
		function BinaryParser() {}

		Object.assign(BinaryParser.prototype, {
				parse: function parse(buffer) {
						var reader = new BinaryReader(buffer);
						reader.skip(23); // skip magic 23 bytes
						var version = reader.getUint32();

						//console.log( 'THREE.FBXLoader: FBX binary version: ' + version );
						var allNodes = new FBXTree();
						var count = 0;

						while (!this.endOfContent(reader)) {
								try {
										var node = this.parseNode(reader, version);
										if (node !== null) {
												allNodes.add(node.name, node);
										}
								} catch (err) {
										console.log(err);
								}
						}

						return allNodes;
				},

				// Check if reader has reached the end of content.
				endOfContent: function endOfContent(reader) {

						// footer size: 160bytes + 16-byte alignment padding
						// - 16bytes: magic
						// - padding til 16-byte alignment (at least 1byte?)
						//	(seems like some exporters embed fixed 15 or 16bytes?)
						// - 4bytes: magic
						// - 4bytes: version
						// - 120bytes: zero
						// - 16bytes: magic
						if (reader.size() % 16 === 0) {
								return (reader.getOffset() + 160 + 16 & ~0xf) >= reader.size();
						} else {
								return reader.getOffset() + 160 + 16 >= reader.size();
						}
				},

				parseNode: function parseNode(reader, version) {
						// The first three data sizes depends on version.
						var endOffset = version >= 7500 ? reader.getUint64() : reader.getUint32();
						var numProperties = version >= 7500 ? reader.getUint64() : reader.getUint32();

						// note: do not remove this even if you get a linter warning as it moves the buffer forward
						var propertyListLen = version >= 7500 ? reader.getUint64() : reader.getUint32();

						var nameLen = reader.getUint8();
						var name = reader.getString(nameLen);

						// Regards this node as NULL-record if endOffset is zero
						if (endOffset === 0) return null;

						var propertyList = [];

						for (var i = 0; i < numProperties; i++) {
								propertyList.push(this.parseProperty(reader));
						}

						// Regards the first three elements in propertyList as id, attrName, and attrType
						var id = propertyList.length > 0 ? propertyList[0] : '';
						var attrName = propertyList.length > 1 ? propertyList[1] : '';
						var attrType = propertyList.length > 2 ? propertyList[2] : '';

						var subNodes = {};
						var properties = {};

						var isSingleProperty = false;

						// check if this node represents just a single property
						// like (name, 0) set or (name2, [0, 1, 2]) set of {name: 0, name2: [0, 1, 2]}
						if (numProperties === 1 && reader.getOffset() === endOffset) {

								isSingleProperty = true;
						}

						while (endOffset > reader.getOffset()) {

								var node = this.parseNode(reader, version);

								if (node === null) continue;

								// special case: child node is single property
								if (node.singleProperty === true) {

										var value = node.propertyList[0];

										if (Array.isArray(value)) {

												subNodes[node.name] = node;

												node.properties.a = value;
										} else {

												properties[node.name] = value;
										}

										continue;
								}

								// parse connections
								if (name === 'Connections' && node.name === 'C') {

										var array = [];

										for (var i = 1, il = node.propertyList.length; i < il; i++) {

												array[i - 1] = node.propertyList[i];
										}

										if (properties.connections === undefined) {

												properties.connections = [];
										}

										properties.connections.push(array);

										continue;
								}

								// special case: child node is Properties\d+
								// move child node's properties to this node.
								if (node.name.match(/^Properties\d+$/)) {

										var keys = Object.keys(node.properties);

										for (var i = 0, il = keys.length; i < il; i++) {

												var key = keys[i];
												properties[key] = node.properties[key];
										}

										continue;
								}

								// parse 'properties70'
								if (name.match(/^Properties\d+$/) && node.name === 'P') {

										var innerPropName = node.propertyList[0];
										var innerPropType1 = node.propertyList[1];
										var innerPropType2 = node.propertyList[2];
										var innerPropFlag = node.propertyList[3];
										var innerPropValue;

										if (innerPropName.indexOf('Lcl ') === 0) innerPropName = innerPropName.replace('Lcl ', 'Lcl_');
										if (innerPropType1.indexOf('Lcl ') === 0) innerPropType1 = innerPropType1.replace('Lcl ', 'Lcl_');

										if (innerPropType1 === 'ColorRGB' || innerPropType1 === 'Vector' || innerPropType1 === 'Vector3D' || innerPropType1.indexOf('Lcl_') === 0) {

												innerPropValue = [node.propertyList[4], node.propertyList[5], node.propertyList[6]];
										} else {

												innerPropValue = node.propertyList[4];
										}

										// this will be copied to parent, see above
										properties[innerPropName] = {

												'type': innerPropType1,
												'type2': innerPropType2,
												'flag': innerPropFlag,
												'value': innerPropValue

										};

										continue;
								}

								if (subNodes[node.name] === undefined) {

										if (typeof node.id === 'number') {

												subNodes[node.name] = {};
												subNodes[node.name][node.id] = node;
										} else {

												subNodes[node.name] = node;
										}
								} else {

										if (node.id === '') {

												if (!Array.isArray(subNodes[node.name])) {

														subNodes[node.name] = [subNodes[node.name]];
												}

												subNodes[node.name].push(node);
										} else {

												if (subNodes[node.name][node.id] === undefined) {

														subNodes[node.name][node.id] = node;
												} else {

														// conflict id. irregular?
														if (!Array.isArray(subNodes[node.name][node.id])) {

																subNodes[node.name][node.id] = [subNodes[node.name][node.id]];
														}

														subNodes[node.name][node.id].push(node);
												}
										}
								}
						}

						return {

								singleProperty: isSingleProperty,
								id: id,
								attrName: attrName,
								attrType: attrType,
								name: name,
								properties: properties,
								propertyList: propertyList, // raw property list used by parent
								subNodes: subNodes

						};
				},

				parseProperty: function parseProperty(reader) {

						var type = reader.getChar();

						switch (type) {

								case 'C':
										return reader.getBoolean();

								case 'D':
										return reader.getFloat64();

								case 'F':
										return reader.getFloat32();

								case 'I':
										return reader.getInt32();

								case 'L':
										return reader.getInt64();

								case 'R':
										var length = reader.getUint32();
										return reader.getArrayBuffer(length);

								case 'S':
										var length = reader.getUint32();
										return reader.getString(length);

								case 'Y':
										return reader.getInt16();

								case 'b':
								case 'c':
								case 'd':
								case 'f':
								case 'i':
								case 'l':
										var arrayLength = reader.getUint32();
										var encoding = reader.getUint32(); // 0: non-compressed, 1: compressed
										var compressedLength = reader.getUint32();

										if (encoding === 0) {
												switch (type) {
														case 'b':
														case 'c':
																return reader.getBooleanArray(arrayLength);
														case 'd':
																return reader.getFloat64Array(arrayLength);
														case 'f':
																return reader.getFloat32Array(arrayLength);
														case 'i':
																return reader.getInt32Array(arrayLength);
														case 'l':
																return reader.getInt64Array(arrayLength);
												}
										}

										if (window.Zlib === undefined) {
												throw new Error('THREE.FBXLoader: External library Inflate.min.js required, obtain or import from https://github.com/imaya/zlib.js');
										}

										var inflate = new Zlib.Inflate(new Uint8Array(reader.getArrayBuffer(compressedLength))); // eslint-disable-line no-undef
										var reader2 = new BinaryReader(inflate.decompress().buffer);

										switch (type) {
												case 'b':
												case 'c':
														return reader2.getBooleanArray(arrayLength);
												case 'd':
														return reader2.getFloat64Array(arrayLength);
												case 'f':
														return reader2.getFloat32Array(arrayLength);
												case 'i':
														return reader2.getInt32Array(arrayLength);
												case 'l':
														return reader2.getInt64Array(arrayLength);
										}

								default:
										throw new Error('THREE.FBXLoader: Unknown property type ' + type);
						}
				}
		});

		function BinaryReader(buffer, littleEndian) {

				this.dv = new DataView(buffer);
				this.offset = 0;
				this.littleEndian = littleEndian !== undefined ? littleEndian : true;
		}

		Object.assign(BinaryReader.prototype, {

				getOffset: function getOffset() {

						return this.offset;
				},

				size: function size() {

						return this.dv.buffer.byteLength;
				},

				skip: function skip(length) {

						this.offset += length;
				},

				// seems like true/false representation depends on exporter.
				// true: 1 or 'Y'(=0x59), false: 0 or 'T'(=0x54)
				// then sees LSB.
				getBoolean: function getBoolean() {

						return (this.getUint8() & 1) === 1;
				},

				getBooleanArray: function getBooleanArray(size) {

						var a = [];

						for (var i = 0; i < size; i++) {

								a.push(this.getBoolean());
						}

						return a;
				},

				getInt8: function getInt8() {

						var value = this.dv.getInt8(this.offset);
						this.offset += 1;
						return value;
				},

				getInt8Array: function getInt8Array(size) {

						var a = [];

						for (var i = 0; i < size; i++) {

								a.push(this.getInt8());
						}

						return a;
				},

				getUint8: function getUint8() {

						var value = this.dv.getUint8(this.offset);
						this.offset += 1;
						return value;
				},

				getUint8Array: function getUint8Array(size) {

						var a = [];

						for (var i = 0; i < size; i++) {

								a.push(this.getUint8());
						}

						return a;
				},

				getInt16: function getInt16() {

						var value = this.dv.getInt16(this.offset, this.littleEndian);
						this.offset += 2;
						return value;
				},

				getInt16Array: function getInt16Array(size) {

						var a = [];

						for (var i = 0; i < size; i++) {

								a.push(this.getInt16());
						}

						return a;
				},

				getUint16: function getUint16() {

						var value = this.dv.getUint16(this.offset, this.littleEndian);
						this.offset += 2;
						return value;
				},

				getUint16Array: function getUint16Array(size) {

						var a = [];

						for (var i = 0; i < size; i++) {

								a.push(this.getUint16());
						}

						return a;
				},

				getInt32: function getInt32() {

						var value = this.dv.getInt32(this.offset, this.littleEndian);
						this.offset += 4;
						return value;
				},

				getInt32Array: function getInt32Array(size) {

						var a = [];

						for (var i = 0; i < size; i++) {

								a.push(this.getInt32());
						}

						return a;
				},

				getUint32: function getUint32() {

						var value = this.dv.getUint32(this.offset, this.littleEndian);
						this.offset += 4;
						return value;
				},

				getUint32Array: function getUint32Array(size) {

						var a = [];

						for (var i = 0; i < size; i++) {

								a.push(this.getUint32());
						}

						return a;
				},

				// JavaScript doesn't support 64-bit integer so calculate this here
				// 1 << 32 will return 1 so using multiply operation instead here.
				// There's a possibility that this method returns wrong value if the value
				// is out of the range between Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER.
				// TODO: safely handle 64-bit integer
				getInt64: function getInt64() {

						var low, high;

						if (this.littleEndian) {

								low = this.getUint32();
								high = this.getUint32();
						} else {

								high = this.getUint32();
								low = this.getUint32();
						}

						// calculate negative value
						if (high & 0x80000000) {

								high = ~high & 0xFFFFFFFF;
								low = ~low & 0xFFFFFFFF;

								if (low === 0xFFFFFFFF) high = high + 1 & 0xFFFFFFFF;

								low = low + 1 & 0xFFFFFFFF;

								return -(high * 0x100000000 + low);
						}

						return high * 0x100000000 + low;
				},

				getInt64Array: function getInt64Array(size) {

						var a = [];

						for (var i = 0; i < size; i++) {

								a.push(this.getInt64());
						}

						return a;
				},

				// Note: see getInt64() comment
				getUint64: function getUint64() {

						var low, high;

						if (this.littleEndian) {

								low = this.getUint32();
								high = this.getUint32();
						} else {

								high = this.getUint32();
								low = this.getUint32();
						}

						return high * 0x100000000 + low;
				},

				getUint64Array: function getUint64Array(size) {

						var a = [];

						for (var i = 0; i < size; i++) {

								a.push(this.getUint64());
						}

						return a;
				},

				getFloat32: function getFloat32() {

						var value = this.dv.getFloat32(this.offset, this.littleEndian);
						this.offset += 4;
						return value;
				},

				getFloat32Array: function getFloat32Array(size) {

						var a = [];

						for (var i = 0; i < size; i++) {

								a.push(this.getFloat32());
						}

						return a;
				},

				getFloat64: function getFloat64() {

						var value = this.dv.getFloat64(this.offset, this.littleEndian);
						this.offset += 8;
						return value;
				},

				getFloat64Array: function getFloat64Array(size) {

						var a = [];

						for (var i = 0; i < size; i++) {

								a.push(this.getFloat64());
						}

						return a;
				},

				getArrayBuffer: function getArrayBuffer(size) {

						var value = this.dv.buffer.slice(this.offset, this.offset + size);
						this.offset += size;
						return value;
				},

				getChar: function getChar() {

						return String.fromCharCode(this.getUint8());
				},

				getString: function getString(size) {

						var s = '';

						while (size > 0) {

								var value = this.getUint8();
								size--;

								if (value === 0) break;

								s += String.fromCharCode(value);
						}

						// Manage UTF8 encoding
						s = decodeURIComponent(escape(s));

						this.skip(size);

						return s;
				}

		});

		// FBXTree holds a representation of the FBX data, returned by the TextParser ( FBX ASCII format)
		// and BinaryParser( FBX Binary format)
		function FBXTree() {}

		Object.assign(FBXTree.prototype, {

				add: function add(key, val) {

						this[key] = val;
				}

		});

		function isFbxFormatBinary(buffer) {

				var CORRECT = 'Kaydara FBX Binary  \0';

				return buffer.byteLength >= CORRECT.length && CORRECT === convertArrayBufferToString(buffer, 0, CORRECT.length);
		}

		function isFbxFormatASCII(text) {

				var CORRECT = ['K', 'a', 'y', 'd', 'a', 'r', 'a', '\\', 'F', 'B', 'X', '\\', 'B', 'i', 'n', 'a', 'r', 'y', '\\', '\\'];

				var cursor = 0;

				function read(offset) {

						var result = text[offset - 1];
						text = text.slice(cursor + offset);
						cursor++;
						return result;
				}

				for (var i = 0; i < CORRECT.length; ++i) {

						var num = read(1);
						if (num === CORRECT[i]) {

								return false;
						}
				}

				return true;
		}

		function getFbxVersion(text) {

				var versionRegExp = /FBXVersion: (\d+)/;
				var match = text.match(versionRegExp);
				if (match) {

						var version = parseInt(match[1]);
						return version;
				}
				throw new Error('THREE.FBXLoader: Cannot find the version number for the file given.');
		}

		// Converts FBX ticks into real time seconds.
		function convertFBXTimeToSeconds(time) {

				return time / 46186158000;
		}

		// Parses comma separated list of numbers and returns them an array.
		// Used internally by the TextParser
		function parseNumberArray(value) {

				var array = value.split(',');

				for (var i = 0, l = array.length; i < l; i++) {

						array[i] = parseFloat(array[i]);
				}

				return array;
		}

		function parseVector3(property) {

				return new THREE.Vector3().fromArray(property.value);
		}

		function parseColor(property) {

				return new THREE.Color().fromArray(property.value);
		}

		// Converts ArrayBuffer to String.
		function convertArrayBufferToString(buffer, from, to) {

				if (from === undefined) from = 0;
				if (to === undefined) to = buffer.byteLength;

				var array = new Uint8Array(buffer, from, to);

				if (window.TextDecoder !== undefined) {

						return new TextDecoder().decode(array);
				}

				var s = '';

				for (var i = 0, il = array.length; i < il; i++) {
						s += String.fromCharCode(array[i]);
				}

				return s;
		}

		function findIndex(array, func) {
				for (var i = 0, l = array.length; i < l; i++) {
						if (func(array[i])) return i;
				}
				return -1;
		}

		function append(a, b) {
				for (var i = 0, j = a.length, l = b.length; i < l; i++, j++) {
						a[j] = b[i];
				}
		}

		function slice(a, b, from, to) {
				for (var i = from, j = 0; i < to; i++, j++) {
						a[j] = b[i];
				}

				return a;
		}
})();

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _load_obj = __webpack_require__(3);

var _load_obj2 = _interopRequireDefault(_load_obj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// load rooms

var RoomLoader = function () {
  function RoomLoader(scene, collider, isMonday) {
    _classCallCheck(this, RoomLoader);

    this.scene = scene;
    this.collider = collider;
    this.isMonday = isMonday;
    this.toLoad = 0;
    this.loader = new _load_obj2.default(appRoot + 'assets/3d/');
    this._load();
  }

  _createClass(RoomLoader, [{
    key: 'isLoaded',
    value: function isLoaded() {
      return this.toLoad == 0;
    }
  }, {
    key: '_load',
    value: function _load() {
      var mapSource = this.isMonday ? 'hangar_monday' : 'hangar';
      var collisionSource = this.isMonday ? 'hangar_collision_map_monday' : 'hangar_collision_map';

      // load collisions

      var floor = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 0.5, 100), new THREE.MeshPhongMaterial({ color: 0x444444 }));

      this.collider.add(new Collider.Mesh(floor.geometry));
      this.scene.add(floor);

      /*
      this.loader.loadOBJ(collisionSource).then((map) => {
        map.children.forEach((child) => {
          this.collider.add(new Collider.Mesh(child.geometry));
        });
        this.toLoad -= 1;
      }, (err) => { console.log(err); });
        // load map
        this.loader.loadOBJ(mapSource).then((map) => {
        this.scene.add(map);
        this.toLoad -= 1;
      }, (err) => { console.log(err); });
      */
    }
  }]);

  return RoomLoader;
}();

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

exports.default = RoomLoader;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LightHandler = function () {
  function LightHandler(scene, player) {
    _classCallCheck(this, LightHandler);

    this.scene = scene;
    this.player = player;
  }

  _createClass(LightHandler, [{
    key: "load",
    value: function load(isMonday) {
      // load the lights

      if (!isMonday) {
        var ambient = new THREE.AmbientLight(0xffffff, .08);
        var hemisphere = new THREE.HemisphereLight(0xffaabb, 0x080820, 0.1);
        var point1 = new THREE.PointLight(0xffffff, 0.5, 13, 1);
        //const point2 = new THREE.PointLight(0xfeff87, 0.5, 12, 1);
        this.neonSign = new THREE.PointLight(0xff0000, 0.8, 15, 1);

        point1.position.set(0, 5, -10);
        //point2.position.set(-19, 8, 5);
        this.neonSign.position.set(0, 14, -32);

        this.scene.add(ambient, point1,
        //point2,
        hemisphere, this.neonSign, this.player.object);
      } else {
        var _ambient = new THREE.AmbientLight(0xffffff, .08);
        var _hemisphere = new THREE.HemisphereLight(0xffaabb, 0x080820, 0.1);

        this.scene.add(_ambient, _hemisphere, this.player.object);
      }
    }
  }]);

  return LightHandler;
}();

exports.default = LightHandler;

/***/ })
/******/ ]);