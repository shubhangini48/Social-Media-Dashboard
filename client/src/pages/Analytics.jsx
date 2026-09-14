import { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  FileText,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../service/api";

const Analytics = () => {
  const [dashboard, setDashboard] = useState(null);
  const [activity, setActivity] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [
          dashboardResponse,
          activityResponse,
          statusResponse,
        ] = await Promise.all([
          api.get("/metrics/dashboard"),
          api.get("/metrics/activity"),
          api.get("/metrics/status"),
        ]);

        setDashboard(dashboardResponse.data);
        setActivity(activityResponse.data.data || []);
        setStatusData(statusResponse.data.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load analytics"
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return <div className="page-loading">Loading analytics...</div>;
  }

  if (error) {
    return (
      <div className="dashboard-content">
        <p className="error">{error}</p>
      </div>
    );
  }

  const summary = dashboard?.summary || {};

  const platformData =
    dashboard?.platform_breakdown?.map((item) => ({
      platform: item.platform,
      posts: Number(item.post_count),
    })) || [];

  const formattedActivity = activity.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    posts: Number(item.posts),
  }));

  const formattedStatus = statusData.map((item) => ({
    status: item.status,
    count: Number(item.count),
  }));

  return (
    <div className="dashboard-page">
      <header className="topbar">
        <div>
          <h1>Analytics</h1>
          <p>Monitor your content performance</p>
        </div>

        <BarChart3 size={26} />
      </header>

      <main className="dashboard-content">
        <section className="stats-grid">
          <div className="stat-card">
            <FileText size={24} />
            <span>Total Posts</span>
            <strong>{summary.total_posts ?? 0}</strong>
          </div>

          <div className="stat-card">
            <CheckCircle2 size={24} />
            <span>Published</span>
            <strong>{summary.published_posts ?? 0}</strong>
          </div>

          <div className="stat-card">
            <Clock3 size={24} />
            <span>Scheduled</span>
            <strong>{summary.scheduled_posts ?? 0}</strong>
          </div>

          <div className="stat-card">
            <TrendingUp size={24} />
            <span>Drafts</span>
            <strong>{summary.draft_posts ?? 0}</strong>
          </div>
        </section>

        <section className="analytics-grid">
          <div className="panel chart-panel">
            <h2>Post Activity</h2>

            {formattedActivity.length === 0 ? (
              <div className="chart-empty">
                No activity data available yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={formattedActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="posts"
                    stroke="#5b67f1"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="panel chart-panel">
            <h2>Posts by Platform</h2>

            {platformData.length === 0 ? (
              <div className="chart-empty">
                No platform data available yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={platformData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar
                    dataKey="posts"
                    fill="#5b67f1"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="panel chart-panel">
          <h2>Post Status Distribution</h2>

          {formattedStatus.length === 0 ? (
            <div className="chart-empty">
              No status data available yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={formattedStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#6d77f7"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>
      </main>
    </div>
  );
};

export default Analytics;
