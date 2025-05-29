import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

// Plugin pour copier les fichiers de locale en développement
function copyLocalesPlugin() {
  return {
    name: 'copy-locales',
    configureServer(server) {
      // Copier les locales au démarrage du serveur de développement
      const srcDir = join(__dirname, 'src', 'locales');
      const destDir = join(__dirname, 'public', 'locales');

      if (existsSync(srcDir)) {
        mkdirSync(destDir, { recursive: true });

        for (const file of readdirSync(srcDir)) {
          const srcFile = join(srcDir, file);
          const destFile = join(destDir, file);
          copyFileSync(srcFile, destFile);
        }

        console.log('✓ Fichiers de locale copiés vers public/locales');
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyLocalesPlugin()],
  base: './',
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
  server: {
    port: 3000,
  },
});
