const { checkSchema } = require("express-validator");
const { options } = require("../router/routers");

module.exports = {
    manipulateUser: checkSchema({
        name:{
            trim: true,
            isLength:{
                options: {min:2}
            },
            errorMessage:'Nome precisa de pelo menos 2 caracteres'
        },
        age:{
            isInt: {
                options: {min: 12}
            },
            notEmpty: true,
            errorMessage:'Idade deve ser de pelo menos 12 anos'
        },
        sex:{}
    })
};