const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  schedulePost,
  getScheduledPosts,
  cancelScheduledPost
} = require("../controllers/schedulerController");

router.use(protect);

router.post("/create", schedulePost);

router.get("/", getScheduledPosts);

router.delete("/:id", cancelScheduledPost);

module.exports = router;
