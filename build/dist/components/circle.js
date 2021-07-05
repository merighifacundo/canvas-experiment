export default class Circle {
  constructor(canvas) {
    this.x = 0;
    this.y = 0;
    this.radio = 0;
    this.canvas = canvas;
    this.canvas.add(this);
  }
  isHovered(x, y) {
    return this.x - this.radio < x && this.x + this.radio > x && this.y - this.radio < y && this.y + this.radio > y;
  }
  mouseInteraction(x, y) {
    console.error(`mouseInteraction ${x} ${y} and ${this.x} ${this.y} and ratio: ${this.radio}`);
    if (this.isHovered(x, y)) {
      this.draw(x, y, this.radio);
    } else {
      this.draw(this.x, this.y, this.radio);
    }
  }
  draw(x, y, radio) {
    if (this.canvas.context !== null) {
      this.x = x;
      this.y = y;
      this.radio = radio;
      this.canvas.context.beginPath();
      this.canvas.context.arc(x, y, radio, 0, 2 * Math.PI, true);
      this.canvas.context.fill();
    }
  }
}
