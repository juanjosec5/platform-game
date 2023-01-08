export default class Platform {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 20;
    this.color = color;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
