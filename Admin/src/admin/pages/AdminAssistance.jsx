import { useState, useEffect } from "react";
import { Eye, X, RefreshCw } from "lucide-react";
import { api } from "../../api";

const statusStyle = {
  Pending:       { bg: "rgba(148,210,189,0.12)",  border: "rgba(148,210,189,0.4)",  color: "#94d2bd" },
  "In Progress": { bg: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.4)",  color: "#38bdf8" },
  Resolved:      { bg: "rgba(74,222,128,0.12)",  border: "rgba(74,222,128,0.4)",  color: "#4ade80" },
};

const issueIcon = { "Towing": "🚛", "Puncture Repair": "🔧", "Fuel Delivery": "⛽", "Battery Jump-start": "🔋", "On-site Mechanic": "⚙️", "Flat Tyre": "🔧", "Engine Breakdown": "⚙️", "Battery Dead": "🔋", "Accident": "🚨", "Fuel Empty": "⛽", "Key Locked Inside": "🔑" };

function DetailModal({ req, onClose, onStatusChange }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }} onClick={onClose} />
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "500px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>{req.id}</p>
            <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "22px", margin: 0 }}>{req.issue}</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}><X size={20} /></button>
        </div>
        <div style={{ fontSize: "48px", textAlign: "center", marginBottom: "20px" }}>{issueIcon[req.issue] ?? "🚗"}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {[
            { label: "User",        value: req.user || "—" },
            { label: "Phone",       value: req.phone || "—" },
            { label: "Vehicle",     value: req.car || "—" },
            { label: "Date",        value: req.date || "—" },
            { label: "Location",    value: req.location || "—" },
            { label: "Description", value: req.description || "—" },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "14px 16px" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>{label}</p>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: "24px" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>Update Status</p>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Pending", "In Progress", "Resolved"].map(s => {
              const st = statusStyle[s];
              const active = req.status === s;
              return <button key={s} onClick={() => onStatusChange(req.id, s)} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: active ? `1px solid ${st.border}` : "1px solid rgba(255,255,255,0.08)", background: active ? st.bg : "rgba(255,255,255,0.03)", color: active ? st.color : "rgba(255,255,255,0.3)", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>{s}</button>;
            })}
          </div>
        </div>
        <button onClick={onClose} style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "linear-gradient(90deg, #94d2bd, #7bbda8)", color: "#fff", fontWeight: 700, fontSize: "13px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase" }}>Close</button>
      </div>
    </div>
  );
}

export default function AdminAssistance() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const load = () => api.getAssistance().then(setRequests).catch(() => {});
  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.updateAssistance(id, { status });
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    setSelected(prev => prev ? { ...prev, status } : null);
  };

  const filtered = filter === "All" ? requests : requests.filter(r => r.status === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#94d2bd", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, marginBottom: "6px" }}>— Emergency</p>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "28px", margin: 0 }}>Roadside Assistance</h1>
        </div>
        <button onClick={load} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {[
          { label: "Pending",     value: requests.filter(r => r.status === "Pending").length,       color: "#94d2bd" },
          { label: "In Progress", value: requests.filter(r => r.status === "In Progress").length,   color: "#38bdf8" },
          { label: "Resolved",    value: requests.filter(r => r.status === "Resolved").length,      color: "#4ade80" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
            <p style={{ color: s.color, fontWeight: 900, fontSize: "32px", margin: "0 0 6px 0" }}>{s.value}</p>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["All", "Pending", "In Progress", "Resolved"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: "10px", border: filter === f ? "1px solid #94d2bd" : "1px solid rgba(255,255,255,0.08)", background: filter === f ? "#94d2bd" : "rgba(255,255,255,0.03)", color: filter === f ? "#fff" : "rgba(255,255,255,0.35)", fontWeight: 700, fontSize: "12px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", boxShadow: filter === f ? "0 4px 15px rgba(148,210,189,0.35)" : "none" }}>{f}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px", color: "rgba(255,255,255,0.15)", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase" }}>No requests yet — users need to submit from the frontend</div>
        ) : filtered.map(req => (
          <div key={req.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ fontSize: "32px", width: "48px", textAlign: "center", flexShrink: 0 }}>{issueIcon[req.issue] ?? "🚗"}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <p style={{ color: "#fff", fontWeight: 900, fontSize: "15px", margin: 0 }}>{req.issue}</p>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>•</span>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: 0 }}>{req.id}</p>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 600, margin: "0 0 4px 0" }}>{req.user} — {req.car}</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>📍 {req.location}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", margin: 0 }}>{req.date}</p>
              <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, background: statusStyle[req.status]?.bg, border: `1px solid ${statusStyle[req.status]?.border}`, color: statusStyle[req.status]?.color }}>{req.status}</span>
              <button onClick={() => setSelected(req)} style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center" }}><Eye size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {selected && <DetailModal req={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />}
    </div>
  );
}

