// world builder

var World = {
	
	// create the world
	
	globalObjects: function() {
		var tex, mat, stairs, groundMat, floorMat, p1, p2, p3, p4, f1, f2, f3;

		Build.init();
		
		// skybox
		
		App.assets.sky = new THREE.Sky();
		App.assets.plane = new THREE.Group();
		App.assets.floors = new THREE.Group();
		
		p1 = PlaneMesh(1000, 2000, Build.mat.ground, Vec3(-506.5, 0, 24));
		p2 = PlaneMesh(1000, 2000, Build.mat.ground, Vec3(506.5, 0, 24));
		p3 = PlaneMesh(13, 1000, Build.mat.ground, Vec3(0, -500 + 29, 24));
		p4 = PlaneMesh(13, 1000, Build.mat.ground, Vec3(0, 500 + 50, 24));
		f3 = PlaneMesh(40, 40, Build.mat.concreteDouble, Vec3(0, 9, 0));
		w1 = WallXMesh(40, 24, Build.mat.concreteDouble, Vec3(0, 12, 11));
		w2 = WallXMesh(13.5, 24, Build.mat.concreteDouble, Vec3(13.25, 12, -29));
		w3 = WallXMesh(13.5, 24, Build.mat.concreteDouble, Vec3(-13.25, 12, -29));
		w4 = WallZMesh(40, 24, Build.mat.concreteDouble, Vec3(-20, 12, -9));
		w5 = WallZMesh(40, 24, Build.mat.concreteDouble, Vec3(20, 12, -9));
		
		App.assets.plane.add(p1, p2, p3, p4, f3, w1, w2, w3, w4, w5);
		App.assets.plane.rotation.x = -Math.PI * 0.5;
		
		f1_1 = BoxMesh(15, 0.5, 40, Build.mat.concrete, Vec3(-12.5, 15.75, -9));
		f1_2 = BoxMesh(15, 0.5, 40, Build.mat.concrete, Vec3(12.5, 15.75, -9));
		f1_3 = BoxMesh(10, 0.5, 15, Build.mat.concrete, Vec3(0, 15.75, -9 -12.5));
		f1_4 = BoxMesh(10, 0.5, 15, Build.mat.concrete, Vec3(0, 15.75, -9 +12.5));
		f2_1 = BoxMesh(15, 0.5, 40, Build.mat.concrete, Vec3(-12.5, 7.75, -9));
		f2_2 = BoxMesh(15, 0.5, 40, Build.mat.concrete, Vec3(12.5, 7.75, -9));
		f2_3 = BoxMesh(10, 0.5, 15, Build.mat.concrete, Vec3(0, 7.75, -9 -12.5));
		f2_4 = BoxMesh(10, 0.5, 15, Build.mat.concrete, Vec3(0, 7.75, -9 +12.5));
		
		App.assets.floors.add(f1_1, f1_2, f1_3, f1_4, f2_1, f2_2, f2_3, f2_4);
		
		// lighting
		
		App.assets.light.a1 = AmbientLight(0xffffff, 0.0);
		App.assets.light.area = PointLight(0xffdddd, 0.25, 40, Vec3(0, 0, 0));
		App.assets.light.sun = PointLight(0xffffff, 0.9, 55000, App.assets.sky.uniforms.sunPosition.value);
		
		// load staircase

		App.assets.building = new THREE.Mesh();
		App.OBJLoader.load(baseUrl + "lib/assets/stair.obj", function(obj) {
			App.assets.building.geometry = obj.children[0].geometry;
			App.assets.building.material = Build.mat.concrete;
			
			for (var i=0; i<obj.children.length; i+=1) {
				App.assets.building.add(
					new THREE.Mesh(
						obj.children[i].geometry,
						Build.mat.concrete
					)
				);
			}
		});
		
		// picture frames
		
		for (var i=0; i<App.assets.images.length; i+=1) {
			App.scene.add(App.assets.images[i]);
		}
		
		// neon lights
		
		App.assets.neonGroup = new THREE.Group();
		
		// add to scene
		
		App.scene.add(
			App.assets.building,
			App.assets.plane,
			App.assets.floors,
			App.assets.light.a1,
			App.assets.light.area,
			App.assets.light.sun,
			App.assets.neonGroup
		);
		
		// physics
		
		stairs = StairWell({x:0, y:0, z:-41.5}); // central stair
		
		App.logic.terrain.platforms = App.logic.terrain.platforms.concat(stairs.platforms);
		App.logic.terrain.walls = App.logic.terrain.walls.concat(stairs.walls);
		App.logic.terrain.ramps = App.logic.terrain.ramps.concat(stairs.ramps);
		
		App.logic.terrain.platforms.push(
			new Platform({x:0, y:0, z:0}, {x:150, y:0, z:150}), // plane
			new Platform({x:-25 - 6.5, y:24, z:0}, {x:50, y:0, z:150}),
			new Platform({x: 25 + 6.5, y:24, z:0}, {x:50, y:0, z:150}),
			new Platform({x:0, y:24, z: 10.5 + 12.5}, {x:13, y:0, z:79 + 25}),
			new Platform({x:0, y:24, z:-62.5}, {x:13, y:0, z:25}),
			new Platform({x:0, y:16, z:-9}, {x:40, y:0, z:40}),
			new Platform({x:0, y:8, z:-9}, {x:40, y:0, z:40})
		);
		
		App.logic.terrain.walls.push(
			new Wall({x:-20.5, y:12, z:-9}, {x:1, y:24, z:40}, 0.5),
			new Wall({x: 20.5, y:12, z:-9}, {x:1, y:24, z:40}, 0.5),
			new Wall({x: 0, y: 12, z:11.5}, {x:40, y:24, z:1}, 0.5),
			new Wall({x: 13.25, y:12, z:-29.5}, {x:13.5, y:24, z:1}, 0.5),
			new Wall({x:-13.25, y:12, z:-29.5}, {x:13.5, y:24, z:1}, 0.5)
		);
	},
	
	outside: function() {
		// snow storm
		
		App.assets.snow = new THREE.Points(
			new THREE.Geometry(),
			new THREE.PointsMaterial({
				size: 0.5,
				opacity: 0.25,
				map: Texture("snow.png"),
				blending: THREE.AdditiveBlending,
				depthTest: true,
				transparent : true
			})
		);
		
		for (var i=0; i<1200; i+=1) {
			var x, y, z;
			
			x = Math.random() * 150 - 75;
			y = Math.random() * 50 + 24;
			z = Math.random() * 150 - 75;
			v = Vec3(x, y, z);
			v.vec = Vec3(
				Math.random() * 0.4 - 0.1,
				Math.random() * -1. - 0.5,
				Math.random() * 0.2
			);
			
			App.assets.snow.geometry.vertices.push(v);
		}
		
		App.assets.snow.update = function(delta) {
			var px0, px1, pz0, pz1;
			
			px0 = App.player.position.x - 50;
			px1 = App.player.position.x + 50;
			pz0 = App.player.position.z - 50;
			pz1 = App.player.position.z + 50;
			
			for (var i=0; i<App.assets.snow.geometry.vertices.length; i+=1) {
				var p, x, y, z;
				
				p = App.assets.snow.geometry.vertices[i];
				p.x = p.x + p.vec.x * delta;
				p.y = p.y + p.vec.y * delta;
				p.z = p.z + p.vec.z * delta;
				
				if (p.y < 24)
					p.y += 50;
			}
			App.assets.snow.geometry.verticesNeedUpdate = true;
		};
		
		// flashing logo
		
		App.assets.eye = new THREE.Group();
		
		App.assets.eye.mesh = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(5, 5),
			new THREE.MeshBasicMaterial({transparent: true, color:0xffffff})
		);
		App.assets.eye.mesh.position.set(0, 35, -28.5);
		App.assets.eye.textures = TextureList("logo_", 1, 2, ".png");
		App.assets.eye.mesh.material.map = App.assets.eye.textures[0];
		App.assets.light.eye = PointLight(0xff0000, 0.5, 25, Vec3(0, 36, -26));
		App.assets.eye.add(App.assets.eye.mesh, App.assets.light.eye);
		
		// add to scene
		
		App.scene.add(
			App.assets.sky.mesh,
			App.assets.snow,
			App.assets.eye
		);
		
		// animation
		
		App.animation.push(
			new Sprite(App.assets.eye.mesh, App.assets.eye.textures, 1.5, {}),
			new Tween(App.assets.eye.mesh.material, "opacity", 0.1 + Math.random() * 0.9, 0.25, {
				loop: true,
				onComplete: function(){
					this.target = 0.1 + Math.random() * 0.9;
				}
			})
		);
	},
	
	room1: function() {
		var tex, mat;
		
		App.assets.room1 = new THREE.Mesh();
		App.OBJLoader.load(baseUrl + "lib/assets/room_1.obj", function(obj) {
			App.assets.room1.geometry = obj.children[0].geometry;
			App.assets.room1.material = Build.mat.obsidian;
			
			for (var i=0; i<obj.children.length; i+=1) {
				App.assets.room1.add(
					new THREE.Mesh(
						obj.children[i].geometry,
						Build.mat.wireframe
					)
				);
			}
		});
		
		App.assets.room1.position.set(0, 16, -9);
		
		/*
		App.assets.mirror = new THREE.Mirror(
			40, 15, {clipBias: 0.003, textureWidth: 1024, textureHeight: 512, color: 0x777777}
		);
		App.assets.mirror.rotateX( - Math.PI / 2 );
		App.assets.mirror.position.set(0, 16.05, -9 + 12.5);
		*/
		
		// add to scene
		
		App.scene.add(
			App.assets.room1
		);
	},
	
	room2: function() {
		
	},
	
	room3: function() {
		
	},
	
	checkRoom: function() {
		
		// change rooms
		var x, y;
		
		x = App.player.position.x;
		y = App.player.position.y;
		
		if (y > 20.1 || (y > 19 && x > 0)) {
			if (App.currentRoom != 0) {
				App.currentRoom = 0;

				// show sky, snow, neon sign

				App.assets.snow.visible = true;
				App.assets.sky.mesh.visible = true;
				App.assets.eye.visible = true;
			}
		}
		else if (y > 12.1 || (y > 11 && x > 0) || (y > 19 && x < 0)) {
			if (App.currentRoom != 1) {
				App.currentRoom = 1;

				// hide sky, snow, neon sign

				App.assets.snow.visible = false;
				App.assets.sky.mesh.visible = false;
				App.assets.eye.visible = false;
			}
		}
		else if (y > 4.1 || (y > 3 && x > 0) || (y > 11 && x < 0)) {
			if (App.currentRoom != 2) {
				App.currentRoom = 2;
			}
		}
		else {
			if (App.currentRoom != 3) {
				App.currentRoom = 3;
			}
		}
	},
	
	updateRoom: function(delta) {
		
		if (Math.random() > 0.8) {
			for (var i=0; i<App.assets.neonGroup.children.length; i+=1) {
				App.assets.neonGroup.children[i].children[0].material.opacity = 0.65 + Math.random() * 0.35;
			}
		}
			
		if (App.currentRoom == 0) {
			App.assets.snow.update(delta);
		} else if (App.currentRoom == 1) {
			;
		} else if (App.currentRoom == 2) {
			;
		} else {
			;	
		}
	}
};