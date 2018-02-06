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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Materials = exports.Globals = undefined;

var _globals = __webpack_require__(20);

var _globals2 = _interopRequireDefault(_globals);

var _materials = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Globals = _globals2.default;
exports.Materials = _materials.Materials;

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoadOBJ = function () {
  function LoadOBJ(path) {
    _classCallCheck(this, LoadOBJ);

    // load OBJ files

    this.path = path;
    this.materials = {};
    this.images = {};
    this.materialLoader = new THREE.MTLLoader();
    this.objectLoader = new THREE.OBJLoader();
    this.textureLoader = new THREE.TextureLoader();

    // set root paths

    this.materialLoader.setPath(this.path);
    this.objectLoader.setPath(this.path);
    this.textureLoader.setPath(this.path);
  }

  _createClass(LoadOBJ, [{
    key: 'loadOBJ',
    value: function loadOBJ(file) {
      var _this = this;

      // load OBJ from file

      return new Promise(function (resolve, reject) {
        try {
          _this.materialLoader.load(file + '.mtl', function (mtl) {
            // load mats async
            _this.preload(file, mtl.materialsInfo);

            _this.objectLoader.load(file + '.obj', function (obj) {
              obj.children.forEach(function (child) {
                _this.setMaterial(child, _this.materials[file]);
              });
              resolve(obj);
            });
          });
        } catch (error) {
          reject(error);
        }
      });
    }
  }, {
    key: 'preload',
    value: function preload(key, meta) {
      // load materials from meta

      this.materials[key] = {};

      for (var prop in meta) {
        if (meta.hasOwnProperty(prop)) {
          this.newMaterial(key, prop, meta[prop]);
        }
      }
    }
  }, {
    key: 'newImage',
    value: function newImage(url) {}
  }, {
    key: 'newMaterial',
    value: function newMaterial(key, target, prop) {
      // make new material from props

      this.materials[key][target] = new THREE.MeshPhongMaterial({});
      var mat = this.materials[key][target];

      if (prop.map_kd) {
        // diffuse map

        var tex_kd = this.textureLoader.load(prop.map_kd);
        mat.color = new THREE.Color(1, 1, 1);
        mat.map = tex_kd;

        if (prop.map_kd.indexOf('.png') != -1) {
          mat.transparent = true;
          mat.side = THREE.DoubleSide;
        }
      } else {
        // no diffuse map, set emissive -> colour

        mat.emissive = new THREE.Color(prop.ka[0], prop.ka[1], prop.ka[2]);
      }

      if (prop.bump) {
        // bump map

        try {
          var opts = prop.bump.split(' ');
          var tex_bump = this.textureLoader.load(opts[0]);
          mat.bumpScale = parseFloat(opts[2]) * _config.Globals.loader.bumpScale;
          mat.bumpMap = tex_bump;
        } catch (err) {
          console.log('Bump map', err);
        }
      }

      if (prop.map_ka) {
        // ambient map

        mat.requireSecondUVSet = true;
        var tex_ka = this.textureLoader.load(prop.map_ka);
        mat.lightMap = tex_ka;
        mat.lightMapIntensity = _config.Globals.loader.lightMapIntensity;
      }
    }
  }, {
    key: 'setMaterial',
    value: function setMaterial(obj, materials) {
      // set material from materials

      if (materials[obj.material.name]) {
        obj.material = materials[obj.material.name];

        if (obj.material.requireSecondUVSet) {
          // create new UV set for light map

          obj.geometry.addAttribute('uv2', new THREE.BufferAttribute(obj.geometry.attributes.uv.array, 2));
        }
      }
    }
  }, {
    key: 'testLoad',
    value: function testLoad() {
      // test new loading funcs

      this.manager = THREE.DefaultLoadingManager;
      this.fileLoader = new THREE.FileLoader(this.manager);
      this.fileLoader.setPath(this.path);
      this.fileLoader.load('hangar_monday.mtl', function (res) {
        // console.log(res.split('\n'));
        // onLoad(this.parse(text));
      }, function () {}, function (err) {
        console.warn(err);
      });
    }
  }]);

  return LoadOBJ;
}();

exports.default = LoadOBJ;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _performance = __webpack_require__(4);

