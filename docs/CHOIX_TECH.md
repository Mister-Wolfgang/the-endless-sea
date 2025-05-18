# Choix technologiques


## Langage recommandé

- **JavaScript/TypeScript** : moderne, vaste écosystème, idéal pour ThreeJS + React Three Fiber.

## Framework/Engine & Build

- **ThreeJS** : moteur 3D JS, parfait pour rogue-lite, gestion scènes, assets, collisions, très documenté.
- **React Three Fiber** : intégration de ThreeJS dans React, pour toute la logique 3D et l’UI interactive.
- **Web (natif)** : build standard (Webpack/Vite), déploiement direct navigateur.
- **Electron (desktop)** : packager le jeu en application Windows/Mac/Linux, accès facile au système de fichiers (pour /locales, /assets, sauvegardes, etc.).

## Outils de tests

- **Jest** (unitaires JS/TS)
- **Vitest** (alternative rapide à Jest)
- **Testing Library** (tests UI React)

## Qualité et automatisation

- **ESLint + Prettier** : linter et formatteur pour garder un code propre et homogène.
- **GitHub Actions** : automatisation des tests à chaque push/PR.

## Gestion de version

- **Git** (GitHub)

## Conseils

- Privilégie la simplicité et la rapidité de prototypage.
- Structure ton code en composants atomiques dès le début.
- Mets en place les tests dès la première fonctionnalité.
- Sépare bien la logique 3D (ThreeJS/React Three Fiber) et l’UI React classique.

## Gestion des assets

- Dossier `/assets` avec sous-dossiers `/sprites`, `/sons`, `/musique`, `/cartes`, etc.
- Noms explicites, formats standards (png, mp3, json).
- Documente la structure dans `/assets/README.md`.

## Internationalisation (i18n)

- Utilise **i18next** (et react-i18next) pour la gestion des traductions.
- Place un dossier `/locales` à côté de l’exécutable (ex: `/locales/fr.json`, `/locales/en.json`).
- Format JSON clé/valeur, un fichier par langue.
- Charge dynamiquement les fichiers au lancement (ThreeJS/React Three Fiber et React peuvent lire ces fichiers).
- Documente le format dans `/locales/README.md` pour aider les contributeurs.
- Prévois un fallback (anglais ou clé brute si traduction manquante).
- Ajoute une option dans l’UI pour choisir la langue.

## Conventions de code

- camelCase pour JS, PascalCase pour composants React.
- Dossiers : `/game` (ThreeJS/React Three Fiber), `/ui` (React), `/tests` (tests), `/assets` (ressources).
- Commentaires courts, docstring pour fonctions complexes.
- Ajoute un fichier `DOC/CONVENTIONS.md` pour résumer les règles.
