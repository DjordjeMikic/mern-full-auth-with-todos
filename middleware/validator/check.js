let { body } = require("express-validator");

let registerCondition = [
  body("name").isLength({ min: 2 }).withMessage("Name is to short"),
  body("lname").isLength({ min: 2 }).withMessage("Lname is to short"),
  body("username")
    .not()
    .isEmpty()
    .isLength({ min: 2 })
    .withMessage("Username is to short"),
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email must be valid email address"),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password is to short"),
];

let sendToken = [
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email must be valid email address"),
];

let password = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must have more than 5 characters"),
];

module.exports = {
  registerCondition,
  password,
};
