const mongoosee = require('mongoose');

const userSchema = new mongoosee.Schema({
  email: String,
  password: String,
});

module.exports = mongoosee.model('user', userSchema, 'users');
