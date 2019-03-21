export default class Screen {
	constructor(canvasLayers) {
		this.winW = window.innerWidth;
		this.winH = window.innerHeight;
		this.aspectRatio = 16/9;
		this.maxW = this.winH * this.aspectRatio;
		this.maxH = this.winW * (1/this.aspectRatio);

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
		if (this.winW / this.winH === this.aspectRatio) {
			// The aspect ratio matches!
			canvas.height = this.winH;
			canvas.width = this.winW;
		} else if (this.winH < this.winW) {
			if (this.maxW/this.winH === this.aspectRatio) {
				canvas.width = this.maxW;
				canvas.height = this.winH;
			} else {
				// Cannot maintain aspect, so need to resize both dimensions
				canvas.width = this.maxH * this.aspectRatio;
				canvas.height = this.maxH;
			}
		}	else if (this.winW < this.winH) {
			if (this.winW/this.maxH === this.aspectRatio) {
				canvas.width = this.winW;
				canvas.height = this.maxH;
			} else {
				// Cannot maintain aspect, so need to resize both dimensions
				canvas.width = this.maxW;
				canvas.height = this.maxW * (1/this.aspectRatio);
			}
		} else if (this.winW === this.winH) {
			canvas.width = this.winW;
			canvas.height = this.maxH;
		} else {
			console.Error('The screen did not resize correctly')
		}

	}
}
