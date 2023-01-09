import * as Collisions from './collision.js';
import { GAME_CONFIG } from './constants.js';
import Level from './level.js';
import Keyboard from './keyboard.js';

export default class Game {
  constructor() {
    this.quit = false;
    this.lastTime = 0;
    this.skipFirstFrame = true;
    this.init();
    this.loadMap();
  }

  init() {
    this.canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext('2d');

    this.canvas.width = GAME_CONFIG.width;
    this.canvas.height = GAME_CONFIG.height;

    this.ctx.width = GAME_CONFIG.width;
    this.ctx.height = GAME_CONFIG.height;
  }

  loadMap() {
    this.level = new Level();
    this.level.load();
  }

  run() {
    this.loopId = requestAnimationFrame(this.loop.bind(this));
  }

  loop(time) {
    const multiplier = this.getTimeMultiplier(time);
    this.inputs();
    this.logic(multiplier);
    this.render();

    if (!this.quit) {
      this.loopId = requestAnimationFrame(this.loop.bind(this));
    }
  }

  getTimeMultiplier(time) {
    const delta = time - this.lastTime;
    let multiplier = delta * 0.001;
    this.lastTime = time;

    if (this.skipFirstFrame) {
      this.skipFirstFrame = false;
      multiplier = 1 / 60;
    }

    return multiplier;
  }

  resetGame() {
    // this.level.player.x = 20;
    this.level.player.y = 20;
    this.level.player.ys = 0;
  }

  inputs() {
    Keyboard.update();
  }

  logic(multi) {
    const player = this.level.player;
    player.ys += GAME_CONFIG.gravity * multi;

    if (Keyboard.isDown('ArrowRight')) player.move(200 * multi);
    if (Keyboard.isDown('ArrowLeft')) player.move(-200 * multi);
    if (Keyboard.isPressed('KeyR')) this.resetGame();
    if (Keyboard.isPressed('Escape')) this.quit = true;

    // CONDITIONS IF PLAYER IS NOT TOUCHING A PLATFORM
    // If any of the following are true, there are NO collisions:
    //if player.x + player.width <= platform.x
    //if player.x >= platform.x + platform.width
    //if player.y + player.height <= platform.y
    //if player.y >= platform.y + platform.height

    // if (player.y >= floor.y - player.h && player.x + player.w >= floor.x) {
    // canJump = true;
    //   player.y = floor.y - player.h;
    //   player.ys = 0;
    // if (Keyboard.isPressed('Space')) jump();
    // }

    player.move(0, player.ys);
  }

  render() {
    this.ctx.clearRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
    this.level.player.render(this.ctx);
    this.level.renderPlatform(this.ctx);
  }
}
//loop
//collision data
//service - handles logic that doesnt do anything by itself
