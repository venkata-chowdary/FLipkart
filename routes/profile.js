const express=require('express')
const route=express.Router()

const isAuthenticated = require('../middleware/authMiddleware');

route.get('/',isAuthenticated,(req,res)=>{
    let count=req.cartCount
    res.render('profile',{
        showSideNav:true,
        cartCount:count,
        profileData:req.user,        
    })
})




module.exports=route