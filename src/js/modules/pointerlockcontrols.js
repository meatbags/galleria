THREE.PointerLockControls = function (camera, dir) {
	var scope = this;

	camera.rotation.set(0, 0, 0);

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );
	pitchObject.rotation.x = dir.x;
	
	var yawObject = new THREE.Object3D();
	yawObject.position.y = 10;
	yawObject.add( pitchObject );
	yawObject.rotation.y = dir.y;
	
	var PI_2 = Math.PI / 2;
	var PI_4 = Math.PI / 4;
	
	var target = {x:pitchObject.rotation.x, y:yawObject.rotation.y, z:0};

	var onMouseMove = function ( event ) {

		if ( scope.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		target.y -= movementX * 0.002;
		target.x -= movementY * 0.002;
		target.x = Math.max( -PI_4, Math.min( PI_4, target.x ) );
	};

	this.dispose = function() {
		document.removeEventListener( 'mousemove', onMouseMove, false );
	};

	document.addEventListener( 'mousemove', onMouseMove, false );

	this.update = function() {
		yawObject.rotation.y += (target.y - yawObject.rotation.y) * 0.25;
		pitchObject.rotation.x += (target.x - pitchObject.rotation.x) * 0.25;
	};
	
	this.enabled = false;

	this.getObject = function () {
		return yawObject;
	};

	this.getPitch = function() {
		return pitchObject.rotation.x;
	}
	
	this.getYaw = function() {
		return yawObject.rotation.y;
	}
	
	this.getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, - 1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		};

	}();

};