const express = require("express");
const product = require("../models/productModel");
const router = express.Router();


var productList=[{
  title: "Asus",
  category:"Laptop",
  price: 1300 ,
  image:
    "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6420/6420894_sd.jpg;maxHeight=200;maxWidth=300",
  description: "14 ZenBook Duo Touch Laptop - i7 8GB 512GB - Celestial Blue",
  quantityOrdred: 1
},
{
  title: "Lenovo",
  category:"Laptop",
  price: 430,
  image:
  "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6415/6415810_sd.jpg;maxHeight=200;maxWidth=300",
  description: " IdeaPad 3 15 Touch Screen Laptop - Intel Core i3-1005G1 - 8GB Memory - 256GB SSD - Almond",
  quantityOrdred: 1
},
{
  title: "Redmi 9",
  category: "Smart phone",
  price: 300,
  image:
  "https://m.media-amazon.com/images/I/71uZrDPrsRL._AC._SR360,460.jpg",
  description: "(Sky Blue, 4GB RAM, 64GB Storage)| 3 Months No Cost EMI on",
  quantityOrdred: 1
},
{
  title: "Apple watch",
  category: "Smart watch",
  price: 50,
  image:
  "https://images-na.ssl-images-amazon.com/images/I/718qilkBKUL._SL1500_.jpg",
  description: " New Apple Watch Series 6 (GPS + Cellular, 40mm) - Blue Aluminium Case with Deep Navy Sport Band",
  quantityOrdred: 1
},
{
  title: "Samsung Galaxy Tab A7",
  category: "Tablet",
  price: 80,
  image:
  "https://images-na.ssl-images-amazon.com/images/I/71g9138yHKL._SL1500_.jpg",
  description: " 10.4 inch, RAM 3 GB, ROM 32 GB, Wi-Fi-only, Grey",
  quantityOrdred: 1
},
{
  title: "Reading tablet",
  category: "E book",
  price: 400,
  image:
  "https://images-na.ssl-images-amazon.com/images/I/71AmuZzf9yL._SL1000_.jpg",
  description: " Robustrion Ultra Slim Smart Flip Case Kindle Cover for All New 6 Amazon Kindle Cover 10th 10 Generation 2019 Kindle Cover - Deer Wine Red",
  quantityOrdred: 1
},
{
  title: "Zebronics Zeb-Warrior 2.0",
  category: "Accessories",
  price: 550,
  image:
  "https://images-na.ssl-images-amazon.com/images/I/81grtcmxsyL._SL1500_.jpg",
  description: "  Multimedia Speaker with Aux Connectivity,USB Powered and Volume Control",
  quantityOrdred: 1
}
,
{
  title: "External Hard Drive",
  category: "Accessories",
  price: 250,
  image:
  "https://images-na.ssl-images-amazon.com/images/I/51Vx3HTs-wL._SL1000_.jpg",
  description: " Western Digital WD 2TB My Passport Portable External Hard Drive, Black - with Automatic Backup, 256Bit AES Hardware Encryption & Software Protection",
  quantityOrdred: 1
}
];


  product.create(productList, (err, data) => {
    if (err) {
      console.log(error);
    } else {
      return(null, data);}})

const categoryList = [
  "Laptop",
  "Smart phone",
  "Tablet",
  "Smart watch",
  "E book",
  "Accessories",
];
//send a product from each category to be dispalyed on home page
router.get("/", async(req, res) => {
  var homeProducts=[];
   for (let i = 0; i < categoryList.length; i++) {
     let cat=categoryList[i];
     await product.findOne({category:cat},(err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      homeProducts=[...homeProducts, data];
    }
  });
  }
  res.status(200).send(homeProducts);
 
});
//send products for a specific category
router.post("/category/", async (req, res) => {
  const foundProducts = await product.find({
    category: req.body.category,
  });
  try {
      if (foundProducts) {
  res.send(foundProducts);}
  } catch (error) {
    res.send(error);}
  })

//send a product searched on the search box
router.post("/item", async (req, res) => {
  const foundProduct = await product.findOne({
    // title:$regex:{^" +req.body.item+"$"}

    title:{$regex: ".*" + req.body.item + ".*",$options: 'i'}
  }
  );
  try {
      if (foundProduct) {
        console.log(foundProduct)
  res.send(foundProduct);}
  } catch (error) {
    res.send(error);}
  })


module.exports = router;

