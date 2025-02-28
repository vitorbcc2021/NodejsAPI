const CookingRecipe = require('../model/cookingrecipe');
const {validationResult, matchedData} = require('express-validator');

module.exports = {
    addCookingRecipe:async(req, res) => {
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            res.json({
                error: erros.mapped()
            });
            return;
        }

        const data = matchedData(req);
        const newCookingRecipe = new CookingRecipe();
        newCookingRecipe.name = data.name;
        newCookingRecipe.ingredients = data.ingredients;
        newCookingRecipe.instructions = data.instructions;

        const info = await newCookingRecipe.save();
        res.json({info});
    },
    getCookingRecipe: async (req, res) => {
        let name = req.query.name;
        const nameCookingRecipe = await CookingRecipe.findOne({name:name});

        if(nameCookingRecipe == null){
            res.json({
                res: "nao encontrei"
            });
            return;
        }

        res.json({
            nameCookingRecipe
        });
    },
    getAllCookingRecipe: async (req, res) => {
        let name = req.query.name;
        const nameCookingRecipe = await CookingRecipe.find();

        if(nameCookingRecipe == null){
            res.json({
                res: "Não encontrei ninguem!"
            });
            return;
        }

        res.json({nameCookingRecipe});
    },
    editCookingRecipe: async (req, res) => {
        let name = req.query.name;

        const erros = validationResult(req);

        if(!erros.isEmpty()){
            res.json({ error: erros.mapped()});

            return;
        }
        
        const data = matchedData(req);

        const nameCookingRecipe = await CookingRecipe.findOneAndUpdate(
        {name:data.name},
        {
            $set:{
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
            }
        },
        {new: true});

        if(nameCookingRecipe == null){
            res.json({
                res: "nao editei"
            });
            return;
        }

        res.json({
            nameCookingRecipe
        });
    },
    deleteCookingRecipe: async (req, res) => {
        let name = req.query.name;
        const nameCookingRecipe = await CookingRecipe.findOne({name:name});

        if(nameCookingRecipe == null){
            res.json({res: "Nao encontrei ninguem!"});

            return;
        }
        
        const deletedCookingRecipe = await CookingRecipe.deleteOne({name:name});

        if (deletedCookingRecipe.deletedCount === 0) {
            res.json({ res: "Elemento não encontrado!" });
        } else {
            res.json({ res: "Elemento deletado com sucesso!" });
        }
    }
}