import type { Component } from "./component";
import type Listener from "./listener";


export default class Canvas {
    
    public canvas:HTMLCanvasElement | null;
    public context:CanvasRenderingContext2D | null = null;
    private components:Array<Component> = [];
    private listeners:Array<Listener> = [];
    private activateInteraction:boolean = false;
    private clear() {
        if (this.context && this.canvas) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    constructor(canvasElement:string) {
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.canvas.width = document.body.clientWidth; //document.width is obsolete
        this.canvas.height = document.body.clientHeight - 40; //document.height is obsolete
        console.log(document.body.clientHeight);

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
            this.canvas.addEventListener("drop", this.drop, false);
            this.canvas.addEventListener('dragenter', this.dragenter, false);
            this.canvas.addEventListener('dragover', this.dragover, false);
        }
    }

    public dragenter = (e:any) => {
        console.log(e)
        this.onEvent(e);
      }
      
    public dragover = (e:any) => {
        console.log(e)
        this.onEvent(e);
      }
      
    public drop = (e:any) => {
        console.log(e)
        this.onEvent(e);
      
       let data = e.dataTransfer;
       let files = data.files;
       // handle files
       this.handleFiles(files);
      }
    
    
    
    public handleFiles = (files:any) => {
       for (var i = 0; i < files.length; i++) {
          var theFile = files[i];
          // check if the file is an image
          var isImagen = /^image\//;
          // if it's not an image continu
          if (!isImagen.test(theFile.type)) {
            continue;
          }
          
          var img = new Image(); 
          img.src = window.URL.createObjectURL(theFile);
          const context = this.context;
          debugger;
          img.onload = function() {
            if (context != null) {
                context.save();  
                //markDroppableZone();
                context.beginPath();
                context.rect(10,10,160,160);
                // clip the context
                context.clip();
                // draw the image 
                context.drawImage(this, 10, 10);
                context.restore();
                window.URL.revokeObjectURL(this.src);   
            }  
          }
       }
    }
    
    
    
    public onEvent = (e:any) => {
        
        e.stopPropagation();
        e.preventDefault();
        
    }

    public addEventListener(listener:Listener) {
        this.listeners.push(listener);
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

    private handleDragStart = (e:any) => {
        console.log(e);
        e.stopPropagation();
    }

    private handleDragEnd = (e:any) => {
        console.log(e);
        e.stopPropagation();
    }

    private pressEventHandler = (e: MouseEvent | TouchEvent) => {
        
        const offsetLeft = this.canvas !== null  ?  this.canvas.offsetLeft : 0;
        const offsetTop = this.canvas !== null  ?  this.canvas.offsetTop : 0;
        const clientX = (e as MouseEvent).clientX - offsetLeft;
        const clientY = (e as MouseEvent).clientY - offsetTop;
        this.activateInteraction = !this.activateInteraction;
        this.listeners.forEach(listener => {
            listener.pressEventHandler({x:clientX, y:clientY})
        })
        console.log(`pressEventHandler with clients: ${clientX} and ${clientY}`);
    }

    private dragEventHandler = (e: MouseEvent | TouchEvent) => {
        if (!this.activateInteraction) {
            return ;
        }
        const offsetLeft = this.canvas !== null  ?  this.canvas.offsetLeft : 0;
        const offsetTop = this.canvas !== null  ?  this.canvas.offsetTop : 0;
        const clientX = (e as MouseEvent).clientX - offsetLeft;
        const clientY = (e as MouseEvent).clientY - offsetTop;
        /*
        this.clear();
        this.components.forEach(component => {
            component.mouseInteraction(clientX, clientY);
        })*/
        this.listeners.forEach(listener => {
            listener.dragEventHandler({x:clientX, y:clientY})
        })
        //console.log(`dragEventHandler with x: ${mouseX} and y:${mouseY} with clients: ${clientX} and ${clientY}`);
    }
    
}