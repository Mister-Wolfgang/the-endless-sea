import Phaser from 'phaser';
import { InputSystem, InputKey } from './InputSystem';
import { MovementSystem } from './MovementSystem';
import i18next from 'i18next';

export default class Game extends Phaser.Scene {
  private inputSystem: InputSystem;
  private movementSystem: MovementSystem;
  private inputText!: Phaser.GameObjects.Text;
  private layoutText!: Phaser.GameObjects.Text;
  private controlsText!: Phaser.GameObjects.Text;
  private player!: Phaser.GameObjects.Rectangle; // Temporairement un rectangle

  constructor() {
    super('MainScene');
    this.inputSystem = new InputSystem();
    this.movementSystem = new MovementSystem(this.inputSystem);
  }

  preload() {
    // Assets seront chargés ici plus tard
  }

  create() {
    // Titre du jeu
    this.add.text(100, 100, i18next.t('welcome'), { color: '#fff' });

    // Créer le joueur (temporairement un rectangle)
    this.player = this.add.rectangle(400, 300, 32, 32, 0x00ff00);
    
    // Position initiale du système de mouvement
    this.movementSystem.setPosition({ x: 400, y: 300 });

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

  update(time: number, delta: number) {
    // Mettre à jour le système de mouvement
    this.movementSystem.update(delta);
    
    // Synchroniser la position du joueur
    const position = this.movementSystem.getPosition();
    this.player.setPosition(position.x, position.y);
    
    // Afficher les touches pressées
    const activeKeys = this.inputSystem.getActiveKeys();
    const pressedKeys = activeKeys
      .filter(k => k.isPressed)
      .map(k => k.physicalKey);
    
    this.inputText.setText(`${i18next.t('controls.pressed_keys')}: ${pressedKeys.join(', ') || i18next.t('controls.none')}`);
  }

  private updateControlsDisplay() {
    const controls = this.inputSystem.getControlsInfo(i18next.t.bind(i18next));
    
    // Affichage de la disposition du clavier
    this.layoutText.setText(controls.layout);
    
    // Affichage du mapping des contrôles
    this.controlsText.setText(
      Object.values(InputKey)
        .map(key => this.inputSystem.getKeyTranslation(key, i18next.t.bind(i18next)))
        .join('\n')
    );
  }
}
