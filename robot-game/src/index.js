import Timer from './timer.js';
import Screen from './screen.js';
import Player from './player.js';
import DeveloperTools from './developer-tools.js';

let canvasLayers = [
	'background',
	'player',
	'devtools'
];
let timer = new Timer();
let screen = new Screen(canvasLayers);

(function mainLoop() {
	// Render the screen layers
	screen.createBackground();
	screen.createPlayerLayer();

	// The screen layers needs to be created before placing assets on it.
	let devTools = new DeveloperTools(screen.canvas.background);
	let player = new Player(screen.canvas.player);

	// Static layers - Don't need to render every frame.
	devTools.drawGrid();


	/* Start the game loop */
	timer.startTimer();

	// Update changes of assets
	timer.update = (frame) => {
		player.move(frame);
	};

	// Draw the updated assets
	timer.draw = () => {
		// Clear Assets before new draw
		player.clear();

		// Draw assets
		player.draw();
	};
}());

