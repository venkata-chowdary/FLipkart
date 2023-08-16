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

//models
const Mobile = require('./models/Mobile');

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
app.use('/mobiles',mobilesRoute)


const smartphoneDataInINR = [
  // Apple
  {
    productId: '1',
    productName: 'iPhone 14',
    productCompany: 'Apple',
    productRating: 4.8,
    productPrice: 74900,
    productDescription: 'The iPhone 13 is the latest addition to Apple\'s iconic smartphone lineup. With its sleek design and advanced features, it offers an impressive user experience. The A15 Bionic chip powers smooth performance, while the Super Retina XDR display showcases vibrant visuals. Capture stunning photos and videos with the improved dual-camera system, and enjoy all-day battery life.',
    productImageUrl: 'https://imagineonline.store/cdn/shop/products/MPV03HN_A_1.jpg?v=1662718728',
    wishlisted: false
  },
  {
    productId: '2',
    productName: 'iPhone 13 Pro',
    productCompany: 'Apple',
    productRating: 4.9,
    productPrice: 89925,
    productDescription: 'The iPhone 13 Pro is a professional-grade smartphone designed for users who demand the best. Equipped with a powerful A15 Bionic chip and ProMotion technology, it delivers unparalleled performance and responsiveness. The Pro camera system with enhanced low-light capabilities ensures exceptional photography and videography. With its stunning design and high-end features, the iPhone 13 Pro is a true flagship device.',
    productImageUrl: 'https://m.media-amazon.com/images/I/61HHS0HrjpL._SX679_.jpg',
    wishlisted: true
  },
  {
    productId: '3',
    productName: 'iPhone SE',
    productCompany: 'Apple',
    productRating: 4.5,
    productPrice: 29900,
    productDescription: 'The iPhone SE combines compact size with powerful performance. With the A14 Bionic chip, you get fast and efficient performance for everyday tasks. The Retina HD display offers sharp visuals, and the single-camera system delivers great photos. Experience Apple\'s iOS ecosystem in a budget-friendly package.',
    productImageUrl: 'https://m.media-amazon.com/images/I/61A0Zu4K-TL._SX679_.jpg',
    wishlisted: false
  },
  {
    productId: '4',
    productName: 'iPhone 12 Mini',
    productCompany: 'Apple',
    productRating: 4.7,
    productPrice: 52400,
    productDescription: 'The iPhone 12 Mini packs flagship features into a compact design. With the A14 Bionic chip, it offers excellent performance. The Super Retina XDR display provides stunning visuals, and the dual-camera system captures impressive photos. If you prefer a smaller smartphone without compromising on features, the iPhone 12 Mini is a great choice.',
    productImageUrl: 'https://m.media-amazon.com/images/I/71ZOtNdaZCL._SX679_.jpg',
    wishlisted: true
  },
  {
    productId: '5',
    productName: 'iPhone 11',
    productCompany: 'Apple',
    productRating: 4.6,
    productPrice: 44900,
    productDescription: 'The iPhone 11 offers exceptional value with its powerful performance and dual-camera system. The A13 Bionic chip ensures smooth usage, and the Liquid Retina display delivers great visuals. Capture stunning photos and enjoy features like Face ID and Animoji. The iPhone 11 continues to be a popular choice among users.',
    productImageUrl: 'https://ovantica.com/pub/media/catalog/product/cache/359e51c8e354c4e2b5af98e814f93978/i/p/iphone-11-128gb-black.jpg',
    wishlisted: false
  },

  // Samsung
  {
    productId: '6',
    productName: 'Galaxy S21',
    productCompany: 'Samsung',
    productRating: 4.7,
    productPrice: 54900,
    productDescription: 'The Samsung Galaxy S21 is a powerful smartphone that combines cutting-edge technology with elegant design. Its dynamic AMOLED display showcases stunning visuals, while the Exynos 2100 processor ensures smooth performance. Capture high-quality photos and videos with the versatile triple-camera system. With 5G connectivity and a range of smart features, the Galaxy S21 offers a premium mobile experience.',
    productImageUrl: 'https://m.media-amazon.com/images/I/81cHpJNr07L.jpg',
    wishlisted: true
  },
  {
    productId: '7',
    productName: 'Galaxy Note 20',
    productCompany: 'Samsung',
    productRating: 4.6,
    productPrice: 64900,
    productDescription: 'The Samsung Galaxy Note 20 is a flagship smartphone that caters to productivity enthusiasts. Its S Pen offers precise input for note-taking and creative tasks. The powerful Exynos 990 processor ensures smooth multitasking, while the Super AMOLED Plus display delivers vibrant visuals. Capture stunning photos with the advanced camera system and enjoy a premium smartphone experience.',
    productImageUrl: 'https://m.media-amazon.com/images/I/81+Zx6troaL.jpg',
    wishlisted: false
  },
  {
    productId: '8',
    productName: 'Galaxy A52',
    productCompany: 'Samsung',
    productRating: 4.4,
    productPrice: 29900,
    productDescription: 'The Samsung Galaxy A52 is a mid-range smartphone that offers impressive features for its price. With a Super AMOLED display, you get vibrant visuals. The quad-camera system lets you capture various types of photos, and the Exynos 720G processor ensures decent performance. Enjoy One UI and a sleek design with the Galaxy A52.',
    productImageUrl: 'https://m.media-amazon.com/images/I/81-nNnxa6VS.jpg',
    wishlisted: true
  },
  {
    productId: '9',
    productName: 'Galaxy Z Flip 3',
    productCompany: 'Samsung',
    productRating: 4.9,
    productPrice: 47900,
    productDescription: 'The Samsung Galaxy Z Fold 3 is a foldable phone that offers advanced multitasking and a unique user experience. Unfold the device to reveal a large AMOLED display for productivity and entertainment. The Snapdragon 888 processor ensures powerful performance, and the triple-camera system captures great photos. With S Pen support and a refined design, the Galaxy Z Fold 3 is a premium choice for tech enthusiasts.',
    productImageUrl: 'https://m.media-amazon.com/images/I/71f2I8cltBL._SX679_.jpg',
    wishlisted: false
  },
  
  // Google
  {
    productId: '11',
    productName: 'Pixel 6',
    productCompany: 'Google',
    productRating: 4.8,
    productPrice: 44900,
    productDescription: 'The Google Pixel 6 is a flagship smartphone that harnesses the power of AI to enhance your mobile experience. Its custom Google Tensor chip offers impressive performance and AI capabilities. The AMOLED display provides rich colors, while the dual-camera system captures stunning photos. With clean Android software and seamless integration with Google services, the Pixel 6 offers a unique user experience.',
    productImageUrl: 'https://m.media-amazon.com/images/I/71QQZr2pNSL.jpg',
    wishlisted: false
  },
  {
    productId: '12',
    productName: 'Pixel 5a',
    productCompany: 'Google',
    productRating: 4.5,
    productPrice: 33700,
    productDescription: 'The Google Pixel 5a is an affordable Pixel smartphone with an excellent camera. It offers a clean Android experience and seamless integration with Google services. The Snapdragon 765G processor ensures smooth performance, and the OLED display provides vibrant visuals. Capture stunning photos and enjoy features like Night Sight for low-light photography.',
    productImageUrl: 'https://m.media-amazon.com/images/I/51cPFTAo1lL.jpg',
    wishlisted: true
  },
  {
    productId: '13',
    productName: 'Pixel 4 XL',
    productCompany: 'Google',
    productRating: 4.4,
    productPrice: 52000,
    productDescription: 'The Google Pixel 4 XL is a previous-gen Pixel smartphone with an exceptional camera system. It offers a clean Android experience and regular software updates. The Snapdragon 855 processor ensures decent performance, and the OLED display delivers sharp visuals. Capture stunning photos with features like Night Sight and enjoy the benefits of Google\'s ecosystem.',
    productImageUrl: 'https://m.media-amazon.com/images/I/416YHOeIwsL.jpg',
    wishlisted: false
  },
  {
    productId: '14',
    productName: 'Pixel 3a',
    productCompany: 'Google',
    productRating: 4.2,
    productPrice: 25900,
    productDescription: 'The Google Pixel 3a is a mid-range Pixel smartphone that delivers a clean Android experience and impressive camera capabilities. The Snapdragon 670 processor offers decent performance for everyday tasks. The OLED display provides vibrant colors, and the Night Sight feature enhances low-light photography. Enjoy Google\'s AI-driven features and seamless integration.',
    productImageUrl: 'https://cdn.dxomark.com/wp-content/uploads/medias/post-31251/google_pixel_3a_xl-2-1024x768.jpg',
    wishlisted: true
  },
  {
    productId: '15',
    productName: 'Pixel 7',
    productCompany: 'Google',
    productRating: 4.1,
    productPrice: 22400,
    productDescription: 'The Google Pixel 2 is an older flagship with a focus on a clean Android experience and excellent camera performance. The Snapdragon 835 processor offers smooth usage for everyday tasks. The OLED display showcases vivid visuals, and the camera excels in low-light conditions. If you value stock Android and photography, the Pixel 2 is a solid choice.',
    productImageUrl: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/l/2/y/-original-imaggswcffkgcupp.jpeg',
    wishlisted: false
  }
];

// Mobile.insertMany(smartphoneDataInINR)
//   .then(() => {
//     console.log('Smartphone data inserted successfully');
//   })
//   .catch((err) => {
//     console.error('Error inserting smartphone data:', err);
//   });



app.listen(3000,()=>{
    console.log("Server is on 3000")
})