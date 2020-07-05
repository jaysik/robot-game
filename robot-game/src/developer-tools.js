export default class DeveloperTools {
	constructor(backgroundCanvas) {
		this.canvas = backgroundCanvas;
		this.context = backgroundCanvas.getContext('2d');
	}

	drawGrid(bool) {
		if (bool) {
			this.context.beginPath(); // clears the sub-paths at the start
			// Vertical
			for(let x=0; x<=this.canvas.width; x+= (this.canvas.width/30)) {
				this.context.moveTo(x,0);
				this.context.lineTo(x,this.canvas.height);
			}

			for(let y=0; y<=this.canvas.height; y+=(this.canvas.height/18)) {
				this.context.moveTo(0,y);
				this.context.lineTo(this.canvas.width,y);
			}
			this.context.closePath();

			this.context.strokeStyle='grey';
			this.context.stroke();
		}
	}
}