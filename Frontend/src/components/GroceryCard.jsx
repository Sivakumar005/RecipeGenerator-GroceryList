import React from 'react';
import {
  Card, CardContent, Typography,
  Button, Stack, List, ListItem
} from '@mui/material';
import api from '../api/api';

const GroceryCard = ({ groceryList, onDelete }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/grocery/${groceryList._id}`);
      onDelete(groceryList._id);
    } catch (err) {
      console.error('Failed to delete grocery list', err);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
        borderRadius: 4,
        boxShadow: 4,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 8,
        },
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)'
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: '#2c3e50',
            borderBottom: '2px solid #2c3e50',
            display: 'inline-block'
          }}
        >
          {groceryList.recipeTitle}
        </Typography>

        <List dense disablePadding>
          {groceryList.items.map((item, idx) => (
            <ListItem
              key={idx}
              sx={{
                pl: 0,
                color: '#34495e',
                borderBottom: '1px dashed #ccc',
                py: 0.5
              }}
            >
              • {item}
            </ListItem>
          ))}
        </List>
      </CardContent>

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: 2,
            px: 3
          }}
        >
          DELETE
        </Button>
      </Stack>
    </Card>
  );
};

export default GroceryCard;
