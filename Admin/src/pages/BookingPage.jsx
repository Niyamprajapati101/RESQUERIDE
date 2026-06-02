import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, DollarSign, CheckCircle, AlertCircle } from "lucide-react";
import { api } from "../api";

export default function BookingPage() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    carId: "",
    startDate: "",
    endDate: "",
    pickup: "",
    driver: "Self"
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    // Load cars
    api.getCars().then(setCars).catch(err => console.error("Failed to load cars:", err));
  }, []);

  const calculateDays = () => {
    if (!form.startDate || !form.endDate) return 0;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const days = calculateDays();
    if (!selectedCar || days <= 0) return 0;
    return selectedCar.price * days;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.carId || !form.startDate || !form.endDate || !form.pickup) {
      setMessage({ type: "error", text: "Please fill all required fields" });
      return;
    }

    const days = calculateDays();
    if (days <= 0) {
      setMessage({ type: "error", text: "End date must be after start date" });
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        carId: form.carId,
        startDate: form.startDate,
        endDate: form.endDate,
        totalPrice: calculateTotal(),
        pickup: form.pickup,
        driver: form.driver,
        status: "Pending"
      };

      console.log('📤 Creating booking:', bookingData);
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();
      console.log('📥 Response:', data);

      if (data.success) {
        setMessage({ type: "success", text: "✅ Booking created successfully!" });
        setForm({ carId: "", startDate: "", endDate: "", pickup: "", driver: "Self" });
        setSelectedCar(null);
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: `❌ ${data.message || "Failed to create booking"}` });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: `❌ Error: ${error.message}` });
    }
    setLoading(false);
  };

  const days = calculateDays();
  const total = calculateTotal();

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", padding: "40px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 900, margin: 0, marginBottom: "8px" }}>
            🚗 Book a Car
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>
            Reserve your perfect ride today
          </p>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            padding: "16px 20px",
            borderRadius: "12px",
            marginBottom: "24px",
            background: message.type === "success" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
            border: `1px solid ${message.type === "success" ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`,
            color: message.type === "success" ? "#4ade80" : "#f87171",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "32px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px"
        }}>

          {/* Car Selection */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "12px" }}>
              Select Car *
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
              {cars.map(car => (
                <div
                  key={car.id}
                  onClick={() => {
                    setForm(f => ({ ...f, carId: car.id }));
                    setSelectedCar(car);
                  }}
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: form.carId === car.id ? "2px solid #94d2bd" : "1px solid rgba(255,255,255,0.1)",
                    background: form.carId === car.id ? "rgba(148,210,189,0.1)" : "rgba(255,255,255,0.03)",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <p style={{ color: "#fff", fontWeight: 700, margin: "0 0 4px 0" }}>{car.name}</p>
                  <p style={{ color: "#94d2bd", fontWeight: 700, margin: "0 0 4px 0" }}>₹{car.price}/day</p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>
                    {car.seats} seats • {car.fuel}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
              <Calendar size={14} style={{ display: "inline", marginRight: "4px" }} />
              Start Date *
            </label>
            <input
              type="date"
              value={form.startDate}
              onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px"
              }}
            />
          </div>

          {/* End Date */}
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
              <Calendar size={14} style={{ display: "inline", marginRight: "4px" }} />
              End Date *
            </label>
            <input
              type="date"
              value={form.endDate}
              onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px"
              }}
            />
          </div>

          {/* Pickup Location */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
              <MapPin size={14} style={{ display: "inline", marginRight: "4px" }} />
              Pickup Location *
            </label>
            <input
              type="text"
              placeholder="e.g., Airport Terminal 1"
              value={form.pickup}
              onChange={e => setForm(f => ({ ...f, pickup: e.target.value }))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px"
              }}
            />
          </div>

          {/* Driver Type */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
              <Users size={14} style={{ display: "inline", marginRight: "4px" }} />
              Driver Type
            </label>
            <select
              value={form.driver}
              onChange={e => setForm(f => ({ ...f, driver: e.target.value }))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              <option value="Self" style={{ background: "#111" }}>Self Drive</option>
              <option value="Driver" style={{ background: "#111" }}>With Driver</option>
            </select>
          </div>

          {/* Summary */}
          {selectedCar && days > 0 && (
            <div style={{ gridColumn: "1 / -1", background: "rgba(148,210,189,0.1)", border: "1px solid rgba(148,210,189,0.3)", borderRadius: "12px", padding: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 4px 0" }}>Duration</p>
                  <p style={{ color: "#94d2bd", fontWeight: 700, fontSize: "18px", margin: 0 }}>{days} days</p>
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 4px 0" }}>Price/Day</p>
                  <p style={{ color: "#94d2bd", fontWeight: 700, fontSize: "18px", margin: 0 }}>₹{selectedCar.price}</p>
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 4px 0" }}>Total</p>
                  <p style={{ color: "#4ade80", fontWeight: 900, fontSize: "20px", margin: 0 }}>₹{total}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !form.carId || !form.startDate || !form.endDate || !form.pickup}
            style={{
              gridColumn: "1 / -1",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: loading || !form.carId || !form.startDate || !form.endDate || !form.pickup ? "#555" : "linear-gradient(90deg, #94d2bd, #7bbda8)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: loading || !form.carId || !form.startDate || !form.endDate || !form.pickup ? "not-allowed" : "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            {loading ? "Creating Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

