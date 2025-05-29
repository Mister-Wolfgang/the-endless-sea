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
  
  // Debounce pour les sticks analogiques
  private stickLastTrigger: Map<string, number> = new Map();
  private readonly STICK_DEBOUNCE_MS = 200; // 200ms entre les déclenchements stick

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
      gamepadButtons: new Map<number, boolean>(),
      gamepadPreviousButtons: new Map<number, boolean>(),
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
    console.log(`[InputManager] ✅ Manette connectée dans l'app:`, event.gamepad.id);
    this.state.gamepadConnected = true;
  }

  private handleGamepadDisconnected(event: GamepadEvent): void {
    console.log(`[InputManager] ❌ Manette déconnectée dans l'app:`, event.gamepad.id);
    this.state.gamepadConnected = false;
  }

  private triggerMappedActions(input: string, type: InputType, value: number): void {
    console.log(`[InputManager] 🔍 Recherche mappings pour: "${input}" (${type}) avec valeur ${value}`);
    
    for (const [action, mappings] of this.mappings.entries()) {
      for (const mapping of mappings) {
        let isMatch = false;
        
        if (mapping.type === type) {
          if (type === InputType.GAMEPAD) {
            // Pour la manette, vérifier les boutons ou les noms spéciaux (stick, dpad)
            if (mapping.button !== undefined) {
              isMatch = input === `button${mapping.button}`;
            } else if (mapping.key) {
              isMatch = mapping.key === input;
            }
          } else {
            // Pour clavier et souris
            isMatch = mapping.key === input;
          }
        }
        
        if (isMatch) {
          console.log(`[InputManager] ✅ Mapping trouvé: ${action} <- "${input}" (${type})`);
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
      console.log(`[InputManager] 🚀 Déclenchement action "${action}" avec ${actionHandlers.length} handler(s)`);
      actionHandlers.forEach(handler => handler(event));
    } else {
      console.log(`[InputManager] ⚠️ Aucun handler pour l'action "${action}"`);
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
          if (mapping.button !== undefined) {
            return this.state.gamepadButtons.get(mapping.button) || false;
          }
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
          if (mapping.button !== undefined) {
            const isPressed = this.state.gamepadButtons.get(mapping.button) || false;
            const wasPressed = this.state.gamepadPreviousButtons.get(mapping.button) || false;
            return isPressed && !wasPressed;
          }
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
    // Mettre à jour l'état des manettes AVANT de nettoyer les états temporaires
    this.updateGamepadState();
    
    // Nettoyer les états temporaires
    this.state.justPressed.clear();
    this.state.justReleased.clear();
    this.state.mouseDeltaX = 0;
    this.state.mouseDeltaY = 0;
  }

  private updateGamepadState(): void {
    if (!this.state.gamepadConnected) return;

    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0]; // Utiliser la première manette

    if (!gamepad) return;

    // Copier l'état précédent des boutons
    this.state.gamepadPreviousButtons.clear();
    for (const [buttonIndex, pressed] of this.state.gamepadButtons.entries()) {
      this.state.gamepadPreviousButtons.set(buttonIndex, pressed);
    }

    // Mettre à jour les sticks analogiques
    const leftStickX = gamepad.axes[0] || 0;
    const leftStickY = gamepad.axes[1] || 0;
    const rightStickX = gamepad.axes[2] || 0;
    const rightStickY = gamepad.axes[3] || 0;

    // Détecter les mouvements de stick significatifs (seuil de 0.3)
    const STICK_THRESHOLD = 0.3;
    const now = Date.now();
    
    // Stick gauche pour navigation avec debounce
    if (Math.abs(leftStickX) > STICK_THRESHOLD || Math.abs(leftStickY) > STICK_THRESHOLD) {
      // Navigation horizontale
      if (leftStickX > STICK_THRESHOLD) {
        const lastTrigger = this.stickLastTrigger.get('stick_right') || 0;
        if (now - lastTrigger >= this.STICK_DEBOUNCE_MS) {
          console.log(`[InputManager] 🕹️ Stick droite détecté: X=${leftStickX.toFixed(2)}`);
          this.triggerMappedActions('stick_right', InputType.GAMEPAD, leftStickX);
          this.stickLastTrigger.set('stick_right', now);
        }
      } else if (leftStickX < -STICK_THRESHOLD) {
        const lastTrigger = this.stickLastTrigger.get('stick_left') || 0;
        if (now - lastTrigger >= this.STICK_DEBOUNCE_MS) {
          console.log(`[InputManager] 🕹️ Stick gauche détecté: X=${leftStickX.toFixed(2)}`);
          this.triggerMappedActions('stick_left', InputType.GAMEPAD, Math.abs(leftStickX));
          this.stickLastTrigger.set('stick_left', now);
        }
      }
      
      // Navigation verticale
      if (leftStickY > STICK_THRESHOLD) {
        const lastTrigger = this.stickLastTrigger.get('stick_down') || 0;
        if (now - lastTrigger >= this.STICK_DEBOUNCE_MS) {
          console.log(`[InputManager] 🕹️ Stick bas détecté: Y=${leftStickY.toFixed(2)}`);
          this.triggerMappedActions('stick_down', InputType.GAMEPAD, leftStickY);
          this.stickLastTrigger.set('stick_down', now);
        }
      } else if (leftStickY < -STICK_THRESHOLD) {
        const lastTrigger = this.stickLastTrigger.get('stick_up') || 0;
        if (now - lastTrigger >= this.STICK_DEBOUNCE_MS) {
          console.log(`[InputManager] 🕹️ Stick haut détecté: Y=${leftStickY.toFixed(2)}`);
          this.triggerMappedActions('stick_up', InputType.GAMEPAD, Math.abs(leftStickY));
          this.stickLastTrigger.set('stick_up', now);
        }
      }
    }

    this.state.leftStickX = leftStickX;
    this.state.leftStickY = leftStickY;
    this.state.rightStickX = rightStickX;
    this.state.rightStickY = rightStickY;

    // Mettre à jour l'état des boutons
    for (let i = 0; i < gamepad.buttons.length; i++) {
      const button = gamepad.buttons[i];
      const isPressed = button.pressed;
      const wasPressed = this.state.gamepadButtons.get(i) || false;

      this.state.gamepadButtons.set(i, isPressed);

      // Détecter les pressions et relâchements
      if (isPressed && !wasPressed) {
        console.log(`[InputManager] 🎮 Bouton ${i} pressé`);
        this.triggerMappedActions(`button${i}`, InputType.GAMEPAD, button.value);
      } else if (!isPressed && wasPressed) {
        console.log(`[InputManager] 🎮 Bouton ${i} relâché`);
        this.triggerMappedActions(`button${i}`, InputType.GAMEPAD, 0);
      }
    }

    // Gérer le D-pad (souvent des axes 4 et 5 sur Xbox 360) avec debounce
    const dpadX = gamepad.axes[6] || 0; // Axe horizontal du D-pad
    const dpadY = gamepad.axes[7] || 0; // Axe vertical du D-pad

    if (Math.abs(dpadX) > 0.5 || Math.abs(dpadY) > 0.5) {
      if (dpadX > 0.5) {
        const lastTrigger = this.stickLastTrigger.get('dpad_right') || 0;
        if (now - lastTrigger >= this.STICK_DEBOUNCE_MS) {
          console.log(`[InputManager] 🎮 D-pad droite détecté: X=${dpadX}`);
          this.triggerMappedActions('dpad_right', InputType.GAMEPAD, 1);
          this.stickLastTrigger.set('dpad_right', now);
        }
      } else if (dpadX < -0.5) {
        const lastTrigger = this.stickLastTrigger.get('dpad_left') || 0;
        if (now - lastTrigger >= this.STICK_DEBOUNCE_MS) {
          console.log(`[InputManager] 🎮 D-pad gauche détecté: X=${dpadX}`);
          this.triggerMappedActions('dpad_left', InputType.GAMEPAD, 1);
          this.stickLastTrigger.set('dpad_left', now);
        }
      }
      
      if (dpadY > 0.5) {
        const lastTrigger = this.stickLastTrigger.get('dpad_down') || 0;
        if (now - lastTrigger >= this.STICK_DEBOUNCE_MS) {
          console.log(`[InputManager] 🎮 D-pad bas détecté: Y=${dpadY}`);
          this.triggerMappedActions('dpad_down', InputType.GAMEPAD, 1);
          this.stickLastTrigger.set('dpad_down', now);
        }
      } else if (dpadY < -0.5) {
        const lastTrigger = this.stickLastTrigger.get('dpad_up') || 0;
        if (now - lastTrigger >= this.STICK_DEBOUNCE_MS) {
          console.log(`[InputManager] 🎮 D-pad haut détecté: Y=${dpadY}`);
          this.triggerMappedActions('dpad_up', InputType.GAMEPAD, 1);
          this.stickLastTrigger.set('dpad_up', now);
        }
      }
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
