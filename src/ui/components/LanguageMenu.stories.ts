import type { Meta, StoryObj } from '@storybook/react';
import { LanguageMenu } from './LanguageMenu';

const meta: Meta<typeof LanguageMenu> = {
  title: 'UI/LanguageMenu',
  component: LanguageMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDifferentPosition: Story = {
  parameters: {
    layout: 'fullscreen',
  },
};
