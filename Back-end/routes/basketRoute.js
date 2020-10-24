const express = require("express");
const basket = require("../models/basketModel");
const router = express.Router();


//create a basket for a connected user
router.post("/", async(req, res) => {
    console.log("axios received")

const newBasket = new basket({time:req.body.time})
newBasket.products.push(...req.body.basket);
newBasket.save((err, data) => {
    if (err) {
      console.log(error);
    } else {
        console.log(data)
      res.send({msg:"Succesfully added"});}})
})


//display the list of users in the server cmd
basket.find((err, data) => (err ? console.log(err) : console.log(data)));


module.exports = router;

