import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';
import store from './store';
import { muiTheme, initTheme } from './theme';

initTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <App />
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'dark:bg-slate-800 dark:text-white',
              style: {
                borderRadius: '8px',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              },
            }}
          />
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
