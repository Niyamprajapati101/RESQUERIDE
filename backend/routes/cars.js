import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.js';
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/carController.js';

const router = express.Router();

// Validation middleware
const validateCar = [
  body('name', 'Car name is required').trim().notEmpty(),
  body('price', 'Price is required and must be a number').isNumeric(),
  body('fuel', 'Fuel type is required').isIn(['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']),
  body('seats', 'Seats must be a number between 1 and 10').isInt({ min: 1, max: 10 })
];

// Routes
router.get('/', getAllCars);
router.get('/:id', getCarById);
router.post('/', protect, validateCar, createCar);
router.put('/:id', protect, updateCar);
router.delete('/:id', protect, deleteCar);

export default router;
