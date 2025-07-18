import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CustomThemeProvider } from './context/themecontext.jsx';
// import { SavedRecipesProvider } from './context/SavedRecipesContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomThemeProvider>
      {/* <SavedRecipesProvider> */}
        <BrowserRouter>
        <App />
        </BrowserRouter>
      {/* </SavedRecipesProvider> */}
    </CustomThemeProvider>
  </React.StrictMode>
);
