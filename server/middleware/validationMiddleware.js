const { body } = require("express-validator");

const signupValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
];

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];

module.exports = {
  signupValidation,
  loginValidation
};