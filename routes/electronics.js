const express=require('express')
const route=express.Router()

const isAuthenticated = require('../middleware/authMiddleware'); // Example middleware for authentication


route.get('/',isAuthenticated,(req,res)=>{
    res.render('electronics',{
        showSideNav:true
    })
})




module.exports=route