const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  postValidation
} = require("../middleware/postValidationMiddleware");

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require("../controllers/postController");

router.use(protect);

router.post("/", postValidation, createPost);

router.get("/", getPosts);

router.get("/:id", getPostById);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports = router;