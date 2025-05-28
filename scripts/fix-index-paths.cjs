// Script Node.js pour corriger les chemins absolus en relatifs dans dist/index.html
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html introuvable');
  process.exit(1);
}
let html = fs.readFileSync(indexPath, 'utf-8');
// Corriger les chemins absolus en relatifs pour les assets
html = html.replace(/\s(src|href)="\/(assets\/[^"]+)"/g, ' $1="$2"');
// Corriger les chemins pour les assets dans src
html = html.replace(/\s(src|href)="\/src\/(assets\/[^"]+)"/g, ' $1="$2"');
fs.writeFileSync(indexPath, html);
console.log('Chemins corrigés dans dist/index.html');
