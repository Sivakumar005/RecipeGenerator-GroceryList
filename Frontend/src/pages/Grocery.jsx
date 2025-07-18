import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import api from '../api/api';
import GroceryCard from '../components/GroceryCard';

const GroceryListPage = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLists = async () => {
    try {
      const res = await api.get('/grocery');
      setLists(res.data);
    } catch (err) {
      console.error('Failed to fetch grocery lists', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setLists(prev => prev.filter(list => list._id !== id));
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Grocery Lists</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {lists.map(list => (
            <Grid item xs={12} md={6} lg={4} key={list._id}>
              <GroceryCard groceryList={list} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default GroceryListPage;