var _scene = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
		function App() {
				_classCallCheck(this, App);

				// main app

				this.mode = window.location.port === '8080' ? 'dev' : 'production';
				this.setSize();

				// set up scene

				this.timer = new _performance.Timer();
				this.scene = new _scene.Scene(this.width, this.height, '.canvas-target');

				// set up controls, events

				this.events();

				// set, go to loading screen

				this.resize();
				this.loading();
		}

		_createClass(App, [{
				key: 'setSize',
				value: function setSize() {
						// set size

						this.width = window.innerWidth > 900 ? Math.max(900, window.innerWidth - 256) : window.innerWidth;
						this.height = window.innerHeight > 450 ? Math.max(450, window.innerHeight - 256) : window.innerHeight;
				}
		}, {
				key: 'resize',
				value: function resize() {
						// resize canvas, nav

						this.setSize();
						var top = window.innerHeight / 2 - this.height / 2;
						var left = window.innerWidth / 2 - this.width / 2;

						// reposition doc

						$('.content').css({ top: top + 'px', left: left + 'px' });
						$('.menu').css({ top: top + 'px', right: left + 'px' });
						$('.label').css({ bottom: top + 'px', right: left + 'px' });

						// resize scene

						this.scene.resize(this.width, this.height);
				}
		}, {
				key: 'events',
				value: function events() {
						var _this = this;

						// menu events

						$('.close-menu').on('click', function () {
								$('.menu-about').addClass('hidden');
								$('.menu, .label').removeClass('hidden');
						});

						$('.open-menu').on('click', function () {
								$('.menu-about').removeClass('hidden');
								$('.menu, .label').addClass('hidden');
						});

						// on resize

						$(window).on('resize', function () {
								_this.resize();
						});

						// pause, resume on blur

						$(window).on('focus', function () {
								if (_this.paused) {
										_this.paused = false;
										_this.timer.reset();
										_this.loop();
								}
						});

						$(window).on('blur', function () {
								_this.paused = true;
						});
				}
		}, {
				key: 'loading',
				value: function loading() {
						var _this2 = this;

						// wait while loading
						//this.mode != 'dev'
						if (!this.scene.isLoaded()) {
								requestAnimationFrame(function () {
										_this2.loading();
								});
						} else {
								$('.loading').addClass('hidden');
								this.timer.reset();
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

								this.timer.update();
								var delta = this.timer.getDelta();

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = undefined;

var _timer = __webpack_require__(5);

var _timer2 = _interopRequireDefault(_timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Timer = _timer2.default;

/***/ }),
/* 5 */
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

			return this.delta;
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = undefined;

var _scene = __webpack_require__(7);

var _scene2 = _interopRequireDefault(_scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Scene = _scene2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(8);

var _player = __webpack_require__(19);

var _player2 = _interopRequireDefault(_player);

var _config = __webpack_require__(0);

var _art = __webpack_require__(24);

var _maths = __webpack_require__(1);

var _loader = __webpack_require__(27);

var _ray_tracer = __webpack_require__(30);

var _ray_tracer2 = _interopRequireDefault(_ray_tracer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = function () {
  function Scene(width, height, selector) {
    _classCallCheck(this, Scene);

    // scene handler

    this.isMonday = false;

    // set up

    this._initRenderer(selector);
    this._initScene();
    this.resize(width, height);

    // set up post processing, load

    this._initProcessing();
    this._initLoaders();
  }

  _createClass(Scene, [{
    key: 'resize',
    value: function resize(width, height) {
      // resize scene, element

      this.width = width;
      this.height = height;
      this.size = new THREE.Vector2(this.width, this.height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.player.resizeCamera();
      this.renderer.setSize(width, height);
    }
  }, {
    key: '_initRenderer',
    value: function _initRenderer(selector) {
      var _this = this;

      // render objects, methods

      this.renderer = new THREE.WebGLRenderer({ antialias: false });
      this.renderer.setClearColor(0xf9e5a2, 1);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      $(selector).append(this.renderer.domElement);

      // main render func

      this.render = function (delta) {
        _this.composer.render();
      };
    }
  }, {
    key: '_initScene',
    value: function _initScene() {
      var _this2 = this;

      // scene objects, methods

      this.player = new _player2.default(this.renderer.domElement);
      this.camera = this.player.camera;
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x333555, 0.008);
      this.collider = new Collider.System();
      this.lightHandler = new _loader.LightHandler(this.scene, this.player);
      this.lightHandler.load(this.isMonday);
      this.sky = new THREE.Sky();
      this.scene.add(this.sky.mesh);

      // artwork interaction

      this.artworkHandler = new _art.ArtworkHandler(this.scene);
      this.rayTracer = new _ray_tracer2.default(this.renderer.domElement, this.camera);
      this.rayTracer.setTargets(this.artworkHandler.getCollisionBoxes());
      this.onRayClick = function (res) {
        if (res.length) {
          var eye = _this2.artworkHandler.getEyeTarget(res[0].object.uuid);
          if (eye) {
            _this2.player.setEyeTarget(eye);
          }
        }
      };
      this.onRayHover = function (res) {
        _this2.artworkHandler.parseCollisions(res);
      };
      this.rayTracer.setEvents(this.onRayHover, this.onRayClick);

      // hook up

      this.clickInterval = 150;
      this.onMouseDown = function () {
        _this2.mouseTimestamp = new Date().getTime();
      };
      this.onMouseUp = function (e) {
        if (_this2.mouseTimestamp && new Date().getTime() - _this2.mouseTimestamp < _this2.clickInterval) {
          _this2.rayTracer.handleClick(e.clientX, e.clientY);
        }
      };
      this.onMouseMove = function (e) {
        _this2.rayTracer.handleMove(e.clientX, e.clientY);
      };
      this.onTouchStart = function () {
        // mobile touchstart

        _this2.mouseTimestamp = new Date().getTime();
      };
      this.onTouchEnd = function (e) {
        // mobile touchend

        if (_this2.mouseTimestamp && new Date().getTime() - _this2.mouseTimestamp < _this2.clickInterval) {
          if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
            var target = e.originalEvent.changedTouches[0];
            _this2.rayTracer.setMouse(target.clientX, target.clientY);
            var res = _this2.rayTracer.intersectObjects();

            // zoom to picture or just move forward

            if (res.length) {
              _this2.rayTracer.handleClick();
            } else {
              _this2.player.mobileMove(_this2.collider);
            }
          }
        }
      };
      this.onTouchMove = function (e) {
        // mobile touchmove

        if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
          var target = e.originalEvent.changedTouches[0];
          _this2.onMouseUp(target);
        }
      };

      $(this.renderer.domElement).on('mousedown', this.onMouseDown);
      $(this.renderer.domElement).on('mouseup', this.onMouseUp);
      $(this.renderer.domElement).on('mousemove', this.onMouseMove);
      $(this.renderer.domElement).on('touchstart', this.onTouchStart);
      $(this.renderer.domElement).on('touchend', this.onTouchEnd);
      $(this.renderer.domElement).on('touchmove', this.onTouchMove);

      // main update func

      this.update = function (delta) {
        _this2.player.updatePlayer(delta, _this2.collider);
        _this2.artworkHandler.update(_this2.player.position);
      };
    }
  }, {
    key: '_initLoaders',
    value: function _initLoaders() {
      var _this3 = this;

      // load the scene

      this.roomLoader = new _loader.RoomLoader(this.scene, this.collider, this.isMonday);

      // checks

      this.isLoaded = function () {
        return _this3.roomLoader.isLoaded();
      };
    }
  }, {
    key: '_initProcessing',
    value: function _initProcessing() {
      // post processing

      this.renderPass = new THREE.RenderPass(this.scene, this.camera);
      this.posterPass = new THREE.PosterPass(this.size);
      this.bloomPass = new THREE.UnrealBloomPass(this.size, .75, 1.0, 0.85); // res, strength, radius, threshold
      this.bloomPass.renderToScreen = true;

      // add passes to composer

      this.composer = new THREE.EffectComposer(this.renderer);
      this.composer.setSize(this.width, this.height);
      this.composer.addPass(this.renderPass);
      this.composer.addPass(this.posterPass);
      this.composer.addPass(this.bloomPass);
    }
  }]);

  return Scene;
}();

exports.default = Scene;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);

__webpack_require__(16);

__webpack_require__(17);

__webpack_require__(18);

/***/ }),
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
  @author meatbags / https://github.com/meatbags
  **/

THREE.PosterShader = {
  uniforms: {
    'tDiffuse': { value: null }
  },
  vertexShader: '\n    varying vec2 vUv;\n\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n  ',
  fragmentShader: '\n    #define PI 3.14159\n    #define UV_SCALE 0.02\n    #define MAX_HEIGHT 0.5\n\n    varying vec2 vUv;\n    uniform sampler2D tDiffuse;\n\n    float posterise(float val, float amount) {\n      return floor(val * amount) / amount;\n    }\n\n    float posteriseCeil(float val, float amount) {\n      return ceil(val * amount) / amount;\n    }\n\n    void main() {\n      vec4 frag = texture2D(tDiffuse, vUv);\n      frag.r = posterise(frag.r, 12.0);\n\n      gl_FragColor = frag;\n    }\n  '
};

// render pass
THREE.PosterPass = function (size) {
  THREE.Pass.call(this);

  this.size = size;
  this.shader = THREE.PosterShader;
  this.material = new THREE.ShaderMaterial(this.shader);
  this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new THREE.Scene();
  this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.material);
  this.quad.frustumCulled = false;
  this.scene.add(this.quad);
  this.time = 0;
};

