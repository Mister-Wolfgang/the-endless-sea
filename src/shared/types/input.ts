// Types pour le système d'input unifié (clavier, souris, manette)

export enum InputType {
  KEYBOARD = 'keyboard',
  MOUSE = 'mouse',
  GAMEPAD = 'gamepad',
}

export enum InputAction {
  // Mouvement
  MOVE_FORWARD = 'move_forward',
  MOVE_BACKWARD = 'move_backward',
  MOVE_LEFT = 'move_left',
  MOVE_RIGHT = 'move_right',
  
  // Navigation menu
  MENU_UP = 'menu_up',
  MENU_DOWN = 'menu_down',
  MENU_LEFT = 'menu_left',
  MENU_RIGHT = 'menu_right',
  MENU_SELECT = 'menu_select',
  MENU_BACK = 'menu_back',
  
  // Actions principales
  INTERACT = 'interact',
  CANCEL = 'cancel',
  CONFIRM = 'confirm',
  
  // Interface
  TOGGLE_INVENTORY = 'toggle_inventory',
  TOGGLE_MAP = 'toggle_map',
  TOGGLE_MENU = 'toggle_menu',
  
  // Combat/Navigation
  FIRE_CANNON = 'fire_cannon',
  RAISE_SAIL = 'raise_sail',
  LOWER_SAIL = 'lower_sail',
}

export interface InputState {
  // État des touches/boutons
  pressed: Set<string>;
  justPressed: Set<string>;
  justReleased: Set<string>;
  
  // Position de la souris
  mouseX: number;
  mouseY: number;
  mouseDeltaX: number;
  mouseDeltaY: number;
  
  // Manette
  gamepadConnected: boolean;
  leftStickX: number;
  leftStickY: number;
  rightStickX: number;
  rightStickY: number;
  gamepadButtons: Map<number, boolean>;
  gamepadPreviousButtons: Map<number, boolean>;
}

export interface InputMapping {
  action: InputAction;
  type: InputType;
  key?: string; // Pour clavier
  button?: number; // Pour souris/manette
  axis?: number; // Pour sticks analogiques
}

export interface InputEvent {
  action: InputAction;
  type: InputType;
  value: number; // 0-1 pour intensité
  timestamp: number;
}

export type InputHandler = (event: InputEvent) => void;
