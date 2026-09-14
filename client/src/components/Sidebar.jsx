import {
  LayoutDashboard,
  FileText,
  CalendarClock,
  BarChart3,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/posts",
      label: "Posts",
      icon: FileText,
    },
    {
      path: "/scheduler",
      label: "Scheduler",
      icon: CalendarClock,
    },
    {
      path: "/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">S</div>

        <div>
          <h2>SocialPulse</h2>
          <span>Management Platform</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="user-details">
            <strong>{user?.name || "User"}</strong>
            <span>{user?.email || ""}</span>
          </div>
        </div>

        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;