THREE.PosterPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
  constructor: THREE.PosterPass,
  render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {
    this.shader.uniforms['tDiffuse'].value = readBuffer.texture;

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _maths = __webpack_require__(1);

var _ray_tracer = __webpack_require__(30);

var _ray_tracer2 = _interopRequireDefault(_ray_tracer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Collider$Player) {
  _inherits(Player, _Collider$Player);

  function Player(domElement) {
    _classCallCheck(this, Player);

    // create raytracer

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, domElement));

    _this.mobileWalkDistance = 11;
    _this.rayTracer = new _ray_tracer2.default(domElement, _this.camera);
    _this.rayTracer.setFar(_this.mobileWalkDistance);

    // player props

    _this._override();
    return _this;
  }

  _createClass(Player, [{
    key: '_override',
    value: function _override() {
      var _this2 = this;

      // override inheritance

      this.config.height = _config.Globals.player.height;
      this.camera.far = 500000;
      this.camera.updateProjectionMatrix();
      this.position.z = this.target.position.z = -40;
      this.position.x = this.target.position.x = -15.5;
      this.rotation.yaw = this.target.rotation.yaw = Math.PI / 10;
      this.rotation.pitch = this.target.rotation.pitch = Math.PI / 12;
      this.config.adjust = {
        verySlow: 0.01,
        slow: 0.018,
        normal: 0.035,
        fast: 0.06,
        rapid: 0.09,
        veryFast: 0.18
      };
      this.moveAdjust = this.config.adjust.veryFast;
      this.moveAdjustTarget = this.moveAdjust;
      this.rotateAdjust = this.config.adjust.fast;
      this.rotateAdjustTarget = this.rotateAdjust;

      // override move function

      this.move = function () {
        // move

        _this2.moveAdjust += (_this2.moveAdjustTarget - _this2.moveAdjust) * _this2.config.adjust.verySlow;
        _this2.position.x += (_this2.target.position.x - _this2.position.x) * _this2.moveAdjust;
        _this2.position.y += (_this2.target.position.y - _this2.position.y) * _this2.moveAdjust;
        _this2.position.z += (_this2.target.position.z - _this2.position.z) * _this2.moveAdjust;

        // look

        _this2.rotateAdjust += (_this2.rotateAdjustTarget - _this2.rotateAdjust) * _this2.config.adjust.slow;
        _this2.rotation.yaw += (0, _maths.minAngleDifference)(_this2.rotation.yaw, _this2.target.rotation.yaw) * _this2.rotateAdjust;
        _this2.offset.rotation.yaw += (_this2.target.offset.rotation.yaw - _this2.offset.rotation.yaw) * _this2.config.adjust.normal;
        _this2.rotation.yaw += _this2.rotation.yaw < 0 ? _maths.twoPi : _this2.rotation.yaw > _maths.twoPi ? -_maths.twoPi : 0;

        _this2.rotation.pitch += (_this2.target.rotation.pitch - _this2.rotation.pitch) * _this2.rotateAdjust;
        _this2.offset.rotation.pitch += (_this2.target.offset.rotation.pitch - _this2.offset.rotation.pitch) * _this2.config.adjust.normal;
        _this2.rotation.roll += (_this2.target.rotation.roll - _this2.rotation.roll) * _this2.rotateAdjust;

        // set camera

        var pitch = _this2.rotation.pitch + _this2.offset.rotation.pitch;
        var yaw = _this2.rotation.yaw + _this2.offset.rotation.yaw;
        var height = _this2.position.y + _this2.config.height;
        var offxz = 1 - Math.abs(Math.sin(pitch));
        var offy = 1;

        // fix camera roll

        _this2.camera.up.z = -Math.sin(_this2.rotation.yaw) * _this2.rotation.roll;
        _this2.camera.up.x = Math.cos(_this2.rotation.yaw) * _this2.rotation.roll;

        // set position, camera target

        _this2.camera.position.set(_this2.position.x - Math.sin(yaw) * offxz / 4, height - Math.sin(pitch) * offy / 4, _this2.position.z - Math.cos(yaw) * offxz / 4);
        _this2.camera.lookAt(new THREE.Vector3(_this2.position.x + Math.sin(yaw) * offxz, height + Math.sin(pitch) * offy, _this2.position.z + Math.cos(yaw) * offxz));

        // set world object

        _this2.object.position.set(_this2.position.x, _this2.position.y, _this2.position.z);
      };
    }
  }, {
    key: 'mobileMove',
    value: function mobileMove(collider) {
      // check for collisions, else move

      this.rayTracer.setTargets(collider.getMeshes());
      var res = this.rayTracer.intersectObjects();

      if (res.length == 0) {
        // move forward on tap

        this.target.position.x = this.position.x + Math.sin(this.rotation.yaw) * this.mobileWalkDistance;
        this.target.position.z = this.position.z + Math.cos(this.rotation.yaw) * this.mobileWalkDistance;

        // reset position adjust factor

        this.moveAdjust = 0.02;
        this.rotateAdjust = 0.02;
      } else {
        // move as close to wall as possible

        var dist = res[0].distance < 0.5 ? 0 : res[0].distance;
        this.target.position.x = this.position.x + Math.sin(this.rotation.yaw) * dist;
        this.target.position.z = this.position.z + Math.cos(this.rotation.yaw) * dist;

        // reset position adjust factor

        this.moveAdjust = 0.02;
        this.rotateAdjust = 0.02;
      }
    }
  }, {
    key: 'setEyeTarget',
    value: function setEyeTarget(target) {
      // move to view position

      if (!(this.target.position.x == target.position.x && this.target.position.z == target.position.z)) {
        // set target position, rotation

        this.target.position.x = target.position.x;
        this.target.position.z = target.position.z;
        this.target.rotation.pitch = target.pitch;
        this.target.rotation.yaw = target.yaw;

        // reset position adjust factor

        this.moveAdjust = 0;
        this.rotateAdjust = 0;
      }
    }
  }, {
    key: 'updatePlayer',
    value: function updatePlayer(delta, collider) {
      // update collider player

      this.update(delta, collider);
    }
  }]);

  return Player;
}(Collider.Player);

