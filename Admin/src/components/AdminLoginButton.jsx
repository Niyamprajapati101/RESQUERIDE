import { useState } from "react";
import { LogIn } from "lucide-react";
import AdminLoginModal from "./AdminLoginModal";

export default function AdminLoginButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Admin Login Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          borderRadius: "10px",
          border: "1px solid rgba(148,210,189,0.3)",
          background: "rgba(148,210,189,0.1)",
          color: "#94d2bd",
          fontWeight: 700,
          fontSize: "12px",
          cursor: "pointer",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          transition: "all 0.3s",
          boxShadow: "0 2px 8px rgba(148,210,189,0.15)"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(148,210,189,0.2)";
          e.target.style.boxShadow = "0 4px 12px rgba(148,210,189,0.25)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(148,210,189,0.1)";
          e.target.style.boxShadow = "0 2px 8px rgba(148,210,189,0.15)";
        }}
      >
        <LogIn size={14} />
        Admin
      </button>

      {/* Modal */}
      <AdminLoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={() => {
          // Redirect to admin dashboard
          window.location.href = '/admin';
        }}
      />
    </>
  );
}

