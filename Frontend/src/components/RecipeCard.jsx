import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, CardMedia,
  Typography, Button, Stack
} from '@mui/material';
import api from '../api/api';

const RecipeCard = ({ recipe, onUnsave }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const response = await api.get('/saved');
        const savedTitles = response.data.map(r => r.title);
        setIsSaved(savedTitles.includes(recipe.title));
      } catch (error) {
        console.error('Failed to check saved recipes:', error);
      }
    };
    checkIfSaved();
  }, [recipe.title]);

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

  const handleToggleSave = async () => {
    try {
      if (isSaved) {
        await api.delete('/unsave', {
          data: { title: recipe.title }
        });
        setIsSaved(false);
        alert('❌ Recipe unsaved!');
        if (onUnsave) onUnsave(recipe.title); // notify parent
      } else {
        await api.post('/save', { ...recipe });
        setIsSaved(true);
        alert('✅ Recipe saved!');
      }
    } catch (error) {
      console.error('Save/Unsave failed:', error);
      alert('❌ Failed to save or unsave');
    }
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' }, height: '100%', display: 'flex', flexDirection: 'column' }}>
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
          <Button
            variant="contained"
            size="small"
            onClick={handleGroceryList}
          >
            Grocery List
          </Button>

          <Button
            variant={isSaved ? 'contained' : 'outlined'}
            color={isSaved ? 'secondary' : 'primary'}
            size="small"
            onClick={handleToggleSave}
          >
            {isSaved ? 'Unsave' : 'Save'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
