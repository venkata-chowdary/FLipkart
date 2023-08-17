const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authMiddleware'); // Example middleware for authentication



router.get('/',isAuthenticated,(req,res)=>{
    res.render('grocery',{
        showSideNav:true
    })
})










module.exports=router