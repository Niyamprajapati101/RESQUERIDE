import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a car name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price per day']
  },
  fuel: {
    type: String,
    enum: ['Petrol', 'Diesel', 'CNG', 'Electric'],
    required: [true, 'Please specify fuel type']
  },
  seats: {
    type: Number,
    required: [true, 'Please provide number of seats'],
    min: 1,
    max: 10
  },
  status: {
    type: String,
    enum: ['Available', 'Rented', 'Maintenance'],
    default: 'Available'
  },
  image: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: ''
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic'],
    default: 'Manual'
  },
  mileage: {
    type: String,
    default: ''
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

export default mongoose.model('Car', carSchema);
