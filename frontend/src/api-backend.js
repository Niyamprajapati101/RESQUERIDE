// Backend API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  // Add token if available
  const token = getToken();
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'API Error');
    }
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============ USER ENDPOINTS ============

export const registerUser = (userData) => {
  return apiCall('/users/register', 'POST', userData);
};

export const loginUser = (credentials) => {
  return apiCall('/users/login', 'POST', credentials);
};

export const getUser = (userId) => {
  return apiCall(`/users/${userId}`, 'GET');
};

export const getAllUsers = () => {
  return apiCall('/users', 'GET');
};

export const updateUser = (userId, userData) => {
  return apiCall(`/users/${userId}`, 'PUT', userData);
};

export const deleteUser = (userId) => {
  return apiCall(`/users/${userId}`, 'DELETE');
};

// ============ CAR ENDPOINTS ============

export const getAllCars = () => {
  return apiCall('/cars', 'GET');
};

export const getCarById = (carId) => {
  return apiCall(`/cars/${carId}`, 'GET');
};

export const createCar = (carData) => {
  return apiCall('/cars', 'POST', carData);
};

export const updateCar = (carId, carData) => {
  return apiCall(`/cars/${carId}`, 'PUT', carData);
};

export const deleteCar = (carId) => {
  return apiCall(`/cars/${carId}`, 'DELETE');
};

// ============ BOOKING ENDPOINTS ============

export const getAllBookings = () => {
  return apiCall('/bookings', 'GET');
};

export const getBookingById = (bookingId) => {
  return apiCall(`/bookings/${bookingId}`, 'GET');
};

export const getUserBookings = (userId) => {
  return apiCall(`/bookings/user/${userId}`, 'GET');
};

export const createBooking = (bookingData) => {
  return apiCall('/bookings', 'POST', bookingData);
};

export const updateBooking = (bookingId, bookingData) => {
  return apiCall(`/bookings/${bookingId}`, 'PUT', bookingData);
};

export const deleteBooking = (bookingId) => {
  return apiCall(`/bookings/${bookingId}`, 'DELETE');
};

// ============ ASSISTANCE ENDPOINTS ============

export const getAllAssistance = () => {
  return apiCall('/assistance', 'GET');
};

export const getAssistanceById = (assistanceId) => {
  return apiCall(`/assistance/${assistanceId}`, 'GET');
};

export const createAssistance = (assistanceData) => {
  return apiCall('/assistance', 'POST', assistanceData);
};

export const updateAssistance = (assistanceId, assistanceData) => {
  return apiCall(`/assistance/${assistanceId}`, 'PUT', assistanceData);
};

export const deleteAssistance = (assistanceId) => {
  return apiCall(`/assistance/${assistanceId}`, 'DELETE');
};

// ============ MESSAGE ENDPOINTS ============

export const getAllMessages = () => {
  return apiCall('/messages', 'GET');
};

export const getMessageById = (messageId) => {
  return apiCall(`/messages/${messageId}`, 'GET');
};

export const createMessage = (messageData) => {
  return apiCall('/messages', 'POST', messageData);
};

export const updateMessage = (messageId, messageData) => {
  return apiCall(`/messages/${messageId}`, 'PUT', messageData);
};

export const deleteMessage = (messageId) => {
  return apiCall(`/messages/${messageId}`, 'DELETE');
};

// ============ UTILITY FUNCTIONS ============

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};