exports.default = Player;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maths = __webpack_require__(1);

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
  player: {
    height: 3,
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
  artworkPlacement: {
    // main hall
    '0': { scale: 3, pitch: 0, yaw: 0, position: (0, _maths.v3)(23.75, 4, 38.75), eye: (0, _maths.v3)(23.75, 0.5, 35) },
    '1': { scale: 4, pitch: 0, yaw: 0, position: (0, _maths.v3)(33.25, 4, 38.75), eye: (0, _maths.v3)(33.25, 0.5, 35) },
    '12': { scale: 3, pitch: 0, yaw: 0, position: (0, _maths.v3)(23.75, 3.5, 19.75), eye: (0, _maths.v3)(23.75, 0.5, 24) },
    '13': { scale: 2, pitch: 0, yaw: 0, position: (0, _maths.v3)(33.25, 3.5, 19.75), eye: (0, _maths.v3)(33.25, 0.5, 24) },
    // entrance
    '2': { scale: 3, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(9.1, 3.25, 4.75), eye: (0, _maths.v3)(5.5, 0, 4.75) },
    '3': { scale: 3, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(9.1, 3.25, 15), eye: (0, _maths.v3)(5.5, 0, 15) },
    '4': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(-9.1, 3.5, 4.75), eye: (0, _maths.v3)(-5.5, 0, 4.75) },
    '5': { scale: 2.5, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(-9.1, 3.5, 15), eye: (0, _maths.v3)(-5.5, 0, 15) },
    '6': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(-9.1, 3.5, 24.75), eye: (0, _maths.v3)(-5.5, 0.5, 24.75) },
    // top floor
    '7': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(-9.1, 11, 24.75), eye: (0, _maths.v3)(-5.5, 8, 24.75) },
    '8': { scale: 3, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(9.1, 11, 5), eye: (0, _maths.v3)(5.5, 8, 5) },
    '9': { scale: 2.5, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(9.1, 11, 15), eye: (0, _maths.v3)(5.5, 8, 15) },
    '10': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(-9.1, 11, 5), eye: (0, _maths.v3)(-5.5, 8, 5) },
    '11': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _maths.v3)(-9.1, 11, 15), eye: (0, _maths.v3)(-5.5, 8, 15) }
  }
};

