import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage
} from '../controllers/messageController.js';

const router = express.Router();

// Routes
router.get('/', protect, getAllMessages);
router.get('/:id', protect, getMessageById);
router.post('/', createMessage);
router.put('/:id', protect, updateMessage);
router.delete('/:id', protect, deleteMessage);

export default router;
