
// Mock PhaserCanvas pour éviter l'exécution de Phaser en test
jest.mock('../ui/components/PhaserCanvas', () => ({
  __esModule: true,
  default: () => <div data-testid="phaser-mock" />,
}));

// Mock react-i18next pour éviter les problèmes d'initialisation i18n en test
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key === 'welcome' ? 'Welcome to The Endless Sea!' : key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../ui/App';

describe('App', () => {
  it('affiche le texte de superposition UI', () => {
    render(<App />);
    expect(screen.getByText(/welcome to the endless sea/i)).toBeInTheDocument();
  });
});
