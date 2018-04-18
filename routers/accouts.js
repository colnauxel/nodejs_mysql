const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const express= require('express')
const router_acc=express.Router()

const AccoutController=require('../controllers/AccoutController')

router_acc.get('/login',AccoutController.getLogin)

router_acc.get('/register',AccoutController.getRegister)
router_acc.post('/register',[
    check('userName','Username must email! ')
    .isEmail(),
    check('passWord','PassWord min:8 !')
    .trim()
    .isLength({min:8})
],AccoutController.addAccout)
//login passport

router_acc.post('/login',AccoutController.passp)

module.exports=router_acc