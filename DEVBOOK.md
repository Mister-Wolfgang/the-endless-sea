# DEVBOOK – Suivi de dév Composants atomiques

Ce document sert de tableau de bord pour suivre l’avancement du projet, étape par étape, selon la méthodologie itérative, atomique et TDD définie dans la documentation.

---

- Please follow every steps mentioned.
- Do not be lazy.
- Always provide the full document.
- Do not generate code.
- Answer in the shortest way possible, avoid long sentences, go straight to the point.
- Confirmation questions: Only ONE question per confirmation.

## 1. Découpage en tâches atomiques

- [x] Initialisation du projet (dépôt, outils, structure) _(26/05/2025)_
- [x] Configuration ESLint, Prettier, TypeScript, Jest _(26/05/2025)_
- [x] Setup Vite _(feature/setup-vite, 26/05/2025)_
- [x] Setup React _(feature/setup-react, 26/05/2025)_
- [x] Setup ThreeJS _(feature/setup-threejs, 26/05/2025)_
  - [x] Test d’intégration GameCanvas (mock WebGLRenderer, vérification canvas, TDD validé) _(26/05/2025)_
- [x] Setup React Three Fiber _(feature/setup-react-three-fiber, 26/05/2025)_
  - [x] Canvas plein écran, fond couleur, overlay titre React (hors Canvas)
  - [x] Cube 3D animé (rotation) avec React Three Fiber
  - [x] Tests d’intégration robustes (présence canvas et titre, sans mock complexe)
- [x] Setup Electron _(feature/setup-electron, 26/05/2025)_
  - [x] Installation Electron sans warning
  - [x] main.cjs compatible CommonJS, script dev: Vite + Electron en parallèle
  - [x] Lancement sans erreur, structure prête pour TDD
- [x] Setup i18n (i18next, fichiers de langue) _(feature/setup-i18n, 26/05/2025)_
  - [x] Installation i18next et react-i18next
  - [x] Fichiers de langue fr/en, intégration React, typage JSON OK
  - [x] Titre du jeu reste en anglais (clé "title"), mais la clé "welcome" est traduite et testée (FR/EN)
  - [x] Test unitaire validant la traduction de "welcome" (FR par défaut, EN après changement de langue)
  - [x] Lint, typecheck, tests OK
- [x] Setup Storybook _(feature/setup-storybook, 29/05/2025)_ ✅ **TERMINÉ**
  - [x] Installation Storybook v9.0.0 avec React-Vite
  - [x] Configuration automatique des addons essentiels
  - [x] Migration vers framework-based configuration
  - [x] Story de test LanguageMenu créée
  - [x] Tests d'intégration validés (configuration, scripts, stories)
  - [x] Interface accessible sur http://localhost:6006
- [x] Structure des dossiers et conventions _(refactor-structure, 29/05/2025)_ ✅ **TERMINÉ**

### 1.2. Composants atomiques ([Suivi détaillé](./docs/Suivi/01_TODO_Composants.md))

- [ ] Système d’input basique
- [ ] Affichage du personnage principal
- [ ] Mouvement du personnage
- [ ] Gestion des collisions
- [ ] Système d’inventaire minimal
- [ ] Boucle de jeu principale
- [ ] Système de sauvegarde simple

### 1.3. Gameplay ([Gameplay](./docs/Gameplay/README.md))

- [ ] Exploration maritime
- [ ] Navigation en temps réel
- [ ] Combats d’abordage (cartes)
- [ ] Progression du navire
- [ ] Recrutement/gestion équipage
- [ ] Économie et ressources
- [ ] Génération procédurale
- [ ] Progression de difficulté

### 1.4. Lore & Univers ([Lore](./docs/Lore/))

- [ ] Pitch de l’univers
- [ ] Factions principales
- [ ] Lieux clés
- [ ] Histoire de base
- [ ] Personnages principaux
- [ ] Mythologie, artefacts, créatures
- [ ] Direction artistique

### 1.5. Tests ([Stratégie](./docs/Tests/README.md), [TDD](./docs/Suivi/02_TODO_TDD.md))

- [ ] Tests input
- [ ] Tests mouvement
- [ ] Tests inventaire
- [ ] Tests sauvegarde
- [ ] Tests combat
- [ ] Tests équipage
- [ ] Tests génération procédurale

---

## 2. Suivi des étapes réalisées

Coche chaque case au fur et à mesure de l’avancement.  
Ajoute la date et un commentaire si besoin.

### Exemple de suivi

- [ ] Initialisation du projet
- [ ] Setup ESLint/Prettier/TS/Jest
- [ ] Setup Vite + React + ThreeJS (React Three Fiber) + Electron
- [ ] Setup i18n
- [ ] Setup Storybook
- [ ] Structure des dossiers
- [ ] Affichage du personnage principal
- [ ] Tests unitaires et React
- [ ] Système d’input basique

---

## 3. Règles de workflow

- **Découper** chaque fonctionnalité en tâches atomiques.
- **Écrire les tests avant le code** (TDD).
- **Documenter** chaque décision importante dans ce fichier ou dans `/docs/`.
- **Mettre à jour** ce DEVBOOK à chaque étape franchie.

---

## 4. Liens utiles

- [Méthodologie](./docs/METHODOLOGIE.md)
- [Conventions de code](./docs/CONVENTIONS.md)
- [Suivi composants](./docs/Suivi/01_TODO_Composants.md)
- [Suivi TDD](./docs/Suivi/02_TODO_TDD.md)
- [Suivi Lore](./docs/Suivi/03_TODO_Lore.md)
- [Tests](./docs/Tests/README.md)
- [Gameplay](./docs/Gameplay/README.md)
- [Lore](./docs/Lore/)

---

_Ajoute/modifie les tâches selon l’évolution du projet. Ce fichier est le point d’entrée pour piloter le développement solo._
