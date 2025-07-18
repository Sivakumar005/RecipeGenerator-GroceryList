const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  ingredients: [String],
  sourceUrl: String,
  rating: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
