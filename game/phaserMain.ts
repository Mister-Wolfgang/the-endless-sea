import Phaser from 'phaser';
import Game from './Game';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#222',
  scene: [Game],
  parent: 'root',
};

export function startPhaser() {
  new Phaser.Game(config);
}
