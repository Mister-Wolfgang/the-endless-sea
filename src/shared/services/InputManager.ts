import { 
  InputType, 
  InputAction, 
  InputState, 
  InputMapping, 
  InputEvent, 
  InputHandler 
} from '../types/input';

export class InputManager {
  private element: HTMLElement;
  private state: InputState;
  private mappings: Map<InputAction, InputMapping[]>;
  private handlers: Map<InputAction, InputHandler[]>;
  private previousMouseX: number = 0;
  private previousMouseY: number = 0;

  constructor(element: HTMLElement) {
    this.element = element;
    this.state = this.createInitialState();
    this.mappings = new Map();
    this.handlers = new Map();
    
    this.setupEventListeners();
  }

  private createInitialState(): InputState {
    return {
      pressed: new Set<string>(),
      justPressed: new Set<string>(),
      justReleased: new Set<string>(),
      mouseX: 0,
      mouseY: 0,
      mouseDeltaX: 0,
      mouseDeltaY: 0,
      gamepadConnected: false,
      leftStickX: 0,
      leftStickY: 0,
      rightStickX: 0,
      rightStickY: 0,
    };
  }

  private setupEventListeners(): void {
    // Événements clavier
    this.element.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.element.addEventListener('keyup', this.handleKeyUp.bind(this));
    
    // Événements souris
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    
    // Événements manette
    window.addEventListener('gamepadconnected', this.handleGamepadConnected.bind(this));
    window.addEventListener('gamepaddisconnected', this.handleGamepadDisconnected.bind(this));
    
    // Focus pour capturer les événements
    this.element.tabIndex = 0;
    this.element.focus();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    
    // Éviter la répétition des touches
    if (!this.state.pressed.has(key)) {
      this.state.justPressed.add(key);
      this.triggerMappedActions(key, InputType.KEYBOARD, 1);
    }
    
    this.state.pressed.add(key);
    event.preventDefault();
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const key = event.key;
    
    this.state.pressed.delete(key);
    this.state.justReleased.add(key);
    this.triggerMappedActions(key, InputType.KEYBOARD, 0);
    
    event.preventDefault();
  }

  private handleMouseDown(event: MouseEvent): void {
    const button = `mouse${event.button}`;
    
    this.state.pressed.add(button);
    this.state.justPressed.add(button);
    this.triggerMappedActions(button, InputType.MOUSE, 1);
  }

  private handleMouseUp(event: MouseEvent): void {
    const button = `mouse${event.button}`;
    
    this.state.pressed.delete(button);
    this.state.justReleased.add(button);
    this.triggerMappedActions(button, InputType.MOUSE, 0);
  }

  private handleMouseMove(event: MouseEvent): void {
    this.state.mouseDeltaX = event.clientX - this.previousMouseX;
    this.state.mouseDeltaY = event.clientY - this.previousMouseY;
    
    this.state.mouseX = event.clientX;
    this.state.mouseY = event.clientY;
    
    this.previousMouseX = event.clientX;
    this.previousMouseY = event.clientY;
  }

  private handleGamepadConnected(event: GamepadEvent): void {
    this.state.gamepadConnected = true;
  }

  private handleGamepadDisconnected(event: GamepadEvent): void {
    this.state.gamepadConnected = false;
  }

  private triggerMappedActions(input: string, type: InputType, value: number): void {
    for (const [action, mappings] of this.mappings.entries()) {
      for (const mapping of mappings) {
        if (mapping.type === type && mapping.key === input) {
          this.triggerAction(action, type, value);
        }
      }
    }
  }

  private triggerAction(action: InputAction, type: InputType, value: number): void {
    const event: InputEvent = {
      action,
      type,
      value,
      timestamp: Date.now(),
    };

    const actionHandlers = this.handlers.get(action);
    if (actionHandlers) {
      actionHandlers.forEach(handler => handler(event));
    }
  }

  public mapInput(action: InputAction, type: InputType, key?: string, button?: number, axis?: number): void {
    if (!this.mappings.has(action)) {
      this.mappings.set(action, []);
    }

    const mapping: InputMapping = {
      action,
      type,
      key,
      button,
      axis,
    };

    this.mappings.get(action)!.push(mapping);
  }

  public onAction(action: InputAction, handler: InputHandler): void {
    if (!this.handlers.has(action)) {
      this.handlers.set(action, []);
    }

    this.handlers.get(action)!.push(handler);
  }

  public isActionPressed(action: InputAction): boolean {
    const mappings = this.mappings.get(action);
    if (!mappings) return false;

    return mappings.some(mapping => {
      switch (mapping.type) {
        case InputType.KEYBOARD:
          return mapping.key && this.state.pressed.has(mapping.key);
        case InputType.MOUSE:
          return mapping.key && this.state.pressed.has(mapping.key);
        case InputType.GAMEPAD:
          // TODO: Implémenter la vérification des boutons de manette
          return false;
        default:
          return false;
      }
    });
  }

  public isActionJustPressed(action: InputAction): boolean {
    const mappings = this.mappings.get(action);
    if (!mappings) return false;

    return mappings.some(mapping => {
      switch (mapping.type) {
        case InputType.KEYBOARD:
          return mapping.key && this.state.justPressed.has(mapping.key);
        case InputType.MOUSE:
          return mapping.key && this.state.justPressed.has(mapping.key);
        case InputType.GAMEPAD:
          // TODO: Implémenter la vérification des boutons de manette
          return false;
        default:
          return false;
      }
    });
  }

  public getState(): InputState {
    return { ...this.state };
  }

  public update(): void {
    // Nettoyer les états temporaires
    this.state.justPressed.clear();
    this.state.justReleased.clear();
    this.state.mouseDeltaX = 0;
    this.state.mouseDeltaY = 0;

    // Mettre à jour l'état des manettes
    this.updateGamepadState();
  }

  private updateGamepadState(): void {
    if (!this.state.gamepadConnected) return;

    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0]; // Utiliser la première manette

    if (gamepad) {
      // Mettre à jour les sticks analogiques
      this.state.leftStickX = gamepad.axes[0] || 0;
      this.state.leftStickY = gamepad.axes[1] || 0;
      this.state.rightStickX = gamepad.axes[2] || 0;
      this.state.rightStickY = gamepad.axes[3] || 0;

      // TODO: Mettre à jour l'état des boutons
    }
  }

  public destroy(): void {
    // Supprimer tous les event listeners
    this.element.removeEventListener('keydown', this.handleKeyDown.bind(this));
    this.element.removeEventListener('keyup', this.handleKeyUp.bind(this));
    this.element.removeEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    this.element.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    
    window.removeEventListener('gamepadconnected', this.handleGamepadConnected.bind(this));
    window.removeEventListener('gamepaddisconnected', this.handleGamepadDisconnected.bind(this));

    // Nettoyer les références
    this.mappings.clear();
    this.handlers.clear();
  }
}
