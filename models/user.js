let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;

let obj = {
  type: String,
  required: true
};

let User = new Schema({
  name: obj,
  lname: obj,
  email: obj,
  username: obj,
  password: {
    type: String,
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


module.exports = mongoose.model('users', User);
