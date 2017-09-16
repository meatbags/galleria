/**
 * @author meatbags / https://github.com/meatbags
*/

import Timer from './modules/Timer';
import Scene from './modules/Scene';

const App = {
	init: function() {
		App.timer = new Timer();
		App.scene = new Scene();
		App.loop();
	},

	loop: function() {
		requestAnimationFrame(App.loop);
		App.timer.update();
		App.scene.update(App.timer.getDelta());
		App.scene.render();
	}
};

var AppOld = {
	init: function() {

		App.camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 2000000);
		App.camera.lookAt(new THREE.Vector3(0,0,0));
		App.render = new THREE.WebGLRenderer({antialias: true});
		App.render.setPixelRatio( window.devicePixelRatio );
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
		setTimeout(
			function(){
				App.timer.pause();
				console.log("paused");
			},
			100
		);
	},

	controls: function() {
		// cursor

		App.controls = new THREE.PointerLockControls(App.camera, new THREE.Vector3(Math.PI / 8, 0, 0));
		App.scene.add(App.controls.getObject());

		$(window).on("click", function() {
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
		document.addEventListener("keydown", function(e) {
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
		document.addEventListener("keyup", function(e) {
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

	loadAssets: function() {

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

	},

	resize: function() {
		// resize window

		var w, h;

		w = window.innerWidth;
		h = Math.floor(window.innerHeight * 0.75);

		App.camera.aspect = w/ h;
		App.camera.updateProjectionMatrix();
		App.render.setSize(w, h);
	},

	update: function(delta, interval) {
		// room specific updates

		World.checkRoom();
		World.updateRoom(delta);

		// animation

		for (var i=App.animation.length-1; i>-1; i-=1) {
			var anim = App.animation[i];

			if (anim.isComplete())
				App.animation.splice(i, 1);
			else
				anim.animate(delta);
		}

		// water

		// App.assets.water.update(delta);

		// player, camera

		App.controls.update();
		App.player.rotation = App.controls.getYaw();
		App.player.update(delta, App.keys, App.logic.terrain);
		App.controls.getObject().position.set(
			App.player.position.x,
			App.player.position.y + App.player.getHeight(),
			App.player.position.z
		);
		App.assets.light.area.position.set(App.player.position);

		// interaction logic

		var check, pos, pitch, yaw;

		check = false;
		pos = App.controls.getObject().position;
		pitch = App.controls.getPitch();
		yaw = App.controls.getYaw();

		for (var i=0; i<App.logic.focalPoints.length; i+=1) {
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

	draw: function() {
		// draw scene

		App.render.render(App.scene, App.camera);
	},

	loop: function() {
		// main loop

		requestAnimationFrame(App.loop);
		App.timer.update();
		App.timer.nextFrame();

		if (!App.timer.paused) {
			App.update(App.timer.delta, App.timer.interval);
			App.draw();
			$(".hud__time").html(
				Math.floor(App.player.position.x * 10) / 10 + ", " +
				Math.floor(App.player.position.y * 10) / 10 + ", " +
				Math.floor(App.player.position.z * 10) / 10 +
				"<br />current level: " + App.currentRoom +
				"<br />speed: " + App.player.speed + "m/s"
			);
		}
	}
};

window.onload = function() {
	App.init();
}
