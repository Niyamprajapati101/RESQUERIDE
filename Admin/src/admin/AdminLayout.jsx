import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Car, CalendarCheck, Users, MessageSquare,
  Wrench, LogOut, Menu, X, ChevronRight
} from "lucide-react";

const navItems = [
  { label: "Dashboard",  icon: LayoutDashboard, path: "/admin" },
  { label: "Cars",       icon: Car,             path: "/admin/cars" },
  { label: "Bookings",   icon: CalendarCheck,   path: "/admin/bookings" },
  { label: "Users",      icon: Users,           path: "/admin/users" },
  { label: "Messages",   icon: MessageSquare,   path: "/admin/messages" },
  { label: "Assistance", icon: Wrench,          path: "/admin/assistance" },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = navItems.find(n => n.path === location.pathname)?.label ?? "Admin";
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || '{"name":"Admin","email":"admin@resqueride.com"}');

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "linear-gradient(135deg, #000000, #020b1f, #000000)" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: collapsed ? "64px" : "240px",
        minWidth: collapsed ? "64px" : "240px",
        height: "100vh",
        background: "rgba(0,0,0,0.85)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s, min-width 0.3s",
        overflow: "hidden",
        zIndex: 40,
      }}>

        {/* Logo */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "72px" }}>
          {!collapsed && (
            <span style={{ color: "#94d2bd", fontWeight: 900, fontSize: "16px", letterSpacing: "0.15em", whiteSpace: "nowrap" }}>RESQUERIDE</span>
          )}
          <button onClick={() => setCollapsed(!collapsed)}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: "4px", display: "flex", alignItems: "center" }}>
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "16px 8px", display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto" }}>
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "10px 12px", borderRadius: "12px",
                  background: active ? "rgba(148,210,189,0.12)" : "transparent",
                  border: active ? "1px solid rgba(148,210,189,0.35)" : "1px solid transparent",
                  color: active ? "#94d2bd" : "rgba(255,255,255,0.35)",
                  fontWeight: 600, fontSize: "14px",
                  transition: "all 0.2s", cursor: "pointer",
                  whiteSpace: "nowrap", overflow: "hidden",
                }}>
                  <Icon size={18} style={{ flexShrink: 0, color: active ? "#94d2bd" : "rgba(255,255,255,0.3)" }} />
                  {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
                  {!collapsed && active && <ChevronRight size={14} style={{ color: "#94d2bd", flexShrink: 0 }} />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div style={{ padding: "8px 8px 24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "10px 12px", borderRadius: "12px",
              color: "rgba(255,255,255,0.25)", fontWeight: 600, fontSize: "14px",
              transition: "all 0.2s", cursor: "pointer", whiteSpace: "nowrap",
            }}>
              <LogOut size={18} style={{ flexShrink: 0 }} />
              {!collapsed && <span>Go to Website</span>}
            </div>
          </a>
          <button onClick={handleLogout} style={{
            width: "100%", marginTop: "8px",
            display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 12px", borderRadius: "12px",
            background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)",
            color: "#f87171", fontWeight: 600, fontSize: "14px",
            transition: "all 0.2s", cursor: "pointer", whiteSpace: "nowrap",
          }}>
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Right side ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", minWidth: 0 }}>

        {/* Topbar */}
        <div style={{
          padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(20px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0, minHeight: "72px",
        }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "2px" }}>Admin Panel</p>
            <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "20px", margin: 0 }}>{currentPage}</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(148,210,189,0.15)", border: "1px solid rgba(148,210,189,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#94d2bd", fontWeight: 900, fontSize: "14px",
            }}>{adminUser.name?.charAt(0).toUpperCase() || 'A'}</div>
            <div>
              <p style={{ color: "#fff", fontSize: "13px", fontWeight: 700, margin: 0 }}>{adminUser.name || 'Admin'}</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", margin: 0 }}>{adminUser.email || 'admin@resqueride.com'}</p>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

