import React, { useEffect, useState } from 'react';
import {
    Typography, Grid, Card, CardContent,
    List, ListItem, Container, CircularProgress,
    Divider
} from '@mui/material';
import api from '../api/api';

const GroceryListPage = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const res = await api.get('/grocery');
                setLists(res.data);
            } catch (err) {
                console.error('Error fetching grocery lists:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLists();
    }, []);

    if (loading) return <CircularProgress sx={{ mt: 5 }} />;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                🧾 All Grocery Lists
            </Typography>

            <Grid container spacing={3} alignItems="stretch">
                {lists.map((list, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 3,
                                boxShadow: 3,
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '1.2rem',
                                        color: 'primary.main',
                                    }}
                                >
                                    {list.recipeTitle || `🧾 Grocery List #${idx + 1}`}
                                </Typography>

                                <Divider sx={{ my: 1 }} />

                                {list.items.length > 0 ? (
                                    <List dense sx={{ pl: 2 }}>
                                        {list.items.map((item, i) => (
                                            <ListItem
                                                key={i}
                                                sx={{
                                                    display: 'list-item',
                                                    listStyleType: 'disc',
                                                    listStylePosition: 'inside',
                                                    px: 0,
                                                }}
                                            >
                                                {item}
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        No items found.
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default GroceryListPage;
