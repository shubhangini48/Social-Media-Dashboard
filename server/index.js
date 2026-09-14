const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const schedulerRoutes = require("./routes/schedulerRoutes");
const metricRoutes = require("./routes/metricRoutes");
const errorHandler = require("./middleware/errorMiddleware");

require("./scheduler");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW() AS current_time");

    res.json({
      success: true,
      message: "Social Media Dashboard API is running",
      database: "connected",
      time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "API is running but database connection failed",
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/scheduler", schedulerRoutes);
app.use("/api/metrics", metricRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});