import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              background: {
                default: '#f9f9f9',
              },
            }
          : {
              background: {
                default: '#121212',
              },
            }),
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
