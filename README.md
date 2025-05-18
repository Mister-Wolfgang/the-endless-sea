# Initialisation du projet

## 1. Initialisation du dépôt

```sh
yarn init -y
git init
```

## 2. Installation des dépendances principales

```sh
yarn add react react-dom @react-three/fiber three i18next react-i18next
```

## 2bis. Installation de Storybook

```sh
yarn add -D @storybook/react @storybook/addon-actions @storybook/addon-links @storybook/addons
```

## 3. Installation des outils de build et dev

```sh
yarn add -D typescript @types/react @types/react-dom vite eslint prettier jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event electron
```

## 4. Structure recommandée

```cmd
/game         # logique ThreeJS (React Three Fiber)
/ui           # composants React
/assets       # sprites, sons, musiques, cartes...
/locales      # fichiers de traduction JSON
/tests        # tests unitaires et d’intégration
```

## 5. Configurations à prévoir

- TypeScript : `tsconfig.json`
- ESLint : `.eslintrc`
- Prettier : `.prettierrc`
- Jest : `jest.config.js`
- Electron : `main.js` (entrée principale)
- Vite : `vite.config.ts`

## 6. Lancement

- Dev web : `yarn vite`
- Dev desktop : `yarn electron .`
- Tests : `yarn test`

- Storybook : `yarn storybook`

_Adapte selon tes besoins, tout est prêt pour coder avec ThreeJS et React Three Fiber !_
