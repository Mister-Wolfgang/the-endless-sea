import { FC, useEffect } from 'react';
import { startPhaser } from '@game/phaserMain';

const PhaserCanvas: FC = () => {
  useEffect(() => {
    console.log('PhaserCanvas mounted, starting game...');
    // Nettoyer toute instance précédente
    const existingCanvas = document.querySelector('canvas');
    if (existingCanvas) {
      console.log('Removing existing canvas...');
      existingCanvas.remove();
    }

    try {
      const game = startPhaser();
      console.log('Game started successfully');
      return () => {
        console.log('Destroying Phaser game...');
        game.destroy(true, false);
      };
    } catch (error) {
      console.error('Error starting Phaser:', error);
    }
  }, []);
  
  return <div id="phaser-root" className="phaser-canvas" style={{ width: '100%', height: '100%' }} />;
};

export default PhaserCanvas;
