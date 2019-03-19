
export default class Timer {
	/*
	* The requestAnimationFrame will vary based on the Hz of the monitors it is displaying to. So we want
	* to decouple those refresh rates and generate our own consistent timer.
	* */
	constructor() {
		this.fps = 120;
		this.timeStep = 1000/this.fps;
		this.lastFrameTimeMs = 0;
		this.accumulatedTimeDiff = 0;
		this.fpsmeter = new FPSMeter({
			decimals:0,
			graph: true,
			theme:'colorful',
			heat:'0',
			left: '5px'
		});
	}

	startTimer() {
		requestAnimationFrame(this.runLoop);
	}

	runLoop = (timestamp = 0) => {
		let numUpdateSteps = 0;
		this.fpsmeter.tickStart();

		// Track the accumulated time that wasn't tracked.
		this.accumulatedTimeDiff += timestamp - this.lastFrameTimeMs;
		this.lastFrameTimeMs = timestamp;
		// Simulates the total elapsed time
		while (this.accumulatedTimeDiff >= this.timeStep) {
			// Updates multiple of times between each requestAnimationFrame.
			this.update(this.timeStep);
			this.accumulatedTimeDiff -= this.timeStep;
			this.fpsmeter.tick(); // Update the fps meter

			// Sanity Check if this loops takes too long
			if (++numUpdateSteps >= 240) {
				this.panic(); // Fix it
				break; // Bail
			}
		}

		this.draw();
		requestAnimationFrame(this.runLoop);
	};

	panic() {
		// Reset the accumulated time to sync the player.
		console.log('Panic! Panic! The timer loop took too long.');
		this.accumulatedTimeDiff = 0;
	}


}