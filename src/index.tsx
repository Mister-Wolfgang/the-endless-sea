import { createRoot } from 'react-dom/client';

const App = () => <div>Hello Endless Sea</div>;

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
