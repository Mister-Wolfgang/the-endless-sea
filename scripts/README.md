# Scripts Utilitaires - The Endless Sea

Ce dossier contient tous les scripts utilitaires pour le développement et la distribution du jeu.

## Scripts de Build et Distribution

### `build-win-admin.bat`

**Description :** Script de build Windows avec privilèges administrateur  
**Usage :** `.\scripts\build-win-admin.bat` ou `yarn dist:win`  
**Fonction :**

- Vérifie les privilèges administrateur
- Nettoie les fichiers précédents
- Lance le build complet avec Electron Builder

### `clean-release.cjs`

**Description :** Nettoyage des fichiers de release précédents  
**Usage :** `node scripts\clean-release.cjs` ou `yarn clean:release`  
**Fonction :**

- Arrête tous les processus Electron en cours
- Supprime les dossiers de build précédents
- Déverrouille les fichiers en cours d'utilisation

### `copy-locales.cjs`

**Description :** Copie les fichiers de traduction vers le build  
**Usage :** Automatiquement exécuté lors du `yarn build`  
**Fonction :**

- Copie `public/locales/` vers `dist/locales/`
- Assure que les traductions sont disponibles dans le build

### `fix-index-paths.cjs`

**Description :** Corrige les chemins absolus dans le HTML de build  
**Usage :** Automatiquement exécuté lors du `yarn build`  
**Fonction :**

- Convertit les chemins absolus en chemins relatifs
- Assure la compatibilité avec Electron

## Scripts de Déploiement

### `create-portable.ps1`

**Description :** Création d'une version portable du jeu  
**Usage :** `.\scripts\create-portable.ps1`  
**Fonction :**

- Crée une archive ZIP portable
- Ajoute les fichiers nécessaires pour une distribution autonome

### `run-packaged.bat`

**Description :** Lance l'application empaquetée pour test  
**Usage :** `.\scripts\run-packaged.bat`  
**Fonction :**

- Lance directement l'exécutable de la version empaquetée
- Utile pour tester la version finale

## Utilisation dans package.json

Les scripts sont intégrés dans les commandes yarn suivantes :

```json
{
  "scripts": {
    "build": "vite build && node scripts/copy-locales.cjs && node scripts/fix-index-paths.cjs",
    "clean:release": "node scripts/clean-release.cjs",
    "dist:win": "scripts/build-win-admin.bat",
    "dist:linux": "yarn clean:release && electron-builder --linux",
    "dist:mac": "yarn clean:release && electron-builder --mac"
  }
}
```

## Notes Importantes

- Tous les scripts utilisent des chemins relatifs depuis la racine du projet
- Les scripts `.cjs` utilisent `path.join(__dirname, '..', ...)` pour remonter à la racine
- Le script `build-win-admin.bat` change automatiquement vers le répertoire racine
- Les chemins Windows dans les scripts utilisent des barres obliques inversées ou des chemins absolus selon le contexte

## Structure des Fichiers de Configuration

Les fichiers de configuration principaux restent à la racine :

- `main.cjs` - Point d'entrée principal d'Electron
- `preload.cjs` - Script de préchargement sécurisé
- `eslint.config.cjs` - Configuration ESLint
- `jest.config.cjs` - Configuration Jest
