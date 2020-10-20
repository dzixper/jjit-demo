const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Offer = require('../models/offer');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
import Request = require('express');

const db = 'tutaj-jest-link';
const secretKey = 'tutaj-jest-kod';

mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology: true}, (err) => {
  if (err) {
    console.error('Error!' + err);
  } else {
    console.log('Connected to mongoDB');
  }
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  const token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.userId = payload.subject;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized request');
  }
}

router.post('/post-offer-form', (req, res) => {
  const offerData = req.body;
  const offer = new Offer(offerData);
  offer.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({offerSent: true});
    }
  });
});

router.post('/register', (req, res) => {
  const userData = req.body;
  const user = new User(userData);
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err);
    } else {
      const payload = { subject: registeredUser._id };
      const token = jwt.sign(payload, secretKey);
      // document.cookie = `token=${token}`
      res.status(200).send({token});
    }
  });
});

router.post('/login', (req, res) => {
  const userData = req.body;
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        res.status(401).send('Invalid email');
      } else if (user.password !== userData.password) {
        res.status(401).send('Invalid password');
      } else {
        const payload = { subject: user._id };
        const token = jwt.sign(payload, secretKey);
        // document.cookie = `token=${token}`
        res.status(200).send({token});
      }
    }
  });
});

router.get('/post-offer-form', verifyToken, (req, res) => {
  res.send({valid: true});
});

router.get('/offers', (req, res) => {
  Offer.find({}, (result, err) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
