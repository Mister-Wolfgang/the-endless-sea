import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    // Précharge les assets ici
  }

  create() {
    // Initialisation de la scène
    this.add.text(100, 100, 'Hello Endless Sea (Phaser)', { color: '#fff' });
  }

  update() {
    // Boucle de jeu
  }
}
