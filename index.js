import Keyboard from './keyboard.js';
import Game from './game.js';

const game = new Game();
game.run();

//--------------------------- MAP ----------------------------------//
//DONE
//--------------------------- MAP ----------------------------------//

// function resetGame() {
//   player.x = 20;
//   player.y = 20;
//   player.ys = 0;
// }

// let inAir = false;
// let canJump = true;
// let onPlatform = false;

// function jump() {
//   let jumpValue = -6;
//   if (canJump) {
//     canJump = false;

//     player.ys = jumpValue;
//   }
// }

//--------------------------- MAIN LOOP -------------------------//
//Loop() {
//  Input gathering
//  Game Logic
//  Rendering
//}
//--------------------------- MAIN LOOP -------------------------//
// function render(time) {
//   const multiplier = getTimeMultiplier(time);

//   // Input Gathering
//   Keyboard.update();

//   // Game Logic
//   if (Keyboard.isDown('ArrowRight')) player.move(200 * multiplier);
//   if (Keyboard.isDown('ArrowLeft')) player.move(-200 * multiplier);
//   if (Keyboard.isPressed('KeyR')) resetGame();
//   if (Keyboard.isPressed('Escape')) quit = true;

//   player.ys += GRAVITY * multiplier;

//   if (player.y >= floor.y - player.h && player.x + player.w >= floor.x) {
//     canJump = true;
//     player.y = floor.y - player.h;
//     player.ys = 0;
//     if (Keyboard.isPressed('Space')) jump(); ----->>>>>> HERE
//   }

//   for (const platform of platforms) {
//     if (
//       player.y >= platform.y - player.h &&
//       player.x + player.w >= platform.x
//     ) {
//       player.y = platform.y - player.h;
//       player.ys = 0;
//     } else {
//     }
//   }
