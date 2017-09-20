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
exports.Materials = exports.Models = undefined;

__webpack_require__(8);

var Materials = {
  concrete: new THREE.MeshPhysicalMaterial({
    clearCoat: 0,
    clearCoatRoughness: 1,
    reflectivity: 0,
    color: 0xffffff,
    emissive: 0x888888
  }),
  canvas: new THREE.MeshPhysicalMaterial({
    clearCoat: 0,
    clearCoatRoughness: 0.5,
    reflectivity: 0.25,
    color: 0xffffff,
    emissive: 0x444444
  }),
  dev: new THREE.MeshLambertMaterial({
    color: 0xff0000,
    opacity: 0.25,
    transparent: true,
    side: THREE.DoubleSide
  }),
  wireframe: new THREE.MeshLambertMaterial({
    color: 0xff0000,
    wireframe: true
  })
};

var Models = {
  mainBuilding: new THREE.Mesh()
};

// load textures and models

var loader = new THREE.OBJLoader();
loader.load(appRoot + './assets/3d/hangar.obj', function (obj) {
  Models.mainBuilding.geometry = obj.children[0].geometry;
  Models.mainBuilding.material = Materials.concrete;

  for (var i = 0; i < obj.children.length; i += 1) {
    Models.mainBuilding.add(new THREE.Mesh(obj.children[i].geometry, Materials.concrete));
  }
});

exports.Models = Models;
exports.Materials = Materials;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TYPE_RAMP = exports.TYPE_BOX = exports.Box = exports.Ramp = exports.PhysicsModel = undefined;

var _BoundingBox = __webpack_require__(7);

var _Loader = __webpack_require__(0);

var TYPE_BOX = 'TYPE_BOX';
var TYPE_RAMP = 'TYPE_RAMP';

var Box = function Box(pos, dim) {
	this.type = TYPE_BOX;
	this.box = new _BoundingBox.BoundingBox(pos, dim);
	this.object = new THREE.Mesh(new THREE.BoxBufferGeometry(dim.x, dim.y, dim.z), _Loader.Materials.dev);
	var cloned = this.object.clone();
	cloned.material = _Loader.Materials.wireframe;
	this.object.add(cloned);
	this.object.position.set(pos.x, pos.y, pos.z);
};

Box.prototype = {
	collision: function collision(pos) {
		return this.box.collision(pos);
	},

	collision2D: function collision2D(pos) {
		return this.box.collision2D(pos);
	},

	getTop: function getTop(pos) {
		return this.box.getTop(pos);
	}
};

var Ramp = function Ramp(pos, dim, dir) {
	this.type = TYPE_RAMP;
	this.dir = dir;
	this.ramp = new _BoundingBox.BoundingRamp(pos, dim, dir);
	this.object = new THREE.Mesh(new THREE.BoxBufferGeometry(dim.x, dim.y, dim.z), _Loader.Materials.dev);
	var plane = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 0.05, 1), _Loader.Materials.wireframe);

	if (dir == 0) {
		plane.scale.x = dim.x;
		plane.scale.z = Math.sqrt(dim.z * dim.z + dim.y * dim.y);
		plane.rotation.x = -Math.atan2(dim.y, dim.z);
	} else if (dir == 1) {
		plane.scale.z = dim.z;
		plane.scale.x = Math.sqrt(dim.x * dim.x + dim.y * dim.y);
		plane.rotation.z = Math.atan2(dim.y, dim.x);
	} else if (dir == 2) {
		plane.scale.x = dim.x;
		plane.scale.z = Math.sqrt(dim.z * dim.z + dim.y * dim.y);
		plane.rotation.x = Math.atan2(dim.y, dim.z);
	} else {
		plane.scale.z = dim.z;
		plane.scale.x = Math.sqrt(dim.x * dim.x + dim.y * dim.y);
		plane.rotation.z = -Math.atan2(dim.y, dim.x);
	}

	this.object.add(plane);
	this.object.position.set(pos.x, pos.y, pos.z);
};

