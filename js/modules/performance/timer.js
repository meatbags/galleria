class Timer {
	constructor() {
		// timing and performance

		this.delta = 0;
		this.maxDelta = 1 / 30;
		this.now = 0;
		this.then = 0;

		// set

		this.reset();
	}

	update() {
		// update timer
		
		this.then = this.now;
		this.now = (new Date()).getTime();
		this.delta = (this.now - this.then) / 1000.;
	}

	getDelta() {
		// get delta

		return this.delta;
	}

	reset() {
		// reset timer

		this.now = (new Date()).getTime();
		this.then = this.now;
	}
}

export default Timer;
