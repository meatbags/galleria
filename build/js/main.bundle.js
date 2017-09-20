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


var _player = __webpack_require__(1);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = {
	init: function init() {
		// timekeeping
		var a = function a() {
			console.log('hello world');
		};
		a();

		App.timer = new Timer(30);
		// Threejs setup

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

		App.player = new _player2.default(new THREE.Vector3(0, 24, 0));
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

		/*
  		$(".artwork").each(function(i, e) {
  	var src, title, mesh, tex;
  			// create a picture frame
  			mesh = new THREE.Mesh(
  		new THREE.PlaneBufferGeometry(1, 1, 2, 2),
  		new THREE.MeshLambertMaterial({
  			color: 0xffffff,
  			side: THREE.DoubleSide
  		})
  	);
  	title = $(e).children(".artwork__title").html();
  	src = $(e).children(".artwork__image").html();
  	tex = App.TextureLoader.load(src, function(){
  		mesh.scale.x = tex.image.naturalWidth / 1000.0;
  		mesh.scale.y = tex.image.naturalHeight / 1000.0;
  	});
  	mesh.material.map = tex;
  	mesh.rotation.set(0, Math.PI*0.5, 0);
  	mesh.position.set(-3.9, 1.8, -i*2);
  			App.assets.images.push(mesh);
  			// add button
  			App.logic.focalPoints.push(new FocalPoint(mesh, title));
  });
  		App.assets.water = new THREE.Water();
  App.assets.water.mesh.position.set(0, 0.25, 0);
  		*/
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
function Player(position) {
	this.position = position;
	this.target = new THREE.Vector3(position.x, position.y, position.z);
	this.rotation = 0;
	this.walkTime = 0;
	this.height = 1.8; // eye height
	this.halfHeight = this.height / 2;
	this.headHeight = 0;
	this.speed = 12; // m/s
	this.speeds = { dev: 12, game: 3 };
	this.rateOfChange = 0.3;
}

Player.prototype = {
	update: function update(delta, controls, terrain) {
		var forward, strafe, next, mag;

		// dev stuff

		if (controls.Q) {
			if (this.position.y < 8) {
				this.position = this.target = Vec3(0, 24, 0);
			} else this.position.y -= 8;
			controls.Q = false;
		}

		if (controls.E) {
			if (this.speed == this.speeds.dev) this.speed = this.speeds.game;else this.speed = this.speeds.dev;
			controls.E = false;
		}

		// find next position

		next = { x: 0, y: 0, z: 0 };
		forward = (controls.up ? 1 : 0) + (controls.down ? -1 : 0);
		strafe = (controls.left ? 1 : 0) + (controls.right ? -1 : 0);
		next.x = strafe * -Math.sin(this.rotation + Math.PI / 2) + forward * -Math.sin(this.rotation);
		next.z = forward * -Math.cos(this.rotation) + strafe * -Math.cos(this.rotation + Math.PI / 2);
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

		collision = { x: false, y: false, z: false };
		nextX = { x: next.x, y: next.y, z: this.target.z };
		nextZ = { x: this.target.x, y: next.y, z: next.z };

		for (var i = 0; i < terrain.walls.length; i += 1) {
			var wall = terrain.walls[i];

			if (wall.collision3D(nextX)) {
				if (wall.getTop() > next.y + this.halfHeight) {
					collision.x = true;
				}
			}if (wall.collision3D(nextZ)) {
				if (wall.getTop() > next.y + this.halfHeight) {
					collision.z = true;
				}
			}
		}

		next.x = collision.x ? this.target.x : next.x;
		next.z = collision.z ? this.target.z : next.z;

		// climb onto platforms, ramps, walls

		var top, objects;

		nextX = { x: next.x, y: next.y, z: this.target.z };
		nextZ = { x: this.target.x, y: next.y, z: next.z };
		objects = terrain.platforms.concat(terrain.ramps, terrain.walls);
		top = { x: -1, z: -1 };

		for (var i = 0; i < objects.length; i += 1) {
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

		next.x = top.x == -1 ? this.target.x : next.x;
		next.z = top.z == -1 ? this.target.z : next.z;

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

	getHeight: function getHeight() {
		return this.height;
	}
};

exports.Player = Player;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map