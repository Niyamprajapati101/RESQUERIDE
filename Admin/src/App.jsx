import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminCars from "./admin/pages/AdminCars";
import AdminBookings from "./admin/pages/AdminBookings";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminMessages from "./admin/pages/AdminMessages";
import AdminAssistance from "./admin/pages/AdminAssistance";
import AdminLogin from "./admin/pages/AdminLogin";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import AssistancePage from "./pages/AssistancePage";
import ContactPage from "./pages/ContactPage";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  console.log('🔐 ProtectedRoute check - Token exists:', token ? 'YES ✅' : 'NO ❌');
  
  if (!token) {
    console.log('❌ No token, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('✅ Token found, allowing access');
  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("adminToken"));

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("adminToken");
      console.log('📝 Storage changed - Token:', token ? 'EXISTS' : 'MISSING');
      setIsLoggedIn(!!token);
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/assistance" element={<AssistancePage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="cars" element={<AdminCars />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="assistance" element={<AdminAssistance />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

