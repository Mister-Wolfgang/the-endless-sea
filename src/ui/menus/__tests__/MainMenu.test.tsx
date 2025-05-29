import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MainMenu } from '../MainMenu';

describe('MainMenu', () => {
  beforeEach(() => {
    // Setup pour chaque test
  });

  afterEach(() => {
    // Cleanup après chaque test
  });

  describe('Rendu du menu principal', () => {
    it('devrait afficher le titre du jeu', () => {
      render(<MainMenu />);
      
      expect(screen.getByText('The Endless Sea')).toBeDefined();
    });

    it('devrait afficher les options du menu principal', () => {
      render(<MainMenu />);
      
      expect(screen.getByText('Nouvelle Partie')).toBeDefined();
      expect(screen.getByText('Continuer')).toBeDefined();
      expect(screen.getByText('Options')).toBeDefined();
      expect(screen.getByText('Quitter')).toBeDefined();
    });

    it('devrait griser le bouton Continuer par défaut', () => {
      render(<MainMenu />);
      
      const continueButton = screen.getByText('Continuer');
      expect(continueButton.className).toContain('disabled');
    });

    it('devrait mettre en surbrillance la première option par défaut', () => {
      render(<MainMenu />);
      
      const newGameButton = screen.getByText('Nouvelle Partie');
      expect(newGameButton.className).toContain('selected');
    });
  });

  describe('Navigation au clavier', () => {
    it('devrait pouvoir naviguer vers le bas avec ArrowDown', async () => {
      render(<MainMenu />);
      
      const container = screen.getByRole('menu').parentElement!; // Le div container
      const newGameButton = screen.getByText('Nouvelle Partie');
      const continueButton = screen.getByText('Continuer');
      
      expect(newGameButton.className).toContain('selected');
      
      // Focus sur le container et simuler appui sur flèche bas
      container.focus();
      await act(async () => {
        fireEvent.keyDown(container, { key: 'ArrowDown' });
      });
      
      expect(continueButton.className).toContain('selected');
      expect(newGameButton.className).not.toContain('selected');
    });

    it('devrait pouvoir naviguer vers le haut avec ArrowUp', async () => {
      render(<MainMenu />);
      
      const container = screen.getByRole('menu').parentElement!; // Le div container
      const newGameButton = screen.getByText('Nouvelle Partie');
      const quitButton = screen.getByText('Quitter');
      
      // Focus sur le container et naviguer vers le haut depuis la première option (devrait aller à la dernière)
      container.focus();
      await act(async () => {
        fireEvent.keyDown(container, { key: 'ArrowUp' });
      });
      
      expect(quitButton.className).toContain('selected');
      expect(newGameButton.className).not.toContain('selected');
    });

    it('devrait boucler la navigation (bas → haut et haut → bas)', async () => {
      render(<MainMenu />);
      
      const container = screen.getByRole('menu').parentElement!; // Le div container
      const newGameButton = screen.getByText('Nouvelle Partie');
      const quitButton = screen.getByText('Quitter');
      
      container.focus();
      
      // Naviguer vers le bas 4 fois pour revenir au début
      await act(async () => {
        fireEvent.keyDown(container, { key: 'ArrowDown' }); // Continuer
        fireEvent.keyDown(container, { key: 'ArrowDown' }); // Options
        fireEvent.keyDown(container, { key: 'ArrowDown' }); // Quitter
        fireEvent.keyDown(container, { key: 'ArrowDown' }); // Retour à Nouvelle Partie
      });
      
      expect(newGameButton.className).toContain('selected');
      
      // Naviguer vers le haut depuis la première option
      await act(async () => {
        fireEvent.keyDown(container, { key: 'ArrowUp' });
      });
      
      expect(quitButton.className).toContain('selected');
    });
  });

  describe('Actions du menu', () => {
    it('devrait déclencher une action Nouvelle Partie sur Enter', async () => {
      const onNewGame = jest.fn();
      render(<MainMenu onNewGame={onNewGame} />);
      
      const container = screen.getByRole('menu').parentElement!; // Le div container
      
      // S'assurer que Nouvelle Partie est sélectionné (par défaut)
      const newGameButton = screen.getByText('Nouvelle Partie');
      expect(newGameButton.className).toContain('selected');
      
      // Focus sur le container et simuler appui sur Enter
      container.focus();
      await act(async () => {
        fireEvent.keyDown(container, { key: 'Enter' });
      });
      
      expect(onNewGame).toHaveBeenCalled();
    });

    it('ne devrait pas déclencher Continuer si disabled', async () => {
      const onContinue = jest.fn();
      render(<MainMenu onContinue={onContinue} hasSave={false} />);
      
      const container = screen.getByRole('menu').parentElement!; // Le div container
      
      // Naviguer vers le bouton Continuer (disabled)
      container.focus();
      await act(async () => {
        fireEvent.keyDown(container, { key: 'ArrowDown' });
      });
      
      const continueButton = screen.getByText('Continuer');
      expect(continueButton.className).toContain('selected');
      expect(continueButton.className).toContain('disabled');
      
      // Simuler appui sur Enter
      await act(async () => {
        fireEvent.keyDown(container, { key: 'Enter' });
      });
      
      expect(onContinue).not.toHaveBeenCalled();
    });

    it('devrait ouvrir le sous-menu Options', async () => {
      const onOpenOptions = jest.fn();
      render(<MainMenu onOpenOptions={onOpenOptions} />);
      
      const container = screen.getByRole('menu').parentElement!; // Le div container
      
      // Naviguer vers le bouton Options
      container.focus();
      await act(async () => {
        fireEvent.keyDown(container, { key: 'ArrowDown' }); // Continuer
        fireEvent.keyDown(container, { key: 'ArrowDown' }); // Options
      });
      
      const optionsButton = screen.getByText('Options');
      expect(optionsButton.className).toContain('selected');
      
      // Simuler appui sur Enter
      await act(async () => {
        fireEvent.keyDown(container, { key: 'Enter' });
      });
      
      expect(onOpenOptions).toHaveBeenCalled();
    });
  });

  describe('Accessibilité', () => {
    it('devrait avoir les attributs ARIA appropriés', () => {
      render(<MainMenu />);
      
      const menu = screen.getByRole('menu');
      expect(menu).toBeDefined();
      
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(4); // Nouvelle Partie, Continuer, Options, Quitter
    });

    it('devrait indiquer l\'option sélectionnée via aria-selected', () => {
      render(<MainMenu />);
      
      const newGameButton = screen.getByText('Nouvelle Partie');
      expect(newGameButton.getAttribute('aria-selected')).toBe('true');
    });
  });
});
