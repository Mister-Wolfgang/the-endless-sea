import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { loadLocales } from './loadLocales';

// Initialisation asynchrone pour charger dynamiquement les langues
export async function initI18n() {
  const resources = await loadLocales();
  const availableLangs = Object.keys(resources).sort();

  // Debug en développement seulement (pas pendant les tests)
  if (process.env.NODE_ENV === 'development' && !process.env.JEST_WORKER_ID) {
    console.log('🌍 Langues disponibles pour i18n:', availableLangs);
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: availableLangs,
    load: 'languageOnly', // Ignorer les variantes régionales
    interpolation: { escapeValue: false },
    debug: process.env.NODE_ENV === 'development' && !process.env.JEST_WORKER_ID, // Debug en développement seulement
  });

  // S'assurer que les langues sont bien exposées
  i18n.languages = availableLangs;

  // Debug en développement seulement (pas pendant les tests)
  if (process.env.NODE_ENV === 'development' && !process.env.JEST_WORKER_ID) {
    console.log('🔧 i18n initialisé avec les langues:', i18n.languages);
  }

  return i18n;
}

export default i18n;
