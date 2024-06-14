const { check, validationResult } = require("express-validator");
const User = require("../models/user.model"); // Assuming you have a User model for database queries

const validateUser = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be greater than one character"),

  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }
    }),

  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required")
    .isLength({ min: 2 })
    .withMessage("Username must be greater than one character")
    .custom(async (username) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("Username already in use");
      }
    }),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  check("contact")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact must be exactly 10 digits")
    .isNumeric()
    .withMessage("Contact must contain only numbers"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUser;