Ramp.prototype = {
	collision: function collision(pos) {
		return this.ramp.collision(pos);
	},

	collision2D: function collision2D(pos) {
		return this.ramp.collision2D(pos);
	},

	getTop: function getTop(pos) {
		return this.ramp.getTop(pos);
	}
};

var PhysicsModel = function PhysicsModel() {
	this.contents = [];
	this.object = new THREE.Object3D();
};

PhysicsModel.prototype = {
	add: function add() {
		for (var i = 0; i < arguments.length; i += 1) {
			this.contents.push(arguments[i]);
			this.object.add(arguments[i].object);
		}
	}
};

exports.PhysicsModel = PhysicsModel;
exports.Ramp = Ramp;
exports.Box = Box;
exports.TYPE_BOX = TYPE_BOX;
exports.TYPE_RAMP = TYPE_RAMP;

/***/ }),
/* 2 */
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

exports.getNormalisedVec3 = getNormalisedVec3;
exports.getMagnitudeVec3 = getMagnitudeVec3;
exports.getDistanceVec2 = getDistanceVec2;
exports.getDistanceVec3 = getDistanceVec3;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Timer = __webpack_require__(4);

var _Timer2 = _interopRequireDefault(_Timer);

var _Scene = __webpack_require__(5);

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author meatbags / https://github.com/meatbags
*/

