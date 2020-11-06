const express = require("express");
const order = require("../models/orderModel");
const user = require("../models/userModel");
const product = require("../models/productModel");
const auth=require("../middleware/auth")
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();

//create order
router.post("/create/", auth,  async (req, res) => {
//create and save the new order
var newOrder =  new order({price:req.body.price});
newOrder.productsOrdred.push(...req.body.basket);
newOrder.status.push({description:"created", time:req.body.time});
for (let i = 0; i <4; i++) {
  if (!newOrder.status[i]){newOrder.status.push({time:" "})}
}
console.log(newOrder)
newOrder.save();
//find product that matches the ids saved from order
product.find({"_id":{$in :newOrder.productsOrdred}}).select('title price quantityOrdred').exec((err, data)=>
  res.send({orderId:newOrder.id.substring(17, 24), products:data}))
//add  created orderId to the user
user.updateOne({"_id":ObjectID(req.userData.userId)},
{ $push :{"orderId":newOrder.id}}, {upsert: true},(err)=>
err? console.log(err):console.log("successfully updated"));
})

//get the list of orders
router.get("/", auth,  async (req, res) => {
  //add  created orderId to the user
  user.find({"_id":req.userData.userId},(err,found)=>{
    let ordersId=found[0].orderId;
    order.find({"_id":{$in :ordersId}}).populate('productsOrdred.product', 'title price ') .exec( (err, orders)=>{
    
    res.send (orders);}
 )})
  })

//get the list of orders
router.get("/management", auth,  async (req, res) => {
  //get the list of users and their orders
user.find({}).populate('orderId').select('firstName lastName orderId').exec((err,data)=>{
res.send(data)
})


  
  })

module.exports = router;

