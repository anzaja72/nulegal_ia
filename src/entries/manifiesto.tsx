import { createRoot, hydrateRoot } from 'react-dom/client';
import App from '../App.tsx';
import '../index.css';

const root = document.getElementById('root')!;
// El HTML ya viene prerenderizado (scripts/prerender.mjs): se hidrata en vez de repintar.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App variant={2} />);
} else {
  createRoot(root).render(<App variant={2} />);
}
