import type Canvas from "./canvas";
import type { Component } from "./component";
import type Coordinate from "./coordinate";


export default class Line implements Component {
 
    private canvas:Canvas;
    private from:Coordinate | null;
    private to:Coordinate | null;

    constructor(canvas:Canvas) {
        this.canvas = canvas;
        this.canvas.add(this);
    }
    
    mouseInteraction (x:number, y:number) {
        if (this.from !== null && this.to !== null) {
            this.draw(this.from, {x, y});
        }
    }

    draw(from:Coordinate, to:Coordinate) {
        this.from = from;
        this.to = to;
        if (this.canvas.context !== null) {
            this.canvas.context.beginPath(); 
            this.canvas.context.moveTo (from.x, from.y);   
            this.canvas.context.lineTo (to.x, to.y);
            this.canvas.context.stroke();
        }
    }
}