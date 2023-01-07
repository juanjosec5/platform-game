import Keyboard from './keyboard.js';
import Player from './player.js';

const WIDTH = 800;
const HEIGHT = 600;

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;

ctx.width = WIDTH;
ctx.height = HEIGHT;

let animationId;
let quit = false;
let lastTime = 0;
const GRAVITY = 15;

const player = new Player(20, 20, 20, 20, 'red');
const floor = {
  x: 20,
  y: HEIGHT - 20 - 40,
  w: WIDTH - 40,
  h: 40,
};

function getTimeMultiplier(time) {
  const delta = time - lastTime;
  const multiplier = delta * 0.001;
  lastTime = time;

  return multiplier;
}

function resetGame() {
  player.x = 20;
  player.y = 20;
  player.ys = 0;
}

function render(time) {
  const multiplier = getTimeMultiplier(time);

  // Input Gathering
  Keyboard.update();

  // Game Logic
  if (Keyboard.isDown('ArrowRight')) player.move(200 * multiplier);
  if (Keyboard.isDown('ArrowLeft')) player.move(-200 * multiplier);
  if (Keyboard.isPressed('KeyR')) resetGame();
  if (Keyboard.isPressed('Escape')) quit = true;

  player.ys += GRAVITY * multiplier;

  if (player.y >= floor.y - player.h && player.x + player.w >= floor.x) {
    player.ys = 0;
    player.y = floor.y - player.h;
  }

  if (player.x < floor.x) {
    player.ys += GRAVITY * multiplier;
  }
  player.move(0, player.ys);

  // Render Logic
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Player
  player.render(ctx);

  // Floor
  ctx.fillStyle = 'black';
  ctx.fillRect(floor.x, floor.y, floor.w, floor.h);

  if (!quit) {
    animationId = requestAnimationFrame(render);
  }
}

animationId = requestAnimationFrame(render);
