THREE.Water = function() {
	// load
	
	var waterShader = THREE.Water.WaterShader;
	var waterUniforms = THREE.UniformsUtils.clone({
		time: {
			type: "f",
			value: 1.0
		}
	});
	var waterMat = new THREE.ShaderMaterial({
		fragmentShader: $("#fragment-shader-noise").text(),
		vertexShader: $("#vertex-shader").text(),
		uniforms: waterUniforms
	});
	var waterGeo = new THREE.BoxBufferGeometry(6, 0.5, 6, 100, 100, 100);
	var waterMesh = new THREE.Mesh(waterGeo, waterMat);
	
	// set vars
	
	this.mesh = waterMesh;
	this.uniforms = waterUniforms;
	this.update = function(delta) {
		this.uniforms.time.value += delta;
	}
};