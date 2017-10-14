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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Globals = __webpack_require__(3);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPE_FOCAL = exports.Focal = undefined;

var _BoundingBox = __webpack_require__(4);

var _Maths = __webpack_require__(0);

var _Materials = __webpack_require__(14);

var _Globals = __webpack_require__(3);

var _Globals2 = _interopRequireDefault(_Globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_FOCAL = 'TYPE_FOCAL';

var Focal = function Focal(pos, dim, eye) {
  this.type = TYPE_FOCAL;
  this.position = pos;
  this.dimensions = dim;
  this.eye = eye;
  this.bbox = new _BoundingBox.BoundingBox(pos, dim);
  this.pitch = (0, _Maths.getPitch)(eye, new THREE.Vector3(pos.x, pos.y - _Globals2.default.player.height, pos.z));
  this.yaw = (0, _Maths.getYaw)(eye, pos);
  this.object = new THREE.Mesh(new THREE.BoxBufferGeometry(dim.x, dim.y, dim.z), _Materials.Materials.dev2);
  this.object.position.set(pos.x, pos.y, pos.z);
};

Focal.prototype = {
  collision: function collision(pos) {
    return this.bbox.collision(pos);
  },

  scale: function scale(x, y, z) {
    this.dimensions.x *= x;
    this.dimensions.y *= y;
    this.dimensions.z *= z;
    this.bbox = new _BoundingBox.BoundingBox(this.position, this.dimensions);
    this.object.scale.x = x;
    this.object.scale.y = y;
    this.object.scale.z = z;
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

var _Maths = __webpack_require__(0);

var halfPI = Math.PI / 2;

var Globals = {
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TYPE_RAMP = exports.TYPE_BOX = exports.Box = exports.Ramp = exports.PhysicsModel = undefined;

var _BoundingBox = __webpack_require__(4);

var _Loader = __webpack_require__(1);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Timer = __webpack_require__(7);

var _Timer2 = _interopRequireDefault(_Timer);

var _Scene = __webpack_require__(8);

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author meatbags / https://github.com/meatbags
*/

var App = {
	init: function init() {
		App.timer = new _Timer2.default();
		App.scene = new _Scene2.default();
		App.loading();
	},

	loading: function loading() {
		App.timer.update();

		if (!App.scene.isLoaded()) {
			requestAnimationFrame(App.loading);
		} else {
			App.loop();
		}
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Player = __webpack_require__(9);

var _Player2 = _interopRequireDefault(_Player);

var _RayTracer = __webpack_require__(10);

var _RayTracer2 = _interopRequireDefault(_RayTracer);

var _HUD = __webpack_require__(11);

var _HUD2 = _interopRequireDefault(_HUD);

var _Artworks = __webpack_require__(12);

var _Artworks2 = _interopRequireDefault(_Artworks);

var _Loader = __webpack_require__(1);

var _Loader2 = _interopRequireDefault(_Loader);

var _Physics = __webpack_require__(5);

var _Focal = __webpack_require__(2);

var _Maths = __webpack_require__(0);

var _Globals = __webpack_require__(3);

var _Globals2 = _interopRequireDefault(_Globals);

__webpack_require__(13);

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
    //this.renderer.domElement.addEventListener('mousemove', function(e){ self.onMouseMove(e) });
    //this.renderer.domElement.addEventListener('mousedown', function(e){ self.onMouseDown(e) });
    document.body.append(this.renderer.domElement);

    // player & scene
    this.player = new _Player2.default(this.renderer.domElement);
    this.camera = this.player.camera;
    this.raytracer = new _RayTracer2.default(this.renderer.domElement);

    // scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xCCCFFF, 0.008);
    this.scene.add(this.raytracer.object, this.player.object);

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

    //this.hud = new HUD(this.renderer.domElement);
    //this.player = new Player();
    //this.camera = new THREE.PerspectiveCamera(Globals.camera.fov, 1, Globals.camera.near, Globals.camera.far);
    //this.camera.up = new THREE.Vector3(0, 1, 0);
    // walls & floors
    //this.scene.add(this.model.object);

    // load gallery
    this.model = new _Physics.PhysicsModel();
    var tags = document.getElementsByClassName('im');
    this.artworks = new _Artworks2.default();

    for (var i = 0; i < tags.length; i += 1) {
      var im = tags[i];
      var title = '';
      var caption = '';
      var url = '';
      var src = '';

      for (var j = 0; j < im.childNodes.length; j += 1) {
        var node = im.childNodes[j];

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

    for (var _i = 0; _i < this.artworks.focalPoints.length; _i += 1) {
      this.model.add(this.artworks.focalPoints[_i]);
    }

    // lighting
    var ambient = new THREE.AmbientLight(0xffffff, .08);
    var hemisphere = new THREE.HemisphereLight(0xffaabb, 0x080820, 0.1);
    var point1 = new THREE.PointLight(0xffffff, 0.5, 13, 1);
    var point2 = new THREE.PointLight(0xffffff, 0.5, 10, 1);
    var point3 = new THREE.PointLight(0xfeff87, 0.5, 12, 1);
    this.neonSign = new THREE.PointLight(0xff0000, 0.8, 15, 1);

    point1.position.set(0, 5, -10);
    point2.position.set(0, 14, 10);
    point3.position.set(-19, 8, 5);
    this.neonSign.position.set(0, 14, -32);

    this.scene.add(ambient, point1,
    //point2,
    point3, hemisphere, this.neonSign);

    // skybox
    var sky = new THREE.Sky();
    //const sun = new THREE.PointLight(0xffffff, 0.9, 40500);
    //sun.position.set(sky.uniforms.sunPosition.value.x, sky.uniforms.sunPosition.value.y, sky.uniforms.sunPosition.value.z);
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

  onMouseDown: function onMouseDown(e) {
    var ray = this.raytracer.emitRayFromScreen(e, this.renderer.domElement, this.camera, this.player, this.model.contents);

    if (this.hud.isLeftOrRight(e.clientX)) {
      this.player.setTarget(this.player.position, ray.yaw);
    } else {
      this.player.setTarget({ x: ray.end.x, y: ray.end.y, z: ray.end.z }, ray.yaw);
    }
  },

  onMouseMove: function onMouseMove(e) {
    var ray = this.raytracer.emitRayFromScreen(e, this.renderer.domElement, this.camera, this.player, this.model.contents);

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

  update: function update(delta) {
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

  render: function render() {
    this.renderer.render(this.scene, this.camera);
  }
};

exports.default = Scene;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VectorMaths = __webpack_require__(15);

var Maths = _interopRequireWildcard(_VectorMaths);

var _Globals = __webpack_require__(3);

var _Globals2 = _interopRequireDefault(_Globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Player = function Player(domElement) {
  this.domElement = domElement;
  this.object = new THREE.Object3D();
  this.position = new THREE.Vector3(_Globals2.default.player.position.x, _Globals2.default.player.position.y, _Globals2.default.player.position.z);
  this.movement = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(0, 0, 0);
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
    falling: false,
    adjust: {
      slow: 0.02,
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
  this.init();
};

Player.prototype = {
  init: function init() {
    this.object = new THREE.Mesh(new THREE.SphereBufferGeometry(0.05), new THREE.MeshPhongMaterial());
    this.bindControls();
    this.resizeCamera();
    var light = new THREE.PointLight(0xffffff, 0.8, 10, 2);
    light.position.set(0, 2, 0);
    this.object.add(light);
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

    // keyboard
    self.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      jump: false
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

  update: function update(delta, collider) {
    // handle key presses and move player

    this.outputLog = [];

    // get movement vector from controls
    if (this.keys.up || this.keys.down) {
      var dir = (this.keys.up ? 1 : 0) + (this.keys.down ? -1 : 0);
      var _yaw = this.rotation.y + this.offset.rotation.y;
      var dx = Math.sin(_yaw) * this.attributes.speed * dir;
      var dz = Math.cos(_yaw) * this.attributes.speed * dir;
      this.target.movement.x = dx;
      this.target.movement.z = dz;
    } else {
      this.target.movement.x = 0;
      this.target.movement.z = 0;
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

    // reduce movement if falling
    if (!this.falling) {
      this.movement.x = this.target.movement.x;
      this.movement.z = this.target.movement.z;
    } else {
      this.movement.x += (this.target.movement.x - this.movement.x) * this.attributes.adjust.slow;
      this.movement.z += (this.target.movement.z - this.movement.z) * this.attributes.adjust.slow;
    }

    // check next position for collision
    var next = Maths.addVector(Maths.scaleVector(this.movement, delta), this.target.position);
    var collisions = collider.collisions(next);

    // apply gravity
    this.movement.y = Math.max(this.movement.y - this.attributes.gravity.accel * delta, -this.attributes.gravity.maxVelocity);

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

    // set new position target
    this.target.position.x = next.x;
    this.target.position.y = next.y;
    this.target.position.z = next.z;

    // smooth motion a little
    this.position.x += (this.target.position.x - this.position.x) * this.attributes.adjust.veryFast;
    this.position.y += (this.target.position.y - this.position.y) * this.attributes.adjust.veryFast;
    this.position.z += (this.target.position.z - this.position.z) * this.attributes.adjust.veryFast;

    // update rotation vector
    if (this.keys.left || this.keys.right) {
      var _dir = (this.keys.left ? 1 : 0) + (this.keys.right ? -1 : 0);
      this.target.rotation.y += this.attributes.rotation * delta * _dir;
    }

    this.rotation.y += Maths.minAngleDifference(this.rotation.y, this.target.rotation.y) * this.attributes.adjust.fast;
    this.offset.rotation.x += (this.target.offset.rotation.x - this.offset.rotation.x) * this.attributes.adjust.normal;
    this.offset.rotation.y += (this.target.offset.rotation.y - this.offset.rotation.y) * this.attributes.adjust.normal;
    this.rotation.y += this.rotation.y < 0 ? Maths.twoPi : this.rotation.y > Maths.twoPi ? -Maths.twoPi : 0;

    // set new camera position
    var yaw = this.rotation.y + this.offset.rotation.y;
    var pitch = this.rotation.x + this.offset.rotation.x;
    var height = this.position.y + this.attributes.height;

    this.object.position.set(this.position.x, height, this.position.z);
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

    // adjust camera
    if (x < t) {
      this.target.offset.rotation.y = (t - x) / t * this.attributes.maxRotationOffset;
    } else if (x > 1 - t) {
      this.target.offset.rotation.y = (x - (1 - t)) / t * -this.attributes.maxRotationOffset;
    } else {
      this.target.offset.rotation.y = 0;
    }

    if (y < t) {
      this.target.offset.rotation.x = (t - y) / t * this.attributes.maxRotationOffset;
    } else if (y > 1 - t) {
      this.target.offset.rotation.x = (y - (1 - t)) / t * -this.attributes.maxRotationOffset;
    } else {
      this.target.offset.rotation.x = 0;
    }
  }
};

exports.default = Player;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Maths = __webpack_require__(0);

var _Focal = __webpack_require__(2);

var _Physics = __webpack_require__(5);

var RayTracer = function RayTracer(domElement) {
  this.domElement = domElement;
  this.precision = 0.4;
  this.maxLength = 15;
  this.object = new THREE.Object3D();

  var light = new THREE.PointLight(0xffffff, 0.5, 5, 2);
  var ball = new THREE.Mesh(new THREE.SphereBufferGeometry(0.05, 16), new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xffffff }));
  light.position.y = 1.1;

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
    var object = null;

    for (var i = 0; i < steps; i += 1) {
      point.x += dx;
      point.y += dy;
      point.z += dz;

      if (point.y < 0) break;

      for (var j = 0; j < objects.length; j += 1) {
        if (objects[j].collision(point)) {
          if (objects[j].type != _Physics.TYPE_RAMP || objects[j].getTop(point) > point.y) {
            collision = true;
            object = objects[j];
            break;
          }
        }
      }

      if (collision) break;
    }

    this.object.position.set(point.x, point.y, point.z);

    return {
      point: point,
      object: object
    };
  },

  emitRayFromScreen: function emitRayFromScreen(event, domElement, camera, player, objects) {
    // convert mouse position to 3D space

    var rect = domElement.getBoundingClientRect();
    var mouseX = ((event.clientX - rect.left) / domElement.width - 0.5) * 2;
    var mouseY = ((event.clientY - rect.top) / domElement.height - 0.5) * 2;
    var fov = camera.fov * Math.PI / 180.;
    var fovY = fov - fov * Math.abs(mouseX) * 0.5;
    var yaw = player.yaw - mouseX * fov;
    var pitch = player.pitch - (mouseY * 0.5 + mouseY / camera.aspect * 0.5) * fovY;
    var vec = new THREE.Vector3(Math.sin(yaw), Math.sin(pitch), Math.cos(yaw));
    var end = this.trace(camera.position, vec, objects);
    var ray = {
      start: camera.position,
      end: end.point,
      yaw: yaw,
      pitch: pitch
    };

    if (end.object && end.object.type === _Focal.TYPE_FOCAL) {
      ray.end = end.object.eye;
      ray.yaw = end.object.yaw;
      ray.pitch = end.object.pitch;
    }

    return ray;
  }
};

exports.default = RayTracer;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var HUD = function HUD(domElement) {
  this.domElement = domElement;
  this.threshold = {
    x: 0.225,
    y: 0.25
  };
  this.init();
};

HUD.prototype = {
  init: function init() {
    this.left = document.getElementsByClassName('hud__left')[0];
    this.right = document.getElementsByClassName('hud__right')[0];
  },

  isLeft: function isLeft(x) {
    return x - this.domElement.getBoundingClientRect().left < this.threshold.x * this.domElement.width;
  },

  isRight: function isRight(x) {
    return x - this.domElement.getBoundingClientRect().left > (1 - this.threshold.x) * this.domElement.width;
  },

  isHigh: function isHigh(y) {
    return y - this.domElement.getBoundingClientRect().top < this.domElement.height * this.threshold.y;
  },

  isLow: function isLow(y) {
    return y - this.domElement.getBoundingClientRect().top > this.domElement.height * (1 - this.threshold.y);
  },

  isLeftOrRight: function isLeftOrRight(x) {
    return this.isLeft(x) || this.isRight(x);
  },

  getHighFactor: function getHighFactor(y) {
    var t = this.domElement.height * this.threshold.y;

    return (t - (y - this.domElement.getBoundingClientRect().top)) / t;
  },

  getLowFactor: function getLowFactor(y) {
    var t = this.domElement.height * this.threshold.y;

    return 1 - (this.domElement.height - (y - this.domElement.getBoundingClientRect().top)) / t;
  },

  getLeftFactor: function getLeftFactor(x) {
    var t = this.domElement.width * this.threshold.x;

    return (t - (x - this.domElement.getBoundingClientRect().left)) / t;
  },

  getRightFactor: function getRightFactor(x) {
    var t = this.domElement.width * this.threshold.x;

    return 1 - (this.domElement.width - (x - this.domElement.getBoundingClientRect().left)) / t;
  }
};

exports.default = HUD;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Materials = __webpack_require__(14);

var _Maths = __webpack_require__(0);

var _Focal = __webpack_require__(2);

var _Globals = __webpack_require__(3);

var _Globals2 = _interopRequireDefault(_Globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Artworks = function Artworks() {
  this.sources = [];
  this.focalPoints = [];
  this.object = new THREE.Object3D();
};

Artworks.prototype = {
  add: function add(title, caption, url, src) {
    // add an image source

    this.sources.push({
      title: title,
      caption: caption,
      url: url,
      src: src
    });
  },

  placeImages: function placeImages() {
    var _this = this;

    var self = this;
    var textureLoader = new THREE.TextureLoader();

    var _loop = function _loop(i) {
      var index = i;
      var place = _Globals2.default.artworkPlacement[index];

      // add snap focal point
      self.focalPoints.push(new _Focal.Focal(place.position, (0, _Maths.v3)(1, 1, 1), place.eye));

      // create artwork mesh
      var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 2, 2), _Materials.Materials.canvas.clone());
      var texture = textureLoader.load(_this.sources[i].src, function () {
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
    };

    for (var i = 0; i < this.sources.length; i += 1) {
      _loop(i);
    }
  }
};

exports.default = Artworks;

/***/ }),
/* 13 */
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
/* 14 */
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
/* 15 */
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

/***/ })
/******/ ]);