import { useState, useEffect } from "react";
import { Eye, Trash2, X, CheckCheck } from "lucide-react";
import { api } from "../../api";

function MessageModal({ msg, onClose, onMarkRead }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }} onClick={onClose} />
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "500px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>{msg.date}</p>
            <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "20px", margin: 0 }}>{msg.subject}</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}><X size={20} /></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", marginBottom: "20px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(148,210,189,0.15)", border: "1px solid rgba(148,210,189,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#94d2bd", fontWeight: 900, fontSize: "16px", flexShrink: 0 }}>{msg.name.charAt(0)}</div>
          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: "0 0 2px 0" }}>{msg.name}</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>{msg.email}</p>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "20px", marginBottom: "24px" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{msg.message}</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "rgba(255,255,255,0.4)", fontWeight: 700, fontSize: "13px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em" }}>Close</button>
          {!msg.read && <button onClick={() => { onMarkRead(msg.id); onClose(); }} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "none", background: "linear-gradient(90deg, #94d2bd, #7bbda8)", color: "#fff", fontWeight: 700, fontSize: "13px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em" }}>Mark as Read</button>}
        </div>
      </div>
    </div>
  );
}

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const load = () => api.getMessages().then(setMessages).catch(() => {});
  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  const markRead    = async (id) => { await api.updateMessage(id, { read: true }); setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m)); };
  const deleteMsg   = async (id) => { await api.deleteMessage(id); setMessages(prev => prev.filter(m => m.id !== id)); };
  const markAllRead = async () => {
    const unread = messages.filter(m => !m.read);
    await Promise.all(unread.map(m => api.updateMessage(m.id, { read: true })));
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
  };

  const filtered = filter === "All" ? messages : filter === "Unread" ? messages.filter(m => !m.read) : messages.filter(m => m.read);
  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ color: "#94d2bd", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, marginBottom: "6px" }}>— Inbox</p>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "28px", margin: 0 }}>Contact Messages</h1>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "12px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            <CheckCheck size={14} /> Mark All Read
          </button>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {[
          { label: "Total",  value: messages.length,                      color: "#fff" },
          { label: "Unread", value: messages.filter(m => !m.read).length, color: "#94d2bd" },
          { label: "Read",   value: messages.filter(m => m.read).length,  color: "rgba(255,255,255,0.4)" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
            <p style={{ color: s.color, fontWeight: 900, fontSize: "32px", margin: "0 0 6px 0" }}>{s.value}</p>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px" }}>
        {["All", "Unread", "Read"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: "10px", border: filter === f ? "1px solid #94d2bd" : "1px solid rgba(255,255,255,0.08)", background: filter === f ? "#94d2bd" : "rgba(255,255,255,0.03)", color: filter === f ? "#fff" : "rgba(255,255,255,0.35)", fontWeight: 700, fontSize: "12px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", boxShadow: filter === f ? "0 4px 15px rgba(148,210,189,0.35)" : "none" }}>{f}</button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map(msg => (
          <div key={msg.id} style={{ background: msg.read ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)", border: msg.read ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(255,255,255,0.13)", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: msg.read ? "rgba(255,255,255,0.05)" : "rgba(148,210,189,0.15)", border: `1px solid ${msg.read ? "rgba(255,255,255,0.1)" : "rgba(148,210,189,0.35)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: msg.read ? "rgba(255,255,255,0.3)" : "#94d2bd", fontWeight: 900, fontSize: "16px", flexShrink: 0 }}>{msg.name.charAt(0)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <p style={{ color: msg.read ? "rgba(255,255,255,0.5)" : "#fff", fontWeight: 700, fontSize: "14px", margin: 0 }}>{msg.name}</p>
                {!msg.read && <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#94d2bd", flexShrink: 0 }} />}
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginLeft: "auto", flexShrink: 0 }}>{msg.date}</span>
              </div>
              <p style={{ color: msg.read ? "rgba(255,255,255,0.3)" : "#94d2bd", fontSize: "13px", fontWeight: 600, margin: "0 0 4px 0" }}>{msg.subject}</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg.message}</p>
            </div>
            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
              <button onClick={() => { setSelected(msg); if (!msg.read) markRead(msg.id); }} style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center" }}><Eye size={14} /></button>
              <button onClick={() => deleteMsg(msg.id)} style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: "64px", color: "rgba(255,255,255,0.15)", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase" }}>No messages found</div>}
      </div>

      {selected && <MessageModal msg={selected} onClose={() => setSelected(null)} onMarkRead={markRead} />}
    </div>
  );
}

