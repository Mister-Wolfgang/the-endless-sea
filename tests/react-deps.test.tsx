import '@testing-library/jest-dom';
import { createRoot } from 'react-dom/client';
import { render, screen } from '@testing-library/react';

describe('React & ReactDOM', () => {
  it('peut rendre un composant simple', () => {
    render(<div>Test React</div>);
    expect(screen.getByText('Test React')).toBeInTheDocument();
  });

  it('peut créer un root React 18+', () => {
    const div = document.createElement('div');
    expect(() => createRoot(div)).not.toThrow();
  });
});
