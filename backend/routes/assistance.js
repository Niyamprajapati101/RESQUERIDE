import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getAllAssistance,
  getAssistanceById,
  createAssistance,
  updateAssistance,
  deleteAssistance
} from '../controllers/assistanceController.js';

const router = express.Router();

// Routes
router.get('/', protect, getAllAssistance);
router.get('/:id', protect, getAssistanceById);
router.post('/', createAssistance);
router.put('/:id', protect, updateAssistance);
router.delete('/:id', protect, deleteAssistance);

export default router;
