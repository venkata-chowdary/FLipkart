const express=require('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')
const mongoose = require('mongoose')
const session=require('express-session')
const passport=require('passport')
const passportLocalMongoose=require('passport-local-mongoose')
const encrypt=require('mongoose-encryption')

//routes
const groceriesRoute=require("./routes/groceries")
const electronicsRoute=require('./routes/electronics')

const app=express()



app.use(express.static('public'))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(session({
    secret:"Thisisasecret.",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())


mongoose.connect('mongodb://127.0.0.1:27017/flipkartDB',{
    useNewUrlParser:true
})


const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String, 
})

const secret="Thisispasswordsecret"
userSchema.plugin(encrypt,{secret:secret,encryptedFields:['password']})
userSchema.plugin(passportLocalMongoose)

const User=new mongoose.model("User",userSchema)


passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




app.get('/',(req,res)=>{
    if (req.isAuthenticated()){
        res.render('home')
    }
    else{
        res.redirect('/login')
    }
})

app.get('/register',function(req,res){
    res.render('register')
})

app.get('/login',function(req,res){
    res.render('login')
})



app.post('/register',function(req,res){    
    User.register({username:req.body.username},req.body.password, function(err,user){
        if(err){
            console.log(err)
            res.redirect('/register')
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect('/')
            })
        }
    })
})

app.post('/login',function(req,res){
    const user=new User({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user,function(err){
        if(err){
            console.log(err)
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect('/')
            })
        }
    })
})

app.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
})


//use routes
app.use('/groceries',groceriesRoute)
app.use('/electronics',electronicsRoute)



app.listen(3000,()=>{
    console.log("Server is on 3000")
})