import React from 'react';
import {
  Card, CardContent, CardMedia,
  Typography, Button, Stack, Box
} from '@mui/material';
import api from '../api/api';

const RecipeCard = ({ recipe }) => {
  const handleGroceryList = async () => {
    try {
      await api.post('/grocery', {
        items: recipe.ingredients || [],
        recipeTitle: recipe.title
      });
      alert('🛒 Grocery list created!');
    } catch (error) {
      console.error('Grocery list creation failed:', error);
      alert('❌ Failed to create grocery list');
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={recipe.image}
        alt={recipe.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom noWrap>
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {recipe.ingredients?.slice(0, 3).join(', ') || 'No ingredients listed'}
        </Typography>

        <Stack direction="row" spacing={1}>
          {/* <Button
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
          >
            View
          </Button> */}
          <Button
            variant="contained"
            size="small"
            onClick={handleGroceryList}
          >
            Grocery List
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
