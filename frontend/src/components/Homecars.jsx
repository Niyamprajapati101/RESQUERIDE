import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import CarCard from "./Carscard";
import { api } from "../api";
import { getCarImage } from "../utils/carImages";

function HomeCars() {
  const { theme } = useTheme();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const load = () => api.getCars()
      .then(data => {
        if (data.success && data.cars) {
          setCars(data.cars.slice(0, 4));
        }
      })
      .catch(err => console.error("Failed to load cars:", err));
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-6 mt-10 px-6">
        {cars.map((car) => (
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
      <Link to="/cars">
        <button
          className={`mt-16 font-bold px-8 py-3.5 rounded-xl shadow-lg transition text-lg md:text-base border-b-2 ${
            theme === 'light'
              ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-700 shadow-blue-600/20'
              : 'bg-[#94d2bd] hover:bg-[#7bbda8] text-black border-[#7bbda8] shadow-[#94d2bd]/20'
          }`}
        >
          View All Cars
        </button>
      </Link>
    </div>
  );
}

export default HomeCars;


