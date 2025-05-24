import { InputSystem, InputKey, KeyboardLayout } from '../game/InputSystem';

describe('InputSystem', () => {
  let inputSystem: InputSystem;

  beforeEach(() => {
    inputSystem = new InputSystem();
  });
  it('devrait détecter la touche pressée en QWERTY', () => {
    inputSystem.onKeyDown({ code: 'KeyW', key: 'w' });
    expect(inputSystem.isKeyPressed('KeyW')).toBe(true);
    expect(inputSystem.isActionPressed(InputKey.UP)).toBe(true);
  });

  it('devrait détecter la touche pressée en AZERTY', () => {
    // Simuler appui sur Z en AZERTY
    inputSystem.onKeyDown({ code: 'KeyW', key: 'z' });
    expect(inputSystem.isKeyPressed('KeyW')).toBe(true);
    expect(inputSystem.isActionPressed(InputKey.UP)).toBe(true);
  });

  it('devrait détecter la touche relâchée', () => {
    inputSystem.onKeyDown({ code: 'KeyW', key: 'w' });
    inputSystem.onKeyUp({ code: 'KeyW' });
    expect(inputSystem.isKeyPressed('KeyW')).toBe(false);
    expect(inputSystem.isActionPressed(InputKey.UP)).toBe(false);
  });

  it('devrait supporter plusieurs touches en même temps', () => {
    inputSystem.onKeyDown({ code: 'KeyW', key: 'w' });
    inputSystem.onKeyDown({ code: 'KeyD', key: 'd' });
    expect(inputSystem.isActionPressed(InputKey.UP)).toBe(true);
    expect(inputSystem.isActionPressed(InputKey.RIGHT)).toBe(true);
  });

  it('devrait détecter le layout AZERTY', () => {
    inputSystem.onKeyDown({ code: 'KeyA', key: 'q' });
    expect(inputSystem.getCurrentLayout()).toBe(KeyboardLayout.AZERTY);
  });

  it('devrait détecter le layout QWERTY', () => {
    inputSystem.onKeyDown({ code: 'KeyA', key: 'a' });
    expect(inputSystem.getCurrentLayout()).toBe(KeyboardLayout.QWERTY);
  });
});
