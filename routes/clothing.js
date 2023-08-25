const express=require('express')
const route=express.Router()

const isAuthenticated=require('../middleware/authMiddleware')
const Product = require('../models/Product')

route.get('/',isAuthenticated,(req,res)=>{
    let count=req.cartCount
    Product.find({productCategory:"Clothing"})
    .then((data)=>{
        res.render('clothing',{
            clothingData:data,
            showSideNav:true,
            cartCount:count
        }) 
    })
    .catch((err)=>{
        console.log(err)
    })

})

module.exports=route