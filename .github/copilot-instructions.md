# Instructions GitHub Copilot - The Endless Sea

## Langue de Communication
**COMMUNICATION OBLIGATOIRE EN FRANÇAIS**. Tous les commentaires, documentation, réponses et interactions doivent être exclusivement en français. Aucune exception n'est tolérée, sauf pour les noms de fonctions, variables, propriétés et identifiants techniques qui restent en anglais.

## Gestionnaire de Paquets
**TOUJOURS utiliser `yarn` au lieu de `npm`**. Ne jamais suggérer de commandes npm.

## Structure du Projet
- `/game`: Logique de jeu ThreeJS/React Three Fiber (scènes, entités, systèmes)
- `/ui`: Composants React (menus, HUD, overlays) 
- `/shared`: Utilitaires communs, types, stores, services
- `/assets`: Ressources (sprites, sons, locales)
- `/__tests__`: Tous les tests unitaires et d'intégration

## Conventions de Nommage
- camelCase: variables, fonctions
- PascalCase: composants React, interfaces TypeScript
- kebab-case: noms de fichiers

## Méthodologie de Développement
- **TDD**: Écrire les tests avant le code
- **Composants atomiques**: Principe de responsabilité unique
- **Principes SOLID**: Suivre les 5 principes
- **Itératif**: Changements petits et incrémentaux

## Technologies Clés
- React 18 + TypeScript
- React Three Fiber pour la 3D
- Zustand pour la gestion d'état
- i18next pour l'internationalisation
- Jest + Testing Library pour les tests
- Vite pour le bundling
- Electron pour l'application desktop

## Qualité du Code
- Suivre les règles ESLint/Prettier
- Préférer les composants fonctionnels
- Utiliser les hooks React correctement
- Écrire des fonctions pures quand possible
- Documenter la logique complexe avec des commentaires