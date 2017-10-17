const Timer = function() {
	this.maxDelta = 1 / 30.;
	this.reset();
};

Timer.prototype = {
	update: function() {
		this.then = this.now;
		this.now = (new Date()).getTime();
		this.delta = (this.now - this.then) / 1000.;
	},

	getDelta: function() {
		return (this.delta > this.maxDelta) ? this.maxDelta : this.delta;
	},

	reset: function() {
		this.now = (new Date()).getTime();
		this.then = this.now;
	}
}

export default Timer;