var App = {
	init: function init() {
		App.timer = new _Timer2.default();
		App.scene = new _Scene2.default();
		App.loop();
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Timer = function Timer() {
	this.reset();
};

Timer.prototype = {
	update: function update() {
		this.then = this.now;
		this.now = new Date().getTime();
		this.delta = (this.now - this.then) / 1000.;
	},

	getDelta: function getDelta() {
		return this.delta;
	},

	reset: function reset() {
		this.now = new Date().getTime();
		this.then = this.now;
	}
};

exports.default = Timer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Player = __webpack_require__(6);

var _Player2 = _interopRequireDefault(_Player);

var _RayTracer = __webpack_require__(9);

var _RayTracer2 = _interopRequireDefault(_RayTracer);

var _Loader = __webpack_require__(0);

var _Physics = __webpack_require__(1);

__webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scene = function Scene() {
  this.init();
};

Scene.prototype = {
  init: function init() {
    var self = this;

    // threejs set up
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize(640, 480);
    this.renderer.setClearColor(0xf9e5a2, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.domElement.addEventListener('mousemove', function (e) {
      self.onMouseMove(e);
    });
    this.renderer.domElement.addEventListener('mousedown', function (e) {
      self.onMouseDown(e);
    });
    document.body.append(this.renderer.domElement);

    // hud elements
    this.hud = {
      turnThreshold: 0.225,
      left: document.getElementsByClassName('hud__left')[0],
      right: document.getElementsByClassName('hud__right')[0],
      isBelowTurnThreshold: function isBelowTurnThreshold(x) {
        return x < self.hud.turnThreshold * self.renderer.domElement.width;
      },
      isAboveTurnThreshold: function isAboveTurnThreshold(x) {
        return x > (1 - self.hud.turnThreshold) * self.renderer.domElement.width;
      },
      isOutsideTurnThreshold: function isOutsideTurnThreshold(x) {
        return self.hud.isBelowTurnThreshold(x) || self.hud.isAboveTurnThreshold(x);
      }
    };

    // user
    this.player = new _Player2.default(new THREE.Vector3(0, 0, 0));
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 2000000);
    this.raytracer = new _RayTracer2.default();
    this.resize();

    // world
    this.scene = new THREE.Scene();
    this.model = new _Physics.PhysicsModel();

    this.model.add(new _Physics.Box(new THREE.Vector3(0, 5, -25), new THREE.Vector3(6, 10, 2)), new _Physics.Box(new THREE.Vector3(0, 0, -25), new THREE.Vector3(4, 1, 4)), new _Physics.Box(new THREE.Vector3(0, 1.8, -7), new THREE.Vector3(3, .4, 2)), new _Physics.Ramp(new THREE.Vector3(0, 1, -10), new THREE.Vector3(3, 2, 4), 0), new _Physics.Ramp(new THREE.Vector3(0, 1, -4), new THREE.Vector3(3, 2, 4), 2), new _Physics.Ramp(new THREE.Vector3(-3, 1, -7), new THREE.Vector3(3, 2, 2), 1), new _Physics.Ramp(new THREE.Vector3(3, 1, -7), new THREE.Vector3(3, 2, 2), 3));

    this.scene.add(this.player.object, _Loader.Models.mainBuilding);

    this.scene.add(new THREE.Mesh(new THREE.BoxBufferGeometry(1000, 0.1, 1000), _Loader.Materials.concrete), new THREE.AmbientLight(0xffffff, 0.5));
    var sky = new THREE.Sky();
    var sun = new THREE.PointLight(0xffffff, 0.9, 40500);

    sun.position.set(sky.uniforms.sunPosition.value.x, sky.uniforms.sunPosition.value.y, sky.uniforms.sunPosition.value.z);

    this.scene.add(sun, sky.mesh, this.raytracer.object);
    this.scene.add(this.model.object);
  },

  resize: function resize() {
    var width = window.innerWidth;
    var height = 540; //Math.min(520, window.innerHeight * 0.75);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  onMouseDown: function onMouseDown(e) {
    var ray = this.raytracer.emitRayFromScreen(e, this.renderer.domElement, this.camera, this.model.contents);

    if (this.hud.isOutsideTurnThreshold(e.clientX)) {
      this.player.setTarget(this.player.position, ray.yaw);
    } else {
      this.player.setTarget({ x: ray.end.x, y: ray.end.y, z: ray.end.z }, ray.yaw);
    }
  },

  onMouseMove: function onMouseMove(e) {
    var ray = this.raytracer.emitRayFromScreen(e, this.renderer.domElement, this.camera, this.model.contents);

    if (this.hud.isBelowTurnThreshold(e.clientX)) {
      if (!this.hud.left.classList.contains('active')) {
        this.hud.left.classList.add('active');
      }
    } else if (this.hud.isAboveTurnThreshold(e.clientX)) {
      if (!this.hud.right.classList.contains('active')) {
        this.hud.right.classList.add('active');
      }
    } else {
      if (this.hud.left.classList.contains('active')) {
        this.hud.left.classList.remove('active');
      }
      if (this.hud.right.classList.contains('active')) {
        this.hud.right.classList.remove('active');
      }
    }
  },

  update: function update(delta) {
    this.player.update(delta, this.model.contents);
    this.camera.position.set(this.player.position.x, this.player.position.y + this.player.height, this.player.position.z);
    this.camera.rotation.y = this.player.yaw;
  },

  render: function render() {
    this.renderer.render(this.scene, this.camera);
  }
};

exports.default = Scene;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Physics = __webpack_require__(1);

var _Maths = __webpack_require__(2);

var Player = function Player(position) {
	this.object = new THREE.Object3D();
	this.position = position;
	this.target = {
		active: false,
		position: position,
		yaw: 0,
		radius: 0.5
	};
	this.pitch = 0;
	this.yaw = 0;
	this.speed = 5.5;
	this.height = 1.8;
	this.climbThreshold = 1;
	this.rotationSpeed = Math.PI * 0.75;
	this.init();
};

Player.prototype = {
	init: function init() {
		this.bindControls();
		var light = new THREE.PointLight(0xffffff, 0.25, 20, 2);
		light.position.set(0, 2, 0);
		this.object.add(light);
	},

	bindControls: function bindControls() {
		var self = this;

		self.keys = {
			up: false,
			down: false,
			left: false,
			right: false
		};

		document.addEventListener("keydown", function (e) {
			switch (e.keyCode) {
				case 38:
				case 87:
					self.keys.up = true;
					break;
				case 37:
				case 65:
					self.keys.left = true;
					break;
				case 40:
				case 83:
					self.keys.down = true;
					break;
				case 39:
				case 68:
					self.keys.right = true;
					break;
				default:
					break;
			}
		}, false);

		document.addEventListener("keyup", function (e) {
			switch (e.keyCode) {
				case 38:
				case 87:
					self.keys.up = false;
					break;
				case 37:
				case 65:
					self.keys.left = false;
					break;
				case 40:
				case 83:
					self.keys.down = false;
					break;
				case 39:
				case 68:
					self.keys.right = false;
					break;
			}
		}, false);
	},

	setTarget: function setTarget(pos, yaw) {
		this.target.active = true;
		this.target.position = pos;
		this.target.yaw = yaw;
	},

	update: function update(delta, objects) {
		if (this.keys.up || this.keys.down) {
			// disable automatic walk
			this.target.active = false;

			var move = (this.keys.up ? -1 : 0) + (this.keys.down ? 1 : 0);
			var dx = Math.sin(this.yaw) * this.speed * delta * move;
			var dz = Math.cos(this.yaw) * this.speed * delta * move;
			var nextX = this.position.x + dx;
			var nextZ = this.position.z + dz;
			var testX = { x: nextX, y: this.position.y, z: this.position.z };
			var testZ = { x: this.position.x, y: this.position.y, z: nextZ };
			var collisionX = false;
			var collisionZ = false;

			// XZ collisions
			for (var i = 0; i < objects.length; i += 1) {
				var obj = objects[i];

				if (obj.type === _Physics.TYPE_BOX || obj.type === _Physics.TYPE_RAMP) {
					// test next X position
					if (obj.collision(testX)) {
						var y = obj.getTop(testX);

						if (Math.abs(this.position.y - y) > this.climbThreshold) {
							collisionX = true;
						}
					}

					// test next Z position
					if (obj.collision(testZ)) {
						var _y = obj.getTop(testZ);

						if (Math.abs(this.position.y - _y) > this.climbThreshold) {
							collisionZ = true;
						}
					}
				}
			}

			// update XZ position
			this.position.x = collisionX ? this.position.x : nextX;
			this.position.z = collisionZ ? this.position.z : nextZ;
		}

		// get next Y position
		var nextY = 0;

		for (var _i = 0; _i < objects.length; _i += 1) {
			var _obj = objects[_i];

			if (_obj.collision2D(this.position)) {
				var _y2 = _obj.getTop(this.position);

				if (Math.abs(this.position.y - _y2) <= this.climbThreshold) nextY = _y2;
			}
		}

		this.position.y += (nextY - this.position.y) * 0.5;

		// get next rotation
		if (this.keys.left || this.keys.right) {
			// disable automatic walk
			this.target.active = false;

			var rotate = (this.keys.left ? 1 : 0) + (this.keys.right ? -1 : 0);
			this.yaw += this.rotationSpeed * delta * rotate;
		}

		// auto walk and look
		if (this.target.active) {
			if ((0, _Maths.getDistanceVec2)(this.position, this.target.position) > this.target.radius) {
				this.position.x += (this.target.position.x - this.position.x) * 0.05;
				this.position.z += (this.target.position.z - this.position.z) * 0.05;
			}
			this.yaw += (this.target.yaw - this.yaw) * 0.05;
		}

		// move THREE reference
		this.object.position.set(this.position.x, this.position.y, this.position.z);
	}
};

exports.default = Player;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var BoundingBox = function BoundingBox(pos, dim) {
  this.box = {
    x: {
      min: pos.x - dim.x / 2,
      max: pos.x + dim.x / 2,
      size: dim.x
    },
    y: {
      min: pos.y - dim.y / 2,
      max: pos.y + dim.y / 2,
      size: dim.y
    },
    z: {
      min: pos.z - dim.z / 2,
      max: pos.z + dim.z / 2,
      size: dim.z
    }
  };
};

BoundingBox.prototype = {
  collision: function collision(pos) {
    return pos.x >= this.box.x.min && pos.x <= this.box.x.max && pos.y >= this.box.y.min && pos.y <= this.box.y.max && pos.z >= this.box.z.min && pos.z <= this.box.z.max;
  },

  collision2D: function collision2D(pos) {
    return pos.x >= this.box.x.min && pos.x <= this.box.x.max && pos.z >= this.box.z.min && pos.z <= this.box.z.max;
  },

  getTop: function getTop(pos) {
    return this.box.y.max;
  }
};

var BoundingRamp = function BoundingRamp(pos, dim, dir) {
  this.box = new BoundingBox(pos, dim);
  this.direction = dir;
};

BoundingRamp.prototype = {
  collision: function collision(pos) {
    return this.box.collision(pos);
  },

  collision2D: function collision2D(pos) {
    return this.box.collision2D(pos);
  },

  getTop: function getTop(pos) {
    var top = this.box.box.y.min;

    if (this.direction === 0) {
      top += (pos.z - this.box.box.z.min) / this.box.box.z.size * this.box.box.y.size;
    } else if (this.direction === 1) {
      top += (pos.x - this.box.box.x.min) / this.box.box.x.size * this.box.box.y.size;
    } else if (this.direction === 2) {
      top += (this.box.box.z.max - pos.z) / this.box.box.z.size * this.box.box.y.size;
    } else {
      top += (this.box.box.x.max - pos.x) / this.box.box.x.size * this.box.box.y.size;
    }

    return top;
  }
};

exports.BoundingBox = BoundingBox;
exports.BoundingRamp = BoundingRamp;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


THREE.OBJLoader = function (e) {
  this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager, this.materials = null, this.regexp = { vertex_pattern: /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/, normal_pattern: /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/, uv_pattern: /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/, face_vertex: /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/, face_vertex_uv: /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/, face_vertex_uv_normal: /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/, face_vertex_normal: /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/, object_pattern: /^[og]\s*(.+)?/, smoothing_pattern: /^s\s+(\d+|on|off)/, material_library_pattern: /^mtllib /, material_use_pattern: /^usemtl / };
}, THREE.OBJLoader.prototype = { constructor: THREE.OBJLoader, load: function load(e, t, r, a) {
    var i = this,
        s = new THREE.FileLoader(i.manager);s.setPath(this.path), s.load(e, function (e) {
      t(i.parse(e));
    }, r, a);
  }, setPath: function setPath(e) {
    this.path = e;
  }, setMaterials: function setMaterials(e) {
    this.materials = e;
  }, _createParserState: function _createParserState() {
    var e = { objects: [], object: {}, vertices: [], normals: [], uvs: [], materialLibraries: [], startObject: function startObject(e, t) {
        if (this.object && this.object.fromDeclaration === !1) return this.object.name = e, void (this.object.fromDeclaration = t !== !1);var r = this.object && "function" == typeof this.object.currentMaterial ? this.object.currentMaterial() : void 0;if (this.object && "function" == typeof this.object._finalize && this.object._finalize(!0), this.object = { name: e || "", fromDeclaration: t !== !1, geometry: { vertices: [], normals: [], uvs: [] }, materials: [], smooth: !0, startMaterial: function startMaterial(e, t) {
            var r = this._finalize(!1);r && (r.inherited || r.groupCount <= 0) && this.materials.splice(r.index, 1);var a = { index: this.materials.length, name: e || "", mtllib: Array.isArray(t) && t.length > 0 ? t[t.length - 1] : "", smooth: void 0 !== r ? r.smooth : this.smooth, groupStart: void 0 !== r ? r.groupEnd : 0, groupEnd: -1, groupCount: -1, inherited: !1, clone: function clone(e) {
                var t = { index: "number" == typeof e ? e : this.index, name: this.name, mtllib: this.mtllib, smooth: this.smooth, groupStart: 0, groupEnd: -1, groupCount: -1, inherited: !1 };return t.clone = this.clone.bind(t), t;
              } };return this.materials.push(a), a;
          }, currentMaterial: function currentMaterial() {
            return this.materials.length > 0 ? this.materials[this.materials.length - 1] : void 0;
          }, _finalize: function _finalize(e) {
            var t = this.currentMaterial();if (t && -1 === t.groupEnd && (t.groupEnd = this.geometry.vertices.length / 3, t.groupCount = t.groupEnd - t.groupStart, t.inherited = !1), e && this.materials.length > 1) for (var r = this.materials.length - 1; r >= 0; r--) {
              this.materials[r].groupCount <= 0 && this.materials.splice(r, 1);
            }return e && 0 === this.materials.length && this.materials.push({ name: "", smooth: this.smooth }), t;
          } }, r && r.name && "function" == typeof r.clone) {
          var a = r.clone(0);a.inherited = !0, this.object.materials.push(a);
        }this.objects.push(this.object);
      }, finalize: function finalize() {
        this.object && "function" == typeof this.object._finalize && this.object._finalize(!0);
      }, parseVertexIndex: function parseVertexIndex(e, t) {
        var r = parseInt(e, 10);return 3 * (r >= 0 ? r - 1 : r + t / 3);
      }, parseNormalIndex: function parseNormalIndex(e, t) {
        var r = parseInt(e, 10);return 3 * (r >= 0 ? r - 1 : r + t / 3);
      }, parseUVIndex: function parseUVIndex(e, t) {
        var r = parseInt(e, 10);return 2 * (r >= 0 ? r - 1 : r + t / 2);
      }, addVertex: function addVertex(e, t, r) {
        var a = this.vertices,
            i = this.object.geometry.vertices;i.push(a[e + 0]), i.push(a[e + 1]), i.push(a[e + 2]), i.push(a[t + 0]), i.push(a[t + 1]), i.push(a[t + 2]), i.push(a[r + 0]), i.push(a[r + 1]), i.push(a[r + 2]);
      }, addVertexLine: function addVertexLine(e) {
        var t = this.vertices,
            r = this.object.geometry.vertices;r.push(t[e + 0]), r.push(t[e + 1]), r.push(t[e + 2]);
      }, addNormal: function addNormal(e, t, r) {
        var a = this.normals,
            i = this.object.geometry.normals;i.push(a[e + 0]), i.push(a[e + 1]), i.push(a[e + 2]), i.push(a[t + 0]), i.push(a[t + 1]), i.push(a[t + 2]), i.push(a[r + 0]), i.push(a[r + 1]), i.push(a[r + 2]);
      }, addUV: function addUV(e, t, r) {
        var a = this.uvs,
            i = this.object.geometry.uvs;i.push(a[e + 0]), i.push(a[e + 1]), i.push(a[t + 0]), i.push(a[t + 1]), i.push(a[r + 0]), i.push(a[r + 1]);
      }, addUVLine: function addUVLine(e) {
        var t = this.uvs,
            r = this.object.geometry.uvs;r.push(t[e + 0]), r.push(t[e + 1]);
      }, addFace: function addFace(e, t, r, a, i, s, n, o, h, l, u, d) {
        var v,
            f = this.vertices.length,
            c = this.parseVertexIndex(e, f),
            p = this.parseVertexIndex(t, f),
            m = this.parseVertexIndex(r, f);if (void 0 === a ? this.addVertex(c, p, m) : (v = this.parseVertexIndex(a, f), this.addVertex(c, p, v), this.addVertex(p, m, v)), void 0 !== i) {
          var g = this.uvs.length;c = this.parseUVIndex(i, g), p = this.parseUVIndex(s, g), m = this.parseUVIndex(n, g), void 0 === a ? this.addUV(c, p, m) : (v = this.parseUVIndex(o, g), this.addUV(c, p, v), this.addUV(p, m, v));
        }if (void 0 !== h) {
          var x = this.normals.length;c = this.parseNormalIndex(h, x), p = h === l ? c : this.parseNormalIndex(l, x), m = h === u ? c : this.parseNormalIndex(u, x), void 0 === a ? this.addNormal(c, p, m) : (v = this.parseNormalIndex(d, x), this.addNormal(c, p, v), this.addNormal(p, m, v));
        }
      }, addLineGeometry: function addLineGeometry(e, t) {
        this.object.geometry.type = "Line";for (var r = this.vertices.length, a = this.uvs.length, i = 0, s = e.length; s > i; i++) {
          this.addVertexLine(this.parseVertexIndex(e[i], r));
        }for (var n = 0, s = t.length; s > n; n++) {
          this.addUVLine(this.parseUVIndex(t[n], a));
        }
      } };return e.startObject("", !1), e;
  }, parse: function parse(e) {
    console.time("OBJLoader");var t = this._createParserState();-1 !== e.indexOf("\r\n") && (e = e.replace(/\r\n/g, "\n")), -1 !== e.indexOf("\\\n") && (e = e.replace(/\\\n/g, ""));for (var r = e.split("\n"), a = "", i = "", s = "", n = 0, o = [], h = "function" == typeof "".trimLeft, l = 0, u = r.length; u > l; l++) {
      if (a = r[l], a = h ? a.trimLeft() : a.trim(), n = a.length, 0 !== n && (i = a.charAt(0), "#" !== i)) if ("v" === i) {
        if (s = a.charAt(1), " " === s && null !== (o = this.regexp.vertex_pattern.exec(a))) t.vertices.push(parseFloat(o[1]), parseFloat(o[2]), parseFloat(o[3]));else if ("n" === s && null !== (o = this.regexp.normal_pattern.exec(a))) t.normals.push(parseFloat(o[1]), parseFloat(o[2]), parseFloat(o[3]));else {
          if ("t" !== s || null === (o = this.regexp.uv_pattern.exec(a))) throw new Error("Unexpected vertex/normal/uv line: '" + a + "'");t.uvs.push(parseFloat(o[1]), parseFloat(o[2]));
        }
      } else if ("f" === i) {
        if (null !== (o = this.regexp.face_vertex_uv_normal.exec(a))) t.addFace(o[1], o[4], o[7], o[10], o[2], o[5], o[8], o[11], o[3], o[6], o[9], o[12]);else if (null !== (o = this.regexp.face_vertex_uv.exec(a))) t.addFace(o[1], o[3], o[5], o[7], o[2], o[4], o[6], o[8]);else if (null !== (o = this.regexp.face_vertex_normal.exec(a))) t.addFace(o[1], o[3], o[5], o[7], void 0, void 0, void 0, void 0, o[2], o[4], o[6], o[8]);else {
          if (null === (o = this.regexp.face_vertex.exec(a))) throw new Error("Unexpected face line: '" + a + "'");t.addFace(o[1], o[2], o[3], o[4]);
        }
      } else if ("l" === i) {
        var d = a.substring(1).trim().split(" "),
            f = [],
            c = [];if (-1 === a.indexOf("/")) f = d;else for (var p = 0, m = d.length; m > p; p++) {
          var v = d[p].split("/");"" !== v[0] && f.push(v[0]), "" !== v[1] && c.push(v[1]);
        }t.addLineGeometry(f, c);
      } else if (null !== (o = this.regexp.object_pattern.exec(a))) {
        var g = (" " + o[0].substr(1).trim()).substr(1);t.startObject(g);
      } else if (this.regexp.material_use_pattern.test(a)) t.object.startMaterial(a.substring(7).trim(), t.materialLibraries);else if (this.regexp.material_library_pattern.test(a)) t.materialLibraries.push(a.substring(7).trim());else {
        if (null === (o = this.regexp.smoothing_pattern.exec(a))) {
          if ("\x00" === a) continue;throw new Error("Unexpected line: '" + a + "'");
        }var x = o[1].trim().toLowerCase();t.object.smooth = "1" === x || "on" === x;var b = t.object.currentMaterial();b && (b.smooth = t.object.smooth);
      }
    }t.finalize();var E = new THREE.Group();E.materialLibraries = [].concat(t.materialLibraries);for (var l = 0, u = t.objects.length; u > l; l++) {
      var _ = t.objects[l],
          j = _.geometry,
          y = _.materials,
          L = "Line" === j.type;if (0 !== j.vertices.length) {
        var V = new THREE.BufferGeometry();V.addAttribute("position", new THREE.BufferAttribute(new Float32Array(j.vertices), 3)), j.normals.length > 0 ? V.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(j.normals), 3)) : V.computeVertexNormals(), j.uvs.length > 0 && V.addAttribute("uv", new THREE.BufferAttribute(new Float32Array(j.uvs), 2));for (var w = [], H = 0, R = y.length; R > H; H++) {
          var T = y[H],
              b = void 0;if (null !== this.materials && (b = this.materials.create(T.name), L && b && !(b instanceof THREE.LineBasicMaterial))) {
            var I = new THREE.LineBasicMaterial();I.copy(b), b = I;
          }b || (b = L ? new THREE.LineBasicMaterial() : new THREE.MeshPhongMaterial(), b.name = T.name), b.shading = T.smooth ? THREE.SmoothShading : THREE.FlatShading, w.push(b);
        }var F;if (w.length > 1) {
          for (var H = 0, R = y.length; R > H; H++) {
            var T = y[H];V.addGroup(T.groupStart, T.groupCount, H);
          }var M = new THREE.MultiMaterial(w);F = L ? new THREE.LineSegments(V, M) : new THREE.Mesh(V, M);
        } else F = L ? new THREE.LineSegments(V, w[0]) : new THREE.Mesh(V, w[0]);F.name = _.name, E.add(F);
      }
    }return console.timeEnd("OBJLoader"), E;
  } };

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Maths = __webpack_require__(2);

