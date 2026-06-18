import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logocar.png";
import { Home, Car, Wrench, Calendar, User, X } from "lucide-react";

function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const currentPath = location.pathname;

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
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <div className="absolute top-3 w-full flex justify-center z-50">
        {/* TOP BAR */}
        <div
          className={`${
            theme === 'light' ? 'lg:bg-white lg:border-gray-300' : 'lg:bg-white/40 lg:border-gray-200'
          } lg:border lg:backdrop-blur-md lg:px-16 mt-4 md:mt-12 lg:py-2 lg:rounded-full lg:shadow-lg flex items-center justify-center lg:justify-between gap-4 md:gap-8 w-auto relative`}
        >
          {/* Logo */}
          <div className="gap-2 md:gap-3 shrink-0">
            <img src={logo} className="h-10 md:h-12 w-auto object-contain" />
            <h1
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600 }}
              className={`ml-20 text-xl md:text-2xl tracking-wide ${theme === 'light' ? 'text-black' : 'text-white'}`}
            >
              RESQUERIDE
            </h1>
          </div>

          {/* Nav (Desktop Only) */}
          <nav
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 500 }}
            className={` hidden lg:flex gap-6 xl:gap-8 ${theme === 'light' ? 'text-black' : 'text-white'} text-shadow-2xs`}
          >
            <Link className={`${theme === 'light' ? 'text-blue-600' : 'text-[#94d2bd]'} font-semibold`} to="/">
              Home
            </Link>
            <Link
              className={`${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-[#94d2bd]'} transition`}
              to="/cars"
            >
              Cars
            </Link>
            <Link
              className={`${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-[#94d2bd]'} transition`}
              to="/assistance"
            >
              Assistance
            </Link>
            <Link
              className={`${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-[#94d2bd]'} transition`}
              to="/contact"
            >
              Contact
            </Link>
            <Link
              className={`${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-[#94d2bd]'} transition`}
              to="/bookings"
            >
              My Bookings
            </Link>
            <Link
              className={`${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-[#94d2bd]'} transition`}
              to="/about"
            >
              About Us
            </Link>
          </nav>

          {/* Desktop Theme Toggle & Auth */}
          <div className="lg:flex items-center gap-4 shrink-0 ">
            {/* Theme Toggle - Glass Button */}
            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center px-1 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/30 hover:border-white/40 transition-all duration-300 shadow-lg w-16 h-10"
            >
              {/* Toggle Circle - Swipes Left to Right */}
              <div
                className={`absolute w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm border border-white/60 transition-all duration-500 ease-out ${
                  theme === 'light' ? 'left-1' : 'right-1'
                }`}
              ></div>
            </button>

            {/* Auth section */}
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
                          <p className="text-white text-xs font-semibold">{user.phone || '—'}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg px-3 py-2">
                          <p className="text-white/30 text-xs">Joined</p>
                          <p className="text-white text-xs font-semibold">{user.joined || '—'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-3 py-3 flex flex-col gap-1">
                      <Link
                        to="/bookings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 text-sm transition"
                      >
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
                  <button className=" backdrop-blur-2xl hover:bg-[#7bbda8] text-black border-b-2 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-[#94d2bd]/30 ">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className=" backdrop-blur-3xl hover:bg-[#7bbda8] text-black border-b-2 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-[#94d2bd]/30 ">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div
        className={`lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm rounded-3xl shadow-2xl px-6 py-3 flex justify-between items-center z-[100] border ${
          theme === 'light'
            ? 'bg-white border-gray-200 shadow-gray-200'
            : 'bg-[#1a1a1a]/95 backdrop-blur-md border-white/10 shadow-black'
        }`}
      >
        {[
          { path: '/', icon: Home },
          { path: '/cars', icon: Car },
          { path: '/assistance', icon: Wrench },
          { path: '/bookings', icon: Calendar },
        ].map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all"
            >
              {isActive && (
                <div
                  className={`absolute inset-0 rounded-2xl ${theme === 'light' ? 'bg-[#94d2bd]/10' : 'bg-[#94d2bd]/20'}`}
                ></div>
              )}
              <item.icon
                size={26}
                className={`relative z-10 transition-colors ${isActive ? 'text-[#94d2bd]' : 'text-gray-400'}`}
              />
              {isActive && <div className="absolute -bottom-2 w-5 h-1 bg-[#94d2bd] rounded-full"></div>}
            </Link>
          );
        })}

        {/* Profile / Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all"
        >
          {mobileMenuOpen && (
            <div
              className={`absolute inset-0 rounded-2xl ${theme === 'light' ? 'bg-[#94d2bd]/10' : 'bg-[#94d2bd]/20'}`}
            ></div>
          )}
          {mobileMenuOpen ? (
            <X size={26} className={`relative z-10 transition-colors text-[#94d2bd]`} />
          ) : (
            <User size={26} className={`relative z-10 transition-colors text-gray-400`} />
          )}
          {mobileMenuOpen && <div className="absolute -bottom-2 w-5 h-1 bg-[#94d2bd] rounded-full"></div>}
        </button>
      </div>

      {/* Mobile Settings/Profile Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`fixed bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-sm p-6 rounded-3xl shadow-2xl flex flex-col gap-4 z-50 lg:hidden border ${
            theme === 'light'
              ? 'bg-white border-gray-200 text-black shadow-gray-200'
              : 'bg-[#1a1a1a] border-white/10 text-white shadow-black'
          }`}
        >
          <div className="flex justify-between items-center border-b border-gray-500/20 pb-4 mb-2">
            <span className="font-bold text-lg">Settings</span>
            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center px-1 py-1 bg-gray-500/20 border border-gray-500/30 rounded-full transition-all duration-300 w-14 h-8 shadow-inner"
            >
              <div
                className={`absolute w-6 h-6 rounded-full bg-white shadow-md border border-gray-200 transition-all duration-500 ease-out ${
                  theme === 'light' ? 'left-1' : 'right-1'
                }`}
              ></div>
            </button>
          </div>

          <Link
            onClick={() => setMobileMenuOpen(false)}
            className="font-semibold hover:text-[#94d2bd] transition border-b border-gray-500/20 pb-3"
            to="/about"
          >
            About Us
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            className="font-semibold hover:text-[#94d2bd] transition border-b border-gray-500/20 pb-3"
            to="/contact"
          >
            Contact Support
          </Link>

          <div className="mt-2 flex flex-col gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-500/10 border border-gray-500/20">
                  <div className="w-12 h-12 rounded-full bg-[#94d2bd] flex items-center justify-center text-white text-xl font-black shadow-md">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-base">{user.name}</p>
                    <p className="text-xs opacity-60 mt-0.5">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-2 flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-red-400 bg-red-400/10 hover:bg-red-400/20 transition text-sm font-bold w-full"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Link onClick={() => setMobileMenuOpen(false)} to="/login" className="w-full">
                  <button className="w-full bg-gray-500/20 hover:bg-gray-500/30 px-4 py-3 rounded-xl transition text-sm font-bold">
                    Login
                  </button>
                </Link>
                <Link onClick={() => setMobileMenuOpen(false)} to="/signup" className="w-full">
                  <button className="w-full bg-[#94d2bd] hover:bg-[#7bbda8] text-white px-4 py-3 rounded-xl transition text-sm font-bold shadow-lg shadow-[#94d2bd]/30">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
