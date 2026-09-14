const { validationResult } = require("express-validator");
const db = require("../db");

// =========================
// CREATE POST
// =========================
exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      content,
      platform,
      status = "draft",
      scheduled_time = null
    } = req.body;

    const result = await db.query(
      `INSERT INTO posts
       (user_id, content, platform, status, scheduled_time)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        req.user.id,
        content,
        platform,
        status,
        scheduled_time
      ]
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
};


// =========================
// GET ALL POSTS
// =========================
exports.getPosts = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT *
       FROM posts
       WHERE user_id = $1
       ORDER BY created_at DESC`,
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
// GET SINGLE POST
// =========================
exports.getPostById = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT *
       FROM posts
       WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    res.json({
      success: true,
      post: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
};


// =========================
// UPDATE POST
// =========================
exports.updatePost = async (req, res, next) => {
  try {
    const {
      content,
      platform,
      status,
      scheduled_time
    } = req.body;

    const result = await db.query(
      `UPDATE posts
       SET content = COALESCE($1, content),
           platform = COALESCE($2, platform),
           status = COALESCE($3, status),
           scheduled_time = COALESCE($4, scheduled_time),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [
        content ?? null,
        platform ?? null,
        status ?? null,
        scheduled_time ?? null,
        req.params.id,
        req.user.id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    res.json({
      success: true,
      message: "Post updated successfully",
      post: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
};


// =========================
// DELETE POST
// =========================
exports.deletePost = async (req, res, next) => {
  try {
    const result = await db.query(
      `DELETE FROM posts
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    res.json({
      success: true,
      message: "Post deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};