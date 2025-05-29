# Suivi des composants atomiques

- [x] Système d'input basique ✅ **TERMINÉ** _(29/05/2025)_
  - [x] Types TypeScript (InputState, InputAction, InputMapping, etc.)
  - [x] Service InputManager avec clavier, souris et manette
  - [x] Tests TDD complets (16 tests passant)
  - [x] Mapping actions configurables et handlers
- [x] Système de store/state management global ✅ **TERMINÉ** _(29/05/2025)_
  - [x] Store Zustand avec état global (jeu, joueur, inventaire)
  - [x] Types TypeScript pour toutes les entités du store
  - [x] 14 tests TDD passant avec toutes les actions
  - [x] Actions game/player/inventory complètes et testées
- [ ] Menu principal interactif
  - [ ] Types et actions store pour état menu (currentMenu, selectedItem, etc.)
  - [ ] Composant MenuPrincipal avec structure de navigation
  - [ ] Intégration InputManager pour contrôles clavier/manette
  - [ ] Navigation verticale (haut/bas) entre options
  - [ ] Bouton "Nouvelle Partie" → startGame() + setScene('game')
  - [ ] Bouton "Continuer" → grisé si pas de sauvegarde
  - [ ] Bouton "Options" → sous-menu avec retour
  - [ ] Sous-menu "Langue" avec sélection FR/EN (i18n)
  - [ ] Sous-menu "Contrôles" avec mapping InputManager
  - [ ] Bouton "Quitter" → fermeture app
  - [ ] Tests TDD navigation, actions, intégrations
- [ ] Affichage du personnage principal
- [ ] Mouvement du personnage
- [ ] Gestion des collisions
- [ ] Système d’inventaire minimal
- [ ] Boucle de jeu principale
- [ ] Système de sauvegarde simple

_Ajoute ou modifie selon tes besoins._
