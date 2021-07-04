import Canvas from './components/canvas';
import Circle from './components/circle';
import Line from './components/line';

const canvas = new Canvas('canvas');

const addCircle = document.getElementById('circle');
if (addCircle) {
	addCircle.addEventListener('mousedown', () => {
		const circle = new Circle(canvas);
		circle.draw(120, 120, 15);
	})
}
const addLine = document.getElementById('line');
if (addLine) {
	addLine.addEventListener('mousedown', () => {
		const line = new Line(canvas);
		line.draw({y: 120, x: 120}, { x: 130, y: 130});
	})
}