
export default class Player {
	constructor(canvas, context) {
		this.pos = {
			x: 0,
			y: 0
		};
		this.velocity = 0.2;
		this.canvas = canvas;
		this.context = context;
		this.height = this.canvas.height/18;
		this.width = this.canvas.width/30;
	}


	// Character box must be 60x64 for the aspect ratio.
	drawPlayer() {
		let sprite = new Image();
		sprite.src = '../illustrations/robot-2.png';
		this.context.drawImage(sprite, this.pos.x, this.pos.y, this.width, this.height)
	}

	movePlayer(frame) {
		this.pos.x += this.velocity * frame
		// if (x + charVelocity * frame > canvas.width - charWidth) {
		// 	x = (charWidth/30) * 2;
		// } else {
		// 	x += charVelocity * frame;
		// }
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

}