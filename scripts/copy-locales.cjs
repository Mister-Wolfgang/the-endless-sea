// Script Node.js pour copier le dossier public/locales vers dist/locales (CommonJS)
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public', 'locales');
const destDir = path.join(__dirname, '..', 'dist', 'locales');

if (!fs.existsSync(srcDir)) {
  console.error('Le dossier public/locales est introuvable.');
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });

for (const file of fs.readdirSync(srcDir)) {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  fs.copyFileSync(srcFile, destFile);
}

console.log('Dossier locales copié dans dist/locales.');
