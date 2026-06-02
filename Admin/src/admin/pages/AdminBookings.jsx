import { useState, useEffect } from "react";
import { X, Eye, RefreshCw } from "lucide-react";
import { api } from "../../api";

const statusStyle = {
  Active:    { bg: "rgba(74,222,128,0.12)",  border: "rgba(74,222,128,0.4)",  color: "#4ade80" },
  Upcoming:  { bg: "rgba(148,210,189,0.12)",  border: "rgba(148,210,189,0.4)",  color: "#94d2bd" },
  Completed: { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" },
  Cancelled: { bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.4)", color: "#f87171" },
};

function StatusBadge({ status }) {
  const s = statusStyle[status] || statusStyle.Upcoming;
  return <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>{status}</span>;
}

function DetailModal({ booking, onClose, onStatusChange }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }} onClick={onClose} />
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "500px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>{booking.id}</p>
            <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "22px", margin: 0 }}>{booking.car}</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}><X size={20} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {[
            { label: "From",     value: booking.from },
            { label: "To",       value: booking.to },
            { label: "Duration", value: `${booking.days} Days` },
            { label: "Total",    value: `₹${(booking.total || 0).toLocaleString()}` },
            { label: "Pickup",   value: booking.pickup || "—" },
            { label: "Driver",   value: booking.driver || "—" },
            { label: "Fuel",     value: booking.fuel || "—" },
            { label: "Seats",    value: booking.seats || "—" },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "14px 16px" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>{label}</p>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: "24px" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>Change Status</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["Active", "Upcoming", "Completed", "Cancelled"].map(s => {
              const st = statusStyle[s];
              const active = booking.status === s;
              return <button key={s} onClick={() => onStatusChange(booking.id, s)} style={{ padding: "8px 16px", borderRadius: "10px", border: active ? `1px solid ${st.border}` : "1px solid rgba(255,255,255,0.08)", background: active ? st.bg : "rgba(255,255,255,0.03)", color: active ? st.color : "rgba(255,255,255,0.3)", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>{s}</button>;
            })}
          </div>
        </div>
        <button onClick={onClose} style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "linear-gradient(90deg, #94d2bd, #7bbda8)", color: "#fff", fontWeight: 700, fontSize: "13px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase" }}>Close</button>
      </div>
    </div>
  );
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const load = () => api.getBookings().then(setBookings).catch(() => {});

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.updateBooking(id, { status });
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    setSelected(prev => prev ? { ...prev, status } : null);
  };

  const filtered = filter === "All" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ color: "#94d2bd", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, marginBottom: "6px" }}>— Reservations</p>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "28px", margin: 0 }}>Bookings Management</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={load} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
            {[
              { label: "Active",    count: bookings.filter(b => b.status === "Active").length,    color: "#4ade80" },
              { label: "Upcoming",  count: bookings.filter(b => b.status === "Upcoming").length,  color: "#94d2bd" },
              { label: "Completed", count: bookings.filter(b => b.status === "Completed").length, color: "rgba(255,255,255,0.4)" },
              { label: "Cancelled", count: bookings.filter(b => b.status === "Cancelled").length, color: "#f87171" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "10px 14px", textAlign: "center" }}>
                <p style={{ color: s.color, fontWeight: 900, fontSize: "20px", margin: "0 0 2px 0" }}>{s.count}</p>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["All", "Active", "Upcoming", "Completed", "Cancelled"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: "10px", border: filter === f ? "1px solid #94d2bd" : "1px solid rgba(255,255,255,0.08)", background: filter === f ? "#94d2bd" : "rgba(255,255,255,0.03)", color: filter === f ? "#fff" : "rgba(255,255,255,0.35)", fontWeight: 700, fontSize: "12px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", boxShadow: filter === f ? "0 4px 15px rgba(148,210,189,0.35)" : "none" }}>{f}</button>
        ))}
      </div>

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px", color: "rgba(255,255,255,0.15)", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            No bookings yet — users need to book from the frontend
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["Booking ID", "Car", "Dates", "Days", "Total", "Status", ""].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "14px 24px", color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "16px 24px", color: "#94d2bd", fontWeight: 700 }}>{b.id}</td>
                    <td style={{ padding: "16px 24px", color: "#fff", fontWeight: 600 }}>{b.car}</td>
                    <td style={{ padding: "16px 24px", color: "rgba(255,255,255,0.35)" }}>{b.from} → {b.to}</td>
                    <td style={{ padding: "16px 24px", color: "rgba(255,255,255,0.5)" }}>{b.days} days</td>
                    <td style={{ padding: "16px 24px", color: "#fff", fontWeight: 700 }}>₹{(b.total || 0).toLocaleString()}</td>
                    <td style={{ padding: "16px 24px" }}><StatusBadge status={b.status} /></td>
                    <td style={{ padding: "16px 24px" }}>
                      <button onClick={() => setSelected(b)} style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center" }}><Eye size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && <DetailModal booking={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />}
    </div>
  );
}

