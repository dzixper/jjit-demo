import { NextFunction, Request, Response } from 'express';
import { Offer } from '../../../app/shared/models/offer.model';
import express from 'express';
// const express = require('express');
const router = express.Router();
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
// const User = require('../models/user');
// const Offer = require('../models/offer');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
const db = 'mongodb+srv://userjjit:jjit@jjitdb.jxuqq.mongodb.net/jjitdb?retryWrites=true&w=majority';

const secretKey = 'a7201b9c4a6d45d193d794460bb25bd691e655dec874def168d29c4f6089781b538eb8c080f2d3fba5f4a51b0bace09e';

mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology: true}, (err) => {
  if (err) {
    console.error('Error!' + err);
  } else {
    console.log('Connected to mongoDB');
  }
});

function verifyToken(req: Request, res: Response, next: NextFunction): Response | void {
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

router.post('/post-offer-form', (req: Request, res: Response) => {
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

router.post('/register', (req: Request, res: Response) => {
  const userData = req.body;
  const user = new User(userData);
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err);
    } else {
      const payload = { subject: registeredUser._id };
      const token = jwt.sign(payload, secretKey);
      res.status(200).send({token});
    }
  });
});

router.post('/login', (req: Request, res: Response) => {
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
        res.status(200).send({token});
      }
    }
  });
});

router.get('/post-offer-form', verifyToken, (req: Request, res: Response) => {
  res.send({valid: true});
});

router.get('/offers', (req: Request, res: Response) => {
  Offer.find({}, (result: Offer, err) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
