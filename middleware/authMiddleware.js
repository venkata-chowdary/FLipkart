
module.exports = (req, res, next) => {
    let count=0
    if (req.isAuthenticated()) {
        const len=req.user.cart.length
        for(let i=0;i<len;i++){
            count+=req.user.cart[i].quantity
        }
        req.cartCount=count
        next();
    }
    else{
        res.redirect('/login');
    }
  };
  