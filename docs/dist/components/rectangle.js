export default class Rectangle {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.add(this);
  }
  mouseInteraction(x, y) {
    if (this.from !== null && this.to !== null) {
      this.draw({x, y}, this.width, this.height);
    }
  }
  draw(from, width, height) {
    this.from = from;
    this.width = width;
    this.height = height;
    if (this.canvas.context !== null) {
      this.canvas.context.strokeRect(from.x, from.y, width, height);
    }
  }
}
