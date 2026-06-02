import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { LogIn } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('🔐 Starting login...');
      const response = await api.login(email, password);
      console.log('📥 Login response:', response);
      
      if (response.success && response.token) {
        console.log('✅ Login successful, token received');
        
        // Store token IMMEDIATELY
        localStorage.setItem("adminToken", response.token);
        localStorage.setItem("adminUser", JSON.stringify(response.user));
        
        // Verify token was stored
        const storedToken = localStorage.getItem("adminToken");
        console.log('✅ Token stored verification:', storedToken ? 'SUCCESS' : 'FAILED');
        
        if (storedToken) {
          console.log('✅ Redirecting to admin dashboard...');
          // Wait a moment then navigate
          setTimeout(() => {
            navigate("/admin");
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

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px",
        padding: "40px",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #94d2bd, #7bbda8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 8px 24px rgba(148,210,189,0.3)"
          }}>
            <LogIn size={28} color="#fff" />
          </div>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "24px", margin: "0 0 8px 0" }}>Admin Login</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0 }}>Access the admin dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {error && (
            <div style={{
              background: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.3)",
              borderRadius: "12px",
              padding: "12px 16px",
              color: "#f87171",
              fontSize: "13px"
            }}>
              {error}
            </div>
          )}

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
              placeholder="admin@example.com"
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

        <p style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.3)",
          fontSize: "12px",
          marginTop: "20px"
        }}>
          Demo: Use any registered admin email and password
        </p>
      </div>
    </div>
  );
}

