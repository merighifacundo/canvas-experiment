import type Canvas from "./canvas";
import type { Component } from "./component";


export default class Circle implements Component {
    
    private canvas:Canvas;
    private x:number = 0;
    private y:number = 0;
    private radio:number = 0;
    constructor(canvas:Canvas) {
        this.canvas = canvas;
        this.canvas.add(this);
    }

    isHovered(x: number, y: number) {
        return (this.x - this.radio) < x && 
               (this.x + this.radio) > x &&
               (this.y - this.radio) < y &&
               (this.y + this.radio) > y;

    }

    mouseInteraction (x: number, y: number) {
        console.error(`mouseInteraction ${x} ${y} and ${this.x} ${this.y} and ratio: ${this.radio}`);
        if (this.isHovered(x, y)) {
            this.draw(x, y, this.radio);
        } else {
            this.draw(this.x, this.y, this.radio);
        }
    }
    
    draw(x:number, y: number, radio:number) {
        if(this.canvas.context !== null) {
            this.x = x;
            this.y = y;
            this.radio = radio;
            this.canvas.context.beginPath(); 
            //console.log(`drawing a circle with ${x} and ${y} ${radio}`);
            this.canvas.context.arc( x, y, radio, 0, 2 * Math.PI, true); 
            this.canvas.context.fill();
        }
    }
}