import { describe, it, expect, beforeEach } from '@jest/globals';
import { useAppStore } from '../AppStore';
import { GameState, PlayerState, InventoryState } from '../../types/store';

describe('AppStore', () => {
  beforeEach(() => {
    // Réinitialiser le store avant chaque test
    useAppStore.getState().startGame();
    useAppStore.getState().clearInventory();
  });

  describe('État initial', () => {
    it('devrait avoir un état de jeu initial correct', () => {
      const { game } = useAppStore.getState();
      
      expect(game.isPlaying).toBe(true);
      expect(game.isPaused).toBe(false);
      expect(game.currentScene).toBe('main');
    });

    it('devrait avoir un état de joueur initial correct', () => {
      const { player } = useAppStore.getState();
      
      expect(player.position).toEqual({ x: 0, y: 0, z: 0 });
      expect(player.rotation).toEqual({ x: 0, y: 0, z: 0 });
      expect(player.health).toBe(100);
      expect(player.energy).toBe(100);
    });

    it('devrait avoir un inventaire vide initial', () => {
      const { inventory } = useAppStore.getState();
      
      expect(inventory.items).toEqual([]);
      expect(inventory.maxCapacity).toBe(20);
    });
  });

  describe('Actions du jeu', () => {
    it('devrait pouvoir mettre en pause le jeu', () => {
      const store = useAppStore.getState();
      store.pauseGame();
      
      const updatedState = useAppStore.getState(); // Re-fetch l'état après mutation
      expect(updatedState.game.isPaused).toBe(true);
      expect(updatedState.game.isPlaying).toBe(true);
    });

    it('devrait pouvoir reprendre le jeu', () => {
      const store = useAppStore.getState();
      store.pauseGame();
      store.resumeGame();
      
      const updatedState = useAppStore.getState(); // Re-fetch l'état après mutation
      expect(updatedState.game.isPaused).toBe(false);
      expect(updatedState.game.isPlaying).toBe(true);
    });

    it('devrait pouvoir changer de scène', () => {
      const store = useAppStore.getState();
      store.setScene('inventory');
      
      const updatedState = useAppStore.getState(); // Re-fetch l'état après mutation
      expect(updatedState.game.currentScene).toBe('inventory');
    });
  });

  describe('Actions du joueur', () => {
    it('devrait pouvoir mettre à jour la position du joueur', () => {
      const store = useAppStore.getState();
      store.updatePlayerPosition(10, 5, 15);
      
      const updatedState = useAppStore.getState(); // Re-fetch l'état après mutation
      expect(updatedState.player.position).toEqual({ x: 10, y: 5, z: 15 });
    });

    it('devrait pouvoir mettre à jour la rotation du joueur', () => {
      const store = useAppStore.getState();
      store.updatePlayerRotation(0.5, 1.2, 0);
      
      const updatedState = useAppStore.getState(); // Re-fetch l'état après mutation
      expect(updatedState.player.rotation).toEqual({ x: 0.5, y: 1.2, z: 0 });
    });

    it('devrait pouvoir mettre à jour la santé du joueur', () => {
      const store = useAppStore.getState();
      store.updatePlayerHealth(75);
      
      const updatedState = useAppStore.getState(); // Re-fetch l'état après mutation
      expect(updatedState.player.health).toBe(75);
    });

    it('devrait pouvoir mettre à jour l\'énergie du joueur', () => {
      const store = useAppStore.getState();
      store.updatePlayerEnergy(50);
      
      const updatedState = useAppStore.getState(); // Re-fetch l'état après mutation
      expect(updatedState.player.energy).toBe(50);
    });
  });

  describe('Actions de l\'inventaire', () => {
    it('devrait pouvoir ajouter un objet à l\'inventaire', () => {
      const store = useAppStore.getState();
      const item = {
        id: 'sword-1',
        name: 'Épée en fer',
        quantity: 1,
        type: 'weapon'
      };
      
      store.addItem(item);
      
      const updatedState = useAppStore.getState(); // Re-fetch l'état après mutation
      expect(updatedState.inventory.items).toContain(item);
      expect(updatedState.inventory.items.length).toBe(1);
    });

    it('devrait pouvoir retirer un objet de l\'inventaire', () => {
      const store = useAppStore.getState();
      const item = {
        id: 'potion-1',
        name: 'Potion de soin',
        quantity: 3,
        type: 'consumable'
      };
      
      store.addItem(item);
      store.removeItem('potion-1', 1);
      
      const updatedState = useAppStore.getState(); // Re-fetch l'état après mutation
      const updatedItem = updatedState.inventory.items.find(i => i.id === 'potion-1');
      expect(updatedItem?.quantity).toBe(2);
    });

    it('devrait retirer complètement un objet si quantité = 0', () => {
      const store = useAppStore.getState();
      const item = {
        id: 'arrow-1',
        name: 'Flèche',
        quantity: 1,
        type: 'ammo'
      };
      
      store.addItem(item);
      store.removeItem('arrow-1', 1);
      
      const itemExists = store.inventory.items.some(i => i.id === 'arrow-1');
      expect(itemExists).toBe(false);
    });

    it('devrait pouvoir vider l\'inventaire', () => {
      const store = useAppStore.getState();
      store.addItem({ id: '1', name: 'Test', quantity: 1, type: 'test' });
      store.clearInventory();
      
      expect(store.inventory.items).toEqual([]);
    });
  });
});
