
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PhaserCanvas } from './components';

const App: FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <div
      id="root-app"
      style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      <PhaserCanvas />
      <div className="app-overlay" style={{ pointerEvents: 'none', zIndex: 10 }}>
        <div style={{ pointerEvents: 'auto' }}>
          {/* Exemple d'utilisation i18n */}
          <div
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              padding: 8,
              borderRadius: 4,
              zIndex: 20,
            }}
          >
            {t('welcome')}
            <div style={{ marginTop: 8 }}>
              <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
              <button onClick={() => i18n.changeLanguage('en')} style={{ marginLeft: 8 }}>EN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
