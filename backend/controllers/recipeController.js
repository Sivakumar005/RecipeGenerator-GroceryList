const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const Recipe = require('../models/recipe');
const GroceryList = require('../models/GroceryList');

const saveRecipe = async (req, res) => {
    const { title, image, ingredients, sourceUrl, rating } = req.body;

    try {
        const recipe = new Recipe({ title, image, ingredients, sourceUrl, rating });
        await recipe.save();
        res.status(201).json({ message: 'Recipe saved successfully' });
    } catch (error) {
        console.error('Save recipe error:', error); 
        res.status(500).json({ message: 'Failed to save recipe' });
    }
};


const createGroceryList = async (req, res) => {
  const { items, recipeTitle } = req.body;

  try {
    const groceryList = new GroceryList({ items, recipeTitle });
    await groceryList.save();
    res.status(201).json({ message: 'Grocery list created successfully' });
  } catch (error) {
    console.error('Grocery list save error:', error); 
    res.status(500).json({ message: 'Failed to create grocery list' });
  }
};


const suggestRecipes = async (req, res) => {
    const { ingredients } = req.body;

    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params: {
                ingredients: ingredients.join(','),
                number: 5,
                apiKey: process.env.SPOONACULAR_API_KEY
            }
        });

        const recipes = response.data.map(r => ({
            title: r.title,
            image: r.image,
            ingredients: r.usedIngredients.map(i => i.name).concat(r.missedIngredients.map(i => i.name)),
            sourceUrl: `https://spoonacular.com/recipes/${r.title.replace(/ /g, '-')}-${r.id}`
        }));

        res.json(recipes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to fetch recipes' });
    }
};

const getSavedRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: 'Failed to fetch recipes' });
    }
};

const getGroceryLists = async (req, res) => {
    try {
        const lists = await GroceryList.find();
        res.json(lists);
    } catch (error) {
        console.error('Error fetching grocery lists:', error);
        res.status(500).json({ message: 'Failed to fetch grocery lists' });
    }
};

module.exports = {
    suggestRecipes, saveRecipe, createGroceryList, getSavedRecipes,
    getGroceryLists
};