exports.default = Globals;

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

var twoPi = Math.PI * 2;

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
var Materials = {
  concrete: new THREE.MeshPhysicalMaterial({
    clearCoat: 0,
    clearCoatRoughness: 1,
    reflectivity: 0,
    color: 0xffffff,
    emissive: 0x888888
  }),
  canvas: new THREE.MeshBasicMaterial({
    color: 0x444444,
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtworkHandler = undefined;

var _artwork_handler = __webpack_require__(25);

var _artwork_handler2 = _interopRequireDefault(_artwork_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ArtworkHandler = _artwork_handler2.default;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _artwork = __webpack_require__(26);

var _artwork2 = _interopRequireDefault(_artwork);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArtworkHandler = function () {
  function ArtworkHandler(root) {
    var _this = this;

    _classCallCheck(this, ArtworkHandler);

    // artwork handler

    this.object = new THREE.Object3D();

    // generate artworks

    this.artworks = [];

    $('.im').each(function (i, e) {
      _this.artworks.push(new _artwork2.default(_this.object, $(e), _config.Globals.artworkPlacement[i]));
    });

    // add to scene

    this.root = root;
    this.root.add(this.object);
  }

  _createClass(ArtworkHandler, [{
    key: 'getCollisionBoxes',
    value: function getCollisionBoxes() {
      // get artwork boxes

      return this.artworks.map(function (obj) {
        return obj.getBox();
      });
    }
  }, {
    key: 'parseCollisions',
    value: function parseCollisions(res) {
      // handle collision data

      if (res.length) {
        this.hoverOver(res[0].object.uuid);
        $('.canvas-target').addClass('clickable');
      } else {
        this.deactivate();
        $('.canvas-target').removeClass('clickable');
      }
    }
  }, {
    key: 'getEyeTarget',
    value: function getEyeTarget(id) {
      // get eye target for player

      for (var i = this.artworks.length - 1; i > -1; i--) {
        if (this.artworks[i].boxHasId(id)) {
          return this.artworks[i].getEyeTarget();
        }
      }

      return null;
    }
  }, {
    key: 'hoverOver',
    value: function hoverOver(id) {
      // activate artwork with id

      for (var i = this.artworks.length - 1; i > -1; i--) {
        if (this.artworks[i].boxHasId(id)) {
          this.artworks[i].activate();
          this.artworks[i].activateText();
        } else {
          this.artworks[i].deactivate();
        }
      }
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      // deactivate all

      for (var i = this.artworks.length - 1; i > -1; i--) {
        this.artworks[i].deactivate();
      }
    }
  }, {
    key: 'update',
    value: function update(playerPosition) {
      // update artwork animations

      for (var i = this.artworks.length - 1; i > -1; i--) {
        this.artworks[i].update(playerPosition);
      }
    }
  }]);

  return ArtworkHandler;
}();

exports.default = ArtworkHandler;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _maths = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Artwork = function () {
  function Artwork(root, element, ops) {
    _classCallCheck(this, Artwork);

    // artwork

    this.root = root;
    this.element = element;
    this.object = new THREE.Object3D();
    this.active = false;
    this.opacity = 0.4;
    this.scale = ops.scale;
    this.pitch = ops.pitch;
    this.yaw = ops.yaw;
    this.position = ops.position;

    // eye target

    this.eyeTarget = {
      position: ops.eye,
      pitch: (0, _maths.getPitch)(ops.eye, new THREE.Vector3(this.position.x, this.position.y - _config.Globals.player.height, this.position.z)),
      yaw: (0, _maths.getYaw)(ops.eye, this.position)
    };

    // build object

    this.build();

    // add to doc

    this.root.add(this.object);
  }

  _createClass(Artwork, [{
    key: 'getEyeTarget',
    value: function getEyeTarget() {
      // get viewing target

      return this.eyeTarget;
    }
  }, {
    key: 'build',
    value: function build() {
      var _this = this;

      // pull data from doc element

      this.title = this.element.find('.im__title').html();
      this.desc = this.element.find('.im__description').html();
      this.url = this.element.find('.im__url').html();
      this.image = this.element.find('.im__image').html();
      this.alpha = this.element.find('.im__alpha').html();

      // generate html tag

      this.spiel = '\n      <div class="label-title">\n        ' + this.title + '\n      </div>\n      <div class="label-desc">\n        ' + this.desc + '\n      </div>\n      <div class="label-link">\n        <a href=\'' + this.url + '\' target=\'_blank\'>Order print.</a>\n      </div>';

      // collision box

      this.box = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
        color: 0xffffff,
        visible: false,
        transparent: true,
        opacity: 0.1
      }));
      this.resizeBox = function () {
        // set collision box dimensions

        _this.box.position.set(_this.position.x, _this.position.y, _this.position.z);

        var sx = _this.yaw == 0 ? _this.mesh.scale.x : _this.mesh.scale.x / 2;
        var sz = _this.yaw == 0 ? _this.mesh.scale.x / 2 : _this.mesh.scale.x;
        _this.box.scale.set(sx, _this.mesh.scale.y, sz);
      };
      this.boxHasId = function (id) {
        return id === _this.box.uuid;
      };
      this.getBox = function () {
        return _this.box;
      };
      this.object.add(this.box);

      // create 3D object

      this.textureLoader = new THREE.TextureLoader();
      this.mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 2, 2), _config.Materials.canvas.clone());
      var map = this.textureLoader.load(this.image, function (tex) {
        // set scale and append to scene

        _this.mesh.scale.x = map.image.naturalWidth / 1000. * _this.scale;
        _this.mesh.scale.y = map.image.naturalHeight / 1000. * _this.scale;

        // resize box

        _this.resizeBox();
      });
      var alphaMap = this.textureLoader.load(this.alpha, function (tex) {
        // add alpha map

        _this.mesh.material.transparent = true;
      });
      this.mesh.material.map = map;
      this.mesh.material.alphaMap = alphaMap;

      // rotate to spec, add to scene

      this.mesh.rotation.set(this.pitch, this.yaw, 0);
      this.mesh.position.set(this.position.x, this.position.y, this.position.z);
      this.object.add(this.mesh);
    }
  }, {
    key: 'activate',
    value: function activate() {
      // turn on

      if (!this.active) {
        this.active = true;
      }
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      // turn off

      if (this.active) {
        this.active = false;
      }
    }
  }, {
    key: 'activateText',
    value: function activateText() {
      // set text to doc

      this.textActive = true;
      $('.label__inner').html(this.spiel);
    }
  }, {
    key: 'update',
    value: function update(playerPosition) {
      // update

      if (playerPosition.distanceTo(this.position) < 10) {
        this.activate();
      }

      // animate brightness

      if (this.active) {
        if (this.opacity < 1) {
          this.opacity += (1 - this.opacity) * 0.05;
          this.mesh.material.color.setScalar(this.opacity);
        }
      } else {
        if (this.opacity > 0.25) {
          this.opacity += (0.25 - this.opacity) * 0.05;
          this.mesh.material.color.setScalar(this.opacity);
        }
      }
    }
  }]);

  return Artwork;
}();

