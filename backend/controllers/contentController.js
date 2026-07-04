// const Content = require("../models/Content");
// // GET all content
// const getAllContent = (req, res) => {
//   res.status(200).json(contents);
// };
// // GET content by ID
// const getContentById = (req, res) => {
//   const id = parseInt(req.params.id);

//   const content = contents.find((item) => item.id === id);

//   if (!content) {
//     return res.status(404).json({
//       success: false,
//       message: "Content not found",
//     });
//   }

//   res.status(200).json(content);
// };

// // POST new content
// const createContent = (req, res) => {
//   const {
//     productName,
//     category,
//     prompt,
//     generatedContent,
//     hashtags,
//   } = req.body;

//   // Validation
//   if (!productName || !category || !prompt) {
//     return res.status(400).json({
//       success: false,
//       message: "Product name, category and prompt are required.",
//     });
//   }

//   const newContent = {
//     id: contents.length + 1,
//     productName,
//     category,
//     prompt,
//     generatedContent:
//   generatedContent ||
//   `🌟 Marketing Description

// Introducing ${productName}, a premium ${category.toLowerCase()} product crafted with quality and care. Designed to deliver exceptional taste and value, it is the perfect choice for customers looking for freshness, quality, and reliability.

// ✨ Product Highlights
// • Premium Quality
// • Fresh Ingredients
// • Rich Taste
// • Perfect for Everyday Use

// 📢 Experience the difference today with ${productName}!`,
//     hashtags: hashtags || [],
//     createdAt: new Date().toISOString(),
//   };

//   contents.push(newContent);

//   res.status(201).json({
//     success: true,
//     message: "Content created successfully.",
//     data: newContent,
//   });
// };

// // PUT update content
// const updateContent = (req, res) => {
//   const id = parseInt(req.params.id);

//   const content = contents.find((item) => item.id === id);

//   if (!content) {
//     return res.status(404).json({
//       success: false,
//       message: "Content not found",
//     });
//   }

//   const {
//     productName,
//     category,
//     prompt,
//     generatedContent,
//     hashtags,
//   } = req.body;

//   content.productName = productName || content.productName;
//   content.category = category || content.category;
//   content.prompt = prompt || content.prompt;
//   content.generatedContent =
//     generatedContent || content.generatedContent;
//   content.hashtags = hashtags || content.hashtags;

//   res.status(200).json({
//     success: true,
//     message: "Content updated successfully.",
//     data: content,
//   });
// };

// // DELETE content
// const deleteContent = (req, res) => {
//   const id = parseInt(req.params.id);

//   const index = contents.findIndex((item) => item.id === id);

//   if (index === -1) {
//     return res.status(404).json({
//       success: false,
//       message: "Content not found",
//     });
//   }

//   contents.splice(index, 1);

//   res.status(204).send();
// };

// // SEARCH content
// const searchContent = (req, res) => {
//   const query = req.query.q;

//   if (!query) {
//     return res.status(400).json({
//       success: false,
//       message: "Search query is required.",
//     });
//   }

//   const results = contents.filter(
//     (item) =>
//       item.productName.toLowerCase().includes(query.toLowerCase()) ||
//       item.category.toLowerCase().includes(query.toLowerCase()) ||
//       item.prompt.toLowerCase().includes(query.toLowerCase())
//   );

//   res.status(200).json({
//     success: true,
//     count: results.length,
//     data: results,
//   });
// };

// module.exports = {
//   getAllContent,
//   getContentById,
//   createContent,
//   updateContent,
//   deleteContent,
//   searchContent,
// };
const Content = require("../models/Content");

// GET all content
const getAllContent = async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 });

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
    const content = await Content.findById(req.params.id);

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
const createContent = async (req, res) => {
  try {
    const {
      productName,
      category,
      prompt,
      generatedContent,
      hashtags,
    } = req.body;

    if (!productName || !category || !prompt) {
      return res.status(400).json({
        success: false,
        message: "Product name, category and prompt are required.",
      });
    }

    const newContent = await Content.create({
      productName,
      category,
      prompt,
      generatedContent:
        generatedContent ||
        `🌟 Marketing Description

Introducing ${productName}, a premium ${category.toLowerCase()} product crafted with quality and care. Designed to deliver exceptional taste and value, it is the perfect choice for customers looking for freshness, quality, and reliability.

✨ Product Highlights
• Premium Quality
• Fresh Ingredients
• Rich Taste
• Perfect for Everyday Use

📢 Experience the difference today with ${productName}!`,
      hashtags: hashtags || [],
    });

    res.status(201).json({
      success: true,
      message: "Content created successfully.",
      data: newContent,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// PUT update content
const updateContent = async (req, res) => {
  try {
    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
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
    const deleted = await Content.findByIdAndDelete(req.params.id);

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