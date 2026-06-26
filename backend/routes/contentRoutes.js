const express = require("express");

const {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  searchContent,
} = require("../controllers/contentController");

const router = express.Router();

router.get("/search", searchContent);
router.get("/", getAllContent);
router.get("/:id", getContentById);
router.post("/", createContent);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);
module.exports = router;