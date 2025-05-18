# Conventions de code

## Nommage

- camelCase pour variables et fonctions JS/TS
- PascalCase pour composants React
- snake_case pour fichiers si besoin

## Structure des dossiers

- /game : logique ThreeJS (React Three Fiber) (scènes, entités, systèmes)
- /ui : composants React (menus, HUD, overlays)
- /assets : ressources (sprites, sons, musiques, cartes, etc.)
- /tests : tous les tests unitaires et d’intégration

## Commentaires

- Courts, précis, uniquement si le code n’est pas évident
- Docstring pour fonctions complexes ou modules

## Import/Export

- Utilise les modules ES6 (import/export)
- Grouper les imports par type (librairies, internes, assets)

## Divers

- Un seul composant/fichier par fichier React
- Préfère les fonctions pures et composants fonctionnels
- Respecte les règles ESLint/Prettier
