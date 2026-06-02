import { validationResult } from 'express-validator';
import Car from '../models/Car.js';


export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    
    const formattedCars = cars.map(car => ({
      id: car._id.toString(),
      _id: car._id.toString(),
      name: car.name,
      price: car.price,
      fuel: car.fuel,
      seats: car.seats,
      status: car.status,
      image: car.image,
      description: car.description,
      transmission: car.transmission,
      mileage: car.mileage,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt
    }));

    res.status(200).json({
      success: true,
      count: formattedCars.length,
      cars: formattedCars
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch cars'
    });
  }
};


export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    const formattedCar = {
      id: car._id.toString(),
      _id: car._id.toString(),
      name: car.name,
      price: car.price,
      fuel: car.fuel,
      seats: car.seats,
      status: car.status,
      image: car.image,
      description: car.description,
      transmission: car.transmission,
      mileage: car.mileage,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt
    };

    res.status(200).json({
      success: true,
      car: formattedCar
    });
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch car'
    });
  }
};


export const createCar = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const {
      name,
      price,
      fuel,
      seats,
      status,
      image,
      description,
      transmission,
      mileage
    } = req.body;

    // Create new car
    const car = new Car({
      name,
      price,
      fuel,
      seats,
      status: status || 'Available',
      image: image || '',
      description: description || '',
      transmission: transmission || 'Manual',
      mileage: mileage || ''
    });

    // Save to database
    await car.save();

    // Format response
    const formattedCar = {
      id: car._id.toString(),
      _id: car._id.toString(),
      name: car.name,
      price: car.price,
      fuel: car.fuel,
      seats: car.seats,
      status: car.status,
      image: car.image,
      description: car.description,
      transmission: car.transmission,
      mileage: car.mileage,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt
    };

    res.status(201).json({
      success: true,
      message: 'Car created successfully',
      car: formattedCar
    });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create car'
    });
  }
};


export const updateCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Update fields if provided
    if (req.body.name !== undefined) car.name = req.body.name;
    if (req.body.price !== undefined) car.price = req.body.price;
    if (req.body.fuel !== undefined) car.fuel = req.body.fuel;
    if (req.body.seats !== undefined) car.seats = req.body.seats;
    if (req.body.status !== undefined) car.status = req.body.status;
    if (req.body.image !== undefined) car.image = req.body.image;
    if (req.body.description !== undefined) car.description = req.body.description;
    if (req.body.transmission !== undefined) car.transmission = req.body.transmission;
    if (req.body.mileage !== undefined) car.mileage = req.body.mileage;

    car.updatedAt = new Date();
    await car.save();

    // Format response
    const formattedCar = {
      id: car._id.toString(),
      _id: car._id.toString(),
      name: car.name,
      price: car.price,
      fuel: car.fuel,
      seats: car.seats,
      status: car.status,
      image: car.image,
      description: car.description,
      transmission: car.transmission,
      mileage: car.mileage,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt
    };

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      car: formattedCar
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update car'
    });
  }
};


export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete car'
    });
  }
};
