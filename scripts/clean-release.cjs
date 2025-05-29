const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const releaseDir = 'C:\\Users\\Wolfgang\\Releases\\The-Endless-Sea';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function killElectronProcesses() {
  try {
    console.log('🔄 Arrêt des processus Electron...');
    execSync('taskkill /IM electron.exe /F', { stdio: 'ignore' });
  } catch (e) {
    // Processus déjà arrêté
  }

  try {
    execSync('taskkill /IM TheEndlessSea-Solo.exe /F', { stdio: 'ignore' });
  } catch (e) {
    // Processus déjà arrêté
  }

  // Attendre que les processus se ferment complètement
  await sleep(2000);
}

async function forceUnlockFiles(dir) {
  try {
    // Utiliser handle.exe si disponible pour fermer les handles de fichiers
    execSync(`handle.exe -p ${process.pid} -nobanner -accepteula`, {
      stdio: 'ignore',
    });
  } catch (e) {
    // handle.exe n'est pas disponible, on continue
  }
}

async function removeDirectoryWithRetry(dir, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      if (fs.existsSync(dir)) {
        console.log(
          `🗑️  Tentative ${i + 1}/${maxRetries} de suppression de ${dir}...`,
        );

        // Forcer la fermeture des handles de fichiers
        await forceUnlockFiles(dir);

        // Essayer de changer les permissions avant suppression
        try {
          execSync(`attrib -R "${dir}\\*.*" /S`, { stdio: 'ignore' });
        } catch (e) {
          // Ignore si attrib échoue
        }

        // Utiliser rmdir avec force sur Windows
        execSync(`rmdir /S /Q "${dir}"`, { stdio: 'ignore' });

        console.log(`✅ Dossier ${dir} supprimé avec succès`);
        return;
      } else {
        console.log(`ℹ️  Dossier ${dir} n'existe pas`);
        return;
      }
    } catch (error) {
      console.log(`❌ Tentative ${i + 1} échouée: ${error.message}`);

      if (i < maxRetries - 1) {
        console.log(
          `⏳ Attente de ${(i + 1) * 2} secondes avant nouvelle tentative...`,
        );
        await sleep((i + 1) * 2000);
      }
    }
  }

  console.log(
    `⚠️  Impossible de supprimer ${dir} après ${maxRetries} tentatives`,
  );
  console.log(
    '💡 Solution manuelle: Fermer VSCode et autres éditeurs, puis relancer la commande',
  );

  // Ne pas échouer le build, juste avertir
  console.log("🔄 Continuation du build malgré l'échec du nettoyage...");
}

async function main() {
  console.log('🧹 Début du nettoyage...');

  await killElectronProcesses();
  await removeDirectoryWithRetry(releaseDir);

  console.log('✨ Nettoyage terminé');
}

main().catch((error) => {
  console.error('❌ Erreur lors du nettoyage:', error);
  // Ne pas faire échouer le processus pour permettre au build de continuer
  process.exit(0);
});
