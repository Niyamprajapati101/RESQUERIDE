// Read from localStorage (shared with frontend)
export const getBookings = () => {
  try { return JSON.parse(localStorage.getItem("rq_bookings") || "[]"); } catch { return []; }
};

export const getUsers = () => {
  try { return JSON.parse(localStorage.getItem("rq_users") || "[]"); } catch { return []; }
};

export const getAssistance = () => {
  try { return JSON.parse(localStorage.getItem("rq_assistance") || "[]"); } catch { return []; }
};

export const saveBookings = (data) => localStorage.setItem("rq_bookings", JSON.stringify(data));
export const saveUsers = (data) => localStorage.setItem("rq_users", JSON.stringify(data));
export const saveAssistance = (data) => localStorage.setItem("rq_assistance", JSON.stringify(data));

