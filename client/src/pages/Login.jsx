import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ArrowRight } from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);

      login(response.data.token, response.data.user);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-modern">
      <div className="auth-visual">
        <div>
          <div className="auth-brand">
            <div className="brand-logo">S</div>
            <span>SocialPulse</span>
          </div>

          <h1>
            Manage your social presence
            <span> from one place.</span>
          </h1>

          <p>
            Create content, schedule posts and monitor your
            publishing workflow through one centralized platform.
          </p>

          <div className="auth-feature-row">
            <span>✓ Secure authentication</span>
            <span>✓ Post scheduling</span>
            <span>✓ Analytics</span>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-modern-card">
          <div className="mobile-auth-brand">
            <div className="brand-logo">S</div>
            <span>SocialPulse</span>
          </div>

          <div className="auth-heading">
            <h2>Welcome back</h2>
            <p>Sign in to continue to your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="modern-form">
            <label>Email</label>

            <div className="input-with-icon">
              <Mail size={18} />

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <label>Password</label>

            <div className="input-with-icon">
              <LockKeyhole size={18} />

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;