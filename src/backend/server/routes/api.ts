import * as express from 'express';
import { Offer } from '../../../app/shared/models/offer.model';
const router = express.Router();
const User = require('../models/user');
const Offer = require('../models/offer');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const db = 'mongodb+srv://userjjit:jjit@jjitdb.jxuqq.mongodb.net/jjitdb?retryWrites=true&w=majority';
const secretKey = 'a7201b9c4a6d45d193d794460bb25bd691e655dec874def168d29c4f6089781b538eb8c080f2d3fba5f4a51b0bace09e';

mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology: true}, (err: express.ErrorRequestHandler) => {
  if (err) {
    console.error('Error!' + err);
  } else {
    console.log('Connected to mongoDB');
  }
});

function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  const token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.params.userId = payload.subject;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized request');
  }
}

router.post('/post-offer-form', (req: express.Request, res: express.Response) => {
  const offerData = req.body;
  const offer = new Offer(offerData);
  offer.save((err: express.ErrorRequestHandler) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({offerSent: true});
    }
  });
});

router.post('/register', (req: express.Request, res: express.Response) => {
  const userData = req.body;
  const user = new User(userData);
  user.save((err: express.ErrorRequestHandler, registeredUser: {_id: string}) => {
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

router.post('/login', (req: express.Request, res: express.Response) => {
  const userData = req.body;
  User.findOne({ email: userData.email }, (err: express.ErrorRequestHandler, user: {email: string, password: string, _id: string}) => {
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

router.get('/post-offer-form', verifyToken, (req: express.Request, res: express.Response) => {
  res.send({valid: true});
});

router.get('/offers', (req: express.Request, res: express.Response) => {
  Offer.find({}, (result: Offer, err: express.ErrorRequestHandler) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
