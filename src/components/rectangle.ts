import type Canvas from "./canvas";
import type { Component } from "./component";
import type Coordinate from "./coordinate";


export default class Rectangle implements Component {
 
    private canvas:Canvas;
    private from:Coordinate | null;
    private width:number;
		private height:number;
		

    constructor(canvas:Canvas) {
        this.canvas = canvas;
        this.canvas.add(this);
    }
    
    mouseInteraction (x:number, y:number) {
        if (this.from !== null && this.to !== null) {
            this.draw({x, y}, this.width, this.height);
        }
    }

    draw(from:Coordinate, width:number, height: number) {
        this.from = from;
				this.width = width;
        this.height = height;
        if (this.canvas.context !== null) {
            this.canvas.context.strokeRect(from.x, from.y, width, height);
        }
    }
}