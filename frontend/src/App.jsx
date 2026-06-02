import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AboutUS from "./pages/AboutUS";
import Signup from "./pages/Signup";
import MyBookings from "./pages/MyBookings";
import RoadsideAssistance from "./pages/RoadsideAssistance";
import Footer from "./components/Footer";

const hideLayoutRoutes = ["/login", "/signup"];

function Layout() {
  const location = useLocation();
  const showLayout = !hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {showLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUS />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/assistance" element={<RoadsideAssistance />} />
      </Routes>
      {showLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <BookingProvider>
          <Layout />
        </BookingProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;


