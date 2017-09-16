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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Timer = __webpack_require__(1);

var _Timer2 = _interopRequireDefault(_Timer);

var _Scene = __webpack_require__(2);

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

var AppOld = {
	init: function init() {

		App.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 2000000);
		App.camera.lookAt(new THREE.Vector3(0, 0, 0));
		App.render = new THREE.WebGLRenderer({ antialias: true });
		App.render.setPixelRatio(window.devicePixelRatio);
		App.render.setClearColor(0xf9e5a2, 1);
		document.body.appendChild(App.render.domElement);

		// loaders

		App.OBJLoader = new THREE.OBJLoader();
		App.TextureLoader = new THREE.TextureLoader();

		// player

		App.player = new Player(new THREE.Vector3(0, 24, 0));
		// build scene

		App.loadAssets();

		// events/ controls

		window.onresize = App.resize;
		App.resize();
		App.controls();

		// run

		App.loop();
		setTimeout(function () {
			App.timer.pause();
			console.log("paused");
		}, 100);
	},

	controls: function controls() {
		// cursor

		App.controls = new THREE.PointerLockControls(App.camera, new THREE.Vector3(Math.PI / 8, 0, 0));
		App.scene.add(App.controls.getObject());

		$(window).on("click", function () {
			if (App.controls.enabled) {
				App.controls.enabled = false;
				App.timer.pause();
				document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
				document.exitPointerLock();
				$(".hud__pause").addClass("active");
			} else {
				var element = document.body;
				App.controls.enabled = true;
				App.timer.resume();
				element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
				element.requestPointerLock();
				$(".hud__pause").removeClass("active");
			}
		});

		// keyboard

		App.keys = {
			up: false,
			down: false,
			left: false,
			right: false,
			Q: false,
			E: false
		};
		document.addEventListener("keydown", function (e) {
			switch (e.keyCode) {
				case 38:
				case 87:
					App.keys.up = true;
					break;
				case 37:
				case 65:
					App.keys.left = true;
					break;
				case 40:
				case 83:
					App.keys.down = true;
					break;
				case 39:
				case 68:
					App.keys.right = true;
					break;
				case 81:
					App.keys.Q = true;
					break;
				case 69:
					App.keys.E = true;
					break;
			}
		}, false);
		document.addEventListener("keyup", function (e) {
			switch (e.keyCode) {
				case 38:
				case 87:
					App.keys.up = false;
					break;
				case 37:
				case 65:
					App.keys.left = false;
					break;
				case 40:
				case 83:
					App.keys.down = false;
					break;
				case 39:
				case 68:
					App.keys.right = false;
					break;
			}
		}, false);
	},

	loadAssets: function loadAssets() {

		// containers

		App.assets = {};
		App.assets.light = {};
		App.logic = {
			focalPoints: [],
			terrain: {
				walls: [],
				platforms: [],
				ramps: []
			}
		};
		App.assets.images = [];
		App.scene = new THREE.Scene();
		App.animation = [];

		// build world

		World.globalObjects();
		World.outside();
		World.room1();
		World.room2();
		World.room3();

		// set start room

		App.currentRoom = 0;

		$(".artwork").each(function (i, e) {
			var src, title, mesh, tex;

			// create a picture frame

			mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 2, 2), new THREE.MeshLambertMaterial({
				color: 0xffffff,
				side: THREE.DoubleSide
			}));
			title = $(e).children(".artwork__title").html();
			src = $(e).children(".artwork__image").html();
			tex = App.TextureLoader.load(src, function () {
				mesh.scale.x = tex.image.naturalWidth / 1000.0;
				mesh.scale.y = tex.image.naturalHeight / 1000.0;
			});
			mesh.material.map = tex;
			mesh.rotation.set(0, Math.PI * 0.5, 0);
			mesh.position.set(-3.9, 1.8, -i * 2);

			App.assets.images.push(mesh);

			// add button

			App.logic.focalPoints.push(new FocalPoint(mesh, title));
		});

		App.assets.water = new THREE.Water();
		App.assets.water.mesh.position.set(0, 0.25, 0);
	},

	resize: function resize() {
		// resize window

		var w, h;

		w = window.innerWidth;
		h = Math.floor(window.innerHeight * 0.75);

		App.camera.aspect = w / h;
		App.camera.updateProjectionMatrix();
		App.render.setSize(w, h);
	},

	update: function update(delta, interval) {
		// room specific updates

		World.checkRoom();
		World.updateRoom(delta);

		// animation

		for (var i = App.animation.length - 1; i > -1; i -= 1) {
			var anim = App.animation[i];

			if (anim.isComplete()) App.animation.splice(i, 1);else anim.animate(delta);
		}

		// water

		// App.assets.water.update(delta);

		// player, camera

		App.controls.update();
		App.player.rotation = App.controls.getYaw();
		App.player.update(delta, App.keys, App.logic.terrain);
		App.controls.getObject().position.set(App.player.position.x, App.player.position.y + App.player.getHeight(), App.player.position.z);
		App.assets.light.area.position.set(App.player.position);

		// interaction logic

		var check, pos, pitch, yaw;

		check = false;
		pos = App.controls.getObject().position;
		pitch = App.controls.getPitch();
		yaw = App.controls.getYaw();

		for (var i = 0; i < App.logic.focalPoints.length; i += 1) {
			var fp = App.logic.focalPoints[i];

			if (fp.collision(pos, pitch, yaw)) {
				check = true;
			}
		}

		if (check) {
			if (!$(".hud__prompt").hasClass("active")) {
				$(".hud__prompt").addClass("active");
			}
		} else {
			$(".hud__prompt").removeClass("active");
		}
	},

	draw: function draw() {
		// draw scene

		App.render.render(App.scene, App.camera);
	},

	loop: function loop() {
		// main loop

		requestAnimationFrame(App.loop);
		App.timer.update();
		App.timer.nextFrame();

		if (!App.timer.paused) {
			App.update(App.timer.delta, App.timer.interval);
			App.draw();
			$(".hud__time").html(Math.floor(App.player.position.x * 10) / 10 + ", " + Math.floor(App.player.position.y * 10) / 10 + ", " + Math.floor(App.player.position.z * 10) / 10 + "<br />current level: " + App.currentRoom + "<br />speed: " + App.player.speed + "m/s");
		}
	}
};

