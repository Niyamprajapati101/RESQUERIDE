import { useState, useEffect } from "react";
import { Eye, Ban, CheckCircle, X, RefreshCw } from "lucide-react";
import { api } from "../../api";

function Avatar({ name, size = 36 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "rgba(148,210,189,0.15)", border: "1px solid rgba(148,210,189,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#94d2bd", fontWeight: 900, fontSize: size * 0.38, flexShrink: 0 }}>
      {(name || "?").charAt(0).toUpperCase()}
    </div>
  );
}

function ProfileModal({ user, onClose, onToggleBlock }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }} onClick={onClose} />
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "420px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "20px", margin: 0 }}>User Profile</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}><X size={20} /></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", marginBottom: "20px" }}>
          <Avatar name={user.name} size={52} />
          <div style={{ flex: 1 }}>
            <p style={{ color: "#fff", fontWeight: 900, fontSize: "17px", margin: "0 0 2px 0" }}>{user.name}</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0 }}>{user.email}</p>
          </div>
          <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, background: user.status === "Active" ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)", border: `1px solid ${user.status === "Active" ? "rgba(74,222,128,0.4)" : "rgba(248,113,113,0.4)"}`, color: user.status === "Active" ? "#4ade80" : "#f87171" }}>{user.status}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {[
            { label: "Phone",    value: user.phone || "—" },
            { label: "Joined",   value: user.joined || "—" },
            { label: "Bookings", value: user.bookings ?? 0 },
            { label: "User ID",  value: `#${user.id}` },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "14px 16px" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>{label}</p>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "rgba(255,255,255,0.4)", fontWeight: 700, fontSize: "13px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em" }}>Close</button>
          <button onClick={() => { onToggleBlock(user.id); onClose(); }} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: user.status === "Active" ? "1px solid rgba(248,113,113,0.35)" : "1px solid rgba(74,222,128,0.35)", background: user.status === "Active" ? "rgba(248,113,113,0.1)" : "rgba(74,222,128,0.1)", color: user.status === "Active" ? "#f87171" : "#4ade80", fontWeight: 700, fontSize: "13px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {user.status === "Active" ? "Block User" : "Unblock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const load = () => api.getUsers().then(setUsers).catch(() => {});
  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  const toggleBlock = async (id) => {
    const user = users.find(u => u.id === id);
    const newStatus = user.status === "Active" ? "Blocked" : "Active";
    await api.updateUser(id, { status: newStatus });
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const filtered = users
    .filter(u => filter === "All" || u.status === filter)
    .filter(u => (u.name || "").toLowerCase().includes(search.toLowerCase()) || (u.email || "").toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ color: "#94d2bd", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, marginBottom: "6px" }}>— Members</p>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "28px", margin: 0 }}>Users Management</h1>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "10px 16px", color: "#fff", fontSize: "14px", outline: "none", width: "220px" }} />
          <button onClick={load} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {[
          { label: "Total Users", value: users.length,                                    color: "#fff" },
          { label: "Active",      value: users.filter(u => u.status === "Active").length,  color: "#4ade80" },
          { label: "Blocked",     value: users.filter(u => u.status === "Blocked").length, color: "#f87171" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
            <p style={{ color: s.color, fontWeight: 900, fontSize: "32px", margin: "0 0 6px 0" }}>{s.value}</p>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        {["All", "Active", "Blocked"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: "10px", border: filter === f ? "1px solid #94d2bd" : "1px solid rgba(255,255,255,0.08)", background: filter === f ? "#94d2bd" : "rgba(255,255,255,0.03)", color: filter === f ? "#fff" : "rgba(255,255,255,0.35)", fontWeight: 700, fontSize: "12px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", boxShadow: filter === f ? "0 4px 15px rgba(148,210,189,0.35)" : "none" }}>{f}</button>
        ))}
      </div>

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px", color: "rgba(255,255,255,0.15)", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase" }}>No users yet — users need to sign up from the frontend</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["User", "Email", "Phone", "Bookings", "Joined", "Status", "Actions"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "14px 24px", color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "14px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <Avatar name={u.name} size={32} />
                        <span style={{ color: "#fff", fontWeight: 600 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 24px", color: "rgba(255,255,255,0.5)" }}>{u.email}</td>
                    <td style={{ padding: "14px 24px", color: "rgba(255,255,255,0.5)" }}>{u.phone || "—"}</td>
                    <td style={{ padding: "14px 24px", color: "#94d2bd", fontWeight: 700 }}>{u.bookings ?? 0}</td>
                    <td style={{ padding: "14px 24px", color: "rgba(255,255,255,0.4)" }}>{u.joined || "—"}</td>
                    <td style={{ padding: "14px 24px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, background: u.status === "Active" ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)", border: `1px solid ${u.status === "Active" ? "rgba(74,222,128,0.4)" : "rgba(248,113,113,0.4)"}`, color: u.status === "Active" ? "#4ade80" : "#f87171" }}>{u.status}</span>
                    </td>
                    <td style={{ padding: "14px 24px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => setSelected(u)} style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center" }}><Eye size={14} /></button>
                        <button onClick={() => toggleBlock(u.id)} style={{ padding: "8px", borderRadius: "8px", background: u.status === "Active" ? "rgba(255,255,255,0.04)" : "rgba(74,222,128,0.1)", border: u.status === "Active" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(74,222,128,0.3)", color: u.status === "Active" ? "rgba(255,255,255,0.4)" : "#4ade80", cursor: "pointer", display: "flex", alignItems: "center" }}>
                          {u.status === "Active" ? <Ban size={14} /> : <CheckCircle size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && <ProfileModal user={selected} onClose={() => setSelected(null)} onToggleBlock={toggleBlock} />}
    </div>
  );
}

