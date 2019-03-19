import Timer from './timer.js';
import Player from './player.js';

// Initialization
let canvas = {};

let canvasLayers = [
	'background',
	'player'
];

canvas.background = document.getElementById('background');
canvas.player = document.getElementById('player');

let backgroundContext = canvas.background.getContext('2d');
let playerContext = canvas.player.getContext('2d');

const windowW = window.innerWidth;
const windowH = window.innerHeight;
const aspectRatio = 9/16;

const maxWidth = windowH * (1/(1-aspectRatio));
const maxHeight = windowW * aspectRatio;


if (windowW < windowH) {
	canvasLayers.forEach(layer => {
		canvas[layer].width = windowW;
		canvas[layer].height = maxHeight;
	});
} else if (windowW > windowH) {
		canvasLayers.forEach(layer => {
		canvas[layer].width = maxWidth;
		canvas[layer].height = windowH;
	});

}

canvas.background.style.background = 'yellow';

function drawGrid() {
	backgroundContext.beginPath(); // clears the sub-paths at the start
	// Vertical
	for(let x=0; x<=canvas.background.width; x+= (canvas.background.width/30)) {
		backgroundContext.moveTo(x,0);
		backgroundContext.lineTo(x,canvas.background.height);
	}

	for(let y=0; y<=canvas.background.height; y+=(canvas.background.height/18)) {
		backgroundContext.moveTo(0,y);
		backgroundContext.lineTo(canvas.background.width,y);
	}
	backgroundContext.closePath();

	backgroundContext.strokeStyle='grey';
	backgroundContext.stroke();
}


let timer = new Timer();
let player = new Player(canvas.player, playerContext);

(function mainLoop() {
	// Static layers - Don't need to render every frame.
	drawGrid();

	timer.startTimer();

	// Update changes of assets
	timer.update = (frame) => {
		player.movePlayer(frame);
	};

	// Draw the updated assets
	timer.draw = () => {
		// Clear Assets before new draw
		player.clear();

		// Draw assets
		player.drawPlayer();
	};
}());

