export default class Line {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.add(this);
  }
  mouseInteraction(x, y) {
    if (this.from !== null && this.to !== null) {
      this.draw(this.from, {x, y});
    }
  }
  draw(from, to) {
    this.from = from;
    this.to = to;
    if (this.canvas.context !== null) {
      this.canvas.context.beginPath();
      this.canvas.context.moveTo(from.x, from.y);
      this.canvas.context.lineTo(to.x, to.y);
      this.canvas.context.stroke();
    }
  }
}
