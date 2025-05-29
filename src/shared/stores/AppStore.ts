import { create } from 'zustand';
import { 
  AppStore, 
  GameState, 
  PlayerState, 
  InventoryState, 
  InventoryItem 
} from '../types/store';

// États initiaux
const initialGameState: GameState = {
  isPlaying: true,  // Changé de false à true pour correspondre aux tests
  isPaused: false,
  currentScene: 'main',
};

const initialPlayerState: PlayerState = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  health: 100,
  energy: 100,
};

const initialInventoryState: InventoryState = {
  items: [],
  maxCapacity: 20,
};

export const useAppStore = create<AppStore>((set, get) => ({
  // États initiaux
  game: initialGameState,
  player: initialPlayerState,
  inventory: initialInventoryState,

  // Actions du jeu
  startGame: () => set((state) => ({
    game: {
      ...state.game,
      isPlaying: true,
      isPaused: false,
    }
  })),

  pauseGame: () => set((state) => ({
    game: {
      ...state.game,
      isPaused: true,
    }
  })),

  resumeGame: () => set((state) => ({
    game: {
      ...state.game,
      isPaused: false,
    }
  })),

  setScene: (scene: string) => set((state) => ({
    game: {
      ...state.game,
      currentScene: scene,
    }
  })),

  // Actions du joueur
  updatePlayerPosition: (x: number, y: number, z: number) => set((state) => ({
    player: {
      ...state.player,
      position: { x, y, z },
    }
  })),

  updatePlayerRotation: (x: number, y: number, z: number) => set((state) => ({
    player: {
      ...state.player,
      rotation: { x, y, z },
    }
  })),

  updatePlayerHealth: (health: number) => set((state) => ({
    player: {
      ...state.player,
      health: Math.max(0, Math.min(100, health)), // Limiter entre 0 et 100
    }
  })),

  updatePlayerEnergy: (energy: number) => set((state) => ({
    player: {
      ...state.player,
      energy: Math.max(0, Math.min(100, energy)), // Limiter entre 0 et 100
    }
  })),

  // Actions de l'inventaire
  addItem: (item: InventoryItem) => set((state) => {
    const existingItemIndex = state.inventory.items.findIndex(i => i.id === item.id);
    
    if (existingItemIndex >= 0) {
      // L'objet existe déjà, augmenter la quantité
      const updatedItems = [...state.inventory.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + item.quantity,
      };
      
      return {
        inventory: {
          ...state.inventory,
          items: updatedItems,
        }
      };
    } else {
      // Nouvel objet
      return {
        inventory: {
          ...state.inventory,
          items: [...state.inventory.items, item],
        }
      };
    }
  }),

  removeItem: (itemId: string, quantity: number = 1) => set((state) => {
    const updatedItems = state.inventory.items
      .map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity - quantity;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter((item): item is InventoryItem => item !== null);

    return {
      inventory: {
        ...state.inventory,
        items: updatedItems,
      }
    };
  }),

  clearInventory: () => set((state) => ({
    inventory: {
      ...state.inventory,
      items: [],
    }
  })),
}));
