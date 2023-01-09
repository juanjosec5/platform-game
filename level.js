import Platform from './platform.js';
import Player from './player.js';
import { GAME_CONFIG } from './constants.js';

const NUM_PLATFORMS = 5;
const MIN_PLATFORM_X = 20;
const MAX_PLATFORM_X = GAME_CONFIG.width - 20;
const MIN_PLATFORM_Y = 40;
const MAX_PLATFORM_Y = GAME_CONFIG.height - 6;

export default class Level {
  createPlatforms() {
    this.platforms = [];
    for (let index = 0; index < NUM_PLATFORMS; index++) {
      const x = Math.random() * (MAX_PLATFORM_X - MIN_PLATFORM_X);
      const y = Math.random() * (MAX_PLATFORM_Y - MIN_PLATFORM_Y);
      this.platforms.push(new Platform(x, y, 100, 20, 'blue'));
    }

    this.platforms.push(
      new Platform(
        20,
        GAME_CONFIG.height - 60,
        GAME_CONFIG.width - 40,
        40,
        'black'
      )
    );
  }

  renderPlatform(ctx) {
    this.platforms.forEach((platform) => platform.render(ctx));
  }

  createPlayer() {
    this.player = new Player(20, 20, 20, 20, 'red');
  }

  load() {
    this.createPlayer();
    this.createPlatforms();
  }
}
