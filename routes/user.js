let router = require('express').Router();
let {
  checkLogin,
  login,
  checkRegister,
  register,
  getData
} = require('../controllers/userController');

router.get('/data/:id', getData);
router.post('/login', checkLogin, login);
router.post('/register', checkRegister, register);

module.exports = router;
