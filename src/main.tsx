import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/alfa-slab-one/400.css';
import '@fontsource/russo-one/400.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import App from './App.tsx';
import './index.css';
import './shared/lib/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
