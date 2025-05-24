import Phaser from 'phaser';
import { InputSystem, InputKey, KeyboardLayout } from './InputSystem';

export default class Game extends Phaser.Scene {
  private inputSystem: InputSystem;
  private inputText!: Phaser.GameObjects.Text;
  private layoutText!: Phaser.GameObjects.Text;

  constructor() {
    super('MainScene');
    this.inputSystem = new InputSystem();
  }

  preload() {
    // Chargement des assets si nécessaire
  }

  create() {
    this.add.text(100, 100, 'Hello Endless Sea (Phaser)', { color: '#fff' });
    this.inputText = this.add.text(100, 150, 'Touches pressées: ', { color: '#0f0' });
    this.layoutText = this.add.text(100, 180, 'Layout: En attente...', { color: '#0f0' });
    
    this.input.keyboard?.on('keydown', (event: { code: string, key: string }) => {
      this.inputSystem.onKeyDown(event);
    });

    this.input.keyboard?.on('keyup', (event: { code: string, key: string }) => {
      this.inputSystem.onKeyUp(event);
    });
  }

  update() {
    // Affiche la disposition du clavier détectée
    const layout = this.inputSystem.getCurrentLayout();
    this.layoutText.setText(`Layout: ${KeyboardLayout[layout]}`);
    
    // Récupère les touches avec leur état physique réel (ZQSD ou WASD)
    const activeKeys = this.inputSystem.getActiveKeys();
    
    // Affiche les touches dans leur forme physique selon le layout
    const pressedKeys = activeKeys
      .filter(k => k.isPressed)
      .map(k => k.physicalKey);
    
    this.inputText.setText(`Touches pressées: ${pressedKeys.join(', ') || 'aucune'}`);
    
    if (this.inputSystem.isActionPressed(InputKey.UP)) {
      this.inputText.setColor('#ff0');
    } else {
      this.inputText.setColor('#0f0');
    }
  }
}
