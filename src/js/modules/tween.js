// simple tweening

function Tween(object, property, target, time, props) {
	this.object = object;
	this.prop = property;
	this.initial = this.object[this.prop];
	this.target = target;
	this.time = time;
	this.easing = props.easing || "ease-in-and-out";
	this.onUpdate = props.onUpdate || false;
	this.onComplete = props.onComplete || false;
	this.loop = props.loop || false;
	this.oscillate = props.oscillate || false;
	this.complete = false;
	this.age = 0;
}

Tween.prototype = {
	animate: function(delta) {
		this.age += delta;
		
		if (this.age >= this.time) {
			if (this.onComplete)
				this.onComplete();
			
			// loop, oscillate, or stop animation
			
			if (this.loop) {
				this.age -= this.time;	
			} else if (this.oscillate) {
				var i, t;
				
				i = this.initial;
				t = this.target;
				
				this.target = i;
				this.initial = t;
				this.age -= this.time;
			} else {
				this.object[this.prop] = this.target;
				this.complete = true;
				return;
			}
		}
		
		var f = this.age / this.time;
		
		// quadratic easing [0, 1] -> [0, 1]
		
		if (this.easing == "ease-in-and-out")
			f = (f < 0.5) ? 2 * f * f : -1 + (4 - 2 * f) * f; 
		else if (this.easing == "ease-in")
			f = f * f;
		else if (this.easing == "ease-out")
			f = 1 - ((1 - f) * (1 - f));
		else if (this.easing == "quartic")
			f = Math.pow(f, 4);

		this.object[this.prop] = this.initial + f * (this.target - this.initial);
		
		// user-defined function
		
		if (this.onUpdate)
			this.onUpdate();
	},
	
	isComplete: function() {
		return this.complete;
	}
}

// basic oscillators

function Infinite(func) {
	this.onUpdate = func;
	this.age = 0;
	this.delta = 0;
}

Infinite.prototype = {
	animate: function(delta) {
		this.delta = delta;
		this.age += delta;
		this.onUpdate();
	},
	
	isComplete: function() {
		return false;	
	}
}

function Repeater(time, func, props) {
	this.time = time;
	this.age = 0;
	this.onUpdate = func;
};

Repeater.prototype = {
	animate: function(delta) {
		this.age += delta;
		
		if (this.age > this.time)
			this.age -= this.time;
		
		this.onUpdate();
	},
	
	isComplete: function() {
		return false;	
	}
}

// sprite

function Sprite(mesh, frames, interval, props) {
	this.mesh = mesh;
	this.frames = frames;
	this.interval = interval;
	this.currentFrame = 0;
	this.age = 0;
}

Sprite.prototype = {
	animate: function(delta) {
		var frame;
		
		this.age += delta;
		frame = Math.floor(this.age / this.interval) % this.frames.length;
		
		if (frame != this.currentFrame) {
			this.currentFrame = frame;
			this.mesh.material.map = this.frames[this.currentFrame];
		}
	},
	
	isComplete: function() {
		return false;
	}
}