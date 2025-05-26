import { createRoot } from 'react-dom/client';
import { GameCanvas } from './GameCanvas';
import './global.css';

const App = () => <GameCanvas title="The Endless Sea" />;

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
