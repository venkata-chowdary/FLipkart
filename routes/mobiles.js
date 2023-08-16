const express=require('express')
const route=express.Router()

const isAuthenticated = require('../middleware/authMiddleware'); 
const Mobile = require('../models/Mobile'); 

route.get('/',isAuthenticated,(req,res)=>{

    Mobile.find({})
    .then((data)=>{
        res.render('mobiles',{
            mobilesData:data
        })
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

module.exports=route