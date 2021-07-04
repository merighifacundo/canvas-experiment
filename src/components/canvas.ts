import type { Component } from "./component";


export default class Canvas {
    
    public canvas:HTMLCanvasElement | null;
    public context:CanvasRenderingContext2D | null = null;
    private components:Array<Component> = [];

    private clear() {
        if (this.context && this.canvas) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    constructor(canvasElement:string) {
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.canvas.width = document.body.clientWidth; //document.width is obsolete
        this.canvas.height = document.body.clientHeight; //document.height is obsolete
        console.log(document.body.clientHeight);

        //this.canvas.requestFullscreen();
        if (this.canvas !== null) {
            this.context = this.canvas.getContext('2d');
            this.canvas.addEventListener("mousedown", this.pressEventHandler);
            this.canvas.addEventListener("mousemove", this.dragEventHandler);
            this.canvas.addEventListener("mouseup", this.releaseEventHandler);
            this.canvas.addEventListener("mouseout", this.cancelEventHandler);
            this.canvas.addEventListener("touchstart", this.pressEventHandler);
            this.canvas.addEventListener("touchmove", this.dragEventHandler);
            this.canvas.addEventListener("touchend", this.releaseEventHandler);
            this.canvas.addEventListener("touchcancel", this.cancelEventHandler);
        }
    }

    public add(component:Component) {
        this.components.push(component);
    }


    private releaseEventHandler = () => {
        console.log(`releaseEventHandler`);
    }

    private cancelEventHandler = () => {
        console.log(`cancelEventHandler`);
    }

    private pressEventHandler = (e: MouseEvent | TouchEvent) => {
        
        const mouseX = (e as TouchEvent).changedTouches ?
            (e as TouchEvent).changedTouches[0].pageX :
            (e as MouseEvent).pageX;
        
        const mouseY = (e as TouchEvent).changedTouches ?
            (e as TouchEvent).changedTouches[0].pageY :
            (e as MouseEvent).pageY;
        const clientX = (e as MouseEvent).clientX;
        const clientY = (e as MouseEvent).clientY;
        console.log(`pressEventHandler with x: ${mouseX} and y:${mouseY} with clients: ${clientX} and ${clientY}`);
    }

    private dragEventHandler = (e: MouseEvent | TouchEvent) => {
        const mouseX = (e as TouchEvent).changedTouches ?
            (e as TouchEvent).changedTouches[0].pageX :
            (e as MouseEvent).pageX;
        
        const mouseY = (e as TouchEvent).changedTouches ?
            (e as TouchEvent).changedTouches[0].pageY :
            (e as MouseEvent).pageY;
        const offsetLeft = this.canvas !== null  ?  this.canvas.offsetLeft : 0;
        const offsetTop = this.canvas !== null  ?  this.canvas.offsetTop : 0;
        const clientX = (e as MouseEvent).clientX - offsetLeft;
        const clientY = (e as MouseEvent).clientY - offsetTop;
        this.clear();
        this.components.forEach(component => {
            component.mouseInteraction(clientX, clientY);
        })
        console.log(`dragEventHandler with x: ${mouseX} and y:${mouseY} with clients: ${clientX} and ${clientY}`);
    }
    
}