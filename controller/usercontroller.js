const User = require('../model/user');
const {validationResult, matchedData} = require('express-validator');

module.exports = {
    addUser:async(req, res) => {
        const erros = validationResult(req);

        if(!erros.isEmpty()){
            res.json({
                error: erros.mapped()
            });
            return;
        }

        const data = matchedData(req);
        const newUser = new User();

        newUser.name = data.name;
        newUser.age = data.age;
        newUser.sex = data.sex;

        const info = await newUser.save();
        res.json({info});
    },
    getUser: async (req, res) => {
        let name = req.query.name;
        const nameUser = await User.findOne({name:name});

        if(nameUser == null){
            res.json({
                res: "nao encontrei"
            });
            return;
        }

        res.json({
            nameUser
        });
    },
    getAllUser: async (req, res) => {
        const nameUser = await User.find();

        if(nameUser == null){
            res.json({
                res: "Não encontrei ninguem!"
            });
            return;
        }

        res.json({nameUser});
    },
    editUser: async (req, res) => {
        const erros = validationResult(req);

        if(!erros.isEmpty()){
            res.json({ error: erros.mapped()});

            return;
        }
        
        const data = matchedData(req);

        const nameUser = await User.findOneAndUpdate(
        {name:data.name},
        {
            $set:{
                age: req.body.age,
                sex: req.body.sex,
            }
        },
        {new: true});

        if(nameUser == null){
            res.json({
                res: "nao editei"
            });
            return;
        }

        res.json({
            nameUser
        });
    },
    deleteUser: async (req, res) => {
        let name = req.query.name;
        const nameUser = await User.findOne({name:name});

        if(nameUser == null){
            res.json({res: "Nao encontrei ninguem!"});

            return;
        }
        
        const deletedUser = await User.deleteOne({name:name});

        if (deletedUser.deletedCount === 0) {
            res.json({ res: "Elemento não encontrado!" });
        } else {
            res.json({ res: "Elemento deletado com sucesso!" });
        }
    }
}