import React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../context/themecontext.jsx';

const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isSaved = location.pathname === '/savedrecipes';
  const isGrocery = location.pathname === '/grocery';

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            🍽️ Recipe Suggestion
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isHome && (
              <Button href="/" color="inherit">
                🏠 Home
              </Button>
            )}

            {!isSaved && (
              <Button href="/savedrecipes" color="inherit">
                ❤️ View Saved Recipes
              </Button>
            )}

            {!isGrocery && (
              <Button href="/grocery" color="inherit">
                🧾 View Grocery Lists
              </Button>
            )}

            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
