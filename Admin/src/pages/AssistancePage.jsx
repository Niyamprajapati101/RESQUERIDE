import { useState } from "react";
import { AlertCircle, CheckCircle, Phone, MapPin } from "lucide-react";

export default function AssistancePage() {
  const [form, setForm] = useState({
    type: "Puncture Repair",
    description: "",
    location: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const assistanceTypes = [
    "Towing",
    "Puncture Repair",
    "Fuel Delivery",
    "Battery Jump-start",
    "On-site Mechanic",
    "Flat Tyre",
    "Engine Breakdown",
    "Battery Dead",
    "Accident",
    "Fuel Empty",
    "Key Locked Inside"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.type || !form.description || !form.location) {
      setMessage({ type: "error", text: "Please fill all required fields" });
      return;
    }

    setLoading(true);
    try {
      const assistanceData = {
        type: form.type,
        description: form.description,
        location: form.location,
        status: "Pending"
      };

      console.log('📤 Creating assistance:', assistanceData);
      const response = await fetch("http://localhost:5000/api/assistance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(assistanceData)
      });

      console.log('📥 Response status:', response.status);
      const data = await response.json();
      console.log('📥 Response data:', data);

      if (data.success) {
        setMessage({ type: "success", text: "✅ Assistance request created! Help is on the way!" });
        setForm({ type: "Puncture Repair", description: "", location: "" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        console.error('❌ Error response:', data);
        setMessage({ type: "error", text: `❌ ${data.message || "Failed to create request"}` });
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setMessage({ type: "error", text: `❌ Error: ${error.message}` });
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", padding: "40px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 900, margin: 0, marginBottom: "8px" }}>
            🆘 Need Help?
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>
            Request roadside assistance immediately
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
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}>

          {/* Issue Type */}
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
              <AlertCircle size={14} style={{ display: "inline", marginRight: "4px" }} />
              Issue Type *
            </label>
            <select
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
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
              {assistanceTypes.map(type => (
                <option key={type} value={type} style={{ background: "#111" }}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
              <MapPin size={14} style={{ display: "inline", marginRight: "4px" }} />
              Current Location *
            </label>
            <input
              type="text"
              placeholder="e.g., NH-1, Near Gurgaon"
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
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

          {/* Description */}
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
              Description *
            </label>
            <textarea
              placeholder="Describe your issue in detail..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px",
                minHeight: "120px",
                fontFamily: "inherit",
                resize: "vertical"
              }}
            />
          </div>

          {/* Info Box */}
          <div style={{
            background: "rgba(56,189,248,0.1)",
            border: "1px solid rgba(56,189,248,0.3)",
            borderRadius: "12px",
            padding: "16px",
            display: "flex",
            gap: "12px"
          }}>
            <Phone size={20} style={{ color: "#38bdf8", flexShrink: 0 }} />
            <div>
              <p style={{ color: "#38bdf8", fontWeight: 700, margin: "0 0 4px 0" }}>Quick Response</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>
                Our team will contact you within 5 minutes of your request
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !form.type || !form.description || !form.location}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: loading || !form.type || !form.description || !form.location ? "#555" : "linear-gradient(90deg, #94d2bd, #7bbda8)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: loading || !form.type || !form.description || !form.location ? "not-allowed" : "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            {loading ? "Sending Request..." : "Request Assistance"}
          </button>
        </form>
      </div>
    </div>
  );
}

