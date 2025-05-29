import { describe, it, expect } from '@jest/globals';
import { existsSync } from 'fs';
import { resolve } from 'path';

describe('Storybook Setup', () => {
  it('should have .storybook configuration directory', () => {
    const storybookConfigDir = resolve(process.cwd(), '.storybook');
    expect(existsSync(storybookConfigDir)).toBe(true);
  });

  it('should have main.ts configuration file', () => {
    const mainConfig = resolve(process.cwd(), '.storybook', 'main.ts');
    expect(existsSync(mainConfig)).toBe(true);
  });

  it('should have preview.ts configuration file', () => {
    const previewConfig = resolve(process.cwd(), '.storybook', 'preview.ts');
    expect(existsSync(previewConfig)).toBe(true);
  });

  it('should have at least one story file', () => {
    const languageMenuStory = resolve(
      process.cwd(),
      'src',
      'ui',
      'components',
      'LanguageMenu.stories.ts',
    );
    expect(existsSync(languageMenuStory)).toBe(true);
  });

  it('should have storybook scripts in package.json', async () => {
    const packageJson = await import(resolve(process.cwd(), 'package.json'));
    expect(packageJson.scripts).toHaveProperty('storybook');
    expect(packageJson.scripts).toHaveProperty('build-storybook');
  });
});
