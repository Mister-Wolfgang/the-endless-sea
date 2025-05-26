import { createRoot } from 'react-dom/client';


import { GameCanvas } from './GameCanvas';

const App = () => (
  <div>
    <h1>Hello Endless Sea</h1>
    <GameCanvas />
  </div>
);

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
