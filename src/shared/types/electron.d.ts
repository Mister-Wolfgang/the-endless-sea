// Types pour les APIs Electron exposées via contextBridge
export interface ElectronAPI {
  // APIs pour le système de fichiers (via IPC pour la sécurité)
  readFile: (filePath: string) => Promise<string | null>;
  existsSync: (filePath: string) => Promise<boolean>;
  readdirSync: (dirPath: string) => Promise<string[]>;
  mkdirSync: (dirPath: string) => Promise<boolean>;
  writeFileSync: (filePath: string, content: string) => Promise<boolean>;
  copyFileSync: (src: string, dest: string) => Promise<boolean>;

  // APIs pour les chemins
  pathJoin: (...args: string[]) => Promise<string>;
  pathDirname: (filePath: string) => Promise<string>;

  // APIs pour les informations sur le processus
  getProcessInfo: () => Promise<{
    execPath: string;
    cwd: string;
    platform: string;
    env: {
      NODE_ENV?: string;
    };
  }>;
  
  // APIs pour la gestion de l'application
  quit: () => void;
}

// Étendre l'interface Window pour inclure electronAPI
declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
