const db = require("../db");

// =========================
// CREATE SCHEDULED POST
// =========================
exports.schedulePost = async (req, res, next) => {
  try {
    const { content, platform, scheduled_time } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Post content is required"
      });
    }

    if (!platform) {
      return res.status(400).json({
        success: false,
        message: "Platform is required"
      });
    }

    if (!scheduled_time) {
      return res.status(400).json({
        success: false,
        message: "Scheduled time is required"
      });
    }

    const scheduledDate = new Date(scheduled_time);

    if (Number.isNaN(scheduledDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid scheduled time"
      });
    }

    if (scheduledDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Scheduled time must be in the future"
      });
    }

    const result = await db.query(
      `INSERT INTO posts
       (user_id, content, platform, status, scheduled_time)
       VALUES ($1, $2, $3, 'scheduled', $4)
       RETURNING *`,
      [
        req.user.id,
        content.trim(),
        platform,
        scheduledDate
      ]
    );

    res.status(201).json({
      success: true,
      message: "Post scheduled successfully",
      post: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
};


// =========================
// GET SCHEDULED POSTS
// =========================
exports.getScheduledPosts = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT *
       FROM posts
       WHERE user_id = $1
       AND status = 'scheduled'
       ORDER BY scheduled_time ASC`,
      [req.user.id]
    );

    res.json({
      success: true,
      count: result.rows.length,
      posts: result.rows
    });

  } catch (error) {
    next(error);
  }
};


// =========================
// CANCEL SCHEDULED POST
// =========================
exports.cancelScheduledPost = async (req, res, next) => {
  try {
    const result = await db.query(
      `UPDATE posts
       SET status = 'draft',
           scheduled_time = NULL,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       AND user_id = $2
       AND status = 'scheduled'
       RETURNING *`,
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Scheduled post not found"
      });
    }

    res.json({
      success: true,
      message: "Scheduled post cancelled",
      post: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
};