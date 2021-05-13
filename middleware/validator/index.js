let { validationResult } = require('express-validator');
// Function which return error if prev middlewares contain one
const validate = (req, res, next) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).json(errors.array()[0].msg);
  }
  next();
}

module.exports = validate;
