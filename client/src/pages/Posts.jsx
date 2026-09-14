import { useEffect, useState } from "react";
import { Edit3, Trash2, Plus, X } from "lucide-react";
import api from "../service/api";

const emptyForm = {
  content: "",
  platform: "linkedin",
  status: "draft",
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data.posts || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError("");
  };

  const openEdit = (post) => {
    setEditingId(post.id);
    setForm({
      content: post.content || "",
      platform: post.platform || "linkedin",
      status: post.status || "draft",
    });
    setShowForm(true);
    setError("");
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingId) {
        await api.put(`/posts/${editingId}`, form);
      } else {
        await api.post("/posts", form);
      }

      await loadPosts();
      closeForm();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to save post"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/posts/${id}`);
      await loadPosts();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to delete post"
      );
    }
  };

  return (
    <div className="dashboard-page">
      <header className="topbar">
        <div>
          <h1>Posts</h1>
          <p>Manage your social media content</p>
        </div>

        <button className="primary-button" onClick={openCreate}>
          <Plus size={18} />
          New Post
        </button>
      </header>

      <main className="dashboard-content">
        {error && <p className="error">{error}</p>}

        {loading ? (
          <div className="page-loading">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="panel empty-state">
            <h2>No posts yet</h2>
            <p>Create your first post to get started.</p>
            <button className="primary-button" onClick={openCreate}>
              <Plus size={18} />
              Create Post
            </button>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <article className="post-card" key={post.id}>
                <div className="post-card-header">
                  <span className="platform-badge">
                    {post.platform}
                  </span>

                  <span className={`status-badge ${post.status}`}>
                    {post.status}
                  </span>
                </div>

                <p className="post-content">{post.content}</p>

                <div className="post-meta">
                  <span>
                    Created{" "}
                    {new Date(post.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="post-actions">
                  <button
                    className="secondary-button"
                    onClick={() => openEdit(post)}
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>

                  <button
                    className="danger-button"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2>{editingId ? "Edit Post" : "Create Post"}</h2>

              <button
                className="icon-button"
                onClick={closeForm}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Content</label>

              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Write your post..."
                rows="6"
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

              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <button
                type="submit"
                className="primary-button full-width"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Post"
                  : "Create Post"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
