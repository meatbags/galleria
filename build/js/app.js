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

var _Maths = __webpack_require__(1);

var halfPI = Math.PI / 2;

var Globals = {
  type: {
    TYPE_ARTWORK: 'TYPE_ARTWORK',
    TYPE_COLLISION: 'TYPE_COLLISION'
  },
  player: {
    position: {
      x: 0,
      y: 0,
      z: -40
    },
    height: 1.8,
    speed: 8,
    rotationSpeed: Math.PI * 0.75
  },
  raytracer: {
    precision: .75,
    length: 12.5
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
    clickBoxScale: 1.1
  },
  artworkPlacement: {
    '0': { scale: 6, pitch: 0, yaw: halfPI, position: (0, _Maths.v3)(8.5, 6, -10), eye: (0, _Maths.v3)(0, 0, -10) },
    '1': { scale: 4, pitch: 0, yaw: halfPI, position: (0, _Maths.v3)(-8.5, 4, -15), eye: (0, _Maths.v3)(0, 0, -15) },
    '2': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _Maths.v3)(8.5, 3, 5), eye: (0, _Maths.v3)(4, 0, 5) },
    '3': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _Maths.v3)(8.5, 3, 15), eye: (0, _Maths.v3)(4, 0, 15) },
    '4': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _Maths.v3)(-8.5, 3, 5), eye: (0, _Maths.v3)(-4, 0, 5) },
    '5': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _Maths.v3)(-8.5, 3, 15), eye: (0, _Maths.v3)(-4, 0, 15) },
    '6': { scale: 2, pitch: 0, yaw: 0, position: (0, _Maths.v3)(0, 3, 10), eye: (0, _Maths.v3)(0, 0, 5) },
    '7': { scale: 2, pitch: 0, yaw: 0, position: (0, _Maths.v3)(0, 3, 11), eye: (0, _Maths.v3)(0, 0, 15) },
    '8': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _Maths.v3)(8.5, 11, 5), eye: (0, _Maths.v3)(4, 8, 5) },
    '9': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _Maths.v3)(8.5, 11, 15), eye: (0, _Maths.v3)(4, 8, 15) },
    '10': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _Maths.v3)(-8.5, 11, 5), eye: (0, _Maths.v3)(-4, 8, 5) },
    '11': { scale: 2, pitch: 0, yaw: halfPI, position: (0, _Maths.v3)(-8.5, 11, 15), eye: (0, _Maths.v3)(-4, 8, 15) },
    '12': { scale: 2, pitch: 0, yaw: 0, position: (0, _Maths.v3)(0, 11, 10), eye: (0, _Maths.v3)(0, 8, 5) },
    '13': { scale: 2, pitch: 0, yaw: 0, position: (0, _Maths.v3)(0, 11, 11), eye: (0, _Maths.v3)(0, 8, 15) }
  }
};

exports.default = Globals;

/***/ }),
/* 1 */
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
/* 2 */
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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Timer = __webpack_require__(5);

var _Timer2 = _interopRequireDefault(_Timer);

var _Scene = __webpack_require__(6);

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author meatbags / https://github.com/meatbags
*/

var App = {
	init: function init() {
		App.fadeOut('.pre-loading');
		App.timer = new _Timer2.default();
		App.scene = new _Scene2.default();
		App.loading();
	},

	loading: function loading() {
		App.timer.update();

		if (!App.scene.isLoaded()) {
			requestAnimationFrame(App.loading);
		} else {
			App.fadeOut('.loading');
			App.loop();
		}
	},

	fadeOut: function fadeOut(selector) {
		$(selector).addClass('hidden');
		setTimeout(function () {
			$(selector).remove();
		}, 750);
	},

	loop: function loop() {
		requestAnimationFrame(App.loop);
		App.timer.update();
		App.scene.update(App.timer.getDelta());
		App.scene.render();
	}
};

window.onload = App.init;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Timer = function Timer() {
	this.maxDelta = 1 / 30.;
	this.reset();
};

