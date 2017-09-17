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
