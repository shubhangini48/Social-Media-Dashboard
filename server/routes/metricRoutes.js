const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getDashboardMetrics,
  getPostStatusMetrics,
  getPostActivity
} = require("../controllers/metricController");

router.use(protect);

router.get("/dashboard", getDashboardMetrics);

router.get("/status", getPostStatusMetrics);

router.get("/activity", getPostActivity);

module.exports = router;