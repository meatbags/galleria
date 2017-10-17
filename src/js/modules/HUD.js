const HUD = function() {
  this.elements = {
    left: $('.arrow-left'),
    right: $('.arrow-right')
  };
};

HUD.prototype = {
  clear: function() {
    this.removeClass(this.elements.left, 'hover');
    this.removeClass(this.elements.right, 'hover');
  },

  hoverLeft: function() {
    this.addClass(this.elements.left, 'hover');
    this.removeClass(this.elements.right, 'hover');
  },

  hoverRight: function() {
    this.addClass(this.elements.right, 'hover');
    this.removeClass(this.elements.left, 'hover');
  },

  clickLeft: function() {
    const self = this;
    this.addClass(this.elements.left, 'active');
    setTimeout(function(){
      self.removeClass(self.elements.left, 'active');
    }, 250);
  },

  clickRight: function() {
    const self = this;
    this.addClass(this.elements.right, 'active');
    setTimeout(function(){
      self.removeClass(self.elements.right, 'active');
    }, 250);
  },

  addClass: function(elem, className) {
    if (!elem.hasClass(className)) {
      elem.addClass(className);
    }
  },

  removeClass: function(elem, className) {
    if (elem.hasClass(className)) {
      elem.removeClass(className);
    }
  }
};

export default HUD;
