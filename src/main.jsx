import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyles from './GlobalStyles.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <GlobalStyles />
  </StrictMode>
);
