import { renderToString } from 'react-dom/server';
import App from '../App.tsx';

export function renderPage(variant: 1 | 2 | 3): string {
  return renderToString(<App variant={variant} />);
}
