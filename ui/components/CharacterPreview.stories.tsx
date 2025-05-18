import CharacterPreview from './CharacterPreview';

export default {
  title: 'Phaser/CharacterPreview',
  component: CharacterPreview,
  parameters: {
    layout: 'centered',
  },
};

// Exemple avec un asset Phaser officiel (dude.png)
const assetUrl = 'https://labs.phaser.io/assets/sprites/dude.png';

export const Idle = () => (
  <CharacterPreview
    assetKey="dude"
    assetUrl={assetUrl}
    frameWidth={32}
    frameHeight={48}
    animationKey="idle"
    animationFrames={[4]}
    width={96}
    height={144}
  />
);

export const Walk = () => (
  <CharacterPreview
    assetKey="dude"
    assetUrl={assetUrl}
    frameWidth={32}
    frameHeight={48}
    animationKey="walk"
    animationFrames={[0, 1, 2, 3, 4, 5, 6, 7]}
    animationFrameRate={5}
    width={96}
    height={144}
  />
);
