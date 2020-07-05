import Keyboard from './keyboardState.js';

export default class Player {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.height = this.canvas.height / 18;
		this.width = this.canvas.width / 30;
		this.xVelocity = this.width * 0.007;
		this.yVelocity = this.height * 0.03;
		this.moveRight = false;
		this.moveLeft = false;
		this.jump = false;
		this.startPos = {
			x: 0,
			y: this.height * 17
		};
		this.pos = {
			x: this.startPos.x,
			y: this.startPos.y,
		};

		// Initialize
		this.input = new Keyboard();
		this.input.listenTo(window);
		this.addKeys();

	}

	// Character box must be 60x64 for the aspect ratio.
	draw() {
		let sprite = new Image();
		sprite.src = '../../illustrations/robot-2.png';
		this.context.drawImage(sprite, this.pos.x, this.pos.y, this.width, this.height)
	}

	addKeys() {
		this.input.addMapping('d', keyState => {
			if (keyState) {
				this.moveRight = true;
			} else {
				this.moveRight = false;
			}
		});

		this.input.addMapping('a', keyState => {
			keyState ? this.moveLeft = true : this.moveLeft = false;
		});

		this.input.addMapping('w', keyState => {
			if (keyState) {
				this.jump = true;
			} else {
				this.jump = false;
			}
		})
	}

	jumpPhysics () {
		let duration = 0.5;
		let velocity = 200;
		let engageTime = 0;


	}

	position(frame) {
		let gravity = 0.0003* this.height;

		if (this.moveRight) {
			this.pos.x += (this.xVelocity * frame);
		}
		if (this.moveLeft) {
			this.pos.x -= (this.xVelocity * frame);
		}
		if (this.jump) {
			this.pos.y -= (this.yVelocity * frame);
			this.yVelocity -= gravity;
		} else {
			this.pos.y = this.startPos.y;
			this.yVelocity = this.height * 0.01;
		}

	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

}