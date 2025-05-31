# 🔍 AUDIT DE REFACTORISATION - The Endless Sea

## 📊 **RÉSUMÉ EXÉCUTIF**

**Problèmes identifiés** : 15+ incohérences de nommage et structure
**Impact** : Maintenance difficile, conventions non respectées
**Priorité** : HAUTE (bloque développement futur)
**Estimation** : 4-6 heures de refactorisation

---

## 🚨 **PROBLÈMES IDENTIFIÉS**

### 1. **INCOHÉRENCES DE NOMMAGE**

#### **Fichiers Composants (PascalCase vs kebab-case)**
❌ **PROBLÈME** : Mélange PascalCase/kebab-case
- `MainMenu.tsx` → devrait être `main-menu.tsx`
- `LanguageMenu.tsx` → devrait être `language-menu.tsx`
- `GameCanvas.tsx` → devrait être `game-canvas.tsx`
- `Flags.tsx` → devrait être `flags.tsx`
- `Button.tsx` → devrait être `button.tsx`
- `Header.tsx` → devrait être `header.tsx`
- `Page.tsx` → devrait être `page.tsx`

#### **Fichiers Stories (incohérent)**
❌ **PROBLÈME** : Nommage incohérent
- `LanguageMenu.stories.ts` → devrait être `language-menu.stories.ts`
- `Button.stories.ts` → devrait être `button.stories.ts`
- `Header.stories.ts` → devrait être `header.stories.ts`
- `Page.stories.ts` → devrait être `page.stories.ts`

#### **Fichiers Tests (incohérent)**
❌ **PROBLÈME** : Nommage incohérent
- `MainMenu.test.tsx` → devrait être `main-menu.test.tsx`
- `AppStore.test.ts` → devrait être `app-store.test.ts`
- `InputManager.test.ts` → devrait être `input-manager.test.ts`

#### **Fichiers Services/Types (PascalCase vs kebab-case)**
❌ **PROBLÈME** : Certains en PascalCase
- `AppStore.ts` → devrait être `app-store.ts`
- `InputManager.ts` → devrait être `input-manager.ts`

### 2. **STRUCTURE ARCHITECTURE MANQUANTE**

#### **Composants sans architecture colocation**
❌ **PROBLÈME** : Structure plate, pas de dossiers par composant
```
Actuel:
src/ui/components/
├── LanguageMenu.tsx
├── LanguageMenu.stories.ts
├── Flags.tsx

Attendu:
src/ui/components/
├── language-menu/
│   ├── index.tsx
│   ├── language-menu.tsx
│   ├── language-menu.test.tsx
│   └── language-menu.stories.ts
├── flags/
│   ├── index.tsx
│   ├── flags.tsx
│   ├── flags.test.tsx
│   └── flags.stories.ts
```

#### **Tests pas à côté des composants**
❌ **PROBLÈME** : Tests séparés dans `__tests__/`
- `src/ui/menus/__tests__/MainMenu.test.tsx` → devrait être `src/ui/menus/main-menu/main-menu.test.tsx`
- Tests services dans `__tests__/` séparés

#### **Stories Storybook séparées**
❌ **PROBLÈME** : Dossier `stories/` séparé des composants
- `src/stories/` → devrait être intégré dans chaque composant

### 3. **STRUCTURE DE DOSSIERS INCOHÉRENTE**

#### **Mélange conventions**
❌ **PROBLÈME** : 
- `src/services/` (kebab-case) vs `src/shared/services/` (kebab-case) OK
- `src/types/` vs `src/shared/types/` (duplication)
- Dossiers vides : `src/game/components/`, `src/game/core/`, `src/game/entities/`, `src/game/systems/`

#### **Duplication de structure**
❌ **PROBLÈME** :
- `src/services/` ET `src/shared/services/`
- `src/types/` ET `src/shared/types/`

### 4. **IMPORTS ET EXPORTS**

#### **Pas de barrel exports (index.tsx)**
❌ **PROBLÈME** : Imports directs, pas d'index.tsx
- Chaque dossier composant devrait avoir un `index.tsx`

#### **Imports relatifs longs**
❌ **PROBLÈME** : Imports complexes à maintenir
- `import { MainMenu } from './src/ui/menus/MainMenu'`
- Devrait être : `import { MainMenu } from '@/ui/menus/main-menu'`

---

## 📋 **PLAN DE REFACTORISATION**

