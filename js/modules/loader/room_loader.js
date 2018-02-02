import LoadOBJ from './load_obj';

// load rooms

class RoomLoader {
  constructor(scene, collider, isMonday) {
    this.scene = scene;
    this.collider = collider;
    this.isMonday = isMonday;
    this.toLoad = 0;
    this.loader = new LoadOBJ(appRoot + 'assets/3d/');
    this._load();
  }

  isLoaded() {
    return (this.toLoad == 0);
  }

  _load() {
    const mapSource = (this.isMonday) ? 'hangar_monday' : 'hangar';
    const collisionSource = (this.isMonday) ? 'hangar_collision_map_monday' : 'hangar_collision_map';

    // load collisions

    const floor = new THREE.Mesh(
      new THREE.BoxBufferGeometry(100, 0.5, 100),
      new THREE.MeshPhongMaterial({color: 0x444444})
    );
    
    this.collider.add(new Collider.Mesh(floor.geometry));
    this.scene.add(floor);

    /*
    this.loader.loadOBJ(collisionSource).then((map) => {
      map.children.forEach((child) => {
        this.collider.add(new Collider.Mesh(child.geometry));
      });
      this.toLoad -= 1;
    }, (err) => { console.log(err); });

    // load map

    this.loader.loadOBJ(mapSource).then((map) => {
      this.scene.add(map);
      this.toLoad -= 1;
    }, (err) => { console.log(err); });
    */
  }
}

/*
if (!isMonday) {
  const path = appRoot + 'assets/3d/gallery.fbx';

  console.log(path);

  LoadFBX(path, new THREE.ShaderMaterial(THREE.DepthShader)).then((meshes) => {
    this.toLoad -= 1;
    meshes.forEach((mesh) => {
      this.scene.add(mesh)
    });
  }, (err) => { throw(err); });
}
*/

export default RoomLoader;
