# 🛡️ GARDE-FOUS ABSOLUS - RÈGLES INVIOLABLES

**Date de création :** 29 mai 2025  
**Raison :** Prévenir la destruction catastrophique du code par automatisation irréfléchie

---

## ⚠️ RÈGLES ABSOLUES - JAMAIS D'EXCEPTION

### 🗣️ LANGUE

- **TOUJOURS parler en français**
- Jamais d'anglais dans les communications avec l'utilisateur

### 📦 GESTIONNAIRE DE PAQUETS

- **TOUJOURS utiliser YARN**
- Jamais npm, pnpm ou autre
- Commandes : `yarn add`, `yarn install`, `yarn dev`, etc.

### 🧪 AUTOMATISATION

- **JAMAIS automatiser sans test préalable**
- Toujours créer un fichier de test avant d'appliquer des modifications en masse
- Tester sur UN SEUL fichier d'abord
- Demander validation avant application générale

### 📝 COMMITS

- **TOUJOURS faire des commits atomiques**
- Un commit = une modification logique
- Jamais de gros commits avec multiples changements
- Message de commit descriptif en français

### 🚫 INTERDICTIONS FORMELLES

#### ❌ JAMAIS faire :

- Scripts de modification en masse sans test
- Regex de remplacement global sur plusieurs fichiers
- Modifications automatiques d'imports/exports
- Changements de structure sans validation
- Suppression/modification de fichiers existants sans confirmation explicite

#### ❌ JAMAIS utiliser :

- `sed`, `awk`, ou outils de remplacement en masse
- Scripts Node.js de modification de fichiers
- Regex complexes sur du code source
- Outils automatiques de refactoring sans validation

### ✅ PROCÉDURE OBLIGATOIRE AVANT TOUTE MODIFICATION

1. **Analyser** la demande
2. **Proposer** la solution
3. **Créer** un fichier de test si automatisation
4. **Tester** sur un échantillon
5. **Valider** avec l'utilisateur
6. **Appliquer** une modification à la fois
7. **Commiter** chaque changement
8. **Vérifier** que tout fonctionne

### 🔒 VERROUS DE SÉCURITÉ

#### Avant toute modification de fichier :

- [ ] Est-ce que je comprends parfaitement ce que fait cette modification ?
- [ ] Ai-je testé sur un fichier isolé ?
- [ ] L'utilisateur a-t-il validé explicitement ?
- [ ] Puis-je annuler facilement cette modification ?

#### Avant tout script automatique :

- [ ] **STOP - JAMAIS DE SCRIPT AUTOMATIQUE SANS TEST**
- [ ] Créer d'abord un fichier de test
- [ ] Montrer le résultat à l'utilisateur
- [ ] Obtenir validation explicite

### 📋 CHECKLIST DE SÉCURITÉ

Avant chaque action :

```
□ Action en français ?
□ Utilise YARN ?
□ Testé avant automatisation ?
□ Commit atomique prévu ?
□ Pas de modification en masse ?
□ Validation utilisateur obtenue ?
```

---

## 🆘 EN CAS D'ERREUR

1. **ARRÊTER IMMÉDIATEMENT**
2. **S'EXCUSER SINCÈREMENT**
3. **PROPOSER UNE SOLUTION DE RÉCUPÉRATION**
4. **NE PAS AGGRAVER LA SITUATION**
5. **ATTENDRE LES INSTRUCTIONS DE L'UTILISATEUR**

---

## 💡 BONNES PRATIQUES

### Modifications de code :

- Une modification = un fichier = un commit
- Toujours lire le fichier avant modification
- Utiliser `replace_string_in_file` avec contexte précis
- Vérifier après chaque modification

### Communication :

- Expliquer clairement ce que je vais faire
- Demander confirmation pour les changements importants
- Proposer des alternatives
- Être transparent sur les risques

---

**⚠️ CES RÈGLES SONT ABSOLUES ET INVIOLABLES ⚠️**

_Toute violation de ces règles constitue une faute grave pouvant détruire le travail de l'utilisateur._
