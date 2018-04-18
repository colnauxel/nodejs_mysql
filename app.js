const express=require('express')
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const bodyParser = require('body-parser')
const path=require('path')
const expressValidator = require('express-validator');
const flash=require('connect-flash')
const session=require('express-session')
const bcrypt = require('bcryptjs')
const passport=require('passport')
const Router=require('./routers/index')
const Router_acc=require('./routers/accouts')
const app=express()

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(expressValidator(middlewareOptions));
// parse application/json
app.use(bodyParser.json())
//express Sesstion
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,

  }))
//express messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
//set view templete
app.set('view engine','ejs')


app.use(express.static(path.join(__dirname,'public')))
//passport config
require('./config/passport')(passport)

app.use(passport.initialize());
app.use(passport.session());

//route
app.use('/',Router)
app.use('/accouts',Router_acc)

app.listen('3000',()=>{
    console.log('server connected ...')
})