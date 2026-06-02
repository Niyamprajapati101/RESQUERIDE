import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useBookings } from "../context/BookingContext";
import { getCarImage } from "../utils/carImages";

const filters = ["All", "Upcoming", "Active", "Pending", "Completed", "Cancelled"];

const statusStyles = {
  Active: "border-green-400/40 bg-green-500/10 text-green-300",
  Upcoming: "border-[#94d2bd]/40 bg-[#94d2bd]/10 text-[#bfe8dd]",
  Pending: "border-yellow-400/40 bg-yellow-500/10 text-yellow-300",
  Completed: "border-white/20 bg-white/5 text-white/50",
  Cancelled: "border-red-400/40 bg-red-500/10 text-red-300",
};

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function paymentLabel(method) {
  if (method === "upi") return "UPI";
  if (method === "cash") return "Cash on pickup";
  return "Card";
}

function MyBookings() {
  const { theme } = useTheme();
  const { bookings, cancelBooking, loadBookings } = useBookings();
  const [activeFilter, setActiveFilter] = useState("All");
  const [cancellingId, setCancellingId] = useState("");

  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [bookings]);

  const visibleBookings = activeFilter === "All"
    ? sortedBookings
    : sortedBookings.filter((booking) => booking.status === activeFilter);

  const totalPaid = bookings.reduce((sum, booking) => (
    booking.status !== "Cancelled" ? sum + (booking.totalPrice || booking.total || 0) : sum
  ), 0);

  const activeCount = bookings.filter((booking) => ["Active", "Upcoming", "Pending"].includes(booking.status)).length;

  async function handleCancel(id) {
    if (!window.confirm("Cancel this booking?")) return;
    setCancellingId(id);
    await cancelBooking(id);
    await loadBookings();
    setCancellingId("");
  }

  return (
    <div className={`mt-14 min-h-screen pt-36 pb-20 px-5 ${theme === 'light' ? 'bg-white' : 'bg-gradient-to-b from-black via-[#0b0b0b] to-black'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <p className="text-[#94d2bd] text-xs tracking-[0.35em] uppercase font-semibold mb-3">Live booking desk</p>
            <h1 className="text-white text-4xl md:text-5xl font-black tracking-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bfe8dd] to-[#94d2bd]">Bookings</span>
            </h1>
            <p className="text-white/35 mt-3 max-w-2xl">
              Book a car from the fleet, complete payment, and it appears here automatically with status, dates, and transaction details.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={loadBookings}
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-[#94d2bd]/40 text-xs font-bold tracking-widest uppercase transition"
            >
              Refresh
            </button>
            <Link
              to="/cars"
              className="px-5 py-3 rounded-xl bg-[#94d2bd] hover:bg-[#7bbda8] text-white text-xs font-bold tracking-widest uppercase transition"
            >
              Book Car
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: bookings.length },
            { label: "Running / Upcoming", value: activeCount },
            { label: "Total Amount", value: `INR ${totalPaid.toLocaleString("en-IN")}` },
          ].map((item) => (
            <div key={item.label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <p className="text-white/35 text-xs tracking-widest uppercase">{item.label}</p>
              <p className="text-white text-2xl font-black mt-2">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl border text-xs font-bold tracking-widest uppercase transition ${
                activeFilter === filter
                  ? "bg-[#94d2bd] border-[#94d2bd] text-white"
                  : "bg-white/3 border-white/8 text-white/35 hover:text-white/70 hover:border-white/20"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {visibleBookings.length === 0 ? (
          <div className="border border-white/10 bg-white/[0.03] rounded-3xl py-20 px-5 text-center">
            <p className="text-white text-xl font-black mb-2">No bookings found</p>
            <p className="text-white/35 mb-6">Choose a car and complete the payment form to create your first booking.</p>
            <Link to="/cars" className="inline-flex px-6 py-3 rounded-xl bg-[#94d2bd] hover:bg-[#7bbda8] text-white text-xs font-bold tracking-widest uppercase transition">
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-5">
            {visibleBookings.map((booking) => {
              const total = booking.totalPrice || booking.total || 0;
              const canCancel = !["Cancelled", "Completed"].includes(booking.status);

              return (
                <div key={booking.id || booking._id} className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden">
                  <div className="flex gap-4 p-5">
                    <img
                      src={getCarImage(booking.car, booking.image)}
                      alt={booking.car || "Booked car"}
                      className="w-32 h-24 object-cover rounded-2xl border border-white/10 bg-white/5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-white text-xl font-black truncate">{booking.car || "Booked Car"}</h2>
                          <p className="text-white/35 text-xs mt-1">Booking ID: {booking.bookingId || booking.id || booking._id}</p>
                        </div>
                        <span className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold uppercase ${statusStyles[booking.status] || statusStyles.Pending}`}>
                          {booking.status || "Pending"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div>
                          <p className="text-white/30 text-xs uppercase tracking-widest">From</p>
                          <p className="text-white/80 text-sm font-semibold">{formatDate(booking.startDate)}</p>
                        </div>
                        <div>
                          <p className="text-white/30 text-xs uppercase tracking-widest">To</p>
                          <p className="text-white/80 text-sm font-semibold">{formatDate(booking.endDate)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 p-5 grid sm:grid-cols-3 gap-3">
                    <div className="bg-black/25 border border-white/8 rounded-2xl p-3">
                      <p className="text-white/30 text-xs uppercase tracking-widest">Payment</p>
                      <p className="text-white font-bold mt-1">{paymentLabel(booking.paymentMethod)}</p>
                      <p className={booking.paymentStatus === "Paid" ? "text-green-300 text-xs mt-1" : "text-yellow-300 text-xs mt-1"}>
                        {booking.paymentStatus || "Paid"}
                      </p>
                    </div>
                    <div className="bg-black/25 border border-white/8 rounded-2xl p-3">
                      <p className="text-white/30 text-xs uppercase tracking-widest">Transaction</p>
                      <p className="text-white/70 text-xs font-bold mt-1 break-all">{booking.transactionId || "Not generated"}</p>
                    </div>
                    <div className="bg-black/25 border border-white/8 rounded-2xl p-3">
                      <p className="text-white/30 text-xs uppercase tracking-widest">Amount</p>
                      <p className="text-[#bfe8dd] text-lg font-black mt-1">INR {total.toLocaleString("en-IN")}</p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 flex gap-3">
                    <Link
                      to="/cars"
                      className="flex-1 text-center py-3 rounded-xl bg-white/5 border border-white/10 text-white/55 hover:text-white text-xs font-bold tracking-widest uppercase transition"
                    >
                      Book More
                    </Link>
                    {canCancel && (
                      <button
                        onClick={() => handleCancel(booking.id || booking._id)}
                        disabled={cancellingId === (booking.id || booking._id)}
                        className="flex-1 py-3 rounded-xl bg-red-500/10 border border-red-400/25 text-red-300 hover:bg-red-500/20 text-xs font-bold tracking-widest uppercase transition disabled:opacity-50"
                      >
                        {cancellingId === (booking.id || booking._id) ? "Cancelling" : "Cancel Booking"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;


