import { useEffect } from 'react';
import HelloI18n from './HelloI18n';
import i18n from '../i18n';

export default {
  title: 'UI/HelloI18n',
  component: HelloI18n,
  parameters: {
    layout: 'centered',
  },
};

export const Default = () => {
  useEffect(() => {
    i18n.changeLanguage('en');
  }, []);
  return <HelloI18n />;
};

export const French = () => {
  useEffect(() => {
    i18n.changeLanguage('fr');
  }, []);
  return <HelloI18n />;
};

export const Interactive = () => <HelloI18n />;
Interactive.storyName = 'Interactive (switch language)';
