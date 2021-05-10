let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let { Schema } = mongoose;

let obj = {
  type: String,
  required: true
};

let Unconfirmed = new Schema({
  name: obj,
  lname: obj,
  email: obj,
  username: obj,
  password: {
    type: String,
    required: true
  },
  unconfirmed: {
    type: Boolean,
    default: !true,
    required: true
  },
  gender: {
    ...obj,
    enum: ["male", "female"]
  },
  age: {
    type: Number
  }
});

module.exports = mongoose.model('unconfirmed', Unconfirmed);
