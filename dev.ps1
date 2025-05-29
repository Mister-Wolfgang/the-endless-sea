#!/usr/bin/env pwsh

# Script d'aide pour les commandes courantes de The Endless Sea

param(
    [Parameter(Position=0)]
    [string]$Command,
    
    [Parameter(Position=1, ValueFromRemainingArguments=$true)]
    [string[]]$Args
)

$ScriptsDir = Join-Path $PSScriptRoot "scripts"

function Show-Help {
    Write-Host "🌊 The Endless Sea - Scripts Utilitaires" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\dev.ps1 <commande> [arguments]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Commandes disponibles:" -ForegroundColor Green
    Write-Host "  dev            - Lancer le serveur de développement"
    Write-Host "  build          - Construire l'application"
    Write-Host "  clean          - Nettoyer les fichiers de build"
    Write-Host "  dist-win       - Créer la distribution Windows"
    Write-Host "  run-packaged   - Lancer l'application empaquetée"
    Write-Host "  create-portable - Créer une version portable"
    Write-Host "  test           - Lancer les tests"
    Write-Host "  lint           - Vérifier le code"
    Write-Host "  format         - Formater le code"
    Write-Host ""
    Write-Host "Exemples:" -ForegroundColor Blue
    Write-Host "  .\dev.ps1 dev           # Lance le serveur de développement"
    Write-Host "  .\dev.ps1 build         # Construit l'application"
    Write-Host "  .\dev.ps1 dist-win      # Crée la distribution Windows"
    Write-Host ""
}

switch ($Command) {
    "dev" {
        Write-Host "🚀 Lancement du serveur de développement..." -ForegroundColor Green
        yarn dev
    }
    "build" {
        Write-Host "🏗️ Construction de l'application..." -ForegroundColor Green
        yarn build
    }
    "clean" {
        Write-Host "🧹 Nettoyage des fichiers de build..." -ForegroundColor Green
        yarn clean:release
    }
    "dist-win" {
        Write-Host "📦 Création de la distribution Windows..." -ForegroundColor Green
        & "$ScriptsDir\build-win-admin.bat"
    }
    "run-packaged" {
        Write-Host "🎮 Lancement de l'application empaquetée..." -ForegroundColor Green
        & "$ScriptsDir\run-packaged.bat"
    }
    "create-portable" {
        Write-Host "💾 Création de la version portable..." -ForegroundColor Green
        & "$ScriptsDir\create-portable.ps1"
    }
    "test" {
        Write-Host "🧪 Lancement des tests..." -ForegroundColor Green
        yarn test
    }
    "lint" {
        Write-Host "🔍 Vérification du code..." -ForegroundColor Green
        yarn lint
    }
    "format" {
        Write-Host "✨ Formatage du code..." -ForegroundColor Green
        yarn format:fix
    }
    "help" {
        Show-Help
    }
    default {
        if ([string]::IsNullOrWhiteSpace($Command)) {
            Show-Help
        } else {
            Write-Host "❌ Commande inconnue: $Command" -ForegroundColor Red
            Write-Host ""
            Show-Help
        }
    }
}