window.onload = function () {
	App.init();
};

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Player = __webpack_require__(3);

var _Player2 = _interopRequireDefault(_Player);

__webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scene = function Scene() {
  this.init();
};

Scene.prototype = {
  init: function init() {
    // threejs set up
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize(640, 480);
    this.renderer.setClearColor(0xf9e5a2, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown);
    document.body.append(this.renderer.domElement);

    // user
    this.player = new _Player2.default(new THREE.Vector3(0, 0, 0));
    this.camera = new THREE.PerspectiveCamera(65, 1, 0.1, 2000000);
    this.camera.position.set(0, 10, 0);
    this.resize();

    // world
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.Mesh(new THREE.BoxBufferGeometry(10000, 0.5, 10), new THREE.MeshPhysicalMaterial({
      color: 0xaaaaaa
    })), new THREE.AmbientLight(0xffffff, 0.5), new THREE.Sky().mesh);
  },

  resize: function resize() {
    var width = window.innerWidth / 2,
        height = Math.min(480, window.innerHeight * 0.75);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  onMouseDown: function onMouseDown(e) {
    // raytrace
  },

  onMouseMove: function onMouseMove(e) {
    // raytrace
  },

  update: function update(delta) {
    this.player.update(delta);
    this.camera.position.set(this.player.position.x, this.player.position.y + this.player.height, this.player.position.z);
    this.camera.rotation.y = this.player.yaw;
  },

  render: function render() {
    this.renderer.render(this.scene, this.camera);
  }
};

exports.default = Scene;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Player = function Player(position) {
	this.position = position;
	this.pitch = 0;
	this.yaw = 0;
	this.speed = 5;
	this.height = 1.8;
	this.rotationSpeed = Math.PI / 2;
	this.init();
};

