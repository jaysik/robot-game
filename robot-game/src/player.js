
const PRESSED = 1;
const RELEASED = 0;

class KeyboardState {
	constructor() {
		// Holds the current state of a given key
		this.keyStates = new Map();

		// Holds the callback functions for a key code
		this.keyMap = new Map();

	}

	addMapping(keyCode, callback) {
		this.keyMap.set(keyCode, callback);
	}

	handleEvent(event) {
		const {keyCode} = event;

		if (!this.keyMap.has(keyCode)) {
			// No key was found - It was not mapped.
			return;
		}

		event.preventDefault(); // Block original key events so they can be mapped.

		const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

		if (this.keyStates.get(keyCode) === keyState) {
			// Found key
			return;
		}

		this.keyStates.set(keyCode, keyState);

		this.keyMap.get(keyCode)(keyState);
	}

	// Create Listener
	listenTo(window) {
		['keydown', 'keyup'].forEach(eventName => {
			window.addEventListener(eventName, event => {
				this.handleEvent(event);
			});
		})
	}


}

function moveRight(x) {
	x += this.velocity * frame;
}

document.addEventListener('keydown', (event) => {
	console.log(event)
});


export default class Player {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.height = this.canvas.height / 18;
		this.width = this.canvas.width / 30;
		this.velocity = 0.2;
		this.startPos = {
			x: 0,
			y: this.height * 17
		};
		this.pos = {
			x: this.startPos.x,
			y: this.startPos.y,
		};

		// Initialize
		// this.keyListener();

	}


	// Character box must be 60x64 for the aspect ratio.
	draw() {
		let sprite = new Image();
		sprite.src = '../illustrations/robot-2.png';
		this.context.drawImage(sprite, this.pos.x, this.pos.y, this.width, this.height)
	}
	//
	// keyListener(key) {
	// 	document.addEventListener('keyup', (event) => {
	// 		if (event.key === key) {
	// 			console.log('pressed ', key);
	// 			return key
	// 		}
	// 	});
	// }
	//
	//
	// moveRight(frame) {
	// 	// console.log(this.keyListener('d'));
	// 	// if (this.keyListener('d') === 'd') {
	// 	// 	this.pos.x += this.velocity * frame
	// 	// }
	// }

	move(frame) {


		this.moveRight(frame)


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