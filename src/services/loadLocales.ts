// Chargement dynamique des fichiers de langue avec support des traductions utilisateur
export async function loadLocales(): Promise<Record<string, any>> {
  console.log('🌍 Début du chargement des traductions...');

  if (typeof window !== 'undefined' && (window as any).electronAPI) {
    // Electron renderer avec APIs sécurisées
    console.log('🔧 Mode Electron détecté avec APIs sécurisées');
    const electronAPI = (window as any).electronAPI;
    const processInfo = await electronAPI.getProcessInfo();

    console.log("📁 Chemin de l'exécutable:", processInfo.execPath);
    console.log('📁 Dossier de travail:', processInfo.cwd);

    // Définir les dossiers de traductions (utilisateur + application)
    let userLocalesDir = '';
    let appLocalesDir = '';

    if (processInfo.env.NODE_ENV === 'development') {
      // En développement - utiliser public/locales
      appLocalesDir = await electronAPI.pathJoin(
        processInfo.cwd,
        'public',
        'locales',
      );
      userLocalesDir = await electronAPI.pathJoin(
        processInfo.cwd,
        'user-translations',
      );
    } else {
      // En production - dossier utilisateur à côté de l'exécutable pour que les joueurs puissent y accéder
      userLocalesDir = await electronAPI.pathJoin(
        await electronAPI.pathDirname(processInfo.execPath),
        'translations',
      );
      appLocalesDir = await electronAPI.pathJoin(
        await electronAPI.pathDirname(processInfo.execPath),
        'resources',
        'locales',
      );
    }

    console.log('📦 Dossier traductions application:', appLocalesDir);
    console.log('👤 Dossier traductions utilisateur:', userLocalesDir);

    // Créer le dossier utilisateur s'il n'existe pas
    if (!(await electronAPI.existsSync(userLocalesDir))) {
      try {
        await electronAPI.mkdirSync(userLocalesDir);
        console.log('📁 Dossier traductions utilisateur créé:', userLocalesDir);

        // Copier les traductions par défaut si le dossier application existe
        if (await electronAPI.existsSync(appLocalesDir)) {
          const appFiles = (
            await electronAPI.readdirSync(appLocalesDir)
          ).filter((f: string) => f.endsWith('.json'));
          for (const file of appFiles) {
            const srcPath = await electronAPI.pathJoin(appLocalesDir, file);
            const destPath = await electronAPI.pathJoin(userLocalesDir, file);
            if (!(await electronAPI.existsSync(destPath))) {
              await electronAPI.copyFileSync(srcPath, destPath);
              console.log(`📋 Copié ${file} vers le dossier utilisateur`);
            }
          }

          // Créer un fichier README pour expliquer aux utilisateurs
          const readmePath = await electronAPI.pathJoin(
            userLocalesDir,
            'README.txt',
          );
          const readmeContent = `TRADUCTIONS - The Endless Sea
============================

Ce dossier contient les fichiers de traduction du jeu.

COMMENT AJOUTER UNE NOUVELLE LANGUE :
1. Copiez un fichier existant (par exemple fr.json)
2. Renommez-le avec le code de votre langue (ex: de.json pour l'allemand)
3. Modifiez les traductions à l'intérieur
4. Relancez le jeu

LANGUES ACTUELLEMENT SUPPORTÉES :
- en.json : Anglais
- fr.json : Français
- ru.json : Russe

Le jeu détecte automatiquement tous les fichiers .json dans ce dossier.

Bonne traduction ! 🌍
`;

          if (!(await electronAPI.existsSync(readmePath))) {
            await electronAPI.writeFileSync(readmePath, readmeContent);
            console.log('📝 Fichier README créé pour les utilisateurs');
          }
        }
      } catch (error) {
        console.warn('⚠️ Impossible de créer le dossier utilisateur:', error);
      }
    }

    // Charger les traductions depuis le dossier utilisateur (priorité) puis application
    const result: Record<string, any> = {};

    // 1. Charger depuis le dossier utilisateur (priorité)
    if (await electronAPI.existsSync(userLocalesDir)) {
      try {
        const userFiles = (
          await electronAPI.readdirSync(userLocalesDir)
        ).filter((f: string) => f.endsWith('.json'));
        console.log('👤 Fichiers utilisateur trouvés:', userFiles);

        for (const file of userFiles) {
          const code = file.replace(/\.json$/, '');
          try {
            const filePath = await electronAPI.pathJoin(userLocalesDir, file);
            const content = await electronAPI.readFile(filePath);
            if (content) {
              result[code] = {
                translation: JSON.parse(content),
              };
              console.log(
                `✅ Langue ${code} chargée depuis le dossier utilisateur`,
              );
            }
          } catch (error) {
            console.warn(
              `⚠️ Erreur lors du chargement de ${file} (utilisateur):`,
              error,
            );
          }
        }
      } catch (error) {
        console.warn(
          '⚠️ Erreur lors de la lecture du dossier utilisateur:',
          error,
        );
      }
    }

    // 2. Charger depuis le dossier application (fallback pour les langues manquantes)
    if (await electronAPI.existsSync(appLocalesDir)) {
      try {
        const appFiles = (await electronAPI.readdirSync(appLocalesDir)).filter(
          (f: string) => f.endsWith('.json'),
        );
        console.log('📦 Fichiers application trouvés:', appFiles);

        for (const file of appFiles) {
          const code = file.replace(/\.json$/, '');
          // Ne charger que si pas déjà chargé depuis le dossier utilisateur
          if (!result[code]) {
            try {
              const filePath = await electronAPI.pathJoin(appLocalesDir, file);
              const content = await electronAPI.readFile(filePath);
              if (content) {
                result[code] = {
                  translation: JSON.parse(content),
                };
                console.log(
                  `✅ Langue ${code} chargée depuis le dossier application`,
                );
              }
            } catch (error) {
              console.warn(
                `⚠️ Erreur lors du chargement de ${file} (application):`,
                error,
              );
            }
          }
        }
      } catch (error) {
        console.warn(
          '⚠️ Erreur lors de la lecture du dossier application:',
          error,
        );
      }
    }

    console.log('🌍 Langues chargées:', Object.keys(result));
    return result;
  } else {
    // Web : fetch tous les fichiers connus
    console.log('🌐 Mode Web détecté');
    const langs = ['en', 'fr', 'ru']; // Langues supportées en web
    const result: Record<string, any> = {};

    for (const code of langs) {
      try {
        const resp = await fetch(`/locales/${code}.json`);
        if (resp.ok) {
          result[code] = { translation: await resp.json() };
          console.log(`✅ Langue ${code} chargée depuis /locales/`);
        }
      } catch (error) {
        console.warn(`⚠️ Erreur lors du chargement de ${code}:`, error);
      }
    }

    console.log('🌐 Langues chargées (web):', Object.keys(result));
    return result;
  }
}
