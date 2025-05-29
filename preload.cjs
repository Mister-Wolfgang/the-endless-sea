const { contextBridge, ipcRenderer } = require('electron');

// Exposer des APIs sécurisées au renderer process via IPC
contextBridge.exposeInMainWorld('electronAPI', {
  // APIs pour le système de fichiers (via IPC pour la sécurité)
  readFile: async (filePath) => {
    return await ipcRenderer.invoke('fs:readFile', filePath);
  },

  existsSync: async (filePath) => {
    return await ipcRenderer.invoke('fs:exists', filePath);
  },

  readdirSync: async (dirPath) => {
    return await ipcRenderer.invoke('fs:readdir', dirPath);
  },

  // API pour créer des dossiers (pour les traductions utilisateur)
  mkdirSync: async (dirPath) => {
    return await ipcRenderer.invoke('fs:mkdir', dirPath);
  },

  // API pour écrire des fichiers (pour les traductions utilisateur)
  writeFileSync: async (filePath, content) => {
    return await ipcRenderer.invoke('fs:writeFile', filePath, content);
  },

  // API pour copier des fichiers
  copyFileSync: async (src, dest) => {
    return await ipcRenderer.invoke('fs:copyFile', src, dest);
  },

  // APIs pour les chemins
  pathJoin: async (...args) => {
    return await ipcRenderer.invoke('path:join', ...args);
  },

  pathDirname: async (filePath) => {
    return await ipcRenderer.invoke('path:dirname', filePath);
  },

  // APIs pour les informations sur le processus
  getProcessInfo: async () => {
    return await ipcRenderer.invoke('process:getInfo');
  },
});

// Log pour confirmer que le preload est chargé
console.log('Preload script chargé avec succès avec APIs sécurisées');