Timer.prototype = {
	update: function update() {
		this.then = this.now;
		this.now = new Date().getTime();
		this.delta = (this.now - this.then) / 1000.;
	},

	getDelta: function getDelta() {
		return this.delta > this.maxDelta ? this.maxDelta : this.delta;
	},

	reset: function reset() {
		this.now = new Date().getTime();
		this.then = this.now;
	}
};

exports.default = Timer;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Player = __webpack_require__(7);

var _Player2 = _interopRequireDefault(_Player);

var _Artworks = __webpack_require__(9);

var _Artworks2 = _interopRequireDefault(_Artworks);

var _Loader = __webpack_require__(11);

var _Loader2 = _interopRequireDefault(_Loader);

var _Maths = __webpack_require__(1);

var _Globals = __webpack_require__(0);

var _Globals2 = _interopRequireDefault(_Globals);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scene = function Scene() {
  this.init();
};

Scene.prototype = {
  init: function init() {
    var self = this;

    // threejs
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize(640, 480);
    this.renderer.setClearColor(0xf9e5a2, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.append(this.renderer.domElement);

    // player & scene
    this.player = new _Player2.default(this.renderer.domElement);
    this.camera = this.player.camera;

    // scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xCCCFFF, 0.008);

    // collision map
    this.collider = new Collider.System();
    this.loader = new _Loader2.default(appRoot + 'assets/3d/');
    this.toLoad = 2;
    this.loader.loadOBJ('hangar_collision_map').then(function (map) {
      for (var i = 0; i < map.children.length; i += 1) {
        self.collider.add(new Collider.Mesh(map.children[i].geometry));
      }
      self.toLoad -= 1;
    }, function (err) {
      console.log(err);
    });

    // models
    this.loader.loadOBJ('hangar').then(function (map) {
      self.scene.add(map);
      self.toLoad -= 1;
    }, function (err) {
      console.log(err);
    });

    // resize
    this.resize();
    window.addEventListener('resize', function () {
      self.resize();
    });

    // load gallery
    var tags = document.getElementsByClassName('im');
    this.artworks = new _Artworks2.default();

    for (var i = 0; i < tags.length; i += 1) {
      var im = tags[i];
      var title = '';
      var description = '';
      var url = '';
      var image = '';

      for (var j = 0; j < im.childNodes.length; j += 1) {
        var node = im.childNodes[j];

        switch (node.className) {
          case 'im__title':
            title = node.textContent;
            break;
          case 'im__description':
            description = node.textContent;
            break;
          case 'im__url':
            url = node.textContent;
            break;
          case 'im__image':
            image = node.textContent;
            break;
          default:
            break;
        }
      }
      this.artworks.add(title, description, url, image);
    }

    this.artworks.placeImages();
    this.scene.add(this.artworks.object);

    // lighting
    var ambient = new THREE.AmbientLight(0xffffff, .08);
    var hemisphere = new THREE.HemisphereLight(0xffaabb, 0x080820, 0.1);
    var point1 = new THREE.PointLight(0xffffff, 0.5, 13, 1);
    var point2 = new THREE.PointLight(0xfeff87, 0.5, 12, 1);
    this.neonSign = new THREE.PointLight(0xff0000, 0.8, 15, 1);

    point1.position.set(0, 5, -10);
    point2.position.set(-19, 8, 5);
    this.neonSign.position.set(0, 14, -32);

    this.scene.add(ambient, point1, point2, hemisphere, this.neonSign, this.player.object, this.player.raytracer.object);

    // skybox
    var sky = new THREE.Sky();
    this.scene.add(sky.mesh);
  },

  isLoaded: function isLoaded() {
    return this.toLoad === 0;
  },

  resize: function resize() {
    var width = window.innerWidth;
    var height = 540; //Math.min(520, window.innerHeight * 0.75);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  update: function update(delta) {
    this.player.update(delta, this.collider, this.artworks);
  },

  render: function render() {
    this.renderer.render(this.scene, this.camera);
  }
};

exports.default = Scene;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VectorMaths = __webpack_require__(2);

var Maths = _interopRequireWildcard(_VectorMaths);

var _Globals = __webpack_require__(0);

var _Globals2 = _interopRequireDefault(_Globals);

var _RayTracer = __webpack_require__(8);

var _RayTracer2 = _interopRequireDefault(_RayTracer);

var _HUD = __webpack_require__(13);

var _HUD2 = _interopRequireDefault(_HUD);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Player = function Player(domElement) {
  this.domElement = domElement;
  this.hud = new _HUD2.default();
  this.object = new THREE.Object3D();
  this.position = new THREE.Vector3(_Globals2.default.player.position.x, _Globals2.default.player.position.y, _Globals2.default.player.position.z);
  this.movement = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(0, 0, 0);
  this.mouse = {
    x: 0,
    y: 0,
    region: {
      left: -0.5,
      right: 0.5
    }
  };
  this.offset = {
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.target = {
    position: new THREE.Vector3(this.position.x, this.position.y, this.position.z),
    movement: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(0, 0, 0),
    offset: {
      rotation: new THREE.Vector3(0, 0, 0)
    }
  };
  this.autoMove = {
    active: false,
    position: new THREE.Vector3(),
    rotation: new THREE.Vector3(),
    threshold: 1
  };
  this.attributes = {
    speed: _Globals2.default.player.speed,
    speedWhileJumping: _Globals2.default.player.speed / 2,
    height: _Globals2.default.player.height,
    rotation: _Globals2.default.player.rotationSpeed,
    camera: {
      fov: _Globals2.default.camera.fov,
      near: _Globals2.default.camera.near,
      far: _Globals2.default.camera.far
    },
    cameraThreshold: 0.4,
    maxRotationOffset: Math.PI * 0.3,
    maxRotationOffsetLower: Math.PI * 0.2,
    falling: false,
    adjust: {
      slow: 0.025,
      normal: 0.05,
      fast: 0.09,
      veryFast: 0.2
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
  this.outputLog = [];
  this.camera = new THREE.PerspectiveCamera(this.attributes.camera.fov, 1, this.attributes.camera.near, this.attributes.camera.far);
  this.camera.up = new THREE.Vector3(0, 1, 0);
  this.raytracer = new _RayTracer2.default();
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

    // mouse
    self.domElement.addEventListener('mousemove', function (e) {
      self.handleMouseMove(e);
    }, false);
    self.domElement.addEventListener('mousedown', function (e) {
      self.handleMouseDown(e);
    }, false);
    self.domElement.addEventListener('mouseout', function (e) {
      self.handleMouseOut(e);
    }, false);

    // keyboard
    self.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      jump: false,
      click: false
    };
    document.addEventListener("keydown", function (e) {
      self.handleKeyDown(e);
    }, false);
    document.addEventListener("keyup", function (e) {
      self.handleKeyUp(e);
    }, false);
  },

  log: function log() {
    var text = '';
    for (var i = 0; i < arguments.length; i += 1) {
      text += arguments[i] + ' ';
    }
    this.outputLog.push(text);
  },

  update: function update(delta, collider, artworks) {
    // handle key presses and move player

    this.outputLog = [];

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

    // raytracer
    var ray = this.raytracer.getRayVector(this.camera, this.mouse.x, this.mouse.y);
    var collision = this.raytracer.trace(this.camera.position, ray, _Globals2.default.raytracer.length, collider, artworks);
  },

  processCollisions: function processCollisions(next, collider) {
    // handle collision cases

    var collisions = collider.collisions(next);

    if (collisions.length > 0) {
      this.log('Collisions', collisions.length);

      // check for floor

      for (var i = 0; i < collisions.length; i += 1) {
        var ceiling = collisions[i].ceilingPlane(next);

        if (ceiling.y != null && ceiling.plane.normal.y >= this.attributes.climb.minYNormal && ceiling.y - this.target.position.y <= this.attributes.climb.up) {
          // ground
          this.movement.y = 0;

          // ascend
          if (ceiling.y >= next.y) {
            next.y = ceiling.y;
            this.log('CLIMBED');
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
      if (this.mouse.x >= this.mouse.region.left && this.mouse.x <= this.mouse.region.right) {
        this.autoMove.active = true;

        if (this.raytracer.lastCollision.type === _Globals2.default.type.TYPE_COLLISION) {
          var ray = this.raytracer.lastCollision;
          var yaw = Math.atan2(ray.vector.x, ray.vector.z);
          //const pitch = ray.vector.y;

          this.autoMove.position.x = ray.position.x;
          this.autoMove.position.z = ray.position.z;
          this.autoMove.rotation.x = 0; //pitch;
          this.autoMove.rotation.y = yaw;
        } else {
          var artwork = this.raytracer.lastCollision.artwork;
          // move to artwork
          artworks.activate(artwork.id);
          this.autoMove.position.x = artwork.eye.x;
          this.autoMove.position.z = artwork.eye.z;
          this.autoMove.rotation.x = artwork.pitch;
          this.autoMove.rotation.y = artwork.yaw;
        }
      } else {
        this.autoMove.active = false;

        if (this.mouse.x < this.mouse.region.left) {
          this.hud.clickLeft();
        } else if (this.mouse.x > this.mouse.region.right) {
          this.hud.clickRight();
        }
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
    } else {
      this.target.movement.x = 0;
      this.target.movement.z = 0;
    }

    // move and look automatically
    if (this.autoMove.active) {
      this.target.rotation.x = this.autoMove.rotation.x;
      this.target.rotation.y = this.autoMove.rotation.y;
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
    if (!this.falling && !this.autoMove.active) {
      this.movement.x = this.target.movement.x;
      this.movement.z = this.target.movement.z;
    } else {
      this.movement.x += (this.target.movement.x - this.movement.x) * this.attributes.adjust.slow;
      this.movement.z += (this.target.movement.z - this.movement.z) * this.attributes.adjust.slow;
    }
  },

  setPosition: function setPosition() {
    // move and rotate player

    // smooth motion
    this.position.x += (this.target.position.x - this.position.x) * this.attributes.adjust.veryFast;
    this.position.y += (this.target.position.y - this.position.y) * this.attributes.adjust.veryFast;
    this.position.z += (this.target.position.z - this.position.z) * this.attributes.adjust.veryFast;

    // rotate
    var factor = this.autoMove.active ? this.attributes.adjust.slow : this.attributes.adjust.fast;

    this.rotation.y += Maths.minAngleDifference(this.rotation.y, this.target.rotation.y) * factor;
    this.rotation.x += Maths.minAngleDifference(this.rotation.x, this.target.rotation.x) * this.attributes.adjust.slow;
    this.offset.rotation.y += (this.target.offset.rotation.y - this.offset.rotation.y) * this.attributes.adjust.normal;
    this.offset.rotation.x += (this.target.offset.rotation.x - this.offset.rotation.x) * this.attributes.adjust.slow;

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
  handleMouseDown: function handleMouseDown(e) {
    this.keys.click = true;

    var bound = this.domElement.getBoundingClientRect();
    var w = this.domElement.width;
    var x = (e.clientX - bound.left) / w;
    var t = this.attributes.cameraThreshold;

    // adjust camera
    if (x < t) {
      this.target.rotation.y = this.rotation.y + (t - x) / t * this.attributes.maxRotationOffset;
    } else if (x > 1 - t) {
      this.target.rotation.y = this.rotation.y + (x - (1 - t)) / t * -this.attributes.maxRotationOffset;
    } else {
      this.target.rotation.y = this.rotation.y;
    }
  },
  handleMouseMove: function handleMouseMove(e) {
    var bound = this.domElement.getBoundingClientRect();
    var w = this.domElement.width;
    var h = this.domElement.height;
    var x = (e.clientX - bound.left) / w;
    var y = (e.clientY - bound.top) / h;
    var t = this.attributes.cameraThreshold;

    // adjust yaw
    if (x < t) {
      this.target.offset.rotation.y = (t - x) / t * this.attributes.maxRotationOffset;
    } else if (x > 1 - t) {
      this.target.offset.rotation.y = (x - (1 - t)) / t * -this.attributes.maxRotationOffset;
    } else {
      this.target.offset.rotation.y = 0;
    }

    // adjust pitch
    if (y < t) {
      this.target.offset.rotation.x = (t - y) / t * this.attributes.maxRotationOffset;
    } else if (y > 1 - t) {
      this.target.offset.rotation.x = (y - (1 - t)) / t * -this.attributes.maxRotationOffsetLower;
    } else {
      this.target.offset.rotation.x = 0;
    }

    // record mouse
    this.mouse.x = x * 2 - 1;
    this.mouse.y = y * 2 - 1;

    // show HUD
    if (this.mouse.x < this.mouse.region.left) {
      this.hud.hoverLeft();
    } else if (this.mouse.x > this.mouse.region.right) {
      this.hud.hoverRight();
    } else {
      this.hud.clear();
    }
  },
  handleMouseOut: function handleMouseOut(e) {
    if (this.target.offset.rotation.x < 0) {
      this.target.offset.rotation.x = 0;
    }
    //this.target.offset.rotation.x = 0;
    //this.target.offset.rotation.y = 0;
  }
};

exports.default = Player;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Globals = __webpack_require__(0);

var _Globals2 = _interopRequireDefault(_Globals);

var _VectorMaths = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RayTracer = function RayTracer() {
  this.position = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(0, 0, 0);
  this.smoothing = 0.25;
  this.target = {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.lastCollision = null;
  this.precision = _Globals2.default.raytracer.precision;
  this.init();
};

RayTracer.prototype = {
  init: function init() {
    this.object = new THREE.Object3D();
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

  trace: function trace(point, vector, length, collider, artworks) {
    // check ray against artworks and geometry

    var travelled = 0;
    var collision = false;
    var artwork = false;
    var last = new THREE.Vector3();

    vector = (0, _VectorMaths.scaleVector)((0, _VectorMaths.normalise)(vector), this.precision);

    while (collision === false && artwork === false && travelled < length) {
      travelled += this.precision;
      last = (0, _VectorMaths.copyVector)(point);
      point = (0, _VectorMaths.addVector)(point, vector);

      for (var i = 0; i < artworks.focalPoints.length; i += 1) {
        if (artworks.focalPoints[i].collision(point)) {
          artwork = artworks.focalPoints[i];
        }
      }

      if (!artwork) {
        collision = collider.collision(point);

        if (collision) {
          var intersect = collider.intersect(last, point);

          if (intersect != null) {
            point = intersect.intersect;
            this.target.rotation = intersect.plane.normal;
          }
        }
      }
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
        type: _Globals2.default.type.TYPE_ARTWORK,
        position: point,
        artwork: artwork,
        vector: vector
      };
    } else {
      this.lastCollision = {
        type: _Globals2.default.type.TYPE_COLLISION,
        position: point,
        collision: collision,
        vector: vector
      };
    }
  }
};

exports.default = RayTracer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Materials = __webpack_require__(3);

var _Maths = __webpack_require__(1);

var _Focal = __webpack_require__(10);

var _Globals = __webpack_require__(0);

var _Globals2 = _interopRequireDefault(_Globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Artworks = function Artworks() {
  this.sources = [];
  this.focalPoints = [];
  this.object = new THREE.Object3D();
};

Artworks.prototype = {
  add: function add(title, description, url, image) {
    // add an image source

    this.sources.push({
      title: title,
      description: description,
      url: url,
      image: image
    });
  },

  activate: function activate(id) {
    for (var i = 0; i < this.focalPoints.length; i += 1) {
      if (this.focalPoints[i].id === id) {
        this.focalPoints[i].activate();
      } else {
        this.focalPoints[i].deactivate();
      }
    }
  },

  placeImages: function placeImages() {
    var _this = this;

    var self = this;
    var textureLoader = new THREE.TextureLoader();

    var _loop = function _loop(i) {
      var index = i;
      var place = _Globals2.default.artworkPlacement[index];
      var id = 'UID' + i;

      // create collision object
      var focal = new _Focal.Focal(id, place.position, (0, _Maths.v3)(1, 1, 1), place.eye, _this.sources[i]);
      self.focalPoints.push(focal);

      // create artwork mesh
      var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 2, 2), _Materials.Materials.canvas.clone());
      var texture = textureLoader.load(_this.sources[i].image, function () {
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
      self.object.add(focal.object);
    };

    for (var i = 0; i < this.sources.length; i += 1) {
      _loop(i);
    }
  }
};

exports.default = Artworks;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPE_FOCAL = exports.Focal = undefined;

var _Maths = __webpack_require__(1);

var _VectorMaths = __webpack_require__(2);

var _Materials = __webpack_require__(3);

var _Globals = __webpack_require__(0);

var _Globals2 = _interopRequireDefault(_Globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    this.pitch = (0, _Maths.getPitch)(this.eye, new THREE.Vector3(this.position.x, this.position.y - _Globals2.default.player.height, this.position.z));
    this.yaw = (0, _Maths.getYaw)(this.eye, this.position);
    this.object = new THREE.Mesh(new THREE.BoxBufferGeometry(this.dimensions.x, this.dimensions.y, this.dimensions.z), _Materials.Materials.dev2);
    this.object.position.set(this.position.x, this.position.y, this.position.z);
    this.box = new THREE.Box3();
    this.setBox();
  },

  activate: function activate() {
    this.active = true;
    console.log(this.source);
  },

  deactivate: function deactivate() {
    this.active = false;
  },

  setBox: function setBox() {
    // set collision box size
    var min = (0, _VectorMaths.subtractVector)(this.position, (0, _VectorMaths.scaleVector)(this.dimensions, 0.5));
    var max = (0, _VectorMaths.addVector)(this.position, (0, _VectorMaths.scaleVector)(this.dimensions, 0.5));
    this.box.set(min, max);
  },

  collision: function collision(point) {
    return this.box.containsPoint(point);
  },

  scale: function scale(x, y, z) {
    var s = _Globals2.default.artwork.clickBoxScale;
    this.dimensions.x *= x * s;
    this.dimensions.y *= y * s;
    this.dimensions.z *= z * s;
    this.object.scale.x = x * s;
    this.object.scale.y = y * s;
    this.object.scale.z = z * s;
    this.setBox();
  }
};

exports.Focal = Focal;
exports.TYPE_FOCAL = TYPE_FOCAL;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Globals = __webpack_require__(0);

var _Globals2 = _interopRequireDefault(_Globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = function Loader(basePath) {
  this.basePath = basePath;
  this.init();
};

Loader.prototype = {
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

      // load lightmaps
      if (meta.map_ka) {
        var uvs = child.geometry.attributes.uv.array;
        var src = meta.map_ka;
        var tex = new THREE.TextureLoader().load(self.basePath + src);

        child.material.lightMap = tex;
        child.material.lightMapIntensity = _Globals2.default.loader.lightMapIntensity;
        child.geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs, 2));
      }

      child.material.bumpScale = _Globals2.default.loader.bumpScale;

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
    }
  },

  loadOBJ: function loadOBJ(filename) {
    var self = this;

    return new Promise(function (resolve, reject) {
      try {
        self.materialLoader.load(filename + '.mtl', function (materials) {
          materials.preload();
          self.objectLoader.setMaterials(materials);
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

exports.default = Loader;

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var HUD = function HUD() {
  this.elements = {
    left: $('.arrow-left'),
    right: $('.arrow-right')
  };
};

HUD.prototype = {
  clear: function clear() {
    this.removeClass(this.elements.left, 'hover');
    this.removeClass(this.elements.right, 'hover');
  },

  hoverLeft: function hoverLeft() {
    this.addClass(this.elements.left, 'hover');
    this.removeClass(this.elements.right, 'hover');
  },

  hoverRight: function hoverRight() {
    this.addClass(this.elements.right, 'hover');
    this.removeClass(this.elements.left, 'hover');
  },

  clickLeft: function clickLeft() {
    var self = this;
    this.addClass(this.elements.left, 'active');
    setTimeout(function () {
      self.removeClass(self.elements.left, 'active');
    }, 250);
  },

  clickRight: function clickRight() {
    var self = this;
    this.addClass(this.elements.right, 'active');
    setTimeout(function () {
      self.removeClass(self.elements.right, 'active');
    }, 250);
  },

  addClass: function addClass(elem, className) {
    if (!elem.hasClass(className)) {
      elem.addClass(className);
    }
  },

  removeClass: function removeClass(elem, className) {
    if (elem.hasClass(className)) {
      elem.removeClass(className);
    }
  }
};

exports.default = HUD;

/***/ })
/******/ ]);