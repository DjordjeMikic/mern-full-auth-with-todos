let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let obj = {
  type: String,
  required: true
};
let note = {
  title: obj,
  text: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}

let User = new Schema({
  name: obj,
  lname: obj,
  email: obj,
  username: obj,
  password: obj,
  gender: {
    ...obj,
    enum: ["male", "female"]
  },
  age: {
    type: Number
  },
  passwordReset: {
    type: String,
    default: null
  },
  confirmationUrl: {
    type: String,
    default: null
  },
  status: {
    ...obj,
    enum: ["pending", "active"],
    default: "pending"
  },
  notes: [note]
});

module.exports = mongoose.model('users', User);
