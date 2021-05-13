let User = require('../models/user');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let Mail = require('../utils/mail');

// Check if user exists in db
const checkLogin = (req, res, next) => {
  let query = User.find({ username: req.body.username });
  query.exec((e, result) => {
    if(e) {
      res.status(400).json(`Server error caused cause of ${e}`);
    }

    if(!result) {
      res.status(400).send('User is not registered');
      return;
    }

    if(result || result.length) {
      next();
    }
  })
}

// Find use with status active (activated account) assign him jwt token
const login = (req, res) => {
  let query = User.findOne({ username: req.body.username, status: 'active' });
  query.select('-notes');
  query.exec((e, result) => {
    if(e) {
      res.status(400).json(`Error caused cause of ${e}`);
    }

    if(!result) {
      res.status(400).json('User is not registered');
      return;
    }
    if(result) {
      bcrypt.compare(req.body.password, result.password)
        .then(isMatch => {
          if(isMatch) {

            result.password = '';
            let token = jwt.sign({ result }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(201).json({ token });

          } else {

            res.status(400).json('Wrong username or password');

          }
        })
        .catch(e => {
          res.status(400).json(`Server Error caused cause ${e}`);
        });
    }
  })
}

// Check if user is already registered
// if he is send error if he isn't is not go to next middleware
const checkRegister = (req, res, next) => {
  const { username, email } = req.body;
  let query = User.findOne({ $or: [ { username: username }, { email: email } ] });

  query.exec((e, result) => {
    if(e) throw e;

    if(result) {
      res.status(400).json('User is already registered');
    }

    next();

  })
}

// Register user and send him email for activation account
const register = (req, res) => {
  let { name, lname, username, email, password, gender, age } = req.body;
  let newUser = new User({
    name,
    lname,
    username,
    email,
    password,
    gender,
    age,
    confirmationUrl: require('../utils/generateId')()
  });

  bcrypt.genSalt(10, (e, salt) => {

    bcrypt.hash(password, salt, (e, hash) => {

      if(e) throw e;

      newUser.password = hash;

      newUser.save((e, result) => {
        if(e) {
          res.status(400).json(`Error caused cause of ${e}`)
        }
        let mail = new Mail();
        mail.register(newUser.email, newUser.confirmationUrl);
        res.status(201).json({
          success: 'User is successfully registered activate account on your mail'
        });
      });
    })
  })
}

// If user forgot his password generate token and url for password reset
const getToken = (req, res) => {
  let token = require('../utils/generateToken')();
  let generateId = require('../utils/generateId')();
  User.updateOne(
    { email: req.body.email },
    { $set: {
        confirmationUrl: generateId,
        passwordReset: token
      }
    },
    (e, data) => {
      if(e) {
        res.status(400).json('Email does not exist');
      }

      let mail = new Mail();
      let info = mail.sendMail(req.body.email, token, generateId);

      if(info) {
        res.status(201).json('Email has been sent successfully');
      }
    }
  )
}

// Confirm submited token to redirect user to page reset-password
const confirmToken = (req, res) => {
  let query = User.findOne({ confirmationUrl: req.params.id });
  query.select('confirmationUrl passwordReset');
  query.exec((e, result) => {
    if(e) {
      res.status(400).json('Account does not exist');
    }

    if(result) {

      if(result.passwordReset === req.body.token) {

        res.status(201).json({ success: true });

      } else {

        res.status(400).json('Wrong Token');

      }
    } else {

      res.status(400).json('Account does not exist');

    }
  })
}

// Confirm Account (set it active)
const confirmAccount = (req, res) => {
  User.updateOne(
    { confirmationUrl: req.params.id },
    { $set: { status: 'active', confirmationUrl: null } },
    (e, data) => {
      if(e) {
        res.status(400).json('Account is not activated. Try again');
      }
      if(data.nModified) {
        res.status(201).json({ success: true });
      }
    }
  )
}

// take password and confirmapassword and compare
// them if they are same update user password
const setNewPassword = (req, res) => {
  if(req.body.confirmPassword === req.body.password) {

    bcrypt.genSalt(10, (e, salt) => {
      if(e) {
        res.status(500).json(`Error caused cause of ${e}`);
      }

      bcrypt.hash(req.body.password, salt, (e, hash) => {

        User.updateOne(
          { confirmationUrl: req.params.id },
          { $set: {
            password: hash,
            confirmationUrl: null,
            passwordReset: null
            }
          },
          (e, data) => {
            if(e) {
              res.status(400).json('Some error');
            }
            res.status(201).json({
              success: 'Password has been changed successfully'
            });
          }
        )
      })

    });

  } else {
    res.status(400).json({ error: 'Pasword and confrmPassword are different' });
  }
}

const addNote = (req, res) => {
  User.updateOne(
    { _id: req.params.id },
    { $push: { notes: {
          title: req.body.title,
          text: req.body.text
        }
      }
    },
    (e, data) => {
      if(e) {
        res.status(400).json(`Error caused cause of ${e}`);
      }
      if(data.nModified) {
        res.status(201).json('Note is added');
      }
    }
  )
}

const removeNote = (req, res) => {
  User.updateOne(
    { _id: req.params.id },
    { $pull: { notes: { _id: req.body.id } } },
    (e, result) => {
      if(e) {
        res.status(400).json(`Error caused cause of ${e}`);
      }
      res.status(200).json({ success: true });
    }
  )
}

const getNotes = (req, res) => {
  let query = User.findById(req.params.id);
  query.select('notes');
  query.exec((e, result) => {
    if(e) {
      res.status(400).json(`Error caused cause of ${e}`);
    }
    res.status(200).json(result.notes);
  })
}

module.exports = {
  checkLogin,
  login,
  confirmAccount,
  checkRegister,
  register,
  setNewPassword,
  getToken,
  confirmToken,
  addNote,
  removeNote,
  getNotes
}
