import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
