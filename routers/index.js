
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const express= require('express')
const router=express.Router()

const HomeController=require('../controllers/HomeController')

router.get('/',HomeController.getHome)
router.get('/user',HomeController.getIndex)
router.get('/user/:id',HomeController.getId)

router.get('/user/edit/:id',HomeController.editUser)
router.post('/user/edit/:id',HomeController.updateUser)

router.delete('/user/:id',HomeController.deleteUser)

router.post('/add',[
    check('firstName', 'firstName require')
       .trim().isLength({min:1}),
    check('lastName', 'lastName require')
        .trim().isLength({min:1}),
    check('email').isEmail().withMessage('must be a email')
    
],HomeController.saveUser)
router.get('/add',HomeController.addUser)

module.exports=router