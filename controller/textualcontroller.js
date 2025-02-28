const Textual = require('../model/textual');
const {validationResult, matchedData} = require('express-validator');

module.exports = {
    addTextual:async(req, res) => {
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            res.json({
                error: erros.mapped()
            });
            return;
        }

        const data = matchedData(req);
        const newTextual = new Textual();
        newTextual.name = data.name;
        newTextual.dateCreated = Date.now();
        newTextual.title = data.title;
        newTextual.text = data.text;
        newTextual.fontSize = data.fontSize;

        const info = await newTextual.save();
        res.json({info});
    },
    getTextual: async (req, res) => {
        let name = req.query.name;
        const nameTextual = await Textual.findOne({name:name});

        if(nameTextual == null){
            res.json({
                res: "nao encontrei"
            });
            return;
        }

        res.json({
            nameTextual
        });
    },
    getAllTextual: async (req, res) => {
        let name = req.query.name;
        const nameTextual = await Textual.find();

        if(nameTextual == null){
            res.json({
                res: "Não encontrei ninguem!"
            });
            return;
        }

        res.json({nameTextual});
    },
    editTextual: async (req, res) => {
        let name = req.query.name;

        const erros = validationResult(req);

        if(!erros.isEmpty()){
            res.json({ error: erros.mapped()});

            return;
        }
        
        const data = matchedData(req);

        const nameTextual = await Textual.findOneAndUpdate(
        {name:data.name},
        {
            $set:{
                title: req.body.title,
                text: req.body.text,
                fontSize: req.body.fontSize
            }
        },
        {new: true});

        if(nameTextual == null){
            res.json({
                res: "nao editei"
            });
            return;
        }

        res.json({
            nameTextual
        });
    },
    deleteTextual: async (req, res) => {
        let name = req.query.name;
        const nameTextual = await Textual.findOne({name:name});

        if(nameTextual == null){
            res.json({res: "Nao encontrei ninguem!"});

            return;
        }
        
        const deletedTextual = await Textual.deleteOne({name:name});

        if (deletedTextual.deletedCount === 0) {
            res.json({ res: "Elemento não encontrado!" });
        } else {
            res.json({ res: "Elemento deletado com sucesso!" });
        }
    }
    
}