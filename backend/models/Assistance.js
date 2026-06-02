import mongoose from 'mongoose';

const assistanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  type: {
    type: String,
    enum: ['Towing', 'Puncture Repair', 'Fuel Delivery', 'Battery Jump-start', 'On-site Mechanic', 'Flat Tyre', 'Engine Breakdown', 'Battery Dead', 'Accident', 'Fuel Empty', 'Key Locked Inside'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: '—'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Assistance', assistanceSchema);
