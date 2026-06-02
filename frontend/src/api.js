const BASE = "https://resqueride.onrender.com/api";

// Helper to get auth headers with JWT token
const getHeaders = () => {
  const user = JSON.parse(sessionStorage.getItem("rq_user") || "null");
  const token = user?.token;
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Auth
  login:          (email, password) => fetch(`${BASE}/users/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }).then(r => r.json()),
  register:       (data) => fetch(`${BASE}/users/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),

  // Bookings
  getBookings:    () => fetch(`${BASE}/bookings`, { headers: getHeaders() }).then(r => r.json()),
  addBooking:     (data) => fetch(`${BASE}/bookings`, { method: "POST", headers: getHeaders(), body: JSON.stringify(data) }).then(r => r.json()),
  updateBooking:  (id, data) => fetch(`${BASE}/bookings/${id}`, { method: "PUT", headers: getHeaders(), body: JSON.stringify(data) }).then(r => r.json()),

  // Users
  getUsers:       () => fetch(`${BASE}/users`, { headers: getHeaders() }).then(r => r.json()),
  addUser:        (data) => fetch(`${BASE}/users`, { method: "POST", headers: getHeaders(), body: JSON.stringify(data) }).then(r => r.json()),

  // Cars
  getCars:        () => fetch(`${BASE}/cars`, { headers: getHeaders() }).then(r => r.json()),
  updateCar:      (id, data) => fetch(`${BASE}/cars/${id}`, { method: "PUT", headers: getHeaders(), body: JSON.stringify(data) }).then(r => r.json()),

  // Assistance
  getAssistance:  () => fetch(`${BASE}/assistance`, { headers: getHeaders() }).then(r => r.json()),
  addAssistance:  (data) => fetch(`${BASE}/assistance`, { method: "POST", headers: getHeaders(), body: JSON.stringify(data) }).then(r => r.json()),

  // Messages
  getMessages:    () => fetch(`${BASE}/messages`, { headers: getHeaders() }).then(r => r.json()),
  addMessage:     (data) => fetch(`${BASE}/messages`, { method: "POST", headers: getHeaders(), body: JSON.stringify(data) }).then(r => r.json()),
  deleteMessage:  (id) => fetch(`${BASE}/messages/${id}`, { method: "DELETE", headers: getHeaders() }),
  updateMessage:  (id, data) => fetch(`${BASE}/messages/${id}`, { method: "PATCH", headers: getHeaders(), body: JSON.stringify(data) }).then(r => r.json()),
};


