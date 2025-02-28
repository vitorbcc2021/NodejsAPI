const { checkSchema } = require("express-validator");

module.exports = {
    manipulateCookingRecipe: checkSchema({
        name:{
            trim: true,
            notEmpty: true,
            errorMessage:'Nome nao pode ser nulo'
        },
        ingredients:{
            notEmpty: true,
            errorMessage:'Ingredientes nao foram inseridos'
        },
        instructions:{
            notEmpty: true,
            errorMessage:'O texto precisa de pelo menos 5 caracteres'
        }
    })
};