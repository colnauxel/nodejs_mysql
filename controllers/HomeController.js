const User=require('../models').User
const { check, validationResult } = require('express-validator/check');
const getHome=(req,res)=>{
    User.findAll().then(user=>{
        res.render('index',{
        user:user
         })
    })
}
const getIndex=(req,res)=>{
    User.findAll().then(user=>{
        res.render('list_user',{
        user:user
         })
    })
      
}
const getId=(req,res)=>{
User.findById(req.params.id).then(user=>{
    res.render('user',{
        user:user
    })
})
}
const addUser=(req,res)=>{

    res.render('add',{errors:{}})
}
const saveUser=(req,res)=>{
  
    const errors =validationResult(req);
    if (!errors.isEmpty()) {
          res.render('add',{errors:errors.mapped()})
         //console.log({errors: errors.mapped()})
        // return res.status(422).json({ errors: errors.mapped() });
      }
      else{
        // const user = matchedData(req);
        // createUser(user).then(user => res.json(user));
        
        var user_add=new User()
        user_add.firstName=req.body.firstName;
        user_add.lastName=req.body.lastName;
        user_add.email=req.body.email;
    
        user_add.save().then(()=>{
            req.flash('success','User add success! ')
            res.redirect('/user')
        })
      }
     

}
const editUser=(req,res)=>{
    User.findById(req.params.id).then(user=>{
        res.render('edit_user',{
            user:user
        })
       
    })
    
}
const updateUser=(req,res)=>{
    let user={}
    user.firstName=req.body.firstName;
    user.lastName=req.body.lastName;
    user.email=req.body.email;
    

    User.update(user,{where: {id:req.params.id } }).then(()=>{
        req.flash('success','Update User success !')
        res.redirect('/user')
    })

}
const deleteUser=(req,res)=>{
   
 User.destroy({where: {id:req.params.id }}).then(()=>{
        res.send('success')
    })

}
module.exports={
    getIndex,addUser,saveUser,getId,getHome,editUser,updateUser,deleteUser
}