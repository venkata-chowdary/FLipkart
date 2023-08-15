const express=require('express')
const route=express.Router()



route.get('/',(req,res)=>{
    res.send("electronics page")
})




module.exports=route