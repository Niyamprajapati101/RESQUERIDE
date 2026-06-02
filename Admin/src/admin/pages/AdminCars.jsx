import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, X, RefreshCw } from "lucide-react";
import { api } from "../../api";

const empty = { name: "", price: "", fuel: "Petrol", seats: "", status: "Available", image: "", transmission: "Manual" };

const statusStyle = {
  Available:   { bg: "rgba(74,222,128,0.12)",  border: "rgba(74,222,128,0.4)",  color: "#4ade80" },
  Rented:      { bg: "rgba(148,210,189,0.12)",  border: "rgba(148,210,189,0.4)",  color: "#94d2bd" },
  Maintenance: { bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.4)", color: "#f87171" },
};

function Modal({ title, form, setForm, onSave, onClose, saving }) {
  const fileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", padding: "12px 16px", color: "#fff", fontSize: "14px", outline: "none",
  };
  const labelStyle = {
    color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "0.15em",
    textTransform: "uppercase", display: "block", marginBottom: "6px",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }} onClick={onClose} />
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "480px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "32px", maxHeight: "90vh", overflowY: "auto" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "20px", margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}><X size={20} /></button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Image upload */}
          <div>
            <label style={labelStyle}>Car Image</label>
            <div
              onClick={() => fileRef.current.click()}
              style={{ width: "100%", height: "140px", borderRadius: "12px", border: "2px dashed rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.03)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
              {form.image ? (
                <img src={form.image} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>📷 Click to upload image</p>
                  <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "11px", marginTop: "4px" }}>JPG, PNG supported</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display: "none" }} />
          </div>

          {[
            { label: "Car Name",       key: "name",  type: "text",   placeholder: "e.g. Toyota Fortuner" },
            { label: "Price / Day (₹)", key: "price", type: "number", placeholder: "e.g. 3500" },
            { label: "Seats",          key: "seats", type: "number", placeholder: "e.g. 7" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input type={type} placeholder={placeholder} value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={inputStyle} />
            </div>
          ))}

          {[
            { label: "Fuel Type", key: "fuel",   options: ["Petrol", "Diesel", "CNG", "Electric"] },
            { label: "Transmission", key: "transmission", options: ["Manual", "Automatic"] },
            { label: "Status",    key: "status", options: ["Available", "Rented", "Maintenance"] },
          ].map(({ label, key, options }) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ ...inputStyle, cursor: "pointer" }}>
                {options.map(o => <option key={o} value={o} style={{ background: "#111" }}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "rgba(255,255,255,0.4)", fontWeight: 700, fontSize: "13px", cursor: "pointer", textTransform: "uppercase" }}>
            Cancel
          </button>
          <button onClick={onSave} disabled={saving} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "none", background: saving ? "#555" : "linear-gradient(90deg, #94d2bd, #7bbda8)", color: "#fff", fontWeight: 700, fontSize: "13px", cursor: saving ? "wait" : "pointer", textTransform: "uppercase", boxShadow: saving ? "none" : "0 4px 15px rgba(148,210,189,0.4)" }}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCars() {
  const [cars, setCars]     = useState([]);
  const [modal, setModal]   = useState(null);
  const [form, setForm]     = useState(empty);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [saving, setSaving] = useState(false);

  const load = () => api.getCars().then(setCars).catch(err => console.error("Failed to load cars:", err));

  useEffect(() => {
    load();
    const t = setInterval(load, 2000); // Reduced from 5000ms to 2000ms for faster updates
    return () => clearInterval(t);
  }, []);

  const openAdd  = () => { setForm(empty); setModal("add"); };
  const openEdit = (car) => { setForm({ ...car, price: String(car.price), seats: String(car.seats) }); setEditId(car.id); setModal("edit"); };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.seats) {
      alert("Please fill in all required fields");
      return;
    }
    setSaving(true);
    try {
      const payload = { name: form.name, price: +form.price, seats: +form.seats, fuel: form.fuel, status: form.status, image: form.image || "", transmission: form.transmission || "Manual" };
      if (modal === "add") {
        const response = await api.addCar(payload);
        
        if (!response || !response.id) {
          alert("Error: Invalid response from server");
          setSaving(false);
          return;
        }
        
        // Immediately add to state with proper ID mapping
        const newCar = {
          id: response.id || response._id,
          name: response.name,
          price: response.price,
          fuel: response.fuel,
          seats: response.seats,
          status: response.status,
          image: response.image,
          description: response.description,
          transmission: response.transmission,
          mileage: response.mileage,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt
        };
        setCars(prev => [...prev, newCar]);
        setModal(null);
        alert("✅ Car added successfully!");
      } else {
        const response = await api.updateCar(editId, payload);
        
        if (!response || !response.id) {
          alert("Error: Invalid response from server");
          setSaving(false);
          return;
        }
        
        // Immediately update state with proper ID mapping
        const updatedCar = {
          id: response.id || response._id,
          name: response.name,
          price: response.price,
          fuel: response.fuel,
          seats: response.seats,
          status: response.status,
          image: response.image,
          description: response.description,
          transmission: response.transmission,
          mileage: response.mileage,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt
        };
        setCars(prev => prev.map(c => c.id === editId ? updatedCar : c));
        setModal(null);
        alert("✅ Car updated successfully!");
      }
    } catch (e) {
      console.error("Save error:", e);
      alert("Save failed: " + e.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this car?")) return;
    try {
      await api.deleteCar(id);
      setCars(prev => prev.filter(c => c.id !== id));
      alert("✅ Car deleted successfully!");
    } catch (e) {
      alert("Delete failed: " + e.message);
    }
  };

  const filtered = filter === "All" ? cars : cars.filter(c => c.status === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#94d2bd", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, marginBottom: "6px" }}>— Fleet</p>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "28px", margin: 0 }}>Car Management</h1>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={load} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", borderRadius: "12px", border: "none", background: "linear-gradient(90deg, #94d2bd, #7bbda8)", color: "#fff", fontWeight: 700, fontSize: "13px", cursor: "pointer", textTransform: "uppercase", boxShadow: "0 4px 15px rgba(148,210,189,0.4)" }}>
            <Plus size={16} /> Add Car
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
        {[
          { label: "Total Cars",   value: cars.length,                                        color: "#fff" },
          { label: "Available",    value: cars.filter(c => c.status === "Available").length,  color: "#4ade80" },
          { label: "Rented",       value: cars.filter(c => c.status === "Rented").length,     color: "#94d2bd" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
            <p style={{ color: s.color, fontWeight: 900, fontSize: "28px", margin: "0 0 4px 0" }}>{s.value}</p>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["All", "Available", "Rented", "Maintenance"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: "10px", border: filter === f ? "1px solid #94d2bd" : "1px solid rgba(255,255,255,0.08)", background: filter === f ? "#94d2bd" : "rgba(255,255,255,0.03)", color: filter === f ? "#fff" : "rgba(255,255,255,0.35)", fontWeight: 700, fontSize: "12px", cursor: "pointer", textTransform: "uppercase", boxShadow: filter === f ? "0 4px 15px rgba(148,210,189,0.35)" : "none" }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {["#", "Image", "Car Name", "Price/Day", "Fuel", "Seats", "Status", "Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "14px 20px", color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={8} style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.15em" }}>No cars found</td></tr>
              )}
              {filtered.map((car, i) => {
                const ss = statusStyle[car.status] || statusStyle.Available;
                return (
                  <tr key={car.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "14px 20px", color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>{i + 1}</td>
                    <td style={{ padding: "14px 20px" }}>
                      {car.image ? (
                        <img src={car.image} alt={car.name} style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }} />
                      ) : (
                        <div style={{ width: "60px", height: "40px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🚗</div>
                      )}
                    </td>
                    <td style={{ padding: "14px 20px", color: "#fff", fontWeight: 700 }}>{car.name}</td>
                    <td style={{ padding: "14px 20px", color: "#94d2bd", fontWeight: 700 }}>₹{(car.price||0).toLocaleString()}</td>
                    <td style={{ padding: "14px 20px", color: "rgba(255,255,255,0.55)" }}>{car.fuel}</td>
                    <td style={{ padding: "14px 20px", color: "rgba(255,255,255,0.55)" }}>{car.seats}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, background: ss.bg, border: `1px solid ${ss.border}`, color: ss.color }}>{car.status}</span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => openEdit(car)} style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center" }}><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(car.id)} style={{ padding: "8px", borderRadius: "8px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: "#f87171", cursor: "pointer", display: "flex", alignItems: "center" }}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modal && <Modal title={modal === "add" ? "Add New Car" : "Edit Car"} form={form} setForm={setForm} onSave={handleSave} onClose={() => setModal(null)} saving={saving} />}
    </div>
  );
}

