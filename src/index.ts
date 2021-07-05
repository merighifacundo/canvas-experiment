import Canvas from './components/canvas';
import CanvasController from './components/canvas.controller';
import Circle from './components/circle';
import Line from './components/line';

const canvas = new Canvas('canvas');
const canvasController = new CanvasController(canvas);

const addCircle = document.getElementById('circle');
if (addCircle) {
	addCircle.addEventListener('mousedown', () => {
		canvasController.addCircle();
	})
}
const addLine = document.getElementById('line');
if (addLine) {
	addLine.addEventListener('mousedown', () => {
		canvasController.addLine();
	})
}