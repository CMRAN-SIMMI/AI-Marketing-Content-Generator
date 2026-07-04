const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    prompt: {
      type: String,
      required: true,
    },

    generatedContent: {
      type: String,
      default: "",
    },

    hashtags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Content", contentSchema);