import { useEffect, useState } from "react";
import { CalendarClock, Trash2, Plus } from "lucide-react";
import api from "../services/api";

const Scheduler = () => {
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [form, setForm] = useState({
    content: "",
    platform: "linkedin",
    scheduled_time: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadScheduledPosts = async () => {
    try {
      const response = await api.get("/scheduler");
      setScheduledPosts(response.data.posts || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load scheduled posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScheduledPosts();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await api.post("/scheduler/create", form);

      setSuccess("Post scheduled successfully.");

      setForm({
        content: "",
        platform: "linkedin",
        scheduled_time: "",
      });

      await loadScheduledPosts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to schedule post"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async (id) => {
    const confirmed = window.confirm(
      "Cancel this scheduled post?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/scheduler/${id}`);
      await loadScheduledPosts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to cancel scheduled post"
      );
    }
  };

  return (
    <div className="dashboard-page">
      <header className="topbar">
        <div>
          <h1>Scheduler</h1>
          <p>Schedule content for future publishing</p>
        </div>
      </header>

      <main className="dashboard-content">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <section className="scheduler-layout">
          <div className="panel">
            <div className="section-title">
              <CalendarClock size={22} />
              <h2>Schedule a Post</h2>
            </div>

            <form
              className="scheduler-form"
              onSubmit={handleSubmit}
            >
              <label>Post content</label>

              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Write the content you want to schedule..."
                rows="7"
                maxLength="5000"
                required
              />

              <label>Platform</label>

              <select
                name="platform"
                value={form.platform}
                onChange={handleChange}
              >
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">X / Twitter</option>
                <option value="facebook">Facebook</option>
              </select>

              <label>Scheduled date & time</label>

              <input
                type="datetime-local"
                name="scheduled_time"
                value={form.scheduled_time}
                onChange={handleChange}
                required
              />

              <button
                className="primary-button"
                type="submit"
                disabled={saving}
              >
                <Plus size={18} />
                {saving ? "Scheduling..." : "Schedule Post"}
              </button>
            </form>
          </div>

          <div className="panel">
            <div className="section-title">
              <CalendarClock size={22} />
              <h2>Upcoming Posts</h2>
            </div>

            {loading ? (
              <p>Loading scheduled posts...</p>
            ) : scheduledPosts.length === 0 ? (
              <div className="empty-state-small">
                <p>No scheduled posts.</p>
              </div>
            ) : (
              <div className="scheduled-list">
                {scheduledPosts.map((post) => (
                  <div
                    className="scheduled-item"
                    key={post.id}
                  >
                    <div>
                      <span className="platform-badge">
                        {post.platform}
                      </span>

                      <p>{post.content}</p>

                      <small>
                        {new Date(
                          post.scheduled_time
                        ).toLocaleString()}
                      </small>
                    </div>

                    <button
                      className="danger-button"
                      onClick={() =>
                        handleCancel(post.id)
                      }
                    >
                      <Trash2 size={16} />
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Scheduler;