import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarClock,
  FileText,
  CheckCircle2,
  Clock3,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../service/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [metrics, setMetrics] = useState(null);
  const [posts, setPosts] = useState([]);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          metricsResponse,
          postsResponse,
          schedulerResponse,
        ] = await Promise.all([
          api.get("/metrics/dashboard"),
          api.get("/posts"),
          api.get("/scheduler"),
        ]);

        setMetrics(metricsResponse.data);
        setPosts(postsResponse.data.posts || []);
        setScheduledPosts(schedulerResponse.data.posts || []);
      } catch (error) {
        console.error("Unable to load dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="page-loading">Loading dashboard...</div>;
  }

  const summary = metrics?.summary || {};

  const recentPosts = posts.slice(0, 4);
  const upcomingPosts = scheduledPosts.slice(0, 4);

  return (
    <div className="dashboard-page">
      <header className="topbar dashboard-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Welcome back, {user?.name?.split(" ")[0]}</h1>
          <p>Here’s what’s happening with your content.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/posts")}
        >
          <Plus size={18} />
          Create Post
        </button>
      </header>

      <main className="dashboard-content">
        <section className="stats-grid">
          <div className="stat-card dashboard-stat">
            <div className="stat-icon">
              <FileText size={21} />
            </div>

            <span>Total Posts</span>

            <strong>{summary.total_posts ?? 0}</strong>

            <small>All content created</small>
          </div>

          <div className="stat-card dashboard-stat">
            <div className="stat-icon">
              <CheckCircle2 size={21} />
            </div>

            <span>Published</span>

            <strong>{summary.published_posts ?? 0}</strong>

            <small>Successfully published</small>
          </div>

          <div className="stat-card dashboard-stat">
            <div className="stat-icon">
              <CalendarClock size={21} />
            </div>

            <span>Scheduled</span>

            <strong>{summary.scheduled_posts ?? 0}</strong>

            <small>Waiting to be published</small>
          </div>

          <div className="stat-card dashboard-stat">
            <div className="stat-icon">
              <Clock3 size={21} />
            </div>

            <span>Drafts</span>

            <strong>{summary.draft_posts ?? 0}</strong>

            <small>Content in progress</small>
          </div>
        </section>

        <section className="dashboard-content-grid">
          <div className="panel">
            <div className="panel-heading">
              <div>
                <h2>Recent Posts</h2>
                <p>Your latest content</p>
              </div>

              <button
                className="text-button"
                onClick={() => navigate("/posts")}
              >
                View all
                <ArrowRight size={16} />
              </button>
            </div>

            {recentPosts.length === 0 ? (
              <div className="empty-state-small">
                <FileText size={28} />
                <p>No posts created yet.</p>
              </div>
            ) : (
              <div className="recent-post-list">
                {recentPosts.map((post) => (
                  <div className="recent-post" key={post.id}>
                    <div className="recent-post-main">
                      <div className="recent-post-top">
                        <span className="platform-badge">
                          {post.platform}
                        </span>

                        <span
                          className={`status-badge ${post.status}`}
                        >
                          {post.status}
                        </span>
                      </div>

                      <p>{post.content}</p>
                    </div>

                    <small>
                      {new Date(post.created_at).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                        }
                      )}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <h2>Upcoming Schedule</h2>
                <p>Next posts in your queue</p>
              </div>

              <button
                className="text-button"
                onClick={() => navigate("/scheduler")}
              >
                Open
                <ArrowRight size={16} />
              </button>
            </div>

            {upcomingPosts.length === 0 ? (
              <div className="empty-state-small">
                <CalendarClock size={28} />
                <p>No upcoming scheduled posts.</p>
              </div>
            ) : (
              <div className="schedule-list">
                {upcomingPosts.map((post) => (
                  <div className="schedule-item" key={post.id}>
                    <div className="schedule-icon">
                      <CalendarClock size={18} />
                    </div>

                    <div>
                      <strong>{post.platform}</strong>

                      <p>{post.content}</p>

                      <small>
                        {new Date(
                          post.scheduled_time
                        ).toLocaleString("en-IN")}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="panel quick-action-panel">
          <div>
            <h2>Quick Actions</h2>
            <p>Manage your social media workflow</p>
          </div>

          <div className="dashboard-quick-actions">
            <button onClick={() => navigate("/posts")}>
              <FileText size={19} />
              Manage Posts
            </button>

            <button onClick={() => navigate("/scheduler")}>
              <CalendarClock size={19} />
              Schedule Content
            </button>

            <button onClick={() => navigate("/analytics")}>
              <BarChart3 size={19} />
              View Analytics
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
