const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Recipe = new Schema({
    name: {
        type: String
    },
    recipeType: {
        type: String
    },
    ingredients: {
        type: String
    },
    method: {
        type: String
    },
    pictures: {
        type: String
    }
});

Recipe.method('transform', function() {
    var obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

module.exports = mongoose.model('Recipe', Recipe);