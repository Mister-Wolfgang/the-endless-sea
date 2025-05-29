// IMPORTANT : Les mocks doivent être placés avant tout import du composant testé !
jest.mock('../services/loadLocales', () => ({
  loadLocales: jest.fn().mockResolvedValue({
    en: {
      translation: {
        title: 'The Endless Sea',
        welcome: 'Welcome to the adventure!',
      },
    },
    fr: {
      translation: {
        title: 'La Mer Sans Fin',
        welcome: "Bienvenue dans l'aventure !",
      },
    },
  }),
}));

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
import { GameCanvas } from '../GameCanvas';
import { I18nextProvider } from 'react-i18next';
import i18n, { initI18n } from '../services/i18n';

describe('Lancement du jeu', () => {
  beforeAll(async () => {
    // Initialiser i18n avant les tests
    await initI18n();
  });

  it('affiche le canvas du jeu', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <GameCanvas title="The Endless Sea" />
      </I18nextProvider>,
    );
    // Vérifie qu'un canvas est bien présent dans le DOM
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('affiche le titre du jeu', () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <GameCanvas title="The Endless Sea" />
      </I18nextProvider>,
    );
    // Vérifie que le titre est bien présent dans le DOM (même via portal)
    const title = getByText('The Endless Sea');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
  });
});
