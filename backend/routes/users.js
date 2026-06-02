import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.js';
import {
  registerUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Validation middleware
const validateLogin = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
];

// Routes
router.post('/register', registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router;
