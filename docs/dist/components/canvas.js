export default class Canvas {
  constructor(canvasElement) {
    this.context = null;
    this.components = [];
    this.listeners = [];
    this.activateInteraction = false;
    this.dragenter = (e) => {
      console.log(e);
      this.onEvent(e);
    };
    this.dragover = (e) => {
      console.log(e);
      this.onEvent(e);
    };
    this.drop = (e) => {
      console.log(e);
      this.onEvent(e);
      let data = e.dataTransfer;
      let files = data.files;
      this.handleFiles(files);
    };
    this.handleFiles = (files) => {
      for (var i = 0; i < files.length; i++) {
        var theFile = files[i];
        var isImagen = /^image\//;
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
            context.beginPath();
            context.rect(10, 10, 160, 160);
            context.clip();
            context.drawImage(this, 10, 10);
            context.restore();
            window.URL.revokeObjectURL(this.src);
          }
        };
      }
    };
    this.onEvent = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };
    this.releaseEventHandler = () => {
      console.log(`releaseEventHandler`);
    };
    this.cancelEventHandler = () => {
      console.log(`cancelEventHandler`);
    };
    this.handleDragStart = (e) => {
      console.log(e);
      e.stopPropagation();
    };
    this.handleDragEnd = (e) => {
      console.log(e);
      e.stopPropagation();
    };
    this.pressEventHandler = (e) => {
      const offsetLeft = this.canvas !== null ? this.canvas.offsetLeft : 0;
      const offsetTop = this.canvas !== null ? this.canvas.offsetTop : 0;
      const clientX = e.clientX - offsetLeft;
      const clientY = e.clientY - offsetTop;
      this.activateInteraction = !this.activateInteraction;
      this.listeners.forEach((listener) => {
        listener.pressEventHandler({x: clientX, y: clientY});
      });
      console.log(`pressEventHandler with clients: ${clientX} and ${clientY}`);
    };
    this.dragEventHandler = (e) => {
      if (!this.activateInteraction) {
        return;
      }
      const offsetLeft = this.canvas !== null ? this.canvas.offsetLeft : 0;
      const offsetTop = this.canvas !== null ? this.canvas.offsetTop : 0;
      const clientX = e.clientX - offsetLeft;
      const clientY = e.clientY - offsetTop;
      this.listeners.forEach((listener) => {
        listener.dragEventHandler({x: clientX, y: clientY});
      });
    };
    this.canvas = document.getElementById(canvasElement);
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight - 40;
    console.log(document.body.clientHeight);
    if (this.canvas !== null) {
      this.context = this.canvas.getContext("2d");
      this.canvas.addEventListener("mousedown", this.pressEventHandler);
      this.canvas.addEventListener("mousemove", this.dragEventHandler);
      this.canvas.addEventListener("mouseup", this.releaseEventHandler);
      this.canvas.addEventListener("mouseout", this.cancelEventHandler);
      this.canvas.addEventListener("touchstart", this.pressEventHandler);
      this.canvas.addEventListener("touchmove", this.dragEventHandler);
      this.canvas.addEventListener("touchend", this.releaseEventHandler);
      this.canvas.addEventListener("touchcancel", this.cancelEventHandler);
      this.canvas.addEventListener("drop", this.drop, false);
      this.canvas.addEventListener("dragenter", this.dragenter, false);
      this.canvas.addEventListener("dragover", this.dragover, false);
    }
  }
  clear() {
    if (this.context && this.canvas) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  addEventListener(listener) {
    this.listeners.push(listener);
  }
  add(component) {
    this.components.push(component);
  }
}
