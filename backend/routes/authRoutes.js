const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
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
// Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: true,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

res.redirect(
  `${process.env.FRONTEND_URL}/oauth-success?` +
  `token=${token}` +
  `&name=${encodeURIComponent(req.user.name)}` +
  `&email=${encodeURIComponent(req.user.email)}`
);
  }
);
module.exports = router;