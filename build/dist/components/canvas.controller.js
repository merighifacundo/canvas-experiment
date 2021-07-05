import Circle from "./circle.js";
import Line from "./line.js";
import Rectangle from "./rectangle.js";
export default class CanvasController {
  constructor(canvas) {
    this.command = null;
    this.canvas = canvas;
    this.canvas.addEventListener(this);
  }
  releaseEventHandler() {
  }
  cancelEventHandler() {
  }
  pressEventHandler(coordinate) {
    if (this.command != null) {
      if (this.command.action === "addCircle") {
        const circle = new Circle(this.canvas);
        circle.draw(coordinate.x, coordinate.y, 15);
        this.command = null;
        return;
      }
      if (this.command.action === "addLine") {
        if (this.command.start != null) {
          const line = new Line(this.canvas);
          line.draw(this.command.start, coordinate);
          this.command = null;
          return;
        } else {
          this.command.start = coordinate;
        }
      }
      if (this.command.action === "addRectangle") {
        if (this.command.start != null) {
          const rectangle = new Rectangle(this.canvas);
          rectangle.draw(this.command.start, 50, 50);
          this.command = null;
          return;
        } else {
          this.command.start = coordinate;
        }
      }
    }
  }
  dragEventHandler(coordinate) {
  }
  addCircle() {
    this.command = {action: "addCircle"};
  }
  addLine() {
    this.command = {action: "addLine"};
  }
  addRectangle() {
    this.command = {action: "addRectangle"};
  }
  save() {
    if (this.canvas.canvas != null) {
      var image = this.canvas.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      window.location.href = image;
    }
  }
}
