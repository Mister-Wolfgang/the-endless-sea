import { FC, useEffect } from 'react';
import { startPhaser } from '@game/phaserMain';

const PhaserCanvas: FC = () => {
  useEffect(() => {
    startPhaser();
  }, []);
  return <div id="phaser-root" className="phaser-canvas" />;
};

export default PhaserCanvas;
