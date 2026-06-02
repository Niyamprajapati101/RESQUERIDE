import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logocar.png";

function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const stored = sessionStorage.getItem("rq_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("rq_user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="absolute top-3 w-full flex justify-center z-50">
      <div className={`${theme === 'light' ? 'bg-white border-gray-300' : 'bg-white/40 border-gray-200'} border backdrop-blur-1xl px-30 mt-12 py-1 rounded-full shadow-lg flex items-center gap-10`}>

        {/* Logo */}
        <div className="flex flex-col items-center leading-none">
          <img src={logo} className="h-12 w-auto object-contain" />
          <h1 className={`font-bold text-xl ${theme === 'light' ? 'text-black' : 'text-white'}`}>RESQUERIDE</h1>
        </div>

        {/* Nav */}
        <nav className={`flex gap-8 ${theme === 'light' ? 'text-black' : 'text-white'} text-shadow-2xs`}>
          <Link className={`${theme === 'light' ? 'text-blue-600' : 'text-[#94d2bd]'} font-semibold`} to="/">Home</Link>
          <Link className={`${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-[#94d2bd]'} transition`} to="/cars">Cars</Link>
          <Link className={`${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-[#94d2bd]'} transition`} to="/assistance">Assistance</Link>
          <Link className={`${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-[#94d2bd]'} transition`} to="/contact">Contact</Link>
          <Link className={`${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-[#94d2bd]'} transition`} to="/bookings">My Bookings</Link>
          <Link className={`${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-[#94d2bd]'} transition`} to="/about">About Us</Link>
        </nav>

        {/* Theme Toggle - Glass Button */}
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="relative inline-flex items-center px-1 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/30 hover:border-white/40 transition-all duration-300 shadow-lg w-16 h-10"
          >
            {/* Toggle Circle - Swipes Left to Right */}
            <div className={`absolute w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm border border-white/60 transition-all duration-500 ease-out ${
              theme === 'light' ? 'left-1' : 'right-1'
            }`}></div>
          </button>
        </div>

        {/* Auth section */}
        <div className="flex gap-3 items-center">
          {user ? (
            // Logged in — show avatar + dropdown
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white/20 border border-white/30 hover:bg-white/30 transition px-3 py-1.5 rounded-full"
              >
                <div className="w-7 h-7 rounded-full bg-[#94d2bd] flex items-center justify-center text-white text-xs font-black">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-white text-sm font-semibold max-w-[100px] truncate">{user.name}</span>
                <svg className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-64 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                  {/* Profile info */}
                  <div className="px-5 py-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#94d2bd]/20 border border-[#94d2bd]/40 flex items-center justify-center text-[#94d2bd] font-black text-lg">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{user.name}</p>
                        <p className="text-white/40 text-xs">{user.email}</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="bg-white/5 rounded-lg px-3 py-2">
                        <p className="text-white/30 text-xs">Phone</p>
                        <p className="text-white text-xs font-semibold">{user.phone || "—"}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg px-3 py-2">
                        <p className="text-white/30 text-xs">Joined</p>
                        <p className="text-white text-xs font-semibold">{user.joined || "—"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-3 py-3 flex flex-col gap-1">
                    <Link to="/bookings" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 text-sm transition">
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 text-sm transition w-full text-left"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Not logged in — show Login + Signup
            <>
              <Link to="/login">
                <button className="bg-white/40 border border-gray-200 backdrop-blur-1xl hover:bg-[#94d2bd] hover:text-white px-4 py-2 rounded-lg transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-white/40 border border-gray-200 backdrop-blur-1xl hover:bg-[#94d2bd] hover:text-white px-4 py-2 rounded-lg transition">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Header;


