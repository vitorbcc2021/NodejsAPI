const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name:String,
    ingredients:String,
    instructions:String,
});

const modelName = "CookingRecipe";

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.connection.model(modelName, modelSchema);
}