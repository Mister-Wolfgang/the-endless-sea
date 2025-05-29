import { createRoot } from 'react-dom/client';
import { GameCanvas } from './src/game/scenes/GameCanvas';
import { MainMenu } from './src/ui/menus/MainMenu';
import { LanguageMenu } from './src/ui/components/LanguageMenu';
import { useAppStore } from './src/shared/stores/AppStore';
import i18n, { initI18n } from './src/services/i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const { game, setScene, startGame } = useAppStore();
  
  const handleContinue = () => {
    // TODO: Charger une sauvegarde
    setScene('game');
  };
  
  const handleOpenOptions = () => {
    // TODO: Ouvrir le menu d'options
    setScene('options');
  };
  
  const handleQuit = () => {
    // TODO: Gérer la fermeture de l'application
    if (window.electronAPI) {
      window.electronAPI.quit();
    } else {
      window.close();
    }
  };

  // Afficher le composant selon la scène courante
  const renderCurrentScene = () => {
    switch (game.currentScene) {
      case 'main':
        return (
          <MainMenu
            onContinue={handleContinue}
            onOpenOptions={handleOpenOptions}
            onQuit={handleQuit}
            hasSave={false} // TODO: Détecter les sauvegardes
          />
        );
      case 'game':
        return <GameCanvas title={t('title')} />;
      case 'options':
        return (
          <div style={{ padding: '2rem', color: 'white' }}>
            <h2>Options (TODO)</h2>
            <button onClick={() => setScene('main')}>Retour au menu principal</button>
          </div>
        );
      default:
        return <MainMenu onContinue={handleContinue} onOpenOptions={handleOpenOptions} onQuit={handleQuit} />;
    }
  };

  return (
    <>
      <LanguageMenu />
      {renderCurrentScene()}
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
