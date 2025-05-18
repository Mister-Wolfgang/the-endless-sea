
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterPreview from './CharacterPreview';

// Mock Phaser globally pour éviter les erreurs de rendu dans Jest
jest.mock('phaser', () => {
  return {
    AUTO: 0,
    Game: jest.fn().mockImplementation(() => ({
      destroy: jest.fn(),
    })),
  };
});

describe('CharacterPreview', () => {
  it('render sans crash (smoke test)', () => {
    render(
      <CharacterPreview
        assetKey="dude"
        assetUrl="https://labs.phaser.io/assets/sprites/dude.png"
        frameWidth={32}
        frameHeight={48}
        animationKey="idle"
        animationFrames={[4]}
        width={96}
        height={144}
      />
    );
    // Vérifie que le conteneur est bien présent
    const div = screen.getByTestId('phaser-canvas');
    expect(div).toBeInTheDocument();
  });
});
