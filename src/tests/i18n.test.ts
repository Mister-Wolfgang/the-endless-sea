// Mock loadLocales pour les tests
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

import i18n, { initI18n } from '../services/i18n';

describe('i18n configuration', () => {
  beforeAll(async () => {
    // Initialiser i18n avant les tests
    await initI18n();
  });

  it('charge la langue par défaut (en)', () => {
    expect(i18n.language).toBe('en');
    expect(i18n.t('title')).toBe('The Endless Sea'); // le titre reste en anglais
    expect(i18n.t('welcome')).toBe('Welcome to the adventure!');
  });

  it('bascule en anglais', async () => {
    await i18n.changeLanguage('en');
    expect(i18n.language).toBe('en');
    expect(i18n.t('title')).toBe('The Endless Sea'); // le titre reste en anglais
    expect(i18n.t('welcome')).toBe('Welcome to the adventure!');
  });
});
