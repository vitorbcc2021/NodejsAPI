const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name:String,
    age:Number,
    sex:{type:String, default:'undefined'},
});

const modelName = "User";

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.connection.model(modelName, modelSchema);
}