import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useBookings } from "../context/BookingContext";
import { api } from "../api";
import BookingModal from "./BookingModal";
import { CAR_IMAGE_FALLBACK } from "../utils/carImages";

function CarCard({ image, name, price, fuel, seats, carId, carStatus }) {
  const { theme } = useTheme();
  const { addBooking } = useBookings();
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // check if this user already has an active booking for this car
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("rq_user") || "null");
    if (!user) return;
    api.getBookings()
      .then(data => {
        const bookings = data.bookings || [];
        const active = bookings.find(
          b => b.car && b.car.toLowerCase() === name.toLowerCase() && b.userId === user.id && (b.status === "Active" || b.status === "Upcoming" || b.status === "Pending")
        );
        if (active) setAlreadyBooked(true);
      })
      .catch(err => console.error("Failed to load bookings:", err));
  }, [name]);

  const isRented = carStatus === "Rented" || alreadyBooked;

  function handleBookClick() {
    if (isRented) return;

    const user = JSON.parse(sessionStorage.getItem("rq_user") || "null");
    if (!user) {
      alert("Please login first to book a car");
      window.location.href = "/login";
      return;
    }

    setShowModal(true);
  }

  async function handleConfirmBooking(startDate, endDate, totalPrice, paymentDetails) {
    await addBooking({ carId, image, name, price, fuel, seats }, startDate, endDate, totalPrice, paymentDetails);

    if (carId) {
      await api.updateCar(carId, { status: "Rented" });
    }

    setAlreadyBooked(true);
  }

  return (
    <>
      <div className={`glass-card-neon group relative backdrop-blur-3xl border rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:bg-white/[0.05] w-full max-w-[21rem] sm:max-w-none sm:w-72 mx-auto sm:mx-0 ${
        theme === 'light'
          ? 'bg-white border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)]'
          : 'bg-white/[0.03] border-white/20 border-r border-b border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_40px_rgba(0,0,0,0.8)]'
      }`}>

        <div className="relative overflow-hidden h-48">
          <img
            src={image}
            alt={name}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = CAR_IMAGE_FALLBACK;
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-[#94d2bd]/40 text-[#94d2bd] px-3 py-1 rounded-full text-xs font-bold tracking-wider">
            ₹{price.toLocaleString()}/day
          </div>
          {isRented && (
            <div className="absolute top-3 left-3 bg-red-500/80 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">
              Rented
            </div>
          )}
        </div>

        <div className="p-5">
          <h2 className="text-white text-lg font-bold tracking-tight mb-3">{name}</h2>

          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-lg px-3 py-1.5">
              <span className="text-xs">⛽</span>
              <span className="text-white/60 text-xs font-medium">{fuel}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-lg px-3 py-1.5">
              <span className="text-xs">👥</span>
              <span className="text-white/60 text-xs font-medium">{seats} Seats</span>
            </div>
          </div>

          <div className="h-px bg-white/5 mb-4" />

          <button
            onClick={handleBookClick}
            disabled={isRented}
            className={`relative w-full active:scale-[0.98] text-white font-semibold py-3 rounded-xl text-xs tracking-widest uppercase transition-all duration-300 overflow-hidden ${
              isRented
                ? "bg-white/5 border border-white/10 cursor-not-allowed opacity-50"
                : "bg-white/10 border-t border-l border-white/30 border-r border-b border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-white/20 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),_0_0_20px_rgba(255,255,255,0.15)]"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10">{isRented ? "Already Rented" : "Book Now"}</span>
          </button>
        </div>
      </div>

      {showModal && (
        <BookingModal
          car={{ carId, image, name, price, fuel, seats }}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </>
  );
}

export default CarCard;
