const express = require('express');
const router = express.Router();

const {
    suggestRecipes,
    saveRecipe,
    getSavedRecipes,
    createGroceryList,
    getGroceryLists,unsaveRecipe,deleteGroceryList
} = require('../controllers/recipeController');

// POST routes
router.post('/suggest', suggestRecipes);
router.post('/save', saveRecipe);
router.post('/grocery', createGroceryList);

// GET routes
router.get('/saved', getSavedRecipes);
router.get('/grocery', getGroceryLists);

router.delete('/unsave', unsaveRecipe);
router.delete('/grocery/:id', deleteGroceryList);



module.exports = router;
