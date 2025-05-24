import Phaser from 'phaser';
import { InputSystem, InputKey } from './InputSystem';
import i18next from 'i18next';

export default class Game extends Phaser.Scene {
  private inputSystem: InputSystem;
  private inputText!: Phaser.GameObjects.Text;
  private layoutText!: Phaser.GameObjects.Text;
  private controlsText!: Phaser.GameObjects.Text;

  constructor() {
    super('MainScene');
    this.inputSystem = new InputSystem();
  }

  preload() {
    // Chargement des assets si nécessaire
  }

  create() {
    // Titre du jeu
    this.add.text(100, 100, i18next.t('welcome'), { color: '#fff' });

    // Texte des contrôles
    this.layoutText = this.add.text(100, 150, '', { color: '#0f0' });
    this.inputText = this.add.text(100, 180, '', { color: '#0f0' });
    this.controlsText = this.add.text(100, 220, '', { color: '#0f0' });

    // Mise à jour des textes avec les traductions
    this.updateControlsDisplay();
    
    // Écouter les changements de langue
    const onLanguageChanged = () => this.updateControlsDisplay();
    i18next.on('languageChanged', onLanguageChanged);
    
    // S'assurer de nettoyer l'écouteur quand la scène est détruite
    this.events.once('shutdown', () => {
      i18next.off('languageChanged', onLanguageChanged);
    });
    
    // Gestion des événements clavier
    this.input.keyboard?.on('keydown', (event: { code: string, key: string }) => {
      this.inputSystem.onKeyDown(event);
      this.updateControlsDisplay();
    });

    this.input.keyboard?.on('keyup', (event: { code: string, key: string }) => {
      this.inputSystem.onKeyUp(event);
      this.updateControlsDisplay();
    });
  }

  private updateControlsDisplay() {
    const controls = this.inputSystem.getControlsInfo(i18next.t.bind(i18next));
    
    // Affichage de la disposition du clavier
    this.layoutText.setText(controls.layout);
    
    // Affichage des touches actuellement pressées
    const pressedKeys = this.inputSystem.getPressedKeys()
      .map(key => i18next.t(`controls.keys.${key}`))
      .join(', ');
    this.inputText.setText(i18next.t('controls.title') + ': ' + 
      (pressedKeys || i18next.t('controls.none')));
    
    // Affichage du mapping des contrôles
    this.controlsText.setText(
      Object.values(InputKey)
        .map(key => this.inputSystem.getKeyTranslation(key, i18next.t.bind(i18next)))
        .join('\n')
    );
  }

  update() {
    // Récupère les touches avec leur état physique réel (ZQSD ou WASD)
    const activeKeys = this.inputSystem.getActiveKeys();
    
    // Affiche les touches dans leur forme physique selon le layout
    const pressedKeys = activeKeys
      .filter(k => k.isPressed)
      .map(k => k.physicalKey);
    
    this.inputText.setText(`${i18next.t('controls.pressed_keys')}: ${pressedKeys.join(', ') || i18next.t('controls.none')}`);
    
    if (this.inputSystem.isActionPressed(InputKey.UP)) {
      this.inputText.setColor('#ff0');
    } else {
      this.inputText.setColor('#0f0');
    }
  }
}
