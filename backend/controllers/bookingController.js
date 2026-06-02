import Booking from '../models/Booking.js';

const createBookingId = () => `BK${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 900 + 100)}`;

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email phone')
      .populate('carId', 'name price fuel seats image')
      .sort({ createdAt: -1 });

    const formattedBookings = bookings.map(booking => ({
      id: booking._id.toString(),
      _id: booking._id.toString(),
      bookingId: booking.bookingId || booking._id.toString(),
      userId: booking.userId ? (booking.userId._id || booking.userId).toString() : null,
      userName: booking.userId?.name || 'Guest',
      carId: booking.carId ? (booking.carId._id || booking.carId).toString() : null,
      car: booking.carId?.name || 'Unknown',
      from: booking.startDate ? new Date(booking.startDate).toLocaleDateString() : '—',
      to: booking.endDate ? new Date(booking.endDate).toLocaleDateString() : '—',
      days: Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)) || 0,
      totalPrice: booking.totalPrice || 0,
      total: booking.totalPrice || 0,
      paymentMethod: booking.paymentMethod || 'card',
      paymentStatus: booking.paymentStatus || 'Paid',
      transactionId: booking.transactionId || '',
      pricePerDay: booking.carId?.price || 0,
      image: booking.carId?.image || null,
      status: booking.status || 'Pending',
      startDate: booking.startDate,
      endDate: booking.endDate,
      pickup: booking.pickup || '—',
      driver: booking.driver || '—',
      fuel: booking.carId?.fuel || '—',
      seats: booking.carId?.seats || '—',
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    }));

    res.status(200).json({
      success: true,
      count: formattedBookings.length,
      bookings: formattedBookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch bookings'
    });
  }
};


export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('carId', 'name price fuel seats');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const formattedBooking = {
      id: booking._id.toString(),
      _id: booking._id.toString(),
      bookingId: booking.bookingId || booking._id.toString(),
      userId: booking.userId ? (booking.userId._id || booking.userId).toString() : null,
      userName: booking.userId?.name || 'Guest',
      carId: booking.carId ? (booking.carId._id || booking.carId).toString() : null,
      startDate: booking.startDate,
      endDate: booking.endDate,
      totalPrice: booking.totalPrice,
      status: booking.status,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    };

    res.status(200).json({
      success: true,
      booking: formattedBooking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch booking'
    });
  }
};


export const createBooking = async (req, res) => {
  try {
    const { userId, carId, startDate, endDate, totalPrice, paymentMethod, paymentStatus, transactionId } = req.body;

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: carId, startDate, endDate'
      });
    }

    const booking = new Booking({
      bookingId: createBookingId(),
      userId: userId || null,
      carId,
      startDate,
      endDate,
      totalPrice: totalPrice || 0,
      paymentMethod: paymentMethod || 'card',
      paymentStatus: paymentStatus || 'Paid',
      transactionId: transactionId || '',
      status: 'Upcoming'
    });

    await booking.save();
    await booking.populate('userId', 'name email phone');
    await booking.populate('carId', 'name price fuel seats');

    const formattedBooking = {
      id: booking._id.toString(),
      _id: booking._id.toString(),
      bookingId: booking.bookingId || booking._id.toString(),
      userId: booking.userId ? (booking.userId._id || booking.userId).toString() : null,
      userName: booking.userId?.name || 'Guest',
      carId: booking.carId ? (booking.carId._id || booking.carId).toString() : null,
      startDate: booking.startDate,
      endDate: booking.endDate,
      totalPrice: booking.totalPrice,
      paymentMethod: booking.paymentMethod,
      paymentStatus: booking.paymentStatus,
      transactionId: booking.transactionId,
      status: booking.status,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    };

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: formattedBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create booking'
    });
  }
};


export const updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update fields if provided
    if (req.body.status !== undefined) booking.status = req.body.status;
    if (req.body.startDate !== undefined) booking.startDate = req.body.startDate;
    if (req.body.endDate !== undefined) booking.endDate = req.body.endDate;
    if (req.body.totalPrice !== undefined) booking.totalPrice = req.body.totalPrice;
    if (req.body.paymentMethod !== undefined) booking.paymentMethod = req.body.paymentMethod;
    if (req.body.paymentStatus !== undefined) booking.paymentStatus = req.body.paymentStatus;
    if (req.body.transactionId !== undefined) booking.transactionId = req.body.transactionId;

    booking.updatedAt = new Date();
    await booking.save();
    await booking.populate('userId', 'name email phone');
    await booking.populate('carId', 'name price fuel seats');

    const formattedBooking = {
      id: booking._id.toString(),
      _id: booking._id.toString(),
      bookingId: booking.bookingId || booking._id.toString(),
      userId: booking.userId ? (booking.userId._id || booking.userId).toString() : null,
      userName: booking.userId?.name || 'Guest',
      carId: booking.carId ? (booking.carId._id || booking.carId).toString() : null,
      startDate: booking.startDate,
      endDate: booking.endDate,
      totalPrice: booking.totalPrice,
      paymentMethod: booking.paymentMethod,
      paymentStatus: booking.paymentStatus,
      transactionId: booking.transactionId,
      status: booking.status,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    };

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking: formattedBooking
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update booking'
    });
  }
};


export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete booking'
    });
  }
};
