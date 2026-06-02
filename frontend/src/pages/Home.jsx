import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import img1 from "../assets/hero.png";
import img1Light from "../assets/hero - for white theme.png";
import HomeCars from "../components/Homecars";
import { Zap, Shield, Clock, MapPin, Star, ChevronDown, ChevronUp, Car, Users, Award, ThumbsUp } from "lucide-react";

const services = [
  { icon:  <Car size={32}  className="text-[#94d2bd]" />, 
  title: "Self Drive", desc: "Take the wheel and explore at your own pace with our self-drive rentals." },
  { icon:  <Users size={32} className="text-[#94d2bd]" />, 
  title: "With Driver", desc: "Sit back and relax while our professional drivers take you anywhere." },
  { icon:  <MapPin size={32}  className="text-[#94d2bd]" />, 
  title: "Outstation", desc: "Plan long-distance trips with our comfortable outstation packages." },
  { icon:  <Clock size={32} className="text-[#94d2bd]" />, 
  title: "Hourly Rental", desc: "Need a car for just a few hours? We've got flexible hourly plans." },
];


const reasons = [
  { icon:  <Shield size={28} className="text-[#94d2bd]" />, 
  title: "Fully Insured", desc: "Every vehicle comes with comprehensive insurance coverage." },
  { icon:  <Zap size={28} className="text-[#94d2bd]" />, 
  title: "Instant Booking", desc: "Book your car in under 60 seconds — no paperwork hassle." },
  { icon:  <ThumbsUp size={28} className="text-[#94d2bd]" />, 
  title: "Top-Rated Fleet", desc: "Only well-maintained, sanitized vehicles in our collection." },
  { icon:  <Award size={28} className="text-[#94d2bd]" />, 
  title: "24/7 Support", desc: "Our team is always available to assist you on the road." },
];


const stats = [
  { value: "5000+", label: "Happy Customers" },
  { value: "120+", label: "Cars Available" },
  { value: "50+", label: "Cities Covered" },
  { value: "4.9★", label: "Average Rating" },
];

const testimonials = [
  { name: "Rahul Sharma", role: "Business Traveler", text: "Absolutely seamless experience. Booked a Fortuner for a weekend trip and it was spotless. Will definitely use again!", rating: 5 },
  { name: "Priya Mehta", role: "Family Trip", text: "The Innova Crysta was perfect for our family vacation. Great condition and the driver was very professional.", rating: 5 },
  { name: "Arjun Patel", role: "Solo Traveler", text: "Loved the self-drive option. Transparent pricing, no hidden charges. The Thar made my Gir trip unforgettable.", rating: 4 },
];

const faqs = [
  { q: "What documents do I need to rent a car?", a: "You need a valid driving license, a government-issued ID (Aadhaar/Passport), and a credit/debit card for the security deposit." },
  { q: "Is there a minimum rental period?", a: "Our minimum rental period is 4 hours for hourly plans and 1 day for daily rentals." },
  { q: "Can I cancel or modify my booking?", a: "Yes, free cancellation is available up to 24 hours before pickup. Modifications can be made anytime via the app." },
  { q: "Is fuel included in the price?", a: "Fuel is not included. You receive the car with a full tank and are expected to return it full." },
  { q: "Are there any hidden charges?", a: "No hidden charges. The price shown at booking is what you pay, subject to fuel and any optional add-ons." },
];

function Homecar() {
  const { theme } = useTheme();
  return (
    <div className={`${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gradient-to-r from-black via-[#020b1f] to-black text-gray-300'}`}>

      <div className="relative w-full">
        <img src={theme === 'light' ? img1Light : img1} alt="hero car" className={`mt-50 w-full h-full object-cover ${theme === 'light' ? 'opacity-100' : 'opacity-80'}`} />
        <div className={`absolute backdrop-blur-md top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-2xl flex items-center gap-10 ${
          theme === 'light'
            ? 'bg-white/60 border border-gray-300'
            : 'bg-white/30 border border-gray-200'
        }`}>
          <div>
            <p className={`text-sm font-semibold ${theme === 'light' ? 'text-black' : 'text-black'}`}>RESQUERIDE</p>
            <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-[#22223b]'}`}>Fast bookings. Faster rides</h3>
            <p className={`text-sm mt-2 ${theme === 'light' ? 'text-gray-800' : 'text-black'}`}>Rent Your Dream Car. Transparent pricing. Book in seconds.</p>
          </div>
          <Link to="/cars">
            <button className="bg-[#94d2bd] hover:bg-[#7bbda8] text-white px-9 py-3 rounded-xl shadow-lg transition">
              Resque Now
            </button>
          </Link>
        </div>
      </div>

      
      <section className="py-16 px-6 text-center">
        <span className="inline-flex items-center gap-2 text-amber-400 border border-amber-400/40 rounded-full px-5 py-1 text-sm mb-4">
          <Zap size={16} /> Premium Fleet Selection
        </span>
        <h2 className="text-5xl text-[#94d2bd] uppercase font-bold">Our Car Collection</h2>
        <p className="text-gray-400  text-xl mt-3 mb-2">
          Discover premium vehicles with exceptional performance and comfort for your next journey
        </p>
        <HomeCars />
      </section>

      <section className="py-16 px-6  gap-90">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Our Services</h2>
          <p className="text-gray-400 mb-10">Everything you need for a perfect ride</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white/5 border border-gray-700 rounded-2xl p-6 hover:border-[#94d2bd] transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">{s.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Why Choose Us ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Why Choose Us</h2>
          <p className="text-gray-400 mb-10">We go the extra mile so you don't have to worry</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {reasons.map((r, i) => (
              <div key={i} className="bg-white/5 border border-gray-700 rounded-2xl p-6 hover:border-[#94d2bd] transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">{r.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{r.title}</h3>
                <p className="text-gray-400 text-sm">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* ── 6. Testimonials ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center ">
          <h2 className="text-4xl font-bold text-white mb-2">What Our Customers Say</h2>
          <p className="text-gray-400 mb-10">Real experiences from real riders</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 border border-gray-700 rounded-2xl p-6 text-left hover:border-[#94d2bd] transition-all duration-300">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-[#94d2bd] fill-[#94d2bd]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Stats Counter ── */}
      <section className="py-14 px-6 bg-[#94d2bd]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-extrabold text-white">{s.value}</p>
              <p className="text-[#e5f7f2] mt-1 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Homecar;


