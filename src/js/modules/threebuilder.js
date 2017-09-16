// helper functions and constants

function getPitchYawRoll(a, b) {
	var mag, pitch, yaw, roll;
	
	mag = getMagnitude2D(a, b);
	yaw = 0;
	pitch = Math.atan2(b.y - a.y, mag) - Math.PI / 2;
	roll = Math.atan2(b.x - a.x, b.z - a.z);

	return {pitch: pitch, yaw: yaw, roll: roll};
};

function getAveragePosition(a, b) {
	return Vec3(
		(b.x + a.x) / 2,
		(b.y + a.y) / 2,
		(b.z + a.z) / 2
	);
};

function getMagnitude2D(a, b) {
	return Math.sqrt(
		Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2)
	);
}

function getMagnitude3D(a, b) {
	return Math.sqrt(
		Math.pow(b.x - a.x, 2) +
		Math.pow(b.y - a.y, 2) +
		Math.pow(b.z - a.z, 2)
	);
}

function Vec3(x, y, z) {
	var v = new THREE.Vector3(x, y, z);
	
	return v;
}

function PointLight(colour, intensity, dropOff, pos) {
	var p = new THREE.PointLight(colour, intensity, dropOff, 2);
	p.position.set(pos.x, pos.y, pos.z);
	
	return p;
}

function AmbientLight(colour, intensity) {
	var a = new THREE.AmbientLight(colour, intensity);
	
	return a;
}

function TextureList(filename, from, to, filetype) {
	var t = [];
	
	for (var i=from; i<=to; i+=1) {
		var src = filename + i + filetype;
		
		t.push(Texture(src));
	}
	
	return t;
}

function Texture(filename) {
	var t = App.TextureLoader.load(baseUrl + "lib/img/" + filename);
	
	return t;
}

function NeonGlobe(from, to, size, zwall) {
	var mag, mesh, p, r, t;
	
	mag = getMagnitude3D(from, to);
	mesh = new THREE.Mesh(
		new THREE.CylinderBufferGeometry(size, size, mag, 4),
		new THREE.MeshBasicMaterial({
			color: Math.floor(0xffffff)
		})
	);
	p = getAveragePosition(from, to);
	r = getPitchYawRoll(from, to);
	t = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1, mag * 1.2),
		new THREE.MeshBasicMaterial({
			transparent: true,
			side: THREE.DoubleSide,
			transparent: true,
			color: 0xffffff,
			map: Build.tex.neon
		})
	);
	if (zwall) {
		t.rotation.y = Math.PI / 2;	
	}
	mesh.add(t);
	mesh.position.set(p.x, p.y, p.z);
	mesh.rotation.set(r.pitch, r.yaw, r.roll);
	
	return mesh;
}

function TexturedPlaneMesh(x, y, pos, tex) {
	var mesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(x, y),
		new THREE.MeshBasicMaterial({
			transparent: true,
			side: THREE.DoubleSide,
			color: 0xffffff,
			map: Texture(tex)
		})
	);
	mesh.position.set(pos.x, pos.y, pos.z);
	
	return mesh;
};

function TextureSprite(x, y, pos, tex) {
	var sprite = new THREE.Sprite(
		new THREE.SpriteMaterial({
			map: Texture(tex),
			color: 0xffffff
		})
	);
	sprite.position.set(pos.x, pos.y, pos.z);	
	
	return sprite;
}

function PlaneMesh(x, y, mat, pos) {
	var mesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(x, y), mat
	);
	mesh.position.set(pos.x, pos.y, pos.z);
	
	return mesh;
}

function BoxMesh(x, y, z, mat, pos) {
	var mesh = new THREE.Mesh(
		new THREE.BoxBufferGeometry(x, y, z), mat
	);
	mesh.position.set(pos.x, pos.y, pos.z);
	
	return mesh;
}

function WallXMesh(x, y, mat, pos) {
	var mesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(x, y), mat
	);
	mesh.rotation.x = Math.PI * 0.5;
	mesh.position.set(pos.x, -pos.z, pos.y);
	
	return mesh;
}

function WallZMesh(x, y, mat, pos) {
	var mesh, geo, y;
	
	geo = new THREE.PlaneBufferGeometry(x, y);
	mesh = new THREE.Mesh(
		geo, mat
	);
	mesh.rotation.set(Math.PI * 0.5, Math.PI * 0.5, 0);
	mesh.position.set(pos.x, -pos.z, pos.y);
	
	return mesh;
}

var Build = {
	init: function() {
		this.tex = {};
		this.mat = {};
		
		// load textures
		
		this.tex.sandstone = Texture("sandstone.jpg");
		this.tex.sandstone.wrapS = this.tex.sandstone.wrapT = THREE.RepeatWrapping;
		this.tex.sandstone.repeat.set(200, 200);
		this.tex.neon = Texture("glow.png");
		
		// load mats
		
		this.mat.concrete = new THREE.MeshPhysicalMaterial({
			color: 0xf5efda,
			emissive: 0x888888,
			metalness: 0.0,
			roughness: 1.0,
			bumpMap: this.tex.sandstone,
			bumpScale: 0.02
		});
		this.mat.concreteDouble = new THREE.MeshPhysicalMaterial({
			color: 0xf5efda,
			emissive: 0x888888,
			metalness: 0.0,
			roughness: 1.0,
			bumpMap: this.tex.sandstone,
			bumpScale: 0.02,
			side: THREE.DoubleSide
		});
		this.mat.ground = new THREE.MeshPhysicalMaterial({
			side: THREE.DoubleSide, 
			emissive: 0xaaaaaa, 
			metalness: 0, 
			roughness: 0.7
		});
		this.mat.neon = new THREE.MeshBasicMaterial({
			color: Math.floor(0xffffff)
		});
		this.mat.obsidian = new THREE.MeshPhysicalMaterial({
			color: 0x888888,
			emissive: 0x0,
			metalness: 0.75,
			roughness: 0.5
		});
		this.mat.wireframe = new THREE.MeshBasicMaterial({
			wireframe: true
		});
	}	
}