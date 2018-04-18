const { check, validationResult } = require('express-validator/check');
const passport=require('passport')
const Accout=require('../models').accouts
const bcrypt=require('bcryptjs')
const getLogin=(req,res)=>{
    res.render('login')

}
const getRegister=(req,res)=>{
    res.render('register',{errors:{}})
}
const addAccout=(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.render('register',{errors:errors.mapped()})
    }
    else{
        let accout=new Accout()
        accout.userName=req.body.userName
        accout.passWord=req.body.passWord

        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(accout.passWord,salt,function(err,hash){
                if(err){
                    console.log(err)
                }
                accout.passWord=hash;
                accout.save().then(()=>{
                    req.flash('success','Accout created success!')
                    res.redirect('/accouts/login')
                })
            })
        })
             
    }
    

    
  

}

const passp=(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/accouts/login',
        failureFlash:true
    })(req,res,next)

}







module.exports={
    getLogin,getRegister,addAccout,passp
}