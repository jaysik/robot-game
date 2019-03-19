export default class Screen {
	constructor(canvasLayers) {
		this.winW = window.innerWidth;
		this.winH = window.innerHeight;
		this.aspectRatio = 9/16;
		this.maxW = this.winW * (1/(1-this.aspectRatio));
		this.maxH = this.winH * this.aspectRatio;

		// Get canvas elements by name
		this.canvas = {};

		canvasLayers.forEach(layer => {
			this.canvas[layer] = document.getElementById(layer);
		});

	}

	createBackground() {
		this.setSize(this.canvas.background);
		this.canvas.background.style.background = 'yellow';
	}

	createPlayerLayer() {
		this.setSize(this.canvas.player);
		// this.canvas.player.style.background = 'blue';
	}

	setSize(canvas) {
		if (this.winW < this.winH) {
			canvas.width = this.winW;
			canvas.height = this.maxH;
		} else if (this.winW > this.winH) {
			canvas.width = this.maxW;
			canvas.height = this.maxH;
		}
	}
}
