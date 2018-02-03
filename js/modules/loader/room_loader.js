import LoadOBJ from './load_obj';

class RoomLoader {
  constructor(scene, collider, isMonday) {
    // load room from file

    this.scene = scene;
    this.collider = collider;
    this.isMonday = isMonday;
    this.toLoad = 0;
    this.loader = new LoadOBJ(appRoot + 'assets/3d/');
    this._load();
  }

  isLoaded() {
    // check if loaded

    return (this.toLoad <= 0);
  }

  _load() {
    // load room and collision map

    const mapSource = (this.isMonday) ? 'hangar_monday' : 'hangar_extended';
    const collisionSource = (this.isMonday) ? 'hangar_collision_map_monday' : 'hangar_collision_map';

    // flag

    this.toLoad = 2;

    // load collisions

    this.loader.loadOBJ(collisionSource).then((map) => {
      map.children.forEach((child) => { this.collider.add(new Collider.Mesh(child)); });
      this.toLoad -= 1;
    }, (err) => { console.log(err); });

    // load map

    this.loader.loadOBJ(mapSource).then((map) => {
      this.scene.add(map);
      this.toLoad -= 1;
    }, (err) => { console.log(err); });
  }
}

export default RoomLoader;
