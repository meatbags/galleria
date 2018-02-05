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

  _load() {
    // load room and collision map

    const mapSource = 'hangar_extended';//(this.isMonday) ? 'hangar_monday' : 'hangar_extended';
    const collisionSource = 'hangar_extended_collision';//(this.isMonday) ? 'hangar_collision_map_monday' : 'hangar_collision_map';

    // flag

    this.toLoad = 2;
    this.isLoaded = () => { return this.toLoad <= 0; };

    // load collisions

    this.loader.loadOBJ(collisionSource).then((map) => {
      map.children.forEach((child) => { this.collider.add(new Collider.Mesh(child)); });
      this.toLoad -= 1;
    }, (err) => { console.warn('Collider load', err); });

    // load map

    this.loader.loadOBJ(mapSource).then((map) => {
      this.scene.add(map);
      this.toLoad -= 1;
    }, (err) => { console.warn('Model load', err); });
  }
}

export default RoomLoader;
