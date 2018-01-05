import LoadOBJ from './load_obj';

// load rooms

class RoomLoader {
  constructor(scene, collider, isMonday) {
    this.scene = scene;
    this.collider = collider;
    this.isMonday = isMonday;
    this.toLoad = 2;
    this.loader = new LoadOBJ()
    this._load();
  }

  isLoaded() {
    return (this.toLoad == 0);
  }

  _load() {
    const mapSource = (this.isMonday) ? 'hangar_monday' : 'hangar';
    const collisionSource = (this.isMonday) ? 'hangar_collision_map_monday' : 'hangar_collision_map';

    // load collisions
    this.loader.loadOBJ(collisionSource).then(function(map){
      for (let i=0; i<map.children.length; i+=1) {
        self.collider.add(new Collider.Mesh(map.children[i].geometry));
      }
      self.toLoad -= 1;
    }, function(err){ console.log(err); });

    // load map
    this.loader.loadOBJ(mapSource).then(function(map) {
      self.scene.add(map);
      self.toLoad -= 1;
    }, function(err){ console.log(err); });
  }
}

export default RoomLoader;