### **PHASE 1 : Préparation (30 min)**
- [ ] Créer branch `refactor/kebab-case-architecture`
- [ ] Backup des tests pour validation post-refacto
- [ ] Script de migration automatique

### **PHASE 2 : Structure Composants UI (90 min)**
- [ ] Refactoriser `LanguageMenu` → architecture colocation
- [ ] Refactoriser `MainMenu` → architecture colocation  
- [ ] Refactoriser `Flags` → architecture colocation
- [ ] Créer barrel exports (`index.tsx`)
- [ ] Mettre à jour imports

### **PHASE 3 : Stories Storybook (45 min)**
- [ ] Déplacer stories vers composants respectifs
- [ ] Renommer fichiers stories en kebab-case
- [ ] Mettre à jour configuration Storybook
- [ ] Supprimer dossier `src/stories/`

### **PHASE 4 : Structure Game/Services (60 min)**
- [ ] Refactoriser `GameCanvas` → kebab-case + colocation
- [ ] Refactoriser `AppStore` → kebab-case + colocation
- [ ] Refactoriser `InputManager` → kebab-case + colocation
- [ ] Unifier `src/services/` vs `src/shared/services/`
- [ ] Unifier `src/types/` vs `src/shared/types/`

### **PHASE 5 : Tests et Validation (45 min)**
- [ ] Mettre à jour tous les imports dans tests
- [ ] Lancer suite de tests complète
- [ ] Vérifier Storybook fonctionne
- [ ] Vérifier build Vite/Electron

### **PHASE 6 : Configuration et Clean (30 min)**
- [ ] Mettre à jour chemins dans `tsconfig.json`
- [ ] Mettre à jour `.storybook/main.ts`
- [ ] Nettoyer dossiers vides
- [ ] Mettre à jour documentation

---

## 🎯 **RÉSULTAT ATTENDU**

### **Structure finale**
```
src/
├── game/
│   └── scenes/
│       └── game-canvas/
│           ├── index.tsx
│           ├── game-canvas.tsx
│           ├── game-canvas.test.tsx
│           └── game-canvas.stories.ts
├── ui/
│   ├── components/
│   │   ├── language-menu/
│   │   │   ├── index.tsx
│   │   │   ├── language-menu.tsx
│   │   │   ├── language-menu.test.tsx
│   │   │   └── language-menu.stories.ts
│   │   └── flags/
│   │       ├── index.tsx
│   │       ├── flags.tsx
│   │       ├── flags.test.tsx
│   │       └── flags.stories.ts
│   └── menus/
│       └── main-menu/
│           ├── index.tsx
│           ├── main-menu.tsx
│           ├── main-menu.test.tsx
│           └── main-menu.stories.ts
├── shared/
│   ├── services/
│   │   ├── input-manager/
│   │   │   ├── index.tsx
│   │   │   ├── input-manager.ts
│   │   │   └── input-manager.test.ts
│   │   └── i18n/
│   │       ├── index.tsx
│   │       ├── i18n.ts
│   │       ├── load-locales.ts
│   │       └── i18n.test.ts
│   ├── stores/
│   │   └── app-store/
│   │       ├── index.tsx
│   │       ├── app-store.ts
│   │       └── app-store.test.ts
│   └── types/
│       ├── input.ts
│       ├── store.ts
│       └── electron.d.ts
```

### **Avantages post-refacto**
✅ **Cohérence** : 100% kebab-case
✅ **Colocation** : Tests/stories à côté des composants
✅ **Maintenance** : Structure prédictible
✅ **DX** : Imports simplifiés avec barrel exports
✅ **Évolutivité** : Ajout de composants standardisé

---

## ⚠️ **RISQUES ET MITIGATIONS**

### **Risques identifiés**
1. **Breaks imports** → Validation tests complète
2. **Storybook cassé** → Test interface après chaque étape
3. **Build Electron impacté** → Validation build final
4. **Perte historique Git** → Branch de sauvegarde

### **Plan de rollback**
1. Branch `main` préservée
2. Script de rollback automatique si échec
3. Tests de validation à chaque étape

---

## 📅 **PLANNING PROPOSÉ**

**Durée totale** : 5h
**Découpage** : 6 phases de 30-90min
**Validation** : Tests après chaque phase
**Rollback** : Possible à tout moment

**Prêt à commencer la refactorisation ?**
