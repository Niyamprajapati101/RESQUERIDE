import { useNavigate } from "react-router-dom";
import AdminLoginButton from "../components/AdminLoginButton";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
      padding: "20px"
    }}>
      {/* Header with Admin Login Button */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px 0",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div>
          <h1 style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "28px",
            margin: "0"
          }}>RESQUERIDE</h1>
          <p style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "13px",
            margin: "4px 0 0 0"
          }}>Car Rental Service</p>
        </div>

        {/* Admin Login Button - Place it here */}
        <AdminLoginButton />
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: "1200px",
        margin: "60px auto",
        textAlign: "center"
      }}>
        <h2 style={{
          color: "#fff",
          fontWeight: 900,
          fontSize: "48px",
          margin: "0 0 16px 0"
        }}>Welcome to RESQUERIDE</h2>
        <p style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "18px",
          maxWidth: "600px",
          margin: "0 auto 40px"
        }}>
          Rent your favorite car today. Click the Admin button in the top right to access the admin dashboard.
        </p>

        {/* Quick Actions */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "60px",
          maxWidth: "800px",
          margin: "0 auto 60px"
        }}>
          <button
            onClick={() => navigate("/book")}
            style={{
              padding: "14px 24px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(90deg, #94d2bd, #7bbda8)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            🚗 Book a Car
          </button>
          <button
            onClick={() => navigate("/assistance")}
            style={{
              padding: "14px 24px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            🆘 Need Help?
          </button>
          <button
            onClick={() => navigate("/contact")}
            style={{
              padding: "14px 24px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            📧 Contact Us
          </button>
        </div>

        {/* Features */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
          marginTop: "60px"
        }}>
          {[
            { icon: "🚗", title: "Wide Selection", desc: "Choose from our fleet of premium cars" },
            { icon: "💰", title: "Affordable Prices", desc: "Competitive rates for all budgets" },
            { icon: "🛡️", title: "Safe & Secure", desc: "Your safety is our priority" },
            { icon: "⚡", title: "Quick Booking", desc: "Book your car in minutes" }
          ].map((feature, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "32px 24px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>{feature.icon}</div>
              <h3 style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "18px",
                margin: "0 0 8px 0"
              }}>{feature.title}</h3>
              <p style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "14px",
                margin: "0"
              }}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Admin Info Box */}
        <div style={{
          background: "rgba(148,210,189,0.1)",
          border: "1px solid rgba(148,210,189,0.3)",
          borderRadius: "16px",
          padding: "32px",
          marginTop: "60px",
          maxWidth: "600px",
          margin: "60px auto 0"
        }}>
          <h3 style={{
            color: "#94d2bd",
            fontWeight: 700,
            fontSize: "18px",
            margin: "0 0 12px 0"
          }}>👨‍💼 Admin Access</h3>
          <p style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "14px",
            margin: "0 0 16px 0"
          }}>
            Admins can click the "Admin" button in the top right corner to login and manage the platform.
          </p>
          <p style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "12px",
            margin: "0"
          }}>
            Demo: admin@resqueride.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}

