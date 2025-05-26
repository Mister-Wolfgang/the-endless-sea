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
- [ ] Setup React
- [ ] Setup ThreeJS
- [ ] Setup React Three Fiber
- [ ] Setup Electron
- [ ] Setup i18n (i18next, fichiers de langue)
- [ ] Setup Storybook
- [ ] Structure des dossiers et conventions

### 1.2. Composants atomiques ([Suivi détaillé](./docs/Suivi/01_TODO_Composants.md))

- [ ] Système d’input basique
- [ ] Affichage du personnage principal
- [ ] Mouvement du personnage
- [ ] Système d'input basique
- [ ] Gestion des collisionsSystème d'input basique
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
