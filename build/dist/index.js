import Canvas from "./components/canvas.js";
import CanvasController from "./components/canvas.controller.js";
const canvas = new Canvas("canvas");
const canvasController = new CanvasController(canvas);
const addCircle = document.getElementById("circle");
if (addCircle) {
  addCircle.addEventListener("mousedown", () => {
    canvasController.addCircle();
  });
}
const addLine = document.getElementById("line");
if (addLine) {
  addLine.addEventListener("mousedown", () => {
    canvasController.addLine();
  });
}
const addRectangle = document.getElementById("rectangle");
if (addRectangle) {
  addRectangle.addEventListener("mousedown", () => {
    canvasController.addRectangle();
  });
}
const addSave = document.getElementById("save");
if (addSave) {
  addSave.addEventListener("mousedown", () => {
    canvasController.save();
  });
}
