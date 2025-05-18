# DEVBOOK – Suivi de développement The Endless Sea - Solo

Ce document sert de tableau de bord pour suivre l’avancement du projet, étape par étape, selon la méthodologie itérative, atomique et TDD définie dans la documentation.

---

## 1. Découpage en tâches atomiques

### 1.1. Systèmes de base

- [x] Initialisation du projet (dépôt, outils, structure) *(24/05/2025)*
- [x] Configuration ESLint, Prettier, TypeScript, Jest *(24/05/2025)*
- [x] Setup Vite + React + Phaser + Electron *(24/05/2025)*
- [x] Setup i18n (i18next, fichiers de langue) *(24/05/2025)*
- [x] Setup Storybook *(24/05/2025)*
- [x] Structure des dossiers et conventions *(24/05/2025)*

### 1.2. Composants atomiques ([Suivi détaillé](./docs/Suivi/01_TODO_Composants.md))

- [ ] Système d’input basique
- [x] Affichage du personnage principal *(CharacterPreview, Storybook, 24/05/2025)*
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

- [x] Tests input *(setup Jest, 24/05/2025)*
- [x] Tests mouvement *(exemples unitaires, 24/05/2025)*
- [x] Tests inventaire *(structure prête, 24/05/2025)*
- [ ] Tests sauvegarde
- [x] Tests combat *(tests React/Phaser, 24/05/2025)*
- [ ] Tests équipage
- [ ] Tests génération procédurale

---

## 2. Suivi des étapes réalisées

Coche chaque case au fur et à mesure de l’avancement.  
Ajoute la date et un commentaire si besoin.

### Exemple de suivi

- [x] Initialisation du projet *(24/05/2025)*
- [x] Setup ESLint/Prettier/TS/Jest *(24/05/2025)*
- [x] Setup Vite + React + Phaser + Electron *(24/05/2025)*
- [x] Setup i18n *(24/05/2025)*
- [x] Setup Storybook *(24/05/2025)*
- [x] Structure des dossiers *(24/05/2025)*
- [x] Affichage du personnage principal *(CharacterPreview, Storybook, 24/05/2025)*
- [x] Tests unitaires et React *(24/05/2025)*
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

*Ajoute/modifie les tâches selon l’évolution du projet. Ce fichier est le point d’entrée pour piloter le développement solo.*
