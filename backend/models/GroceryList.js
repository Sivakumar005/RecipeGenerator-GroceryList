const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
    items: [String],
    recipeTitle: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GroceryList', GroceryListSchema);