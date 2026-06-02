import { useState } from "react";
import { X, LogIn } from "lucide-react";
import { api } from "../api";

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('🔐 Modal login starting...');
      const response = await api.login(email, password);
      console.log('📥 Login response:', response);
      
      if (response.success && response.token) {
        console.log('✅ Login successful, storing token...');
        
        // Store token IMMEDIATELY
        localStorage.setItem("adminToken", response.token);
        localStorage.setItem("adminUser", JSON.stringify(response.user));
        
        // Verify token was stored
        const storedToken = localStorage.getItem("adminToken");
        console.log('✅ Token stored verification:', storedToken ? 'SUCCESS' : 'FAILED');
        
        if (storedToken) {
          console.log('✅ Closing modal and redirecting...');
          
          // Close modal
          onClose();
          
          // Redirect to admin dashboard
          setTimeout(() => {
            window.location.href = '/admin';
          }, 300);
        } else {
          setError("Failed to store token");
        }
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error('❌ Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px"
    }}>
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)"
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: "420px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px",
        padding: "40px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #94d2bd, #7bbda8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(148,210,189,0.3)"
            }}>
              <LogIn size={20} color="#fff" />
            </div>
            <div>
              <h2 style={{
                color: "#fff",
                fontWeight: 900,
                fontSize: "18px",
                margin: "0"
              }}>Admin Login</h2>
              <p style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "11px",
                margin: "2px 0 0 0",
                letterSpacing: "0.1em",
                textTransform: "uppercase"
              }}>Access Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.3)",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {/* Error Message */}
          {error && (
            <div style={{
              background: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.3)",
              borderRadius: "12px",
              padding: "12px 16px",
              color: "#f87171",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span>⚠️</span>
              {error}
            </div>
          )}

          {/* Email Input */}
          <div>
            <label style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
              fontWeight: 600
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@resqueride.com"
              required
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                transition: "all 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "rgba(148,210,189,0.5)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          {/* Password Input */}
          <div>
            <label style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
              fontWeight: 600
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                transition: "all 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "rgba(148,210,189,0.5)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 20px",
              borderRadius: "12px",
              border: "none",
              background: loading ? "#555" : "linear-gradient(90deg, #94d2bd, #7bbda8)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "13px",
              cursor: loading ? "wait" : "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              boxShadow: loading ? "none" : "0 4px 15px rgba(148,210,189,0.4)",
              transition: "all 0.3s",
              marginTop: "8px"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.3)",
          fontSize: "12px",
          marginTop: "16px",
          margin: "16px 0 0 0"
        }}>
          Demo: admin@resqueride.com / admin123
        </p>
      </div>
    </div>
  );
}

