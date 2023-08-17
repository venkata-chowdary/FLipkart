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
const mobilesRoute=require('./routes/mobiles.js')
const isAuthenticated = require('./middleware/authMiddleware'); 


//models
const Mobile = require('./models/Mobile');
const Grocery = require('./models/Grocery');
const Product = require('./models/Mobile')


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

// const cartItemSchema = new mongoose.Schema({
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     quantity: { type: Number, default: 1 }
// });

const cartItemSchema = new mongoose.Schema({
    productId: String,
    quantity: Number
});

const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    cart: [cartItemSchema]
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
        User.findOne({email:req.user.email})
        .then((data)=>{
            console.log(data.__v)
            res.render('home',{
                showSideNav:true,
                cartCount:data.__v            
            })
        })
        
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
app.use('/mobiles',mobilesRoute)


app.get('/add-to-cart/:collectionName/:productId', isAuthenticated, (req, res) => {
    const productId = req.params.productId;
    console.log(req.user)
    Product.findOne({productId:productId})
    .then((product)=>{
        if(!product){
            res.status(404).send("Product nit found!")
        }
        User.findOne({email:req.user.email})
        .then((user)=>{
            if(!user){
                console.log("User not found")
                res.status(404).send("User not found!")
            }
            const existingCartItem = user.cart.find(function (item) {
                return item.productId === productId;
            })
            if(existingCartItem){
                existingCartItem.quantity++
            }
            else{
                user.cart.push({productId, quantity:1})
            }

            user.save()
            .then(()=>{
                console.log("Item added to cart")
                res.send("Item added to cart") //render cart
            })
            .catch((err)=>{
                console.log("error occured while adding item to cart")
                res.status(404).send("Item adding failed")
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(404).send("error while searching user!")
        })
        product.productStock--
        product.save()
        .then(()=>{
            console.log('stock updated')
        })
        .catch((err)=>{
            console.log(err)
            res.status(404).send("stock updation failed")
        })

    })
    .catch((err)=>{
        console.log(err)
        res.status(404).send("product not found!")
    })
})

app.listen(3000,()=>{
    console.log("Server is on 3000")
})