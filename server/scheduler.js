const cron = require("node-cron");
const db = require("./db");

const processScheduledPosts = async () => {
  try {
    const result = await db.query(
      `SELECT id, platform, content
       FROM posts
       WHERE status = 'scheduled'
       AND scheduled_time <= CURRENT_TIMESTAMP
       FOR UPDATE SKIP LOCKED`
    );

    for (const post of result.rows) {
      try {
        // Currently simulating the publishing operation.
        // This service can later be replaced with
        // Instagram/LinkedIn/X API integrations.

        console.log(
          `Publishing post #${post.id} to ${post.platform}: ${post.content}`
        );

        await db.query(
          `UPDATE posts
           SET status = 'published',
               published_at = CURRENT_TIMESTAMP,
               updated_at = CURRENT_TIMESTAMP
           WHERE id = $1`,
          [post.id]
        );

        console.log(`Post #${post.id} published successfully.`);
      } catch (publishError) {
        console.error(
          `Failed to publish post #${post.id}:`,
          publishError
        );

        await db.query(
          `UPDATE posts
           SET status = 'failed',
               updated_at = CURRENT_TIMESTAMP
           WHERE id = $1`,
          [post.id]
        );
      }
    }

  } catch (error) {
    console.error("Scheduler error:", error);
  }
};

cron.schedule("* * * * *", processScheduledPosts);

console.log("Post scheduler started.");

module.exports = {
  processScheduledPosts
};
