const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    sourceUrl: String,
    image: String,
    rating: Number
});

module.exports = mongoose.model('Recipe', RecipeSchema);
