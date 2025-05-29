const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  // En dev, charge Vite, sinon le build
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

// Gestionnaires IPC pour les opérations de système de fichiers sécurisées
ipcMain.handle('fs:readFile', async (event, filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.warn(`Erreur lecture fichier ${filePath}:`, error);
    return null;
  }
});

ipcMain.handle('fs:exists', async (event, filePath) => {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    console.warn(`Erreur vérification fichier ${filePath}:`, error);
    return false;
  }
});

ipcMain.handle('fs:readdir', async (event, dirPath) => {
  try {
    return fs.readdirSync(dirPath);
  } catch (error) {
    console.warn(`Erreur lecture dossier ${dirPath}:`, error);
    return [];
  }
});

ipcMain.handle('fs:mkdir', async (event, dirPath) => {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
    return true;
  } catch (error) {
    console.warn(`Erreur création dossier ${dirPath}:`, error);
    return false;
  }
});

ipcMain.handle('fs:writeFile', async (event, filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  } catch (error) {
    console.warn(`Erreur écriture fichier ${filePath}:`, error);
    return false;
  }
});

ipcMain.handle('fs:copyFile', async (event, src, dest) => {
  try {
    fs.copyFileSync(src, dest);
    return true;
  } catch (error) {
    console.warn(`Erreur copie ${src} vers ${dest}:`, error);
    return false;
  }
});

ipcMain.handle('path:join', async (event, ...args) => {
  return path.join(...args);
});

ipcMain.handle('path:dirname', async (event, filePath) => {
  return path.dirname(filePath);
});

ipcMain.handle('process:getInfo', async (event) => {
  return {
    execPath: process.execPath,
    cwd: process.cwd(),
    platform: process.platform,
    env: {
      NODE_ENV: process.env.NODE_ENV,
    },
  };
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
