@echo off
echo ========================================
echo Build avec privileges administrateur
echo ========================================

REM Verifier si nous sommes admin
net session >nul 2>&1
if %errorLevel% NEQ 0 (
    echo Redemarrage en tant qu'administrateur...
    powershell -Command "Start-Process cmd -ArgumentList '/c %~f0' -Verb RunAs -Wait"
    pause
    exit /b
)

echo Execution en mode administrateur
cd /d "C:\Users\Wolfgang\Projects\the-endless-sea"

echo Nettoyage des fichiers precedents...
call yarn clean:release

echo Construction de l'application...
call yarn build

echo Packaging avec electron-builder...
set CSC_IDENTITY_AUTO_DISCOVERY=false
set ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true
call npx electron-builder --win

echo Build termine avec succes!

REM Verifier que l'application a ete creee
if exist "C:\Users\Wolfgang\Releases\The-Endless-Sea\win-unpacked" (
    echo Application disponible dans: C:\Users\Wolfgang\Releases\The-Endless-Sea\win-unpacked
    dir "C:\Users\Wolfgang\Releases\The-Endless-Sea\win-unpacked"
) else (
    echo Dossier d'application non trouve
)

echo.
echo Build termine. Appuyez sur une touche pour fermer...
pause
