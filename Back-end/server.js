//importing
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const basketRoute = require("./routes/basketRoute");
const orderRoute = require("./routes/orderRoute");
const path=require('path')


//app config
const app = express();

//middlewaree
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use( '/uploads/images',express.static(path.join('uploads','images' )))
app.use((req, res,next)=> {
res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type, Accept, Authorization')
next()})

//DB config"mongodb://localhost:27017/shoppingDB";
const connection_url = "mongodb+srv://nabil123:1d2a3m4m5e@cluster0.pkyyp.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,useCreateIndex: true,
  useFindAndModify: false
});
//Connection check to mongodb server
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected the database server");
});
//api routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/basket", basketRoute);
app.use("/api/order", orderRoute);

// listner
app.listen(5000, () => console.log("server is running"));
