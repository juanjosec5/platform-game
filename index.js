import Keyboard from './keyboard.js';
import Player from './player.js';
import Platform from './platform.js';

const WIDTH = 800;
const HEIGHT = 600;
const NUM_PLATFORMS = 5;
const MIN_PLATFORM_X = 20;
const MAX_PLATFORM_X = WIDTH - 20;
const MIN_PLATFORM_Y = 40;
const MAX_PLATFORM_Y = HEIGHT - 60;

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

const platforms = [];
for (let index = 0; index < NUM_PLATFORMS; index++) {
  const x = Math.random() * (MAX_PLATFORM_X - MIN_PLATFORM_X);
  const y = Math.random() * (MAX_PLATFORM_Y - MIN_PLATFORM_Y);
  platforms.push(new Platform(x, y, 'blue'));
}

const player = new Player(20, 20, 20, 20, 'red');
const testPlatform = new Platform(200, 460, 'blue');
const floor = {
  x: 20,
  y: HEIGHT - 20 - 40,
  w: WIDTH - 40,
  h: 40,
};

let inAir = false;
let canJump = true;

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

// function jump() {
//   if (canJump) {
//     canJump = false;

//     if (player.y >= floor.y - player.h) {
//       player.ys = 5;
//     }
//   }

//   console.log('jump');
// }

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
    canJump = true;
    player.y = floor.y - player.h;
    if (Keyboard.isPressed('Space')) {
      player.ys = -7;
    } else if (Keyboard.isDown('Space')) {
      player.ys = -9;
    } else {
      player.ys = 0;
    }
  }
  if (
    player.y >= testPlatform.y - player.h &&
    player.x + player.w >= testPlatform.x
  ) {
    canJump = true;
    player.y = testPlatform.y - player.h;
    if (Keyboard.isPressed('Space')) {
      player.ys = -7;
    } else if (Keyboard.isDown('Space')) {
      player.ys = -9;
    } else {
      player.ys = 0;
    }
  }

  if (player.x < floor.x) {
    player.ys += GRAVITY * multiplier;
  }
  player.move(0, player.ys);

  // Render Logic
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Player
  player.render(ctx);

  //Platforms
  testPlatform.render(ctx);
  // platforms.forEach((platform) => platform.render(ctx));

  // Floor
  ctx.fillStyle = 'black';
  ctx.fillRect(floor.x, floor.y, floor.w, floor.h);

  if (!quit) {
    animationId = requestAnimationFrame(render);
  }
}

animationId = requestAnimationFrame(render);
