import { createTheme } from '@mui/material';

// Basic MUI theme to match Tailwind
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#0ea5e9', // brand-500
    },
    secondary: {
      main: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "-apple-system", "sans-serif"',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.375rem',
        },
      },
    },
  },
});

export const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Initialize theme from localStorage before render
export const initTheme = () => {
  const isDark = localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  applyTheme(isDark ? 'dark' : 'light');
};
