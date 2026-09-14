import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  UserRound,
  ArrowRight,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
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
      const response = await api.post("/auth/signup", form);

      login(response.data.token, response.data.user);

      navigate("/dashboard");
    } catch (err) {
      const validationErrors = err.response?.data?.errors;

      setError(
        validationErrors?.[0]?.msg ||
          err.response?.data?.message ||
          "Unable to create your account."
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
            Build. Schedule.
            <span> Analyze.</span>
          </h1>

          <p>
            Manage your social media content workflow using a
            centralized full-stack platform.
          </p>

          <div className="auth-feature-row">
            <span>✓ Content management</span>
            <span>✓ Automated scheduling</span>
            <span>✓ Performance analytics</span>
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
            <h2>Create your account</h2>
            <p>Start managing your content in one place.</p>
          </div>

          <form onSubmit={handleSubmit} className="modern-form">
            <label>Full name</label>

            <div className="input-with-icon">
              <UserRound size={18} />

              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
