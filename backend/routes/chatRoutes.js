const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const {
  getChats,
  getChatById,
  deleteChat,
  sendMessage,
} = require("../controllers/chatController");

const router = express.Router();

// Protect all chat routes
router.use(verifyToken);

// Get all conversations
router.get("/", getChats);

// post a message to a conversation
router.post("/message", sendMessage);

// Get one conversation
router.get("/:id", getChatById);

// Delete conversation
router.delete("/:id", deleteChat);

module.exports = router;