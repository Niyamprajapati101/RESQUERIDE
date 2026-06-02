import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import CarCard from "../components/Carscard";
import { api } from "../api";
import { getCarImage } from "../utils/carImages";

function Cars() {
  const { theme } = useTheme();
  const [cars, setCars] = useState([]);
  const [filterFuel, setFilterFuel] = useState("All");

  useEffect(() => {
    const loadCars = () => {
      api.getCars()
        .then(data => {
          if (data.success && data.cars) {
            setCars(data.cars);
          }
        })
        .catch(err => console.error("Failed to load cars:", err));
    };

    loadCars();
    const t = setInterval(loadCars, 5000);
    return () => clearInterval(t);
  }, []);

  const fuelTypes = ["All", ...new Set(cars.map(c => c.fuel))];
  const filtered = filterFuel === "All" ? cars : cars.filter(c => c.fuel === filterFuel);

  return (
    <div className={`mt-14 w-full min-h-screen pt-36 pb-20 ${theme === 'light' ? 'bg-white' : 'bg-gradient-to-b from-black via-[#0a0a0a] to-black'}`}>

      <div className="text-center mb-8 px-4">
        <p className="text-[#94d2bd] text-xs tracking-[0.4em] uppercase font-semibold mb-3">— Our Fleet</p>
        <h1 className="text-white text-5xl font-black tracking-tight">
          Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bfe8dd] to-[#94d2bd]">Collection</span>
        </h1>
        <p className="text-white/30 text-base mt-3 max-w-xl mx-auto leading-relaxed">
          Every vehicle in our fleet is meticulously maintained and ready to deliver an extraordinary driving experience.
        </p>
      </div>

      {/* Fuel filter */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap px-4">
        {fuelTypes.map(f => (
          <button
            key={f}
            onClick={() => setFilterFuel(f)}
            className={`px-5 py-2 rounded-xl text-xs font-bold tracking-widest uppercase border transition-all duration-200 ${
              filterFuel === f
                ? "bg-[#94d2bd] border-[#94d2bd] text-white shadow-[0_4px_15px_rgba(148,210,189,0.38)]"
                : "bg-white/3 border-white/8 text-white/35 hover:border-[#94d2bd]/30 hover:text-white/60"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Car count */}
      <div className="text-center mb-6">
        <p className="text-white/20 text-xs tracking-widest uppercase">
          Showing {filtered.length} of {cars.length} vehicles
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-8">
        {filtered.map((car) => (
          <CarCard
            key={car.id || car._id}
            carId={car.id || car._id}
            carStatus={car.status}
            image={getCarImage(car.name, car.image)}
            name={car.name}
            price={car.price}
            fuel={car.fuel}
            seats={car.seats}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/15 text-sm tracking-widest uppercase">
          No cars found
        </div>
      )}
    </div>
  );
}

export default Cars;


