const Chat = require("../models/Chat");
const { generateChatResponse } = require("../services/groqService");
// Get all conversations of logged-in user
const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      user: req.user.id,
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get one conversation
const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete conversation
const deleteChat = async (req, res) => {
  try {
    const deleted = await Chat.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { chatId, message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    let chat;

    // Existing conversation
    if (chatId) {
      chat = await Chat.findOne({
        _id: chatId,
        user: req.user.id,
      });

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found.",
        });
      }

    } else {
      // New conversation
      chat = new Chat({
        user: req.user.id,
        title: message.substring(0, 40),
        messages: [],
      });
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content: message,
    });

    // Ask Groq
    const aiReply = await generateChatResponse(message);

    // Save AI reply
    chat.messages.push({
      role: "assistant",
      content: aiReply,
    });

    await chat.save();

    res.status(200).json({
      success: true,
      data: chat,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getChats,
  getChatById,
  deleteChat,
  sendMessage,
};