import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Container } from '@mui/material';
import api from '../api/api';
import RecipeCard from '../components/RecipeCard';
import Navbar from '../components/Navbar.jsx'; // ✅ Add Navbar

const SavedRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await api.get('/saved');
        setRecipes(res.data);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleUnsave = (title) => {
    setRecipes(prev => prev.filter(r => r.title !== title));
  };

  if (loading) {
    return (
      <>
        <Container sx={{ textAlign: 'center', mt: 5 }}>
          <CircularProgress />
          <Typography variant="h6">Loading saved recipes...</Typography>
        </Container>
      </>
    );
  }

  if (recipes.length === 0) {
    return (
      <>
        <Container sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h6">No saved recipes found.</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Saved Recipes
        </Typography>
        <Grid container spacing={3}>
          {recipes.map(recipe => (
            <Grid item xs={12} sm={6} md={4} key={recipe.title}>
              <RecipeCard recipe={recipe} onUnsave={handleUnsave} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default SavedRecipesPage;
