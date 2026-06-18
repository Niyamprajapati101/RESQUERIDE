import mclaren from "../assets/mclaren.jpg";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { api } from "../api";

const contactInfo = [
  {
    icon: "📍",
    title: "Visit Us",
    lines: ["RESQUERIDE HQ", "Ahmedabad, Gujarat, India"],
  },
  {
    icon: "📞",
    title: "Call Us",
    lines: ["+91 82994 31275", "Mon–Sat, 9AM – 8PM"],
  },
  {
    icon: "✉️",
    title: "Email Us",
    lines: ["support@resqueride.com", "We reply within 24 hours"],
  },
  {
    icon: "🕐",
    title: "Business Hours",
    lines: ["Mon–Fri: 8AM – 8PM", "Sat–Sun: 10AM – 5PM"],
  },
];

function Contact() {
  const { theme } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addMessage({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        read: false,
      });
    } catch {}
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div
      style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600 }}
      className={`w-full min-h-screen font-sans relative ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
    >
      {/* Background */}
      <img src={mclaren} alt="bg" className="absolute inset-0 w-full h-full object-cover z-0 opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black z-0" />

      {/* Hero */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 pt-44 pb-16">
        <p className="text-[#94d2bd] text-xs tracking-[0.5em] uppercase font-semibold mb-4">— Get In Touch</p>
        <h1 className="text-white text-4xl md:text-4xl font-black tracking-tight leading-tight">
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bfe8dd] to-[#94d2bd]">Talk</span>
        </h1>
        <p className="text-white/40 text-base mt-5 max-w-lg leading-relaxed">
          Have a question, a booking inquiry, or just want to say hello? We're always here for you.
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((c) => (
            <div
              key={c.title}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#94d2bd]/40 hover:bg-white/8 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="text-white font-bold text-sm mb-2">{c.title}</h3>
              {c.lines.map((l) => (
                <p key={l} className="text-white/40 text-xs leading-relaxed">
                  {l}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Two Column: Map + Form */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left — Social + FAQ */}
          <div className="flex flex-col gap-6">
            {/* Social Media */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <p className="text-[#94d2bd] text-xs tracking-[0.4em] uppercase font-semibold mb-2">— Follow Us</p>
              <h2 className="text-white text-xl font-black mb-6">Stay Connected</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: '📸',
                    label: 'Instagram',
                    handle: '@resqueride',
                    color: 'hover:border-pink-500/50 hover:bg-pink-500/5',
                  },
                  {
                    icon: '𝕏',
                    label: 'Twitter / X',
                    handle: '@resqueride',
                    color: 'hover:border-sky-500/50 hover:bg-sky-500/5',
                  },
                  {
                    icon: '▶',
                    label: 'YouTube',
                    handle: 'RESQUERIDE Official',
                    color: 'hover:border-red-500/50 hover:bg-red-500/5',
                  },
                  {
                    icon: 'in',
                    label: 'LinkedIn',
                    handle: 'RESQUERIDE',
                    color: 'hover:border-blue-500/50 hover:bg-blue-500/5',
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all duration-300 ${s.color}`}
                  >
                    <span className="text-xl w-8 text-center">{s.icon}</span>
                    <div>
                      <p className="text-white text-sm font-bold">{s.label}</p>
                      <p className="text-white/30 text-xs">{s.handle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* McLaren Image */}
            <div className="rounded-3xl overflow-hidden border border-white/10 h-56 relative group">
              <img
                src={mclaren}
                alt="McLaren"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="text-[#94d2bd] text-xs tracking-[0.4em] uppercase font-semibold">— RESQUERIDE Fleet</p>
                <p className="text-white font-black text-lg">McLaren 720S</p>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-[#94d2bd] text-xs tracking-[0.4em] uppercase font-semibold mb-2">— Send a Message</p>
            <h2 className="text-white text-2xl font-black mb-6">We'd Love to Hear From You</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition-all"
                />
              </div>

              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us more..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#94d2bd] to-[#7bbda8] hover:from-[#7bbda8] hover:to-[#609b8a] text-white font-bold py-3 rounded-xl tracking-widest text-sm uppercase shadow-[0_4px_20px_rgba(148,210,189,0.35)] transition-all active:scale-[0.98]"
              >
                {sent ? '✓ Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;


