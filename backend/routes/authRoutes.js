const express = require("express");
const router = express.Router();
const authLimiter = require("../middleware/rateLimiter");

const { body } = require("express-validator");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// Register Route
router.post(
  "/register",
  authLimiter,
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Enter a valid email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

router.post(
  "/login",
  authLimiter,
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  loginUser
);

module.exports = router;