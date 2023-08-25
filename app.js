const express=require('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')
const mongoose = require('mongoose')
const session=require('express-session')
const passport=require('passport')
const passportLocalMongoose=require('passport-local-mongoose')
const encrypt=require('mongoose-encryption')

//routes
const mobilesRoute=require('./routes/mobiles.js')
const groceryRoute=require('./routes/groceries.js')
const profileRoute=require('./routes/profile.js')
const clothingRoute=require('./routes/clothing.js')

const isAuthenticated = require('./middleware/authMiddleware'); 

//models
const Product = require('./models/Product')

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


const cartItemSchema = new mongoose.Schema({
    productId: String,
    quantity: Number
});

const userSchema=new mongoose.Schema({
    username:String,
    firstname:String,
    password:String,
    cart: [cartItemSchema],
    orders:[cartItemSchema]
})


const secret="Thisispasswordsecret"
userSchema.plugin(encrypt,{secret:secret,encryptedFields:['password']})
userSchema.plugin(passportLocalMongoose)

const User=new mongoose.model("User",userSchema)

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.get('/',isAuthenticated,(req,res)=>{
    let count=req.cartCount
    User.findOne({username:req.user.username})
    .then((data)=>{
        console.log(data)
        res.render('home',{
            showSideNav:true,
            cartCount:count ,
            username:data.firstname    
        })
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

app.get('/register',function(req,res){
    res.render('register')
})

app.get('/login',function(req,res){
    res.render('login')
})


app.post('/register',function(req,res){    
    User.register({username:req.body.username,firstname:req.body.firstname},req.body.password, function(err,user){
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

app.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

app.get('/searchProduct',isAuthenticated,(req,res)=>{
    const productName=req.query.productName

    let count=req.cartCount
    Product.find({productName:productName})
    .then((data)=>{
        res.render('product',{
            product:data,
            showSideNav:true,
            cartCount:count
        }) 
    })
    .catch((err)=>{
        console.log(err)
    })
})

//use routes

app.use('/mobiles',mobilesRoute)
app.use('/groceries',groceryRoute)
app.use('/profile',profileRoute)
app.use('/clothing',clothingRoute)

app.get('/add-to-cart/:collectionName/:productId', isAuthenticated, (req, res) => {
    const productId = req.params.productId;
    Product.findOne({productId:productId})
    .then((product)=>{
        if(!product){
            res.status(404).send("Product nit found!")
        }
        // console.log("email details:", req)
        User.findOne({username:req.user.username})
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
                res.redirect('/cart') //render cart
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

app.get('/cart',isAuthenticated,(req,res)=>{
    User.findOne({username:req.user.username})
    .then((data)=>{

        const productIdsInCart = data.cart.map(item => item.productId);
        const quantity=data.cart.map(product=>product.quantity)
        Product.find({productId: {$in: productIdsInCart}})
        .then((productData)=>{
            let total=0
            productData.forEach((item)=>{
                data.cart.forEach((id)=>{
                    if (id.productId===item.productId){
                        total+=item.productPrice*id.quantity
                    }
                })
            })
            res.render('cart',{
                cartData:productData,
                showSideNav:true,
                cartCount:req.cartCount,
                quantityData:quantity,
                totalItems:data.cart.length,
                totalCost:total
            })
        })   
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post('/update-item-quantity/:productId/:quantity', isAuthenticated, (req, res) => {

    const productid = req.params.productId;
    const newQuantity = parseInt(req.params.quantity);
    let oldQunatity=0;

    User.findOne({username:req.user.username})
    .then((user)=>{
        const cartItem = user.cart.find(item => item.productId.toString() === productid);
        if (!cartItem) {
            return res.status(404).send({ message: 'Cart item not found' });
        }
        oldQunatity=cartItem.quantity
        console.log(oldQunatity)

        cartItem.quantity=newQuantity
        console.log(cartItem.quantity)

        user.save()
        .then(()=>{
            console.log("cart data updated")
        })
        .catch((err)=>{
            console.log(err)
        })

        Product.findOne({productId:productid})
        .then((productData)=>{
            if(oldQunatity>newQuantity){
                productData.productStock++
            }
            if(oldQunatity<newQuantity){
                productData.productStock--
            }
            productData.save()
            .then(()=>{
                console.log("product stock updated")
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
});

app.get('/placeorder',isAuthenticated,(req,res)=>{
    

    User.findOne({username:req.user.username})
    .then((data)=>{
        if(data.cart.length==0){
            return res.redirect('/cart')
        }
        
        while(data.cart.length){
            let lastElemenet=data.cart[data.cart.length-1]
            console.log(lastElemenet)
            data.orders.push(lastElemenet)
            data.cart.pop()
        }

        data.save()
        .then(()=>{
            console.log("cleared cart")
            res.render('placeorder',{
                showSideNav:false,
                cartCount:data.cart.length,
                totalItems:0,
                totalCost:0
            })
        })
        .catch((err)=>{
            console.log(err)
        })
        
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

//order

app.get('/orders',isAuthenticated,(req,res)=>{
    let count=req.cartCount
    User.findOne({username:req.user.username})
    .then((userData)=>{

        const orderedProducts = userData.orders.map(item => item.productId);
        const quantity=userData.orders.map(product=>product.quantity)

        Product.find({productId: {$in: orderedProducts}})
        .then((productData)=>{
            console.log(productData)
            console.log(quantity)
            res.render('orders',{
                showSideNav :true,
                cartCount:count,
                ordersData:productData,
                orderedQuantity:quantity
            })
        })
        .catch((err)=>{
            console.log(err)
        })

        
    })
    
})





app.listen(3000,()=>{
    console.log("Server is on 3000")
})

// Product.findOne({ productId:productId })
//         .then(product => {
//             if (!product) {
//                 return res.send('Product not found');
//             }
//             const quantityDifference = newQuantity - product.productStock;

//             if (quantityDifference > 0 && quantityDifference <= product.productStock) {
//                 product.productStock -= quantityDifference;
//                 product.save();
//             }
//         })
//         .catch((err)=>{
//             console.log(err)
//         })