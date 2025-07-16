const express = require('express');
const router = express.Router();
const {
  suggestRecipes,
  saveRecipe,
  createGroceryList,
  getSavedRecipes,
  getGroceryLists
} = require('../controllers/recipeController');

router.post('/suggest', suggestRecipes);
router.post('/save', saveRecipe);
router.post('/grocery', createGroceryList);


router.get('/saved',getSavedRecipes);
router.get('/grocery',getGroceryLists);
module.exports = router;
