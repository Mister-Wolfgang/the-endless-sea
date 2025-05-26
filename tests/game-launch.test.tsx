

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GameCanvas } from '../src/GameCanvas';

// Mock complet de three pour WebGLRenderer
jest.mock('three', () => {
  // On importe le vrai module pour tout sauf WebGLRenderer
  const actualThree = jest.requireActual('three');
  return {
    ...actualThree,
    WebGLRenderer: jest.fn().mockImplementation(() => {
      const fakeCanvas = document.createElement('canvas');
      fakeCanvas.getContext = jest.fn();
      return {
        domElement: fakeCanvas,
        setSize: jest.fn(),
        render: jest.fn(),
        dispose: jest.fn(),
      };
    }),
  };
});

describe('Lancement du jeu', () => {
  it('affiche le canvas du jeu', () => {
    render(<GameCanvas />);
    // Vérifie qu'un canvas est bien présent dans le DOM
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
