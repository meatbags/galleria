const HUD = function(domElement) {
  this.domElement = domElement;
  this.threshold = {
    x: 0.225,
    y: 0.25
  };
  this.init();
};

HUD.prototype = {
  init: function() {
    this.left = document.getElementsByClassName('hud__left')[0];
    this.right = document.getElementsByClassName('hud__right')[0];
  },

  isLeft: function(x) {
    return (x < this.threshold.x * this.domElement.width);
  },

  isRight: function(x) {
    return (x > (1 - this.threshold.x) * this.domElement.width);
  },

  isHigh: function(y) {
    return ((y - this.domElement.getBoundingClientRect().top) < this.domElement.height * this.threshold.y);
  },

  isLow: function(y) {
    return ((y - this.domElement.getBoundingClientRect().top) > this.domElement.height * (1 - this.threshold.y));
  },

  isLeftOrRight: function(x) {
    return (this.isLeft(x) || this.isRight(x));
  },

  getHighFactor: function(y) {
    const t = this.domElement.height * this.threshold.y;
    
    return ((t - (y - this.domElement.getBoundingClientRect().top)) / t);
  },

  getLowFactor: function(y) {
    const t = this.domElement.height * this.threshold.y;

    return (1 - ((this.domElement.height - (y - this.domElement.getBoundingClientRect().top)) / t));
  },

  getLeftFactor: function(x) {
    const t = this.domElement.width * this.threshold.x;

    return ((t - x) / t);
  },

  getRightFactor: function(x) {
    const t = this.domElement.width * this.threshold.x;

    return (1 - (this.domElement.width - x) / t);
  }
};

export default HUD;
