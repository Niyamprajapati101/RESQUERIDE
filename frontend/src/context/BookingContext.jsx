import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "../api";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  const loadBookings = useCallback(async () => {
    const userString = sessionStorage.getItem("rq_user");
    if (!userString) {
      setBookings([]);
      return; // Do not fetch if not logged in
    }

    try {
      const response = await api.getBookings();
      if (!response.success) {
        console.error("Failed to load bookings:", response.message);
        return;
      }
      const allBookings = response.bookings || [];
      const user = JSON.parse(userString);
      if (user) {
        setBookings(allBookings.filter(b => b.userId === user.id));
      } else {
        setBookings(allBookings);
      }
    } catch (e) {
      console.error("Failed to load bookings", e);
    }
  }, []);

  useEffect(() => {
    loadBookings();
    const t = setInterval(loadBookings, 5000);
    return () => clearInterval(t);
  }, [loadBookings]);

  async function addBooking(car, startDate, endDate, totalPrice, paymentDetails = {}) {
    const user = JSON.parse(sessionStorage.getItem("rq_user") || "null");

    const newBooking = {
      userId: user?.id || null,
      carId: car.carId,
      startDate: startDate,
      endDate: endDate,
      totalPrice: totalPrice,
      paymentMethod: paymentDetails.paymentMethod || "card",
      paymentStatus: paymentDetails.paymentStatus || "Paid",
      transactionId: paymentDetails.transactionId || "",
    };

    try {
      const saved = await api.addBooking(newBooking);
      if (saved.success && saved.booking) {
        // Reload from server to get fully formatted data
        await loadBookings();
        return saved.booking;
      } else {
        throw new Error(saved.message || "Failed to create booking");
      }
    } catch (err) {
      console.error("Booking error:", err);
      throw err;
    }
  }

  async function cancelBooking(id) {
    try {
      const booking = bookings.find(b => b.id === id);

      await api.updateBooking(id, { status: "Cancelled" });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Cancelled" } : b));

      // set car back to Available
      if (booking) {
        const carsResponse = await api.getCars();
        const carsList = carsResponse.cars || carsResponse || [];
        const car = carsList.find(c => c.name.toLowerCase() === booking.car.toLowerCase());
        if (car) {
          await api.updateCar(car.id || car._id, { status: "Available" });
        }
      }
    } catch (e) {
      console.error("Cancel error:", e);
    }
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, loadBookings }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}