Player.prototype = {
	init: function init() {
		this.bindControls();
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

	update: function update(delta) {
		var rotate = (this.keys.left ? 1 : 0) + (this.keys.right ? -1 : 0);
		var move = (this.keys.up ? -1 : 0) + (this.keys.down ? 1 : 0);
		this.position.x += Math.sin(this.yaw) * this.speed * delta * move;
		this.position.z += Math.cos(this.yaw) * this.speed * delta * move;
		this.yaw += this.rotationSpeed * delta * rotate;
	}
};

exports.default = Player;

/*
function Player(position) {
	this.position = position;
	this.target = new THREE.Vector3(position.x, position.y, position.z);
	this.rotation = 0;
	this.walkTime = 0;
	this.height = 1.8; // eye height
	this.halfHeight = this.height / 2;
	this.headHeight = 0;
	this.speed = 12; // m/s
	this.speeds = {dev: 12, game: 3};
	this.rateOfChange = 0.3;
}

Player.prototype = {
	update: function(delta, controls, terrain) {
		var forward, strafe, next, mag;

		// dev stuff

		if (controls.Q) {
			if (this.position.y < 8) {
				this.position = this.target = Vec3(0, 24, 0);
			} else
				this.position.y -= 8;
			controls.Q = false;
		}

		if (controls.E) {
			if (this.speed == this.speeds.dev)
				this.speed = this.speeds.game;
			else
				this.speed = this.speeds.dev;
			controls.E = false;
		}

		// find next position

		next = {x:0, y:0, z:0};
		forward = ((controls.up) ? 1 : 0) + ((controls.down) ? -1 : 0);
		strafe  = ((controls.left) ? 1 : 0) + ((controls.right) ? -1 : 0);
		next.x = strafe * -Math.sin(this.rotation + Math.PI/2) + forward * -Math.sin(this.rotation);
		next.z = forward * -Math.cos(this.rotation) + strafe * -Math.cos(this.rotation + Math.PI/2);
		mag = Math.sqrt(Math.pow(next.x, 2) + Math.pow(next.z, 2));

		if (mag != 0) {
			next.z /= mag;
			next.x /= mag;
		}

		next.x = next.x * this.speed * delta + this.target.x;
		next.y = this.position.y;
		next.z = next.z * this.speed * delta + this.target.z;

		// check for wall collisions

		var collision, nextX, nextZ;

		collision = {x: false, y: false, z: false};
		nextX = {x:next.x, y:next.y, z:this.target.z};
		nextZ = {x:this.target.x, y:next.y, z:next.z};


		for (var i=0; i<terrain.walls.length; i+=1) {
			var wall = terrain.walls[i];

			if (wall.collision3D(nextX)) {
				if (wall.getTop() > next.y + this.halfHeight) {
					collision.x = true;
				}
			} if (wall.collision3D(nextZ)) {
				if (wall.getTop() > next.y + this.halfHeight) {
					collision.z = true;
				}
			}
		}

		next.x = (collision.x) ? this.target.x : next.x;
		next.z = (collision.z) ? this.target.z : next.z;

		// climb onto platforms, ramps, walls

		var top, objects;

		nextX = {x:next.x, y:next.y, z:this.target.z};
		nextZ = {x:this.target.x, y:next.y, z:next.z};
		objects = terrain.platforms.concat(terrain.ramps, terrain.walls);
		top = {x: -1, z: -1};

		for (var i=0; i<objects.length; i+=1) {
			var obj = objects[i];

			// x direction

			if (obj.collision2D(nextX)) {
				var y = obj.getTop(nextX);

				if (y > top.x && Math.abs(y - next.y) < this.halfHeight) {
					top.x = y;
				}
			}

			// z direction

			if (obj.collision2D(nextZ)) {
				var y = obj.getTop(nextZ);

				if (y > top.z && Math.abs(y - next.y) < this.halfHeight) {
					top.z = y;
				}
			}
		}

		next.x = (top.x == -1) ? this.target.x : next.x;
		next.z = (top.z == -1) ? this.target.z : next.z;

		if (top.x != -1 || top.z != -1) {
			next.y = Math.max(top.x, top.z);
		}

		// alter player position

		this.target = next;
		this.position.z += (this.target.z - this.position.z) * this.rateOfChange;
		this.position.x += (this.target.x - this.position.x) * this.rateOfChange;
		this.position.y += (this.target.y - this.position.y) * this.rateOfChange;

		// alter head height

		//this.walkTime += (forward || strafe) ? delta : 0;
		//this.headHeight = Math.sin(this.walkTime * 6) * 0.05;
	},

	getHeight: function() {
		return this.height;
	}
};
*/

/***/ }),
/* 4 */
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