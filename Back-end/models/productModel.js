const mongoose=require("mongoose");


const productSchema=mongoose.Schema({
    title:{ type : String, required :true},
    quantityOrdred:{ type :Number, required :true},
    price: { type : String, required :true},
    image : { type : String, required :true},
    category : { type : String, required :true}
});

module.exports= mongoose.model('product', productSchema)