let router = require('express').Router();
let validator = require('../middleware/validator');
// Error handlers
let {
  registerCondition,
  sendToken,
  password
} = require('../middleware/validator/check');

let {
  checkLogin,
  login,
  confirmAccount,
  checkRegister,
  register,
  setNewPassword,
  getToken,
  confirmToken,
  removeNote,
  getNotes,
  addNote
} = require('../controllers/userController');

// @dest /api/user/login
// @desc login user
// @method post
router.post('/login', checkLogin, login);

// @dest /api/user/register
// @desc register user
// @method post
router.post(
  '/register',
  registerCondition,
  validator,
  checkRegister,
  register
);

// @dest /api/user/confirm-account/:id
// @desc confirm account (activate it)
// @method put
router.put('/confirm-account/:id', confirmAccount);

// @dest /api/user/get-getToken
// @desc generate token for password reset and send it via email
// @mthod post
router.post('/get-token', getToken);

// @dest /api/user/confirm-token/:id
// @desc comparing tokens from db and user input
// @method post
router.post('/confirm-token/:id', confirmToken);

// @dest /api/set-password/:id
// @desc Setting new password
// @method put
router.put('/set-password/:id', password, validator, setNewPassword);

// @dest /api/note/:id
// @desc add, delete and get notes
// @methods get, post, delete
router.route('/note/:id')
  .get(getNotes)
  .post(addNote)
  .delete(removeNote);

module.exports = router;
