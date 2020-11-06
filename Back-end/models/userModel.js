const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    firstName:{ type : String, required :true},
    lastName:{ type : String, required :true},
    address:{ type : String, required :true},
    email: { type : String, required :true, unique:true},
    password : { type : String, required :true},
    basketId: [mongoose.Schema.Types.ObjectId],
    orderId: [{type:mongoose.Schema.Types.ObjectId, ref:'order'}]
});

module.exports= mongoose.model('user', userSchema)