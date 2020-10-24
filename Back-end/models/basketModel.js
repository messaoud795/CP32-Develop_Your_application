const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const basketSchema=mongoose.Schema({
    products:[Schema.Types.ObjectId],
    time:{type : String, required :true}
 
});

module.exports= mongoose.model('basket', basketSchema)