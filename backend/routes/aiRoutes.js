const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const {
  generateContent,
} = require("../controllers/aiController");

const router = express.Router();

// Protect this route
router.use(verifyToken);

// POST /api/ai/generate
router.post("/generate", generateContent);

module.exports = router;