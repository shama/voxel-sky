module.exports = function(phase, r, color) {
  if (!this.canvas) return false;
  r = r || 20;
  color = color || new this.game.THREE.Color(0xE6E2D1);
  var x = this.canvas.width / 2;
  var y = this.canvas.height / 2;

  // clipping region
  this.context.save();
  this.context.beginPath();
  this.context.rect(x, y, r, r);
  this.context.clip();
  
  // moon bg
  this.context.beginPath();
  this.context.rect(x, y, r, r);
  this.context.fillStyle = this.rgba(color, 1);
  this.context.fill();

  this.context.translate(x, y);

  // darker artifacts
  this.context.beginPath();
  this.context.rect(0, 0, r/2, r/2);
  this.context.rect(r/2, r/2, r/2, r/2);
  this.context.fillStyle = this.rgba(0, 0, 0, 0.5);
  this.context.fill();
  
  // darkest artifacts
  for (var i = 0; i < 2; i++) {
    this.context.beginPath();
    for (var a = 0; a < 10; a++) {
      this.context.rect(Math.random() * (r-(r/4)), Math.random() * (r-(r/4)), r/4, r/4);
    }
    this.context.fillStyle = this.rgba(0, 0, 0, 0.3);
    this.context.fill();
  }

  // moon phase
  var px = (phase * r * 2) - r;
  this.context.beginPath();
  this.context.rect(px, 0, r, r);
  this.context.fillStyle = this.rgba(0, 0, 0, 0.8);
  this.context.fill();
  this.context.beginPath();
  this.context.rect(2 + px, 2, r-4, r-4);
  this.context.fillStyle = this.rgba(0, 0, 0, 0.9);
  this.context.fill();

  this.context.restore();
};
