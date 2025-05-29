import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { InputManager } from '../InputManager';
import { InputType, InputAction, InputState } from '../../types/input';

describe('InputManager', () => {
  let inputManager: InputManager;
  let mockElement: HTMLElement;

  beforeEach(() => {
    // Créer un élément mock pour les tests
    mockElement = document.createElement('div');
    document.body.appendChild(mockElement);
    
    // Réinitialiser l'InputManager
    inputManager = new InputManager(mockElement);
  });

  afterEach(() => {
    inputManager.destroy();
    document.body.removeChild(mockElement);
  });

  describe('Construction et initialisation', () => {
    it('devrait créer une instance d\'InputManager', () => {
      expect(inputManager).toBeInstanceOf(InputManager);
    });

    it('devrait initialiser l\'état d\'input avec des valeurs par défaut', () => {
      const state = inputManager.getState();
      expect(state.pressed.size).toBe(0);
      expect(state.justPressed.size).toBe(0);
      expect(state.justReleased.size).toBe(0);
      expect(state.mouseX).toBe(0);
      expect(state.mouseY).toBe(0);
      expect(state.gamepadConnected).toBe(false);
    });
  });

  describe('Gestion des événements clavier', () => {
    it('devrait détecter quand une touche est pressée', () => {
      const keyEvent = new KeyboardEvent('keydown', { key: 'w' });
      mockElement.dispatchEvent(keyEvent);
      
      const state = inputManager.getState();
      expect(state.pressed.has('w')).toBe(true);
      expect(state.justPressed.has('w')).toBe(true);
    });

    it('devrait détecter quand une touche est relâchée', () => {
      // Presser d'abord la touche
      const keyDownEvent = new KeyboardEvent('keydown', { key: 'w' });
      mockElement.dispatchEvent(keyDownEvent);
      
      // Puis la relâcher
      const keyUpEvent = new KeyboardEvent('keyup', { key: 'w' });
      mockElement.dispatchEvent(keyUpEvent);
      
      const state = inputManager.getState();
      expect(state.pressed.has('w')).toBe(false);
      expect(state.justReleased.has('w')).toBe(true);
    });

    it('ne devrait pas répéter justPressed pour une touche maintenue', () => {
      const keyEvent = new KeyboardEvent('keydown', { key: 'w' });
      
      // Premier appui
      mockElement.dispatchEvent(keyEvent);
      let state = inputManager.getState();
      expect(state.justPressed.has('w')).toBe(true);
      
      // Simuler un update
      inputManager.update();
      
      // Deuxième appui (répétition)
      mockElement.dispatchEvent(keyEvent);
      state = inputManager.getState();
      expect(state.justPressed.has('w')).toBe(false);
    });
  });

  describe('Gestion des événements souris', () => {
    it('devrait suivre la position de la souris', () => {
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 150
      });
      mockElement.dispatchEvent(mouseEvent);
      
      const state = inputManager.getState();
      expect(state.mouseX).toBe(100);
      expect(state.mouseY).toBe(150);
    });

    it('devrait calculer le delta de mouvement de la souris', () => {
      // Premier mouvement
      const mouseEvent1 = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100
      });
      mockElement.dispatchEvent(mouseEvent1);
      
      // Deuxième mouvement
      const mouseEvent2 = new MouseEvent('mousemove', {
        clientX: 110,
        clientY: 90
      });
      mockElement.dispatchEvent(mouseEvent2);
      
      const state = inputManager.getState();
      expect(state.mouseDeltaX).toBe(10);
      expect(state.mouseDeltaY).toBe(-10);
    });

    it('devrait détecter les clics de souris', () => {
      const mouseEvent = new MouseEvent('mousedown', { button: 0 });
      mockElement.dispatchEvent(mouseEvent);
      
      const state = inputManager.getState();
      expect(state.pressed.has('mouse0')).toBe(true);
    });
  });

  describe('Système de mapping des actions', () => {
    it('devrait permettre de mapper une touche à une action', () => {
      inputManager.mapInput(InputAction.MOVE_FORWARD, InputType.KEYBOARD, 'w');
      
      const keyEvent = new KeyboardEvent('keydown', { key: 'w' });
      mockElement.dispatchEvent(keyEvent);
      
      expect(inputManager.isActionPressed(InputAction.MOVE_FORWARD)).toBe(true);
    });

    it('devrait permettre de mapper plusieurs inputs à la même action', () => {
      inputManager.mapInput(InputAction.MOVE_FORWARD, InputType.KEYBOARD, 'w');
      inputManager.mapInput(InputAction.MOVE_FORWARD, InputType.KEYBOARD, 'ArrowUp');
      
      const keyEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      mockElement.dispatchEvent(keyEvent);
      
      expect(inputManager.isActionPressed(InputAction.MOVE_FORWARD)).toBe(true);
    });

    it('devrait déclencher les handlers d\'événements', () => {
      const mockHandler = jest.fn();
      inputManager.mapInput(InputAction.INTERACT, InputType.KEYBOARD, 'e');
      inputManager.onAction(InputAction.INTERACT, mockHandler);
      
      const keyEvent = new KeyboardEvent('keydown', { key: 'e' });
      mockElement.dispatchEvent(keyEvent);
      
      expect(mockHandler).toHaveBeenCalledWith({
        action: InputAction.INTERACT,
        type: InputType.KEYBOARD,
        value: 1,
        timestamp: expect.any(Number)
      });
    });
  });

  describe('Gestion des manettes', () => {
    it('devrait détecter la connexion d\'une manette', () => {
      const gamepadEvent = new Event('gamepadconnected');
      Object.defineProperty(gamepadEvent, 'gamepad', {
        value: { index: 0, id: 'test-gamepad' }
      });
      window.dispatchEvent(gamepadEvent);
      
      const state = inputManager.getState();
      expect(state.gamepadConnected).toBe(true);
    });

    it('devrait lire les positions des sticks analogiques', () => {
      // Simuler une manette connectée
      const gamepadEvent = new Event('gamepadconnected');
      Object.defineProperty(gamepadEvent, 'gamepad', {
        value: { index: 0, id: 'test-gamepad' }
      });
      window.dispatchEvent(gamepadEvent);
      
      const mockGamepad = {
        index: 0,
        axes: [0.5, -0.3, 0.1, 0.8], // leftX, leftY, rightX, rightY
        buttons: []
      };
      
      // Mock navigator.getGamepads
      Object.defineProperty(navigator, 'getGamepads', {
        value: jest.fn().mockReturnValue([mockGamepad]),
        configurable: true
      });
      
      inputManager.update();
      
      const state = inputManager.getState();
      expect(state.leftStickX).toBe(0.5);
      expect(state.leftStickY).toBe(-0.3);
      expect(state.rightStickX).toBe(0.1);
      expect(state.rightStickY).toBe(0.8);
    });
  });

  describe('Méthodes utilitaires', () => {
    it('devrait nettoyer les états justPressed et justReleased après update', () => {
      const keyEvent = new KeyboardEvent('keydown', { key: 'w' });
      mockElement.dispatchEvent(keyEvent);
      
      let state = inputManager.getState();
      expect(state.justPressed.has('w')).toBe(true);
      
      inputManager.update();
      
      state = inputManager.getState();
      expect(state.justPressed.has('w')).toBe(false);
    });

    it('devrait permettre de vérifier si une action vient d\'être pressée', () => {
      inputManager.mapInput(InputAction.INTERACT, InputType.KEYBOARD, 'e');
      
      const keyEvent = new KeyboardEvent('keydown', { key: 'e' });
      mockElement.dispatchEvent(keyEvent);
      
      expect(inputManager.isActionJustPressed(InputAction.INTERACT)).toBe(true);
      
      inputManager.update();
      
      expect(inputManager.isActionJustPressed(InputAction.INTERACT)).toBe(false);
    });

    it('devrait se nettoyer correctement lors de la destruction', () => {
      const destroySpy = jest.spyOn(inputManager, 'destroy');
      inputManager.destroy();
      expect(destroySpy).toHaveBeenCalled();
    });
  });
});
