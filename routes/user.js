let router = require('express').Router();
let {
  checkLogin,
  login,
  checkRegister,
  register,
  setNewPassword,
  getData
} = require('../controllers/userController');

router.get('/data/:id', getData);
router.post('/login', checkLogin, login);
router.post('/register', checkRegister, register);
router.put('/set-password/:id', setNewPassword);

module.exports = router;
