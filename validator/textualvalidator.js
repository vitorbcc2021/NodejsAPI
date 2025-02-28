const { checkSchema } = require("express-validator");

module.exports = {
    manipulateTextual: checkSchema({
        name:{
            trim: true,
            isLength:{
                options: {min:2}
            },
            errorMessage:'Nome precisa de pelo menos 2 caracteres'
        },
        title:{
            notEmpty: true,
            errorMessage:'Titulo nao foi inserido'
        },
        text:{
            isLength:{
                options:{min:5}
            },
            errorMessage:'O texto precisa de pelo menos 5 caracteres'
        },
        fontSize:{
            isInt: true,
            errorMessage:'Tamanho da fonte nao determinado'
        }
    })
};