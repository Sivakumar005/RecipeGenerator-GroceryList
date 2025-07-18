import { useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import {
    TextField, Button, Box,
    Grid,
    Container,
} from '@mui/material';
import api from "../api/api";
export const Home = () => {
    const [Ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState();
    const handleSuggest = async () => {
        try {
            const res = await api.post('/suggest', {
                ingredients: Ingredients.split(',').map(i => i.trim())
            });
            setRecipes(res.data);
        } catch (error) {
            console.error('failed to fetch recipes', error);
        };
    }
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>

                <TextField
                    label="Enter ingredients (comma separated)"
                    value={Ingredients}
                    onChange={e => setIngredients(e.target.value)}
                    sx={{ my: 2, width: '1000px', mx: 3 }}
                />

                <Button variant="contained" onClick={handleSuggest}>
                    Suggest Recipes
                </Button>
            </Box>

            <Grid container spacing={2} sx={{ mt: 3 }}>
                {recipes?.map((recipe, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <RecipeCard recipe={recipe} />
                    </Grid>
                ))}
            </Grid>

        </>
    )
}