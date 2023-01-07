export const KeyState = {
  UP: 0, // The key is not being pressed.
  RELEASED: 1, // The key was just released.
  PRESSED: 2, // The key was just pressed.
  DOWN: 3, // The key is being held down.
};

export const VALID_KEYS = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'Space',
  'KeyR',
  'Escape',
];

export class Keyboard {
  constructor() {
    this.keys = {};
    this.resetKeyStates();
    this.downKeys = new Set();
    this.upKeys = new Set();
    this.shouldUpdate = new Set();

    for (const key of VALID_KEYS) this.keys[key] = KeyState.UP;

    window.addEventListener('keydown', (ev) => this.onKeyDown(ev));
    window.addEventListener('keyup', (ev) => this.onKeyUp(ev));
  }

  resetKeyStates() {
    this.keys = Object.fromEntries(VALID_KEYS.map((key) => [key, KeyState.UP]));
  }

  /** @param {KeyboardEvent} ev */
  onKeyDown(ev) {
    if (VALID_KEYS.includes(ev.code)) {
      switch (this.keys[ev.code]) {
        case KeyState.UP:
        case KeyState.RELEASED:
          this.keys[ev.code] = KeyState.PRESSED;
          this.downKeys.add(ev.code);
          break;
      }
    }
  }

  /** @param {KeyboardEvent} ev */
  onKeyUp(ev) {
    if (VALID_KEYS.includes(ev.code)) {
      switch (this.keys[ev.code]) {
        case KeyState.DOWN:
        case KeyState.PRESSED:
          this.keys[ev.code] = KeyState.RELEASED;
          this.upKeys.add(ev.code);
          break;
      }
    }
  }

  update() {
    for (const key of this.shouldUpdate) {
      switch (this.keys[key]) {
        case KeyState.PRESSED:
          this.keys[key] = KeyState.DOWN;
          this.shouldUpdate.delete(key);
          break;

        case KeyState.RELEASED:
          this.keys[key] = KeyState.UP;
          this.shouldUpdate.delete(key);
          break;
      }
    }

    for (const key of this.downKeys) {
      this.downKeys.delete(key);
      this.shouldUpdate.add(key);
    }

    for (const key of this.upKeys) {
      this.upKeys.delete(key);
      this.shouldUpdate.add(key);
    }
  }

  isPressed(key) {
    if (!(key in this.keys)) return false;
    return this.keys[key] === KeyState.PRESSED;
  }

  isDown(key) {
    if (!(key in this.keys)) return false;
    const keyState = this.keys[key];
    return keyState === KeyState.PRESSED || keyState === KeyState.DOWN;
  }

  isReleased(key) {
    if (!(key in this.keys)) return false;
    return this.keys[key] === KeyState.RELEASED;
  }

  isUp(key) {
    if (!(key in this.keys)) return false;
    const keyState = this.keys[key];
    return keyState === KeyState.RELEASED || keyState === KeyState.UP;
  }
}

const keyboard = new Keyboard();
export default keyboard;
