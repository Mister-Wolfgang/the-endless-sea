// IMPORTANT : Les mocks doivent être placés avant tout import du composant testé !
jest.mock('@react-three/drei', () => {
  const actualDrei = jest.requireActual('@react-three/drei');
  return {
    ...actualDrei,
    Html: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});
jest.mock('three', () => {
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

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GameCanvas } from '../src/GameCanvas';

describe('Lancement du jeu', () => {
  it('affiche le canvas du jeu', () => {
    render(<GameCanvas title="The Endless Sea" />);
    // Vérifie qu'un canvas est bien présent dans le DOM
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('affiche le titre du jeu', () => {
    const { getByText } = render(<GameCanvas title="The Endless Sea" />);
    // Vérifie que le titre est bien présent dans le DOM (même via portal)
    const title = getByText('The Endless Sea');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
  });
});
