# 🧪 TEST DE REFACTORISATION - STRUCTURE JEU

**Date :** 29 mai 2025  
**Objectif :** Tester la nouvelle structure avant migration complète

## 📁 NOUVELLE STRUCTURE PROPOSÉE

```
src/
├── game/           # Logique de jeu (ThreeJS/React Three Fiber)
│   ├── entities/   # Joueur, navires, ennemis, NPCs
│   ├── systems/    # Input, mouvement, combat, inventaire
│   ├── components/ # Composants de jeu réutilisables
│   ├── scenes/     # Scènes 3D principales
│   └── core/       # Moteur de jeu, boucle principale
├── ui/             # Interface React pure
│   ├── hud/        # Interface en jeu
│   ├── menus/      # Menus principaux
│   ├── overlays/   # Popups, dialogues
│   └── components/ # Composants UI réutilisables
├── assets/         # Ressources (déjà OK)
├── shared/         # Utilitaires communs
│   ├── types/      # Types TypeScript
│   ├── utils/      # Fonctions utilitaires
│   ├── constants/  # Constantes globales
│   └── hooks/      # Hooks React personnalisés
└── __tests__/      # Tous les tests centralisés
    ├── game/       # Tests logique de jeu
    ├── ui/         # Tests interface
    └── integration/ # Tests d'intégration
```

## 🎯 TEST AVEC GAMECANVAS.TSX

### Analyse du fichier actuel :

- **Localisation actuelle :** `src/GameCanvas.tsx`
- **Type :** Composant 3D avec logique de rendu ThreeJS
- **Contenu :** Canvas 3D + cube animé + overlay titre

### Classification selon nouvelle structure :

- **Destination :** `src/game/scenes/GameCanvas.tsx`
- **Raison :** C'est une scène 3D principal du jeu utilisant React Three Fiber

## 📝 PLAN DE MIGRATION POUR CE FICHIER

1. **Créer** `src/game/scenes/`
2. **Déplacer** `GameCanvas.tsx` vers `src/game/scenes/GameCanvas.tsx`
3. **Mettre à jour** les imports qui référencent ce fichier
4. **Tester** que tout fonctionne
5. **Commiter** le changement

## ✅ VALIDATION NÉCESSAIRE

- [ ] Structure cohérente avec la logique de jeu ?
- [ ] Séparation claire game/ui respectée ?
- [ ] Tests facilement organisables ?
- [ ] Imports/exports maintenus ?

## 🚨 RISQUES IDENTIFIÉS

- Imports cassés dans les fichiers qui utilisent GameCanvas
- Tests qui référencent l'ancien chemin
- Configuration de build à ajuster

---

**❓ QUESTION :** Cette classification vous semble-t-elle correcte ? GameCanvas dans `game/scenes/` ?

## 🧪 RÉSULTATS DU TEST

### ✅ **TEST RÉUSSI - Build**

- Dossier créé : `src/game/scenes/`
- Fichier copié : `GameCanvas.tsx` → `src/game/scenes/GameCanvas.tsx`
- **Build Vite : ✅ SUCCÈS** (4.23s, aucune erreur)
- Import depuis nouvelle structure : **FONCTIONNEL**

### ❌ **PROBLÈME IDENTIFIÉ - Configuration Jest**

- Configuration Jest : `roots: ['<rootDir>/src', '<rootDir>/tests']`
- Mais tests réels dans : `/src/tests/`
- **Solution** : Corriger config Jest ou déplacer tests vers structure cible

### 📋 **FICHIERS AFFECTÉS PAR GAMECANVAS**

- `index.tsx` (import principal)
- `src/tests/game-launch.test.tsx` (tests)
- **Impact limité** : seulement 2 fichiers à modifier

### 🎯 **VALIDATION DE LA STRUCTURE**

La classification `GameCanvas` → `game/scenes/` est **PERTINENTE** car :

- C'est une scène 3D principale avec React Three Fiber
- Contient la logique de rendu du jeu
- N'est pas de l'UI pure mais du moteur de jeu

## ✅ **PRÊT POUR MIGRATION COMPLÈTE**

Le test confirme que la structure est viable. Prochaines étapes ?
