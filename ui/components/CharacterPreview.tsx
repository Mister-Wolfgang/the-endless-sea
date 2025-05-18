import { FC, useEffect, useRef } from 'react';
import Phaser from 'phaser';

// Props : assetKey, assetUrl, animationKey, frameConfig, etc.
interface CharacterPreviewProps {
  assetKey: string;
  assetUrl: string;
  frameWidth: number;
  frameHeight: number;
  animationKey: string;
  animationFrames: number[];
  animationFrameRate?: number;
  width?: number;
  height?: number;
}

const CharacterPreview: FC<CharacterPreviewProps> = ({
  assetKey,
  assetUrl,
  frameWidth,
  frameHeight,
  animationKey,
  animationFrames,
  animationFrameRate = 5,
  width = 128,
  height = 128,
}) => {
  const phaserRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!phaserRef.current) return;
    // Nettoyage si déjà monté
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width,
      height,
      parent: phaserRef.current,
      backgroundColor: '#222',
      scene: {
        preload() {
          this.load.spritesheet(assetKey, assetUrl, { frameWidth, frameHeight });
        },
        create() {
          this.anims.create({
            key: animationKey,
            frames: this.anims.generateFrameNumbers(assetKey, { frames: animationFrames }),
            frameRate: animationFrameRate,
            repeat: -1,
          });
          const sprite = this.add.sprite(width / 2, height / 2, assetKey);
          sprite.play(animationKey);
        },
      },
      fps: { target: 60 },
    };
    gameRef.current = new Phaser.Game(config);
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [assetKey, assetUrl, frameWidth, frameHeight, animationKey, animationFrames, animationFrameRate, width, height]);

  return <div ref={phaserRef} style={{ width, height }} data-testid="phaser-canvas" />;
};

export default CharacterPreview;