exports.default = Artwork;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightHandler = exports.RoomLoader = exports.LoadOBJ = undefined;

var _load_obj = __webpack_require__(2);

var _load_obj2 = _interopRequireDefault(_load_obj);

var _room_loader = __webpack_require__(28);

var _room_loader2 = _interopRequireDefault(_room_loader);

var _light_handler = __webpack_require__(29);

var _light_handler2 = _interopRequireDefault(_light_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.LoadOBJ = _load_obj2.default;
exports.RoomLoader = _room_loader2.default;
exports.LightHandler = _light_handler2.default;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _load_obj = __webpack_require__(2);

var _load_obj2 = _interopRequireDefault(_load_obj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoomLoader = function () {
    function RoomLoader(scene, collider, isMonday) {
        _classCallCheck(this, RoomLoader);

        // load room from file

        this.scene = scene;
        this.collider = collider;
        this.isMonday = isMonday;
        this.toLoad = 0;
        this.loader = new _load_obj2.default(appRoot + 'assets/3d/');
        this._load();
    }

    _createClass(RoomLoader, [{
        key: '_load',
        value: function _load() {
            var _this = this;

            // load room and collision map

            var mapSource = 'hangar_extended'; //(this.isMonday) ? 'hangar_monday' : 'hangar_extended';
            var collisionSource = 'hangar_extended_collision'; //(this.isMonday) ? 'hangar_collision_map_monday' : 'hangar_collision_map';

            // flag

            this.toLoad = 2;
            this.isLoaded = function () {
                return _this.toLoad <= 0;
            };

            // load collisions

            this.loader.loadOBJ(collisionSource).then(function (map) {
                map.children.forEach(function (child) {
                    _this.collider.add(new Collider.Mesh(child));
                });
                _this.toLoad -= 1;
            }, function (err) {
                console.warn('Collider load', err);
            });

            // load map

            this.loader.loadOBJ(mapSource).then(function (map) {
                _this.scene.add(map);
                _this.toLoad -= 1;
            }, function (err) {
                console.warn('Model load', err);
            });
        }
    }]);

    return RoomLoader;
}();

exports.default = RoomLoader;

/***/ }),
/* 29 */
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

    // load scene lighting

    this.scene = scene;
    this.player = player;
  }

  _createClass(LightHandler, [{
    key: "load",
    value: function load(isMonday) {
      // load lighting

      if (!isMonday) {
        // load gallery open lights

        this.lights = {
          //ambient: new THREE.AmbientLight(0xffffff, 0.1),
          hemisphere: new THREE.HemisphereLight(0xffbbcc, 0x0f0f40, 0.09),
          point1: new THREE.PointLight(0xaaaaff, 0.5, 13, 1),
          point2: new THREE.PointLight(0xaaaaff, 0.4, 7, 1),
          ball1: new THREE.PointLight(0xaaaaff, 0.7, 9, 1),
          ball2: new THREE.PointLight(0xaaaaff, 0.7, 9, 1),
          ball3: new THREE.PointLight(0xaaaaff, 0.9, 16, 1),
          billboard: new THREE.PointLight(0xffffff, 0.2, 25, 1),
          neonSign: new THREE.PointLight(0xff0000, 0.9, 20, 1)
        };
        this.lights.point1.position.set(0, 5, -10);
        this.lights.point2.position.set(-0.25, 11.75, 37);
        this.lights.ball1.position.set(19.75, 0.9, 28);
        this.lights.ball2.position.set(26, 0.9, 32.5);
        this.lights.ball3.position.set(37.25, 1.567, 30.75);
        this.lights.billboard.position.set(-30.5, 23, 42);
        this.lights.neonSign.position.set(0, 14, -32);

        // add player object/ light

        this.scene.add(this.player.object);

        // add lights

        for (var prop in this.lights) {
          if (this.lights.hasOwnProperty(prop)) {
            this.scene.add(this.lights[prop]);
          }
        }
      } else {
        // load gallery closed lights

        var ambient = new THREE.AmbientLight(0xffffff, .08);
        var hemisphere = new THREE.HemisphereLight(0xffaabb, 0x080820, 0.1);

        this.scene.add(ambient, hemisphere, this.player.object);
      }
    }
  }]);

  return LightHandler;
}();

