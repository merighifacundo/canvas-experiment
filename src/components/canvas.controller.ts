import type Canvas from "./canvas";
import Circle from "./circle";
import type Coordinate from "./coordinate";
import Line from "./line";
import type Listener from "./listener";


export default class CanvasController implements Listener { 

	private canvas:Canvas;
	private command:any = null;
	constructor(canvas:Canvas) {
		this.canvas = canvas;
		this.canvas.addEventListener(this);
	}
	releaseEventHandler () {

	}
	cancelEventHandler () {

	}
	pressEventHandler (coordinate:Coordinate) {
		
		if (this.command != null) {
			if (this.command.action === 'addCircle') {
				const circle = new Circle(this.canvas);
				circle.draw(coordinate.x, coordinate.y, 15);
				this.command = null;
				return ;
			}
			if (this.command.action === 'addLine') {
				if (this.command.start != null) {
					const line = new Line(this.canvas);
					line.draw(this.command.start, coordinate);
					this.command = null;
					return ;
				} else {
					this.command.start = coordinate;
				}
			}
		}
	}
	dragEventHandler (coordinate:Coordinate) {

	}

	public addCircle() {
		this.command = { action: "addCircle" };
		
	}

	public addLine() {
		this.command = { action: "addLine" };
		
	}

}