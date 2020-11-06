const express = require("express");
const basket = require("../models/basketModel");
const user = require("../models/userModel");
const auth=require("../middleware/auth")
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();


//create a basket for a connected user
router.post("/", auth, (req, res) => {
//create and save the new basket
const newBasket = new basket({time:req.body.time})
console.log(...req.body.basket)
newBasket.productsSelected.push(...req.body.basket);
newBasket.save((err, data) => {
    if (err) {
      console.log(error);
    } else {
      res.send({msg:"Succesfully added"});}})
//add the basket created to the user
user.updateOne({"_id":ObjectID(req.userData.userId)},
{ $set :{"basketId":newBasket.id}}, {upsert: true},(err)=>
err? console.log(err):console.log("successfully updated"));
})

module.exports = router;

