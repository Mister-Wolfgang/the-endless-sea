import Phaser from 'phaser';
import Game from './Game';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#222',
  scene: [Game],
  parent: 'phaser-root',
  transparent: false,
  render: {
    pixelArt: true,
    antialias: false,
    antialiasGL: false,
  }
};

let game: Phaser.Game | null = null;

export function startPhaser() {
  if (game) {
    console.log('Destroying existing game instance...');
    game.destroy(true, false);
    game = null;
  }
  
  console.log('Starting Phaser with config:', config);
  game = new Phaser.Game(config);
  console.log('Phaser game instance:', game);
  return game;
}