exports.default = LightHandler;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RayTracer = function () {
  function RayTracer(domElement, camera) {
    _classCallCheck(this, RayTracer);

    // ray tracing functions

    this.domElement = domElement;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 25; // metre range
    this.mouse = new THREE.Vector2(0, 0);
    this.rect = this.domElement.getBoundingClientRect();
    this.objects = [];
  }

  _createClass(RayTracer, [{
    key: "setFar",
    value: function setFar(far) {
      this.raycaster.far = far;
    }
  }, {
    key: "setTargets",
    value: function setTargets(objects) {
      // set target objects

      this.objects = objects;
    }
  }, {
    key: "setEvents",
    value: function setEvents(onHover, onClick) {
      // set desktop & mobile events

      this.onHover = onHover;
      this.onClick = onClick;
      this.onTouchMove = onHover;
      this.onTap = onClick;
    }
  }, {
    key: "setMouse",
    value: function setMouse(x, y) {
      // convert mouse to [-1, 1]

      this.rect = this.domElement.getBoundingClientRect();
      this.mouse.x = (x - this.rect.left) / this.rect.width * 2 - 1;
      this.mouse.y = -((y - this.rect.top) / this.rect.height * 2 - 1);
    }
  }, {
    key: "handleMove",
    value: function handleMove(x, y) {
      // on mouse move

      this.setMouse(x, y);
      this.hover();
    }
  }, {
    key: "handleClick",
    value: function handleClick(x, y) {
      // on mouse click

      this.setMouse(x, y);
      this.click();
    }
  }, {
    key: "intersectObjects",
    value: function intersectObjects() {
      // raytrace and check objects

      this.raycaster.setFromCamera(this.mouse, this.camera);
      var res = this.raycaster.intersectObjects(this.objects);

      return res;
    }
  }, {
    key: "click",
    value: function click() {
      // raytrace, perform click

      this.onClick(this.intersectObjects());
    }
  }, {
    key: "hover",
    value: function hover() {
      // raytrace, perform actions

      this.onHover(this.intersectObjects());
    }
  }]);

  return RayTracer;
}();

exports.default = RayTracer;

/***/ })
/******/ ]);