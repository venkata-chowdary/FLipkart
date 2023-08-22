const mongoose=require("mongoose")

const mobileSchema=new mongoose.Schema({
    productId:String,
    productName:String,
    productCompany:String,
    productRating:Number,
    productPrice:Number,
    productStock:Number,
    productCategory:String,
    productCategory2:String,
    productDescription:String,
    productImageUrl:String,
    wishlisted:Boolean
})
const Product=new mongoose.model('Product',mobileSchema);


module.exports=Product;