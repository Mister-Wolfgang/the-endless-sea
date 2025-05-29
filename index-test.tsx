import { createRoot } from 'react-dom/client';
// TEST : nouveau chemin GameCanvas
import { GameCanvas } from './src/game/scenes/GameCanvas';
import { LanguageMenu } from './src/components/LanguageMenu';
import i18n, { initI18n } from './src/services/i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';

export function App() {
  const { t } = useTranslation();
  return (
    <div>
      {/* GameCanvas depuis la nouvelle structure */}
      <GameCanvas title={t('title')} />
      <LanguageMenu />
    </div>
  );
}

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  
  initI18n().then(() => {
    root.render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
  });
}
