const BoundingBox = function(pos, dim) {
  this.box = {
    x: {
      min: pos.x - dim.x / 2,
      max: pos.x + dim.x / 2,
      size: dim.x,
    },
    y: {
      min: pos.y - dim.y / 2,
      max: pos.y + dim.y / 2,
      size: dim.y,
    },
    z: {
      min: pos.z - dim.z / 2,
      max: pos.z + dim.z / 2,
      size: dim.z,
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

  collision2D: function(pos) {
    return (
      pos.x >= this.box.x.min && pos.x <= this.box.x.max &&
      pos.z >= this.box.z.min && pos.z <= this.box.z.max
    );
  },

  getTop: function(pos) {
    return this.box.y.max;
  }
};

const BoundingRamp = function(pos, dim, type) {
  this.box = new BoundingBox(pos, dim);
  this.type = type;
}

BoundingRamp.prototype = {
  collision: function(pos) {
    return this.box.collision(pos);
  },

  collision2D: function(pos) {
    return this.box.collision2D(pos);
  },

  getTop: function(pos) {
    let top = this.box.box.y.min;

    if (this.type === 0) {
      top += ((pos.z - this.box.box.z.min) / this.box.box.z.size) * this.box.box.y.size;
    } else if (this.type === 1) {
      top += ((pos.x - this.box.box.x.min) / this.box.box.x.size) * this.box.box.y.size;
    } else if (this.type === 2) {
      top += ((this.box.box.z.max - pos.z) / this.box.box.z.size) * this.box.box.y.size;
    } else {
      top += ((this.box.box.x.max - pos.x) / this.box.box.x.size) * this.box.box.y.size;
    }

    return top;
  }
}

export { BoundingBox, BoundingRamp };
