# 🛠️ DEVBOOK REFACTORISATION - Architecture & Nommage

## 📋 **DÉCOUPAGE ATOMIQUE**

### **✅ PHASE 1 : Préparation**
- [ ] Créer branch `refactor/kebab-case-architecture`
- [ ] Backup état actuel (tests validés)
- [ ] Script migration automatique

### **🔄 PHASE 2 : Composants UI Core**

#### **2.1 language-menu (20 min)**
- [ ] Créer `src/ui/components/language-menu/`
- [ ] Créer `index.tsx` (barrel export)
- [ ] Renommer `LanguageMenu.tsx` → `language-menu.tsx`
- [ ] Déplacer story → `language-menu.stories.ts`
- [ ] Créer test → `language-menu.test.tsx`
- [ ] Mettre à jour imports dans `index.tsx`

#### **2.2 flags (15 min)**
- [ ] Créer `src/ui/components/flags/`
- [ ] Renommer `Flags.tsx` → `flags.tsx`
- [ ] Créer barrel export
- [ ] Créer test basique
- [ ] Mettre à jour imports LanguageMenu

#### **2.3 main-menu (25 min)**
- [ ] Créer `src/ui/menus/main-menu/`
- [ ] Renommer `MainMenu.tsx` → `main-menu.tsx`
- [ ] Déplacer `__tests__/MainMenu.test.tsx` → `main-menu.test.tsx`
- [ ] Créer barrel export
- [ ] Créer story → `main-menu.stories.ts`
- [ ] Mettre à jour import dans `index.tsx`

### **🎮 PHASE 3 : Composants Game**

#### **3.1 game-canvas (20 min)**
- [ ] Créer `src/game/scenes/game-canvas/`
- [ ] Renommer `GameCanvas.tsx` → `game-canvas.tsx`
- [ ] Créer barrel export
- [ ] Créer story → `game-canvas.stories.ts`
- [ ] Mettre à jour test existant
- [ ] Mettre à jour import dans `index.tsx`

### **⚙️ PHASE 4 : Services & Stores**

#### **4.1 app-store (20 min)**
- [ ] Créer `src/shared/stores/app-store/`
- [ ] Renommer `AppStore.ts` → `app-store.ts`
- [ ] Déplacer `__tests__/AppStore.test.ts` → `app-store.test.ts`
- [ ] Créer barrel export
- [ ] Mettre à jour imports

#### **4.2 input-manager (20 min)**
- [ ] Créer `src/shared/services/input-manager/`
- [ ] Renommer `InputManager.ts` → `input-manager.ts`
- [ ] Déplacer test → `input-manager.test.ts`
- [ ] Créer barrel export
- [ ] Mettre à jour imports

#### **4.3 i18n-service (25 min)**
- [ ] Créer `src/shared/services/i18n/`
- [ ] Déplacer `src/services/i18n.ts` → `i18n.ts`
- [ ] Déplacer `src/services/loadLocales.ts` → `load-locales.ts`
- [ ] Créer barrel export unifié
- [ ] Créer test d'intégration
- [ ] Supprimer ancien `src/services/`

### **📚 PHASE 5 : Stories Storybook**

#### **5.1 migration-stories (30 min)**
- [ ] Supprimer exemples Storybook (`src/stories/Button`, `Header`, `Page`)
- [ ] Mettre à jour `.storybook/main.ts` (patterns stories)
- [ ] Valider toutes stories fonctionnent
- [ ] Nettoyer assets inutiles

### **🧪 PHASE 6 : Types & Structure**

#### **6.1 types-unification (15 min)**
- [ ] Supprimer `src/types/` (doublons)
- [ ] Conserver uniquement `src/shared/types/`
- [ ] Mettre à jour imports TypeScript

#### **6.2 dossiers-vides (10 min)**
- [ ] Supprimer dossiers vides :
  - `src/game/components/`
  - `src/game/core/`
  - `src/game/entities/`
  - `src/game/systems/`
  - `src/shared/components/layout/`
  - `src/shared/components/ui/`
  - `src/shared/constants/`
  - `src/shared/hooks/`
  - `src/shared/utils/`
  - `src/ui/hud/`
  - `src/ui/overlays/`

### **⚡ PHASE 7 : Configuration & Validation**

#### **7.1 configuration (20 min)**
- [ ] Mettre à jour `.storybook/main.ts` (nouveaux patterns)
- [ ] Vérifier `tsconfig.json` (paths si nécessaire)
- [ ] Mettre à jour `.eslintrc` si patterns spécifiques

#### **7.2 validation-complète (30 min)**
- [ ] **Tests** : `yarn test` (tous verts)
- [ ] **Lint** : `yarn lint` (aucune erreur)
- [ ] **Build** : `yarn build` (succès)
- [ ] **Storybook** : `yarn storybook` (toutes stories OK)
- [ ] **Electron** : `yarn dev` (lancement OK)

#### **7.3 nettoyage-final (15 min)**
- [ ] Supprimer fichiers temporaires
- [ ] Mettre à jour documentation (`DEVBOOK.md`)
- [ ] Commit final refactorisation
- [ ] Merge dans `main`

---

## 🎯 **CHECKPOINTS DE VALIDATION**

### **Après chaque composant** :
- [ ] Import/export fonctionne
- [ ] Test passe si existant
- [ ] Story charge si existante

### **Après chaque phase** :
- [ ] `yarn test` (pas de régression)
- [ ] `yarn build` (succès)

### **Validation finale** :
- [ ] Tous tests passent
- [ ] Storybook complet
- [ ] Build Electron OK
- [ ] Performance identique

---

## 📝 **RÈGLES DE REFACTO**

### **Nommage uniforme** :
- **Fichiers** : `kebab-case` uniquement
- **Composants** : `PascalCase` (nom export)
- **Dossiers** : `kebab-case` uniquement

### **Structure composant** :
```
component-name/
├── index.tsx          # Barrel export
├── component-name.tsx # Composant principal
├── component-name.test.tsx # Tests (si existants)
├── component-name.stories.ts # Story (si existante)
└── component-name.css # Styles (si nécessaires)
```

### **Barrel exports** :
```typescript
// index.tsx
export { ComponentName } from './component-name';
export type { ComponentNameProps } from './component-name';
```

### **Imports mis à jour** :
```typescript
// Avant
import { LanguageMenu } from './src/ui/components/LanguageMenu';

// Après  
import { LanguageMenu } from '@/ui/components/language-menu';
```

---

## ⏱️ **ESTIMATION TOTALE**

**Durée** : 4h30
**Complexité** : Moyenne
**Risque** : Faible (tests existants)

**Prêt à démarrer ?**
