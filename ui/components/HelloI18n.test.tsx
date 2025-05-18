import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HelloI18n from './HelloI18n';


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'welcome') return 'Bonjour';
      if (key === 'hello') return 'Bonjour';
      return key;
    },
    i18n: {
      changeLanguage: jest.fn(),
      language: 'fr',
    },
  }),
}));

describe('HelloI18n', () => {

  it('affiche le texte traduit', () => {
    render(<HelloI18n />);
    expect(screen.getByText('Bonjour')).toBeInTheDocument();
  });

  it('affiche les boutons de langue', () => {
    render(<HelloI18n />);
    expect(screen.getByText('FR')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
});
