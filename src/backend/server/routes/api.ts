const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Offer = require("../models/offer")
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const db =
  "mongodb+srv://userjjit:jjit@jjitdb.jxuqq.mongodb.net/jjitdb?retryWrites=true&w=majority";

const secretKey = 'secretKey';

mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology: true}, (err) => {
  if (err) {
    console.error("Error!" + err);
  } else {
    console.log("Connected to mongoDB");
  }
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  try {
    let payload = jwt.verify(token, secretKey);
    req.userId = payload.subject;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized request');
  }
}

router.post('/offers', (req, res) => {
  let offerData = req.body;
  let offer = new Offer(offerData);
  offer.save((error) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send('Offer added');
    }
  });
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, secretKey);
      res.status(200).send({token});
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      } else if (user.password !== userData.password) {
        res.status(401).send("Invalid password");
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, secretKey);
        res.status(200).send({token});
      }
    }
  });
});

router.get('/post-offer-form', verifyToken, (req, res) => {
  res.send('Token verified');
});

router.get('/offers', (req, res) => {
  Offer.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
