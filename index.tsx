import { createRoot } from 'react-dom/client';
import { GameCanvas } from './src/game/scenes/GameCanvas';
import { LanguageMenu } from './src/components/LanguageMenu';
import i18n, { initI18n } from './src/services/i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  return (
    <>
      <LanguageMenu />
      <GameCanvas title={t('title')} />
    </>
  );
}

const root = createRoot(document.getElementById('root')!);
initI18n().then(() => {
  root.render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
  );
});
