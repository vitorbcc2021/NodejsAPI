const express = require('express');
const router = express.Router();

const textualController = require('../controller/textualcontroller');
const textualValidator = require('../validator/textualvalidator');

const userController = require('../controller/usercontroller');
const userValidator = require('../validator/uservalidator');

const cookingrecipeController = require('../controller/cookingrecipecontroller');
const cookingrecipeValidator = require('../validator/cookingrecipevalidator');

router.get('/ping', (req, res) => {
    res.json({retorno: true});
});

//post
router.post('/textual/add', textualValidator.manipulateTextual, textualController.addTextual);
router.post('/user/add', userValidator.manipulateUser, userController.addUser);
router.post('/cookingrecipe/add', cookingrecipeValidator.manipulateCookingRecipe, cookingrecipeController.addCookingRecipe);

//get
router.get('/textual/list', textualController.getTextual);
router.get('/user/list', userController.getUser);
router.get('/cookingrecipe/list', cookingrecipeController.getCookingRecipe);


//get all
router.get('/textual/listAll', textualController.getAllTextual);
router.get('/user/listAll', userController.getAllUser);
router.get('/cookingrecipe/listAll', cookingrecipeController.getAllCookingRecipe);

//edit
router.put('/textual/update', textualValidator.manipulateTextual, textualController.editTextual);
router.put('/user/update', userValidator.manipulateUser, userController.editUser);
router.put('/cookingrecipe/update', cookingrecipeValidator.manipulateCookingRecipe, cookingrecipeController.editCookingRecipe);

//delete
router.delete('/textual/delete', textualController.deleteTextual);
router.delete('/user/delete', userController.deleteUser);
router.delete('/cookingrecipe/delete', cookingrecipeController.deleteCookingRecipe);

module.exports = router;