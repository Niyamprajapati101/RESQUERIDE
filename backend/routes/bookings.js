import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
} from '../controllers/bookingController.js';

const router = express.Router();

// Routes
router.get('/', protect, getAllBookings);
router.get('/:id', protect, getBookingById);
router.post('/', createBooking);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

export default router;