var _Loader = __webpack_require__(0);

var RayTracer = function RayTracer() {
  this.precision = 0.25;
  this.maxLength = 15;
  this.object = new THREE.Object3D();

  var light = new THREE.PointLight(0xffffff, 0.25, 5, 2);
  var ball = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5, 16), _Loader.Materials.concrete);
  light.position.y = 1;

  this.object.add(ball, light);
};

RayTracer.prototype = {
  trace: function trace(point, vector, objects) {
    // raytracing function

    vector = (0, _Maths.getNormalisedVec3)(vector);
    var steps = this.maxLength / this.precision;
    var dx = vector.x * this.precision;
    var dy = vector.y * this.precision;
    var dz = vector.z * this.precision;
    var collision = false;

    for (var i = 0; i < steps; i += 1) {
      point.x += dx;
      point.y += dy;
      point.z += dz;

      if (point.y < 0) break;

      for (var j = 0; j < objects.length; j += 1) {
        if (objects[j].collision(point)) {
          collision = true;
          break;
        }
      }

      if (collision) break;
    }

    this.object.position.set(point.x, point.y, point.z);

    return point;
  },

  emitRayFromScreen: function emitRayFromScreen(event, domElement, camera, objects) {
    // convert mouse position to 3D space

    var rect = domElement.getBoundingClientRect();
    var mouseX = ((event.clientX - rect.left) / domElement.width - 0.5) * 2;
    var mouseY = ((event.clientY - rect.top) / domElement.height - 0.5) * 2;
    var fov = camera.fov * Math.PI / 180.;
    var fovY = fov - fov * Math.abs(mouseX) * 0.5;
    var yaw = -camera.rotation.y + mouseX * fov;
    var pitch = camera.rotation.x - (mouseY * 0.5 + mouseY / camera.aspect * 0.5) * fovY;
    var vec = new THREE.Vector3(Math.sin(yaw), Math.sin(pitch), -Math.cos(yaw));
    var endPoint = this.trace(camera.position, vec, objects);
    var ray = {
      start: camera.position,
      end: endPoint,
      yaw: camera.rotation.y - mouseX * fov,
      pitch: pitch
    };

    return ray;
  }
};

exports.default = RayTracer;

/***/ }),
/* 10 */
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

/***/ })
/******/ ]);