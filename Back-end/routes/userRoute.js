const express = require("express");
const user = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register a user
router.post("/register", async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 12);
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    email: req.body.email,
    password: hashedPassword,
  };
  let token;
  try {
    token= await jwt.sign(
      { userId: newUser._id, userEmail: newUser.email },
      "supersecret"
    );
  } catch (error) {
    console.log(error)
  }
  user.create(newUser, (err) => {
    err
      ? res.send({ msg: "Email already existed" })
      : res.send({
          id: newUser._id,
          firstName: newUser.firstName,
          token: token,
        });
  });
});

//Sign in a user
router.post("/signIn", async (req, res) => {
  var signInUser = await user.findOne({
    email: req.body.email
  });
  if (signInUser) {
    let foundPassword = await bcrypt.compare(
      req.body.password,
      signInUser.password
    );
    if (foundPassword) {
      let token ;
      try {
         token= await jwt.sign(
        { userId: signInUser._id, userEmail: signInUser.email },
        "supersecret"
      );
      console.log(token)
      } catch (error) {
        console.log(error)
      }
     
      res.send({
        id: signInUser._id,
        firstName: signInUser.firstName,
        token: token,
      });
    } else {
      res.send({ msg: "Invalid password" });
    }
  } else {
    res.send({ msg: "Invalid email" });
  }
});

//display the list of users in the server cmd
user.find((err, data) => (err ? console.log(err) : console.log(data)));

module.exports = router;
