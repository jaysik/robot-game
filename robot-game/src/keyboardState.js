const PRESSED = 1;
const RELEASED = 0;

export default class Keyboard {
	constructor() {
		// Holds the current state of a given key
		this.keyStates = new Map();

		// Holds the callback functions for a key code
		this.keyMap = new Map();

	}

	addMapping(key, callback) {
		this.keyMap.set(key, callback);
	}

	handleEvent(event) {
		const {key} = event;

		if (!this.keyMap.has(key)) {
			// No key was found - It was not mapped.
			console.log(key, ' was not found');
			return;
		}

		event.preventDefault(); // Block original key events so they can be mapped.

		const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

		// if (this.keyStates.get(key) === keyState) {
		// 	// Found key
		// 	console.log(key, ' was not mapped');
		// 	return;
		// }

		this.keyStates.set(key, keyState);

		this.keyMap.get(key)(keyState);
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