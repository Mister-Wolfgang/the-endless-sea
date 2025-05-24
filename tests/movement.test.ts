
import { MovementSystem } from '@game/MovementSystem';
import { InputSystem } from '../game/InputSystem';

describe('MovementSystem', () => {
  let movementSystem: MovementSystem;
  let inputSystem: InputSystem;

  beforeEach(() => {
    inputSystem = new InputSystem();
    movementSystem = new MovementSystem(inputSystem);
  });

  it('should initialize with default position', () => {
    expect(movementSystem.getPosition()).toEqual({ x: 0, y: 0 });
  });

  it('should update position based on input', () => {
    // Simuler une touche pressée
    inputSystem.onKeyDown({ code: 'KeyW', key: 'w' });
    movementSystem.update(16); // 16ms delta time

    const position = movementSystem.getPosition();
    expect(position.y).toBeLessThan(0); // Se déplace vers le haut
  });

  it('should respect movement speed', () => {
    const speed = 5;
    movementSystem.setSpeed(speed);
    inputSystem.onKeyDown({ code: 'KeyD', key: 'd' });
    
    const deltaTime = 1000; // 1 seconde
    movementSystem.update(deltaTime);

    const position = movementSystem.getPosition();
    expect(position.x).toBe(speed * (deltaTime / 1000)); // Distance = vitesse * temps
  });

  it('should stop when no key is pressed', () => {
    movementSystem.setSpeed(5);
    inputSystem.onKeyDown({ code: 'KeyW', key: 'w' });
    movementSystem.update(16);
    inputSystem.onKeyUp({ code: 'KeyW' });
    
    const initialPosition = movementSystem.getPosition();
    movementSystem.update(16);
    const finalPosition = movementSystem.getPosition();

    expect(finalPosition).toEqual(initialPosition);
  });
});
