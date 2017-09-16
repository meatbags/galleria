const BoundingBox = function(pos, dim) {
  this.box = {
    x: {
      min: pos.x - dim.x / 2,
      max: pos.x + dim.x / 2,
    },
    y: {
      min: pos.y - dim.y / 2,
      max: pos.y + dim.y / 2,
    },
    z: {
      min: pos.z - dim.z / 2,
      max: pos.z + dim.z / 2,
    }
  }
};

BoundingBox.prototype = {
  collision: function(pos) {
    return (
      pos.x >= this.box.x.min && pos.x <= this.box.x.max &&
      pos.y >= this.box.y.min && pos.y <= this.box.y.max &&
      pos.z >= this.box.z.min && pos.z <= this.box.z.max
    );
  },

  getTop: function() {
    return this.box.y.max;
  }
};

export default BoundingBox;
