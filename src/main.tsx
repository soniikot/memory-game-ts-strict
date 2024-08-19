import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

//TODO
/**
 * 2 contexts
 *
 * state context
 *
 * dispatchcontext
 *
 *
 *
 *
 **/

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
