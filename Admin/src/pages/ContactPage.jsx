import { useState } from "react";
import { Mail, User, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setMessageStatus({ type: "error", text: "Please fill all required fields" });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setMessageStatus({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setLoading(true);
    try {
      const messageData = {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        status: "Unread"
      };

      console.log('📤 Sending message:', messageData);
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
      });

      const data = await response.json();
      console.log('📥 Response:', data);

      if (data.success) {
        setMessageStatus({ type: "success", text: "✅ Message sent successfully! We'll get back to you soon." });
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setMessageStatus(null), 3000);
      } else {
        setMessageStatus({ type: "error", text: `❌ ${data.message || "Failed to send message"}` });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessageStatus({ type: "error", text: `❌ Error: ${error.message}` });
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", padding: "40px 20px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 900, margin: 0, marginBottom: "8px" }}>
            📧 Contact Us
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>
            Have a question? We'd love to hear from you
          </p>
        </div>

        {/* Message */}
        {messageStatus && (
          <div style={{
            padding: "16px 20px",
            borderRadius: "12px",
            marginBottom: "24px",
            background: messageStatus.type === "success" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
            border: `1px solid ${messageStatus.type === "success" ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`,
            color: messageStatus.type === "success" ? "#4ade80" : "#f87171",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            {messageStatus.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {messageStatus.text}
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

          {/* Name */}
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
              <User size={14} style={{ display: "inline", marginRight: "4px" }} />
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
              <Mail size={14} style={{ display: "inline", marginRight: "4px" }} />
              Email Address *
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Subject */}
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
              <MessageSquare size={14} style={{ display: "inline", marginRight: "4px" }} />
              Subject *
            </label>
            <input
              type="text"
              placeholder="What is this about?"
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Message */}
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
              Message *
            </label>
            <textarea
              placeholder="Tell us more about your inquiry..."
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px",
                minHeight: "150px",
                fontFamily: "inherit",
                resize: "vertical",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Info Box */}
          <div style={{
            background: "rgba(148,210,189,0.1)",
            border: "1px solid rgba(148,210,189,0.3)",
            borderRadius: "12px",
            padding: "16px"
          }}>
            <p style={{ color: "#94d2bd", fontWeight: 700, margin: "0 0 4px 0" }}>Response Time</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>
              We typically respond to all inquiries within 24 hours
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !form.name || !form.email || !form.subject || !form.message}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: loading || !form.name || !form.email || !form.subject || !form.message ? "#555" : "linear-gradient(90deg, #94d2bd, #7bbda8)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: loading || !form.name || !form.email || !form.subject || !form.message ? "not-allowed" : "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Contact Info */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>
            Or reach us directly at: <span style={{ color: "#94d2bd", fontWeight: 700 }}>support@resqueride.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}

