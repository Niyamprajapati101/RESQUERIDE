import { useState, useMemo } from "react";

const TEST_CARDS = {
  "4242424242424242": { brand: "Visa", status: "success" },
  "5555555555554444": { brand: "Mastercard", status: "success" },
  "4000000000000002": { brand: "Visa", status: "declined" },
};

function BookingModal({ car, onClose, onConfirm }) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (d) => d.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(formatDate(today));
  const [endDate, setEndDate] = useState(formatDate(tomorrow));
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [txnId, setTxnId] = useState("");

  const days = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [startDate, endDate]);

  const totalPrice = days * (car.price || 0);
  const tax = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + tax;

  const formatCardNumber = (val) => {
    const nums = val.replace(/\D/g, "").slice(0, 16);
    return nums.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (val) => {
    const nums = val.replace(/\D/g, "").slice(0, 4);
    if (nums.length >= 3) return nums.slice(0, 2) + "/" + nums.slice(2);
    return nums;
  };

  const cleanCard = cardNumber.replace(/\s/g, "");
  const detectedCard = TEST_CARDS[cleanCard];
  const cardBrand = cleanCard.startsWith("4") ? "VISA" : cleanCard.startsWith("5") ? "MASTERCARD" : cleanCard.startsWith("6") ? "RUPAY" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (days <= 0) {
      setError("End date must be after start date");
      return;
    }

    if (paymentMethod === "card") {
      if (cleanCard.length !== 16) {
        setError("Please enter a valid 16-digit card number");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        setError("Please enter card expiry in MM/YY format");
        return;
      }
      if (cardCvv.length !== 3) {
        setError("Please enter a valid 3-digit CVV");
        return;
      }
      if (!cardName.trim()) {
        setError("Please enter cardholder name");
        return;
      }

      // Check for declined test card
      if (detectedCard && detectedCard.status === "declined") {
        setError("❌ Payment declined by bank. Try card 4242 4242 4242 4242");
        return;
      }
    }

    if (paymentMethod === "upi" && !upiId.includes("@")) {
      setError("Please enter a valid UPI ID (e.g. name@upi)");
      return;
    }

    setProcessing(true);

    try {
      // Simulate payment gateway processing
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Generate transaction ID
      const newTxnId = "TXN" + Date.now().toString().slice(-10);
      setTxnId(newTxnId);

      // Save the booking
      await onConfirm(
        new Date(startDate).toISOString(),
        new Date(endDate).toISOString(),
        grandTotal,
        {
          paymentMethod,
          paymentStatus: paymentMethod === "cash" ? "Pending" : "Paid",
          transactionId: newTxnId,
        }
      );

      setPaymentSuccess(true);
    } catch (err) {
      setError(err.message || "Booking failed. Please try again.");
      setProcessing(false);
    }
  };

  // ─── SUCCESS SCREEN ───
  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
        <div className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
          <div className="p-8 text-center">
            {/* Success animation */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center animate-bounce">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-white text-2xl font-black mb-1">Payment Successful!</h2>
            <p className="text-green-400 text-sm font-semibold mb-6">Your booking has been confirmed</p>

            {/* Transaction details */}
            <div className="bg-white/5 border border-white/8 rounded-2xl p-4 text-left space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-white/40 text-xs uppercase tracking-wider">Transaction ID</span>
                <span className="text-white text-xs font-bold tracking-wider">{txnId}</span>
              </div>
              <div className="h-px bg-white/8" />
              <div className="flex justify-between">
                <span className="text-white/40 text-xs uppercase tracking-wider">Vehicle</span>
                <span className="text-white text-xs font-bold">{car.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 text-xs uppercase tracking-wider">Duration</span>
                <span className="text-white text-xs font-bold">{days} Day{days !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 text-xs uppercase tracking-wider">Dates</span>
                <span className="text-white text-xs font-bold">{new Date(startDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} → {new Date(endDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 text-xs uppercase tracking-wider">Payment</span>
                <span className="text-white text-xs font-bold">{paymentMethod === "card" ? `${cardBrand} •••• ${cleanCard.slice(-4)}` : paymentMethod === "upi" ? upiId : "Cash on Pickup"}</span>
              </div>
              <div className="h-px bg-white/8" />
              <div className="flex justify-between">
                <span className="text-white text-sm font-bold">Amount Paid</span>
                <span className="text-green-400 text-lg font-black">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = "/bookings"}
                className="flex-1 py-3 bg-gradient-to-r from-[#94d2bd] to-[#7bbda8] hover:from-[#7bbda8] hover:to-[#609b8a] text-white text-xs font-bold tracking-widest uppercase rounded-xl shadow-[0_4px_20px_rgba(148,210,189,0.38)] transition-all active:scale-[0.98]"
              >
                View Bookings
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-white/5 border border-white/10 text-white/50 hover:text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── CHECKOUT FORM ───
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="relative h-32 overflow-hidden">
          <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-transparent" />
          <button onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur border border-white/10 rounded-full text-white/60 hover:text-white flex items-center justify-center text-sm transition">
            ✕
          </button>
          <div className="absolute bottom-3 left-5">
            <h2 className="text-white text-xl font-black">{car.name}</h2>
            <p className="text-[#94d2bd] text-xs font-bold tracking-wider">₹{car.price?.toLocaleString()}/day</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">Start Date</label>
              <input
                type="date"
                value={startDate}
                min={formatDate(today)}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#94d2bd]/60 transition text-sm [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">End Date</label>
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#94d2bd]/60 transition text-sm [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white/5 border border-white/8 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-white/50 text-sm">
              <span>₹{car.price?.toLocaleString()} × {days} day{days !== 1 ? "s" : ""}</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white/50 text-sm">
              <span>GST (18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="h-px bg-white/10 my-1" />
            <div className="flex justify-between text-white font-bold text-lg">
              <span>Total</span>
              <span className="text-[#94d2bd]">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-2 block">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "card", label: "💳 Card" },
                { id: "upi", label: "📱 UPI" },
                { id: "cash", label: "💵 Cash" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase border transition-all ${
                    paymentMethod === m.id
                      ? "bg-[#94d2bd]/20 border-[#94d2bd]/50 text-[#94d2bd]"
                      : "bg-white/3 border-white/8 text-white/40 hover:border-white/20"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Card Payment Details */}
          {paymentMethod === "card" && (
            <div className="space-y-3">
              {/* Test card hint */}
              <div className="bg-blue-500/10 border border-blue-500/25 rounded-xl px-3 py-2 flex items-start gap-2">
                <span className="text-blue-400 text-xs mt-0.5">💡</span>
                <p className="text-blue-300/70 text-[11px] leading-relaxed">
                  <span className="font-bold text-blue-300">Test card:</span> 4242 4242 4242 4242 · Any future expiry · Any 3-digit CVV
                </p>
              </div>

              <div>
                <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition text-sm tracking-wider pr-16"
                  />
                  {cardBrand && (
                    <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-widest px-2 py-0.5 rounded-md border ${
                      cardBrand === "VISA" ? "text-blue-400 border-blue-500/30 bg-blue-500/10" :
                      cardBrand === "MASTERCARD" ? "text-red-400 border-red-500/30 bg-red-500/10" :
                      "text-green-400 border-green-500/30 bg-green-500/10"
                    }`}>
                      {cardBrand}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="NIYAM PRAJAPATI"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition text-sm tracking-wider"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">Expiry</label>
                  <input
                    type="text"
                    placeholder="12/28"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition text-sm tracking-wider"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    maxLength={3}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition text-sm tracking-wider"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div>
              <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">UPI ID</label>
              <input
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#94d2bd]/60 transition text-sm"
              />
            </div>
          )}

          {paymentMethod === "cash" && (
            <div className="bg-[#94d2bd]/10 border border-[#94d2bd]/30 rounded-xl p-4">
              <p className="text-[#94d2bd] text-xs font-semibold mb-1">💵 Pay at Pickup</p>
              <p className="text-white/40 text-xs">You'll pay ₹{grandTotal.toLocaleString()} in cash when you pick up the vehicle.</p>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/30 rounded-xl py-2 px-3">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={processing || days <= 0}
            className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-200 ${
              processing || days <= 0
                ? "bg-gray-700 text-white/40 cursor-not-allowed"
                : "bg-gradient-to-r from-[#94d2bd] to-[#7bbda8] hover:from-[#7bbda8] hover:to-[#609b8a] text-white shadow-[0_4px_20px_rgba(148,210,189,0.38)] active:scale-[0.98]"
            }`}
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing Payment...
              </span>
            ) : (
              `Pay ₹${grandTotal.toLocaleString()} & Book`
            )}
          </button>

          <p className="text-center text-white/15 text-[10px] tracking-widest uppercase">
            🔒 Secure Payment · Instant Confirmation
          </p>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;


