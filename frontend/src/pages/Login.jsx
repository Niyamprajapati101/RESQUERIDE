import React, { useState } from "react";
import mustang from "../assets/mustang.jpg";
import { api } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.login(email, password);
      if (!response.success) {
        setError(response.message || "Login failed");
      } else {
        // save logged in user to sessionStorage with token
        sessionStorage.setItem("rq_user", JSON.stringify({
          ...response.user,
          token: response.token
        }));
        window.location.href = "/";
      }
    } catch {
      setError("Server not reachable. Make sure the API is running.");
    }
    setLoading(false);
  };
  return (
    <div className="h-screen w-full relative font-sans overflow-hidden">

      <img
        src={mustang}
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex items-center justify-between px-16 max-w-7xl mx-auto w-full">

        <div className="hidden md:flex flex-col justify-center max-w-md">
          <p className="text-red-400 text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            — Members Only Access
          </p>
          <h1 className="text-white text-6xl font-black leading-[1.05] tracking-tight">
            Built for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94d2bd] to-[#94d2bd]">
              Those Who
            </span>
            <br />
            Dare.
          </h1>
          <p className="text-white/40 text-base mt-5 leading-relaxed max-w-sm">
            RESQUERIDE curates the world's most powerful machines for drivers who refuse to settle for ordinary.
          </p>
          <div className="flex items-center gap-6 mt-8">
            <div>
              <p className="text-white text-2xl font-bold">500+</p>
              <p className="text-white/30 text-xs tracking-widest uppercase">Vehicles</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-white text-2xl font-bold">12K+</p>
              <p className="text-white/30 text-xs tracking-widest uppercase">Members</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-white text-2xl font-bold">98%</p>
              <p className="text-white/30 text-xs tracking-widest uppercase">Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto md:min-w-[380px]">

          <div className="mb-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-1.5 h-5 bg-red-500 rounded-full" />
              <span className="text-red-400 text-xs tracking-[0.35em] uppercase font-semibold">RESQUERIDE</span>
              <div className="w-1.5 h-5 bg-red-500 rounded-full" />
            </div>
            <h2 className="text-white text-2xl font-bold">Sign In</h2>
            <p className="text-white/35 text-sm mt-1">Access your exclusive garage</p>
          </div>

          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_8px_60px_rgba(0,0,0,0.8)] p-8">
            <form onSubmit={handleLogin} className="space-y-4">

              <div>
                <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-red-500 focus:bg-white/10 transition text-sm"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-white/40 text-xs tracking-[0.2em] uppercase">Password</label>
                  <a href="#" className="text-red-400 text-xs hover:text-red-300 transition">Forgot password?</a>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-red-500 focus:bg-white/10 transition text-sm"
                />
              </div>

              {error && <p className="text-red-400 text-xs text-center">{error}</p>}

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#94d2bd] to-[#94d2bd] hover:from-[#7bbda8] hover:to-[#7bbda8] active:scale-[0.98] transition-all duration-200 text-white font-bold py-3 rounded-xl tracking-widest text-sm uppercase mt-2 shadow-[0_4px_20px_rgba(148,210,189,0.38)]">
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/20 text-[11px] tracking-widest">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <p className="text-center text-white/40 text-sm">
              New to RESQUERIDE?{" "}
              <a href="/signup" className="text-red-400 hover:text-red-300 transition font-semibold tracking-wide">
                Create Account
              </a>
            </p>
          </div>

          <p className="text-center text-white/15 text-xs mt-5 tracking-[0.3em] uppercase">
            Precision · Power · Prestige
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;


