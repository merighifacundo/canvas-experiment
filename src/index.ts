import Canvas from './components/canvas';
import Circle from './components/circle';
import Line from './components/line';

const canvas = new Canvas('canvas');
// clear canvas
const circle = new Circle(canvas);
circle.draw(100, 100, 15);
const line = new Line(canvas);
line.draw();