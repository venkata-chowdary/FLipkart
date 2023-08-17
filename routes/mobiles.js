const express=require('express')
const route=express.Router()

const isAuthenticated = require('../middleware/authMiddleware'); 
const Mobile = require('../models/Mobile'); 

route.get('/',isAuthenticated,(req,res)=>{

    Mobile.find({productCategory:"Mobile"})
    .then((data)=>{
        res.render('mobiles',{
            mobilesData:data,
            showSideNav:true
        })
        
    })
    .catch((err)=>{
        console.log(err)
    })
})

route.get('/:productId',isAuthenticated,(req,res)=>{


    Mobile.find({productId:req.params.productId,productCategory:"Mobile"})
    .then((data)=>{
        res.render('product',{
            showSideNav:false,
            product:data,
        })
    })
    .catch((err)=>{
        console.log(err)
    })
    


})

module.exports=route