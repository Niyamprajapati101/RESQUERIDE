import React, { useState } from "react";
import mclaren from "../assets/mclaren.jpg";
import { useTheme } from "../context/ThemeContext";
import { api } from "../api";
import { Wrench, Fuel, Car, Battery, MapPin, PhoneCall, CheckCircle, AlertTriangle } from "lucide-react";

export default function RoadsideAssistance() {
  const { theme } = useTheme();
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    vehicle: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    { id: "towing", name: "Towing", icon: <Car size={32} />, desc: "Safe flatbed towing to nearest garage" },
    { id: "puncture", name: "Puncture Repair", icon: <AlertTriangle size={32} />, desc: "On-site tyre change or patch repair" },
    { id: "fuel", name: "Fuel Delivery", icon: <Fuel size={32} />, desc: "Emergency fuel delivery to get you moving" },
    { id: "battery", name: "Battery Jump-start", icon: <Battery size={32} />, desc: "Quick jump-start for a dead battery" },
    { id: "mechanic", name: "On-site Mechanic", icon: <Wrench size={32} />, desc: "Expert mechanic for minor roadside fixes" },
  ];

  const handleServiceSelect = (id) => {
    setSelectedService(id === selectedService ? null : id);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) {
      alert("Please select a service type from the options above.");
      return;
    }
    const newRequest = {
      id: `RA-${Math.floor(1000 + Math.random() * 9000)}`,
      user: "Guest User",
      phone: "—",
      car: formData.vehicle || "—",
      issue: services.find(s => s.id === selectedService)?.name || selectedService,
      location: formData.location,
      description: formData.description,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Pending",
    };
    try { await api.addAssistance(newRequest); } catch {}
    setSubmitted(true);
  };

  return (
    <>
      <div
        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600 }}
        className={`w-full min-h-screen font-sans relative ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
      >
        <img src={mclaren} alt="bg" className=" fixed absolute inset-0 w-full h-full object-cover z-0 opacity-10" />
        <div className="bg-black min-h-screen flex flex-col pt-32 pb-16">
          <p className="mt-13 text-center  text-[#94d2bd] text-sm  tracking-[0.5em] uppercase font-bold mb-4">
            — Assistance 24X7
          </p>

          <div className="text-center px-4 max-w-3xl mx-auto mb-12">
            <h1 className="mt-15 text-2xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Emergency{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bfe8dd] to-[#94d2bd]">
                {' '}
                Roadside Assistance
              </span>
            </h1>
            <p className="text-lg text-white">
              Stuck on the road? Don't worry, RESQUERIDE is here to help. Select a service below, and our nearest
              professional will be dispatched to your location immediately.
            </p>
          </div>

          <div className="  max-w-6xl mx-auto px-4 mb-14 w-full">
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className={`backdrop-blur-2xl hover:scale-90 text-black border-b-3 font-bold px-8 py-3.5 rounded-xl shadow-xl shadow-[#94d2bd]/30 ${
                    selectedService === service.id
                      ? 'border-[#94d2bd] shadow-[#94d2bd]/30'
                      : 'hover:shadow-xl hover:border-gray-200'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
                      selectedService === service.id ? 'bg-[#000000] text-[#94d2bd]' : 'bg-[#000000] text-white'
                    }`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{service.name}</h3>
                  <p className="text-sm text-white">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto px-4 w-full">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#94d2bd]/40 hover:bg-white/8 transition-all duration-300  bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-green-500 w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Request Submitted Successfully!</h2>
                  <p className="text-gray-600 mb-8 max-w-sm">
                    Our support team has received your request. A driver will contact you shortly and head to your
                    location.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSelectedService(null);
                      setFormData({ location: '', vehicle: '', description: '' });
                    }}
                    className="bg-[#94d2bd] text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
                  >
                    Request Another Service
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <MapPin className="text-[#94d2bd]" />
                    Service Details
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-white/40 text-xs uppercase text-left tracking-widest block  font-medium  mb-1">
                        Service Required
                      </label>
                      <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition-all">
                        {selectedService
                          ? services.find((s) => s.id === selectedService).name
                          : 'Select a service from above'}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="text-white/40 text-xs uppercase text-left tracking-widest block  font-medium  mb-1"
                      >
                        Current Location (Landmark/Address)
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition-all"
                        placeholder="E.g., Highway 42, Near Blue Mall"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="vehicle"
                        className="text-white/40 text-xs uppercase text-left tracking-widest block  font-medium  mb-1"
                      >
                        Vehicle Details (Make, Model, License Plate)
                      </label>
                      <input
                        type="text"
                        id="vehicle"
                        name="vehicle"
                        required
                        value={formData.vehicle}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition-all"
                        placeholder="E.g., Honda Civic 2020 - AB12 CDE"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="text-white/40 text-xs uppercase text-left tracking-widest block  font-medium  mb-1"
                      >
                        Issue Description (Optional)
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition-all"
                        placeholder="Please briefly describe the exact issue you're facing..."
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#66bea1] hover:bg-[#af7bbd] border-b-3 text-white font-bold text-lg py-4 rounded-xl flex justify-center items-center gap-2 transform transition hover:scale-[1.02] shadow-xl shadow-[#94d2bd]/30"
                      >
                        {/* // hover:scale-90 text-black border-b-3 font-bold px-8 py-3.5 rounded-xl
                        shadow-xl shadow-[#94d2bd]/30" */}
                        <PhoneCall size={20} />
                        Request Immediate Help
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


