import { InputSystem, InputKey } from './InputSystem';

export interface Position {
  x: number;
  y: number;
}

export class MovementSystem {
  private position: Position;
  private speed: number;
  private inputSystem: InputSystem;
  constructor(inputSystem: InputSystem) {
    this.position = { x: 0, y: 0 };
    this.speed = 200; // Vitesse par défaut (pixels par seconde)
    this.inputSystem = inputSystem;
  }

  getPosition(): Position {
    return { ...this.position };
  }

  setPosition(position: Position) {
    this.position = { ...position };
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  update(deltaTime: number) {
    const normalizedDelta = deltaTime / 1000; // Convertir en secondes
    const movement = { x: 0, y: 0 };

    if (this.inputSystem.isActionPressed(InputKey.UP)) {
      movement.y -= this.speed * normalizedDelta;
    }
    if (this.inputSystem.isActionPressed(InputKey.DOWN)) {
      movement.y += this.speed * normalizedDelta;
    }
    if (this.inputSystem.isActionPressed(InputKey.LEFT)) {
      movement.x -= this.speed * normalizedDelta;
    }
    if (this.inputSystem.isActionPressed(InputKey.RIGHT)) {
      movement.x += this.speed * normalizedDelta;
    }

    // Mettre à jour la position
    this.position.x += movement.x;
    this.position.y += movement.y;
  }
}
