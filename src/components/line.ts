import type Canvas from "./canvas";
import type { Component } from "./component";


export default class Line implements Component {
 
    private canvas:Canvas;

    constructor(canvas:Canvas) {
        this.canvas = canvas;
        this.canvas.add(this);
    }
    
    mouseInteraction (x: number, y: number) {
        this.draw();
    }

    draw() {

        if (this.canvas.context !== null) {
            this.canvas.context.beginPath(); 
            this.canvas.context.moveTo (40,20);   
            this.canvas.context.lineTo (40,39);
            this.canvas.context.stroke();
        }
    }
}