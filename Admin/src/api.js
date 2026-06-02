const BASE = "http://localhost:5000";

// Helper to get token from localStorage
const getToken = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    console.warn('⚠️ NO TOKEN IN LOCALSTORAGE - User may not be logged in');
  }
  return token;
};

// Helper to make authenticated requests
const fetchWithAuth = (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log('✅ Adding Authorization header with token');
  } else {
    console.error('❌ NO TOKEN - Request will fail!');
  }
  
  console.log('📤 Request to:', url);
  console.log('📤 Headers:', { Authorization: token ? 'Bearer ' + token.substring(0, 20) + '...' : 'NONE' });
  
  return fetch(url, { ...options, headers });
};

export const api = {
  // Test endpoint
  testBackend: () => {
    console.log('🧪 Testing backend connection...');
    return fetch(`${BASE}/api/health`)
      .then(r => r.json())
      .then(d => {
        console.log('✅ Backend response:', d);
        return d;
      })
      .catch(e => {
        console.error('❌ Backend error:', e);
        return null;
      });
  },

  // Auth
  login: (email, password) => {
    console.log('🔐 Attempting login with:', email);
    return fetch(`${BASE}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(r => {
      console.log('📥 Login response status:', r.status);
      return r.json();
    })
    .then(d => {
      console.log('🔐 Login response:', d);
      if (d.success && d.token) {
        console.log('✅ Token received:', d.token.substring(0, 20) + '...');
        localStorage.setItem('adminToken', d.token);
        console.log('✅ Token stored in localStorage');
        
        // Verify it was stored
        const verify = localStorage.getItem('adminToken');
        console.log('✅ Verification - Token in storage:', verify ? 'YES' : 'NO');
      } else {
        console.error('❌ No token in response:', d);
      }
      return d;
    })
    .catch(e => {
      console.error('❌ Login error:', e);
      throw e;
    });
  },

  // Test endpoint to verify token
  testToken: () => {
    const token = localStorage.getItem('adminToken');
    console.log('🧪 Testing token...');
    console.log('Token exists:', token ? 'YES' : 'NO');
    if (token) {
      console.log('Token value:', token.substring(0, 30) + '...');
    }
    return token;
  },

  // Bookings
  getBookings:      () => fetchWithAuth(`${BASE}/api/bookings`).then(r => r.json()).then(d => {
    if (d.success && d.bookings) {
      return d.bookings.map(b => ({
        id: b.id || b._id,
        _id: b._id,
        car: b.carId?.name || b.car || 'Unknown',
        from: b.startDate || b.from || '—',
        to: b.endDate || b.to || '—',
        days: b.days || 0,
        total: b.totalPrice || b.total || 0,
        status: b.status || 'Pending',
        userId: b.userId,
        carId: b.carId,
        pickup: b.pickup || '—',
        driver: b.driver || '—',
        fuel: b.fuel || '—',
        seats: b.seats || '—'
      }));
    }
    return [];
  }),
  updateBooking:    (id, data) => fetchWithAuth(`${BASE}/api/bookings/${id}`, { method: "PUT", body: JSON.stringify(data) }).then(r => r.json()).then(d => {
    if (d.success && d.booking) {
      return { ...d.booking, id: d.booking.id || d.booking._id };
    }
    throw new Error(d.message || 'Failed to update booking');
  }),
  deleteBooking:    (id) => fetchWithAuth(`${BASE}/api/bookings/${id}`, { method: "DELETE" }).then(r => r.json()),

  // Users
  getUsers:         () => fetchWithAuth(`${BASE}/api/users`).then(r => r.json()).then(d => {
    if (d.success && d.users) {
      return d.users.map(u => ({
        id: u.id || u._id,
        _id: u._id,
        name: u.name || 'Unknown',
        email: u.email || '—',
        phone: u.phone || '—',
        address: u.address || '—',
        status: u.status || 'Active',
        bookings: u.bookings || 0,
        joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'
      }));
    }
    return [];
  }),
  updateUser:       (id, data) => fetchWithAuth(`${BASE}/api/users/${id}`, { method: "PUT", body: JSON.stringify(data) }).then(r => r.json()).then(d => {
    if (d.success && d.user) {
      return { ...d.user, id: d.user.id || d.user._id };
    }
    throw new Error(d.message || 'Failed to update user');
  }),

  // Cars
  getCars:          () => fetch(`${BASE}/api/cars`).then(r => r.json()).then(d => d.cars || []),
  addCar:           (data) => {
    console.log('📤 Sending car data:', data);
    return fetchWithAuth(`${BASE}/api/cars`, { method: "POST", body: JSON.stringify(data) })
      .then(r => {
        console.log('📥 Response status:', r.status);
        return r.json();
      })
      .then(d => {
        console.log('📥 Response data:', d);
        if (d.success && d.car) {
          console.log('✅ Car added successfully');
          return { ...d.car, id: d.car.id || d.car._id };
        }
        throw new Error(d.message || 'Failed to add car');
      })
      .catch(e => {
        console.error('❌ Error adding car:', e);
        throw e;
      });
  },
  updateCar:        (id, data) => fetchWithAuth(`${BASE}/api/cars/${id}`, { method: "PUT", body: JSON.stringify(data) }).then(r => r.json()).then(d => {
    if (d.success && d.car) {
      return { ...d.car, id: d.car.id || d.car._id };
    }
    throw new Error(d.message || 'Failed to update car');
  }),
  deleteCar:        (id) => fetchWithAuth(`${BASE}/api/cars/${id}`, { method: "DELETE" }).then(r => r.json()),

  // Assistance
  getAssistance:    () => fetchWithAuth(`${BASE}/api/assistance`).then(r => {
    console.log('📥 Assistance response status:', r.status);
    return r.json();
  }).then(d => {
    console.log('📥 Assistance response data:', d);
    if (d.success && d.assistance) {
      console.log('✅ Assistance count:', d.assistance.length);
      return d.assistance.map(a => ({
        id: a.id || a._id,
        _id: a._id,
        issue: a.type || a.issue || 'Unknown',
        user: a.userId?.name || a.user || 'Unknown',
        phone: a.userId?.phone || a.phone || '—',
        car: a.car || 'Unknown',
        location: a.location || '—',
        description: a.description || '—',
        status: a.status || 'Pending',
        date: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '—',
        userId: a.userId
      }));
    }
    console.error('❌ Assistance response error:', d);
    return [];
  }).catch(e => {
    console.error('❌ Assistance fetch error:', e);
    return [];
  }),
  updateAssistance: (id, data) => fetchWithAuth(`${BASE}/api/assistance/${id}`, { method: "PUT", body: JSON.stringify(data) }).then(r => r.json()).then(d => {
    if (d.success && d.assistance) {
      return { ...d.assistance, id: d.assistance.id || d.assistance._id };
    }
    throw new Error(d.message || 'Failed to update assistance');
  }),

  // Messages
  getMessages:      () => fetchWithAuth(`${BASE}/api/messages`).then(r => {
    console.log('📥 Messages response status:', r.status);
    return r.json();
  }).then(d => {
    console.log('📥 Messages response data:', d);
    if (d.success && d.messages) {
      console.log('✅ Messages count:', d.messages.length);
      return d.messages.map(m => ({
        id: m.id || m._id,
        _id: m._id,
        name: m.name || 'Unknown',
        email: m.email || '—',
        subject: m.subject || '—',
        message: m.message || '—',
        status: m.status || 'Unread',
        read: m.status === 'Read',
        date: m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '—'
      }));
    }
    console.error('❌ Messages response error:', d);
    return [];
  }).catch(e => {
    console.error('❌ Messages fetch error:', e);
    return [];
  }),
  updateMessage:    (id, data) => {
    // Convert read boolean to status string
    const updateData = { ...data };
    if (data.read !== undefined) {
      updateData.status = data.read ? 'Read' : 'Unread';
      delete updateData.read;
    }
    return fetchWithAuth(`${BASE}/api/messages/${id}`, { method: "PUT", body: JSON.stringify(updateData) }).then(r => r.json()).then(d => {
      if (d.success && d.data) {
        return { ...d.data, id: d.data.id || d.data._id };
      }
      throw new Error(d.message || 'Failed to update message');
    });
  },
  deleteMessage:    (id) => fetchWithAuth(`${BASE}/api/messages/${id}`, { method: "DELETE" }).then(r => r.json()),
};

