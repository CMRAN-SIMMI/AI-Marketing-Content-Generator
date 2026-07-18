
const Content = require("../models/Content");

// GET all content
const getAllContent = async (req, res) => {
  try {
    const contents = await Content.find({
  user: req.user.id,
}).sort({ createdAt: -1 });

    res.status(200).json(contents);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET content by ID
const getContentById = async (req, res) => {
  try {
    const content = await Content.findOne({
  _id: req.params.id,
  user: req.user.id,
});

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// POST new content
// POST new content
const createContent = async (req, res) => {
  try {
    const {
      productName,
      category,
      prompt,
      generatedContent,
      hashtags,
    } = req.body;

    // Validation
    if (!productName || !category || !prompt) {
      return res.status(400).json({
        success: false,
        message: "Product name, category and prompt are required.",
      });
    }

    const newContent = await Content.create({
      user: req.user.id,

      productName,
      category,
      prompt,

      // Save the AI-generated content received from Gemini
      generatedContent,

      hashtags: hashtags || [],
    });

    res.status(201).json({
      success: true,
      message: "Content created successfully.",
      data: newContent,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// PUT update content
const updateContent = async (req, res) => {
  try {
    const updatedContent = await Content.findOneAndUpdate(
  {
    _id: req.params.id,
    user: req.user.id,
  },
  req.body,
  {
    new: true,
    runValidators: true,
  }
);

    if (!updatedContent) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Content updated successfully.",
      data: updatedContent,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE content
const deleteContent = async (req, res) => {
  try {
    const deleted = await Content.findOneAndDelete({
  _id: req.params.id,
  user: req.user.id,
});

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Content deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// SEARCH content
const searchContent = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

  const results = await Content.find({
    user: req.user.id,
    $or: [
      { productName: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { prompt: { $regex: query, $options: "i" } },
    ],
  });
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  searchContent,
};