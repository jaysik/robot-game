import Screen from './screen';


test('check screen dimensions is less than the window dimensions 1920x1080', () => {
	document.body.innerHTML = `
		<canvas id="background"/>
	`;

	const canvasLayers = ['background'];

	let screen = new Screen(canvasLayers);
	screen.winW = 1920;
	screen.winH = 1080;

	screen.setSize(screen.canvas.background);

	expect(screen.canvas.background.height).toBeLessThanOrEqual(1080);
	expect(screen.canvas.background.width).toBeLessThanOrEqual(1920);
});

test('check screen dimensions is less than the window dimensions 3840x2160', () => {
	document.body.innerHTML = `
		<canvas id="background"/>
	`;

	const canvasLayers = ['background'];

	let screen = new Screen(canvasLayers);
	screen.winW = 1920;
	screen.winH = 1080;

	screen.setSize(screen.canvas.background);

	expect(screen.canvas.background.height).toBeLessThanOrEqual(2160);
	expect(screen.canvas.background.width).toBeLessThanOrEqual(3840);
});

test('check screen dimensions is less than the window dimensions 500x1000', () => {
	document.body.innerHTML = `
		<canvas id="background"/>
	`;

	const canvasLayers = ['background'];

	let screen = new Screen(canvasLayers);
	screen.winW = 500;
	screen.winH = 1000;
	screen.maxW = screen.winH * screen.aspectRatio;
	screen.maxH = screen.winW * (1/screen.aspectRatio);
	screen.setSize(screen.canvas.background);

	expect(screen.maxH).toBe(screen.winW * (1/screen.aspectRatio));
	expect(screen.canvas.background.height).toBeLessThanOrEqual(1000);
	expect(screen.canvas.background.width).toBeLessThanOrEqual(500);
});

test('check screen dimensions is less than the window dimensions 2000x2000', () => {
	document.body.innerHTML = `
		<canvas id="background"/>
	`;

	const canvasLayers = ['background'];

	let screen = new Screen(canvasLayers);
	screen.winW = 2000;
	screen.winH = 2000;
	screen.setSize(screen.canvas.background);

	expect(screen.canvas.background.height).toBeLessThanOrEqual(2000);
	expect(screen.canvas.background.width).toBeLessThanOrEqual(2000);
});

test('Updates the element with new dimensions 1000x1000', () => {
	document.body.innerHTML = `
		<canvas id="background"/>
	`;

	const canvasLayers = ['background'];
	let screen = new Screen(canvasLayers);
	screen.winW = 1000;
	screen.winH = 1000;
	screen.setSize(screen.canvas.background);

	expect(document.getElementById('background')).toHaveProperty('width', 1000);
	expect(document.getElementById('background')).toHaveProperty('height', screen.maxH);
});

test('Updates the element with new dimensions and maintains aspect ratio', () => {
	document.body.innerHTML = `
		<canvas id="background"/>
	`;

	const canvasLayers = ['background'];
	let screen = new Screen(canvasLayers);
	screen.winW = 1920;
	screen.winH = 1080;
	screen.setSize(screen.canvas.background);

	const element = document.getElementById('background');

	expect(element.width / element.height).toEqual(screen.aspectRatio);
});

test('Updates the element to odd window size (winW > winH) while maintains aspect ratio', () => {
	document.body.innerHTML = `
		<canvas id="background"/>
	`;

	const canvasLayers = ['background'];
	let screen = new Screen(canvasLayers);
	screen.winW = 1120;
	screen.winH = 1080;
	screen.setSize(screen.canvas.background);

	const element = document.getElementById('background');

	expect(element.width / element.height).toEqual(screen.aspectRatio);
});

test('Updates the element to odd window size (winW < winH) while maintains aspect ratio', () => {
	document.body.innerHTML = `
		<canvas id="background"/>
	`;

	const canvasLayers = ['background'];
	let screen = new Screen(canvasLayers);
	screen.winW = 1000;
	screen.winH = 1124;
	screen.maxW = screen.winH * screen.aspectRatio;
	screen.maxH = screen.winW * (1/screen.aspectRatio);
	screen.setSize(screen.canvas.background);

	const element = document.getElementById('background');

	expect((element.width / element.height).toFixed(2)).toEqual(screen.aspectRatio.toFixed(2));
});

test('Screen does size to different ratios of 7/3', () => {
	document.body.innerHTML = `
		<canvas id="background"/>
	`;

	const canvasLayers = ['background'];
	let screen = new Screen(canvasLayers);
	screen.winW = 1000;
	screen.winH = 1124;
	screen.aspectRatio = 7/3;
	screen.maxW = screen.winH * screen.aspectRatio;
	screen.maxH = screen.winW * (1/screen.aspectRatio);
	screen.setSize(screen.canvas.background);

	const element = document.getElementById('background');

	expect((element.width / element.height).toFixed(1)).toEqual(screen.aspectRatio.toFixed(1));
});

test('resizes multiple canvas layers', () => {
	document.body.innerHTML = `
		<canvas id="background"/>
		<canvas id="player"/>
		<canvas id="foreground"/>
	`;

	const canvasLayers = [
		'background',
		'player',
		'foreground'
	];
	let screen = new Screen(canvasLayers);
	screen.winW = 1920;
	screen.winH = 1080;
	screen.setSize(screen.canvas.background);
	screen.setSize(screen.canvas.player);
	screen.setSize(screen.canvas.foreground);

	expect(document.getElementById('background')).toHaveProperty('width', 1920);
	expect(document.getElementById('background')).toHaveProperty('height', 1080);
	expect(document.getElementById('player')).toHaveProperty('width', 1920);
	expect(document.getElementById('player')).toHaveProperty('height', 1080);
	expect(document.getElementById('foreground')).toHaveProperty('width', 1920);
	expect(document.getElementById('foreground')).toHaveProperty('height', 1080);
});