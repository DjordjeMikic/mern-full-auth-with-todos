let User = require('../models/user');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
  let query = User.find({ username: req.body.username });
  query.exec((e, result) => {
    if(e) throw e;

    if(result.length) {
      next();
    }
  })
}
const login = (req, res) => {
  let query = User.findOne({ username: req.body.username });
  query.exec((e, result) => {
    if(e) {
      res.status(500).json(`Error caused cause of ${e}`);
    }
    bcrypt.compare(req.body.password, result.password)
      .then(isMatch => {
        if(isMatch) {
          result.password = '';
          let token = jwt.sign({ result }, process.env.JWT_SECRET, { expiresIn: '1d' });
          res.status(201).json({ token });
        } else {
          res.status(401).json({ error: 'Wrong email or password' });
        }
      })
      .catch(e => {
        res.status(500).json(`Server Error caused cause ${e}`);
      })
  })
}





const checkRegister = (req, res, next) => {
  const { username, email } = req.body;
  let query = User.findOne({ $or: [ { username: username }, { email: email } ] });
  query.exec((e, result) => {
    if(e) throw e;
    if(!result) {
      next();
    } else {
      res.status(401).json({ error: 'User is already registered' });
    }
  })
}

const register = (req, res) => {
  let { name, lname, username, email, password, gender, age } = req.body;
  let newUser = new User({
    name,
    lname,
    username,
    email,
    password,
    gender,
    age
  });

  bcrypt.genSalt(10, (e, salt) => {

    bcrypt.hash(password, salt, (e, hash) => {

      if(e) throw e;

      newUser.password = hash;

      newUser.save()
        .then(() => {
          res.status(201).json('User is successfully registered');
        })
        .catch(e => {
          res.status(500).json(`Error caused cause of ${e}`);
        })

    })
  })
}

const setNewPassword = (req, res) => {
  if(req.body.confirmPassword === req.body.password) {
    bcrypt.genSalt(10, (e, salt) => {
      if(e) throw e;
      bcrypt.hash(req.body.password, salt, (e, hash) => {
        User.updateOne(
          { _id: req.params },
          { $set: { password: hash } },
          (e, data) => {
            if(e) throw e;
            res.status(201).json({ success: 'Password has been changed successfully' });
          }
        )
      })
    });
  } else {
    res.status(402).json({ error: 'Pasword and confrmPassword are different' });
  }
}

const getData = (req, res) => {
  let query = User.findById(req.params.id);
  query.select('-_id -__v -password');
  query.exec((e, result) => {
    if(e) throw e;
    if(!result) {
      res.status(401).json({ error: 'There is no this user' });
    }
    res.status(200).json(result);
  })
}

module.exports = {
  checkLogin,
  login,
  checkRegister,
  register,
  setNewPassword,
  getData
}
