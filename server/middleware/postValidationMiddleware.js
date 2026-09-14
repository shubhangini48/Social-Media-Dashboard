const { body } = require("express-validator");

const postValidation = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Post content is required")
    .isLength({ max: 5000 })
    .withMessage("Post content cannot exceed 5000 characters"),

  body("platform")
    .trim()
    .notEmpty()
    .withMessage("Platform is required")
    .isIn(["instagram", "twitter", "linkedin", "facebook"])
    .withMessage("Invalid platform"),

  body("status")
    .optional()
    .isIn(["draft", "scheduled", "published", "failed"])
    .withMessage("Invalid post status")
];

module.exports = {
  postValidation
};