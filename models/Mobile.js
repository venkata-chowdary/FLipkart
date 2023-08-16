const mongoose=require("mongoose")

const mobileSchema=new mongoose.Schema({
    productId:String,
    productName:String,
    productCompany:String,
    productRating:Number,
    productPrice:Number,
    productDescription:String,
    productImageUrl:String,
    wishlisted:Boolean
})
const Mobile=new mongoose.model('Mobile',mobileSchema);


module.exports=Mobile;