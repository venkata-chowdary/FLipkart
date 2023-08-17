const mongoose=require("mongoose")

const grocerySchema=new mongoose.Schema({
    productId:String,
    productName:String,
    productCompany:String,
    productRating:Number,
    productPrice:Number,
    productCategory:String,
    productDescription:String,
    productImageUrl:String,
    wishlisted:Boolean
})
const Grocery=new mongoose.model('Grocery',grocerySchema);


module.exports=Grocery;