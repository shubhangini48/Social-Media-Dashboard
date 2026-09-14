const db = require("../db");

// =========================
// DASHBOARD SUMMARY
// =========================
exports.getDashboardMetrics = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT
        COUNT(*)::int AS total_posts,
        COUNT(*) FILTER (WHERE status = 'draft')::int AS draft_posts,
        COUNT(*) FILTER (WHERE status = 'scheduled')::int AS scheduled_posts,
        COUNT(*) FILTER (WHERE status = 'published')::int AS published_posts,
        COUNT(*) FILTER (WHERE status = 'failed')::int AS failed_posts
       FROM posts
       WHERE user_id = $1`,
      [req.user.id]
    );

    const platformResult = await db.query(
      `SELECT
        platform,
        COUNT(*)::int AS post_count
       FROM posts
       WHERE user_id = $1
       GROUP BY platform
       ORDER BY post_count DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      summary: result.rows[0],
      platform_breakdown: platformResult.rows
    });
  } catch (error) {
    next(error);
  }
};


// =========================
// POST STATUS BREAKDOWN
// =========================
exports.getPostStatusMetrics = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT
        status,
        COUNT(*)::int AS count
       FROM posts
       WHERE user_id = $1
       GROUP BY status
       ORDER BY count DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};


// =========================
// POST ACTIVITY OVER TIME
// =========================
exports.getPostActivity = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT
        DATE(created_at) AS date,
        COUNT(*)::int AS posts
       FROM posts
       WHERE user_id = $1
       GROUP BY DATE(created_at)
       ORDER BY date ASC`,
      [req.user.id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};