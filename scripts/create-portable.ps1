# Script PowerShell pour créer un package portable de l'application
# Contournement pour les problèmes de signature de code avec electron-builder

Write-Host "🚀 Création d'un package portable..." -ForegroundColor Green

# Vérifier que l'application existe
$appPath = "C:\Users\Wolfgang\Releases\The-Endless-Sea\win-unpacked"
if (-not (Test-Path $appPath)) {
    Write-Host "❌ Application non trouvée dans $appPath" -ForegroundColor Red
    Write-Host "🔄 Construction de l'application..." -ForegroundColor Yellow
    
    # Construire l'application
    npx vite build
    node copy-locales.cjs
    node fix-index-paths.cjs
    
    # Package avec electron seulement (pas d'installateur)
    $env:CSC_IDENTITY_AUTO_DISCOVERY = "false"
    $env:ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES = "true"
    npx electron-builder --win --dir
    
    if (-not (Test-Path $appPath)) {
        Write-Host "❌ Impossible de créer l'application" -ForegroundColor Red
        exit 1
    }
}

# Créer un package portable ZIP
$packageName = "The-Endless-Sea-Solo-Portable-v1.0.0"
$packagePath = "C:\Users\Wolfgang\Releases\The-Endless-Sea\$packageName"

Write-Host "📦 Création du package portable $packageName..." -ForegroundColor Yellow

# Nettoyer le dossier de package s'il existe
if (Test-Path $packagePath) {
    Remove-Item -Recurse -Force $packagePath
}

# Créer le dossier de package
New-Item -ItemType Directory -Path $packagePath -Force | Out-Null

# Copier l'application
Copy-Item -Recurse -Path "$appPath\*" -Destination $packagePath

# Créer un fichier README pour le package
$readmeContent = @"
# The Endless Sea - Solo
Version 1.0.0 - Package Portable

## Installation
Aucune installation requise ! Décompressez simplement ce dossier où vous voulez.

## Utilisation
Exécutez "The Endless Sea - Solo.exe" pour lancer le jeu.

## Fonctionnalités
- Jeu d'aventure maritime en 3D
- Support multilingue (Français/Anglais)
- Interface React Three Fiber
- Aucune installation requise

## Développé par
Wolfgang - 2025

---
Généré automatiquement par le script de packaging PowerShell
"@

Set-Content -Path "$packagePath\README.txt" -Value $readmeContent -Encoding UTF8

# Créer un fichier de lancement alternatif
$launcherContent = @"
@echo off
cd /d "%~dp0"
start "" "The Endless Sea - Solo.exe"
"@

Set-Content -Path "$packagePath\Lancer-le-jeu.bat" -Value $launcherContent -Encoding ASCII

# Créer l'archive ZIP
Write-Host "📁 Création de l'archive ZIP..." -ForegroundColor Yellow
$zipPath = "C:\Users\Wolfgang\Releases\The-Endless-Sea\$packageName.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath
}

# Utiliser la compression PowerShell native
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($packagePath, $zipPath)

# Statistiques
$zipSize = (Get-Item $zipPath).Length / 1MB
$appSize = (Get-ChildItem -Recurse $packagePath | Measure-Object -Property Length -Sum).Sum / 1MB

Write-Host ""
Write-Host "✅ Package créé avec succès !" -ForegroundColor Green
Write-Host "📁 Dossier: $packagePath" -ForegroundColor Cyan
Write-Host "📦 Archive: $zipPath ($([math]::Round($zipSize, 2)) MB)" -ForegroundColor Cyan
Write-Host "💾 Taille totale: $([math]::Round($appSize, 2)) MB" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎮 Pour tester, exécutez:" -ForegroundColor Yellow
Write-Host "   .\$packagePath\The\ Endless\ Sea\ -\ Solo.exe" -ForegroundColor White
Write-Host ""
Write-Host "📤 Pour distribuer, partagez le fichier:" -ForegroundColor Yellow
Write-Host "   $zipPath" -ForegroundColor White
