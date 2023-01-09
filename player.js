import Drawable from './drawable.js';

export default class Player extends Drawable {
  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
    this.ys = 0;
  }

  move(x, y = 0) {
    this.x += x;
    this.y += y;
  }
}
