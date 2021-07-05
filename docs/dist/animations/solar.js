export default class SolarSystem {
  drawSolar(id) {
    var sun = new Image();
    var moon = new Image();
    var earth = new Image();
    function init() {
      sun.src = "canvas_sun.png";
      moon.src = "canvas_moon.png";
      earth.src = "canvas_earth.png";
      window.requestAnimationFrame(draw);
    }
    function draw() {
      var ctx = document.getElementById(id).getContext("2d");
      ctx.globalCompositeOperation = "destination-over";
      ctx.clearRect(0, 0, 300, 300);
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
      ctx.save();
      ctx.translate(150, 150);
      var time = new Date();
      ctx.rotate(2 * Math.PI / 60 * time.getSeconds() + 2 * Math.PI / 6e4 * time.getMilliseconds());
      ctx.translate(105, 0);
      ctx.fillRect(0, -12, 40, 24);
      ctx.drawImage(earth, -12, -12);
      ctx.save();
      ctx.rotate(2 * Math.PI / 6 * time.getSeconds() + 2 * Math.PI / 6e3 * time.getMilliseconds());
      ctx.translate(0, 28.5);
      ctx.drawImage(moon, -3.5, -3.5);
      ctx.restore();
      ctx.restore();
      ctx.beginPath();
      ctx.arc(150, 150, 105, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.drawImage(sun, 0, 0, 300, 300);
      window.requestAnimationFrame(draw);
    }
    init();
  }
}
