import { useState, useEffect } from "react";
import { Car, CalendarCheck, Users, TrendingUp, Wrench, AlertCircle } from "lucide-react";
import { api } from "../../api";

const statusStyle = {
  Active:    { bg: "rgba(74,222,128,0.12)",  border: "rgba(74,222,128,0.4)",  color: "#4ade80" },
  Upcoming:  { bg: "rgba(148,210,189,0.12)",  border: "rgba(148,210,189,0.4)",  color: "#94d2bd" },
  Completed: { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" },
  Cancelled: { bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.4)", color: "#f87171" },
};

const card = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" };

export default function AdminDashboard() {
  const [bookings,   setBookings]   = useState([]);
  const [users,      setUsers]      = useState([]);
  const [assistance, setAssistance] = useState([]);

  const load = async () => {
    const [b, u, a] = await Promise.all([api.getBookings(), api.getUsers(), api.getAssistance()]);
    setBookings(b);
    setUsers(u);
    setAssistance(a);
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 5000); // real-time poll every 5s
    return () => clearInterval(t);
  }, []);

  const revenue      = bookings.reduce((s, b) => s + (b.total || 0), 0);
  const recentBookings = [...bookings].reverse().slice(0, 5);

  const carCount = {};
  bookings.forEach(b => { carCount[b.car] = (carCount[b.car] || 0) + 1; });
  const topCars  = Object.entries(carCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxCount = topCars[0]?.[1] || 1;

  const stats = [
    { label: "Total Bookings", value: bookings.length,                                              icon: CalendarCheck, color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.25)" },
    { label: "Total Users",    value: users.length,                                                 icon: Users,         color: "#38bdf8", bg: "rgba(56,189,248,0.1)",  border: "rgba(56,189,248,0.25)" },
    { label: "Revenue",        value: `₹${(revenue / 1000).toFixed(1)}K`,                          icon: TrendingUp,    color: "#facc15", bg: "rgba(250,204,21,0.1)",  border: "rgba(250,204,21,0.25)" },
    { label: "Assistance",     value: assistance.length,                                            icon: Wrench,        color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" },
    { label: "Active Now",     value: bookings.filter(b => b.status === "Active").length,           icon: Car,           color: "#94d2bd", bg: "rgba(148,210,189,0.1)",  border: "rgba(148,210,189,0.25)" },
    { label: "Pending Help",   value: assistance.filter(a => a.status === "Pending").length,        icon: AlertCircle,   color: "#c084fc", bg: "rgba(192,132,252,0.1)", border: "rgba(192,132,252,0.25)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#94d2bd", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, marginBottom: "6px" }}>— Overview</p>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "28px", margin: 0 }}>Dashboard</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: "10px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ color: "#4ade80", fontSize: "12px", fontWeight: 700 }}>Live — auto refresh 5s</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" }}>
        {stats.map(({ label, value, icon: Icon, color, bg, border }) => (
          <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: bg, border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
              <Icon size={18} style={{ color }} />
            </div>
            <p style={{ color, fontWeight: 900, fontSize: "24px", margin: "0 0 4px 0" }}>{value}</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ color: "#fff", fontWeight: 900, fontSize: "16px", margin: 0 }}>Recent Bookings</h3>
          <span style={{ color: "#94d2bd", fontSize: "12px", fontWeight: 700 }}>Latest {recentBookings.length}</span>
        </div>
        {recentBookings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.15)", fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase" }}>No bookings yet</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["Booking ID", "Car", "Dates", "Total", "Status"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 24px", color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => {
                  const s = statusStyle[b.status] || statusStyle.Upcoming;
                  return (
                    <tr key={b.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "16px 24px", color: "#94d2bd", fontWeight: 700 }}>{b.id}</td>
                      <td style={{ padding: "16px 24px", color: "#fff", fontWeight: 600 }}>{b.car}</td>
                      <td style={{ padding: "16px 24px", color: "rgba(255,255,255,0.35)" }}>{b.from} → {b.to}</td>
                      <td style={{ padding: "16px 24px", color: "#fff", fontWeight: 700 }}>₹{(b.total || 0).toLocaleString()}</td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>{b.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ ...card }}>
          <h3 style={{ color: "#fff", fontWeight: 900, fontSize: "16px", marginBottom: "20px" }}>Top Booked Cars</h3>
          {topCars.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>No data yet</p>
          ) : topCars.map(([name, count]) => (
            <div key={name} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600 }}>{name}</span>
                <span style={{ color: "#94d2bd", fontSize: "12px", fontWeight: 700 }}>{count} bookings</span>
              </div>
              <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.round((count / maxCount) * 100)}%`, background: "linear-gradient(90deg, #94d2bd, #7bbda8)", borderRadius: "999px" }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...card }}>
          <h3 style={{ color: "#fff", fontWeight: 900, fontSize: "16px", marginBottom: "20px" }}>Live Stats</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { label: "Total Users",    value: users.length,                                          color: "#38bdf8" },
              { label: "Total Bookings", value: bookings.length,                                       color: "#4ade80" },
              { label: "Total Revenue",  value: `₹${(revenue / 1000).toFixed(1)}K`,                   color: "#facc15" },
              { label: "Cancelled",      value: bookings.filter(b => b.status === "Cancelled").length, color: "#f87171" },
              { label: "Upcoming",       value: bookings.filter(b => b.status === "Upcoming").length,  color: "#94d2bd" },
              { label: "Assistance Req", value: assistance.length,                                     color: "#c084fc" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "16px" }}>
                <p style={{ color: s.color, fontWeight: 900, fontSize: "22px", margin: "0 0 4px 0" }}>{s.value}</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

