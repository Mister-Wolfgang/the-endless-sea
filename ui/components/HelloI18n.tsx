import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const HelloI18n: FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <div style={{ padding: 16 }}>
      <h2>{t('welcome')}</h2>
      <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
      <button onClick={() => i18n.changeLanguage('en')} style={{ marginLeft: 8 }}>EN</button>
    </div>
  );
};

export default HelloI18n;
