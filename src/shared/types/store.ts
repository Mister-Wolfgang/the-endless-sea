// Types pour le système de state management global avec Zustand

// États globaux du jeu
export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  currentScene: string;
}

// État du joueur/personnage
export interface PlayerState {
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  health: number;
  energy: number;
}

// État de l'inventaire
export interface InventoryState {
  items: InventoryItem[];
  maxCapacity: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  type: string;
}

// Store principal combinant tous les états
export interface AppStore {
  // États
  game: GameState;
  player: PlayerState;
  inventory: InventoryState;
  
  // Actions du jeu
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  setScene: (scene: string) => void;
  
  // Actions du joueur
  updatePlayerPosition: (x: number, y: number, z: number) => void;
  updatePlayerRotation: (x: number, y: number, z: number) => void;
  updatePlayerHealth: (health: number) => void;
  updatePlayerEnergy: (energy: number) => void;
  
  // Actions de l'inventaire
  addItem: (item: InventoryItem) => void;
  removeItem: (itemId: string, quantity?: number) => void;
  clearInventory: () => void;
}
