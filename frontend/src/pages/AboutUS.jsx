import mclaren from "../assets/mclaren.jpg";
import founder from "../assets/FOUNDER.jpeg";
import Head from "../assets/p1.jpeg";
import Manager from "../assets/p2.jpeg"
import { useTheme } from "../context/ThemeContext";

const team = [
  { name: "Arjun Mehta", role: "Founder & CEO", img:founder },
  { name: "Priya Sharma", role: "Head of Operations", img:Head },
  { name: "Rohan Verma", role: "Fleet Manager", img: Manager},
];

const stats = [
  { value: "500+", label: "Premium Vehicles" },
  { value: "12K+", label: "Happy Members" },
  { value: "8+", label: "Years of Excellence" },
  { value: "24/7", label: "Customer Support" },
];

function AboutUs() {
  const { theme } = useTheme();
  return (
    <div className={`w-full min-h-screen font-sans relative ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>

      {/* Background */}
      <img src={mclaren} alt="bg" className="absolute inset-0 w-full h-full object-cover z-0 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-0" />

      {/* Hero */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 pt-44 pb-20">
        <p className="text-[#94d2bd] text-xs tracking-[0.5em] uppercase font-semibold mb-4">— Our Story</p>
        <h1 className="text-white text-6xl md:text-7xl font-black tracking-tight leading-tight">
          Drive the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bfe8dd] to-[#94d2bd]">
            Extraordinary
          </span>
        </h1>
        <p className="text-white/40 text-base mt-5 max-w-xl leading-relaxed">
          RESQUERIDE was born from a passion for precision engineering and the belief that every journey deserves a world-class machine.
        </p>
      </div>

      {/* Stats */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#94d2bd]/30 transition-all">
              <p className="text-white text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#bfe8dd] to-[#94d2bd]">{s.value}</p>
              <p className="text-white/30 text-xs tracking-widest uppercase mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="w-12 h-12 bg-[#94d2bd]/10 border border-[#94d2bd]/20 rounded-xl flex items-center justify-center text-2xl mb-5">🎯</div>
            <h2 className="text-white text-2xl font-black mb-3">Our Mission</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              To redefine the car rental experience by offering an exclusive fleet of meticulously maintained vehicles, paired with seamless service that puts our members first — every single time.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="w-12 h-12 bg-[#94d2bd]/10 border border-[#94d2bd]/20 rounded-xl flex items-center justify-center text-2xl mb-5">👁</div>
            <h2 className="text-white text-2xl font-black mb-3">Our Vision</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              To become India's most trusted premium mobility brand — where every drive is an event, every vehicle tells a story, and every member feels like a VIP from the moment they book.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-[#94d2bd] text-xs tracking-[0.4em] uppercase font-semibold mb-2">— What We Stand For</p>
            <h2 className="text-white text-3xl font-black">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "⚡", title: "Performance", desc: "Every vehicle in our fleet is selected for its engineering excellence and driving dynamics." },
              { icon: "🛡", title: "Trust", desc: "Transparent pricing, comprehensive insurance, and zero hidden charges — always." },
              { icon: "💎", title: "Luxury", desc: "From booking to drop-off, we deliver a premium experience that exceeds expectations." },
              { icon: "🌍", title: "Sustainability", desc: "We're committed to introducing hybrid and EV options to reduce our carbon footprint." },
              { icon: "🤝", title: "Community", desc: "We build lasting relationships with our members, not just transactions." },
              { icon: "🔧", title: "Reliability", desc: "Every car is inspected before every booking. Zero compromises on safety." },
            ].map((v) => (
              <div key={v.title} className="backdrop-blur-xl bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-[#94d2bd]/30 hover:bg-white/5 transition-all duration-300">
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{v.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-[#94d2bd] text-xs tracking-[0.4em] uppercase font-semibold mb-2">— The People Behind</p>
            <h2 className="text-white text-3xl font-black">Meet the Team</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {team.map((m) => (
              <div key={m.name} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden w-64 hover:border-[#94d2bd]/30 transition-all duration-300 group">
                <div className="h-56 w-full overflow-hidden">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold">{m.name}</h3>
                  <p className="text-[#94d2bd] text-xs tracking-widest uppercase mt-1">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
          <p className="text-[#94d2bd] text-xs tracking-[0.4em] uppercase font-semibold mb-3">— Ready to Ride?</p>
          <h2 className="text-white text-4xl font-black mb-4">Your Next Adventure Awaits</h2>
          <p className="text-white/35 text-sm max-w-md mx-auto mb-8">Browse our exclusive fleet and book your dream car in under 2 minutes.</p>
          <a href="/cars">
            <button className="bg-gradient-to-r from-[#94d2bd] to-[#7bbda8] hover:from-[#7bbda8] hover:to-[#609b8a] text-white font-bold px-10 py-3 rounded-xl tracking-widest text-sm uppercase shadow-[0_4px_20px_rgba(148,210,189,0.38)] transition-all active:scale-[0.98]">
              Explore Fleet
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;


