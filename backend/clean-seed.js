import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Car from './models/Car.js';
import Message from './models/Message.js';
import Booking from './models/Booking.js';
import Assistance from './models/Assistance.js';
import connectDB from './config/db.js';

dotenv.config();

const cleanAndSeed = async () => {
  try {
    await connectDB();
    
    console.log('🗑️  Clearing old data...');
    
    // Drop all collections
    await Message.deleteMany({});
    console.log('✅ Messages cleared');
    
    await Booking.deleteMany({});
    console.log('✅ Bookings cleared');
    
    await Assistance.deleteMany({});
    console.log('✅ Assistance cleared');
    
    await Car.deleteMany({});
    console.log('✅ Cars cleared');
    
    await User.deleteMany({});
    console.log('✅ Users cleared');
    
    console.log('\n📝 Creating new data...\n');
    
    // Create admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@resqueride.com',
      phone: '9999999999',
      password: 'admin123',
      status: 'Active'
    });
    await admin.save();
    console.log('✅ Admin user created');

    // Create test users
    const user1 = new User({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      address: '123 Main St, City',
      status: 'Active'
    });
    await user1.save();
    console.log('✅ Test user 1 created');

    const user2 = new User({
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543211',
      address: '456 Oak Ave, Town',
      status: 'Active'
    });
    await user2.save();
    console.log('✅ Test user 2 created');

    // Create test cars
    const cars = [
      {
        name: 'Toyota Fortuner',
        price: 3500,
        fuel: 'Diesel',
        seats: 7,
        status: 'Available',
        transmission: 'Automatic',
        description: 'Luxury SUV with premium features',
        mileage: '45000 km'
      },
      {
        name: 'Honda City',
        price: 2000,
        fuel: 'Petrol',
        seats: 5,
        status: 'Available',
        transmission: 'Manual',
        description: 'Compact sedan, fuel efficient',
        mileage: '32000 km'
      },
      {
        name: 'Maruti Swift',
        price: 1500,
        fuel: 'Petrol',
        seats: 5,
        status: 'Rented',
        transmission: 'Manual',
        description: 'Budget-friendly hatchback',
        mileage: '28000 km'
      },
      {
        name: 'Hyundai Creta',
        price: 2800,
        fuel: 'Diesel',
        seats: 5,
        status: 'Available',
        transmission: 'Automatic',
        description: 'Modern compact SUV',
        mileage: '38000 km'
      }
    ];
    await Car.insertMany(cars);
    console.log('✅ Test cars created');

    // Create test messages
    const messages = [
      {
        userId: user1._id,
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Booking Inquiry',
        message: 'I would like to book a car for next weekend. Can you provide availability?',
        status: 'Unread'
      },
      {
        userId: user2._id,
        name: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Damage Report',
        message: 'There was a small scratch on the car I rented. How should I proceed?',
        status: 'Read'
      },
      {
        name: 'Anonymous',
        email: 'contact@example.com',
        subject: 'General Inquiry',
        message: 'What are your rental rates for long-term bookings?',
        status: 'Unread'
      }
    ];
    await Message.insertMany(messages);
    console.log('✅ Test messages created');

    // Create test bookings
    const carDocs = await Car.find().limit(2);
    const bookings = [
      {
        userId: user1._id,
        carId: carDocs[0]._id,
        startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        totalPrice: 10500,
        status: 'Upcoming',
        pickup: 'Airport Terminal 1',
        driver: 'Self'
      },
      {
        userId: user2._id,
        carId: carDocs[1]._id,
        startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        totalPrice: 4000,
        status: 'Active',
        pickup: 'City Center',
        driver: 'Self'
      }
    ];
    await Booking.insertMany(bookings);
    console.log('✅ Test bookings created');

    // Create test assistance requests
    const assistance = [
      {
        userId: user1._id,
        type: 'Puncture Repair',
        description: 'Got a flat tire on the highway',
        location: 'NH-1, Near Gurgaon',
        status: 'Pending'
      },
      {
        userId: user2._id,
        type: 'Fuel Delivery',
        description: 'Ran out of fuel, need emergency fuel delivery',
        location: 'Delhi-Noida Expressway',
        status: 'In Progress'
      }
    ];
    await Assistance.insertMany(assistance);
    console.log('✅ Test assistance requests created');

    console.log('\n✅ Database cleaned and seeded successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log('Email: admin@resqueride.com');
    console.log('Password: admin123');
    
    console.log('\n📊 Data Summary:');
    console.log('- Users: 3 (1 admin + 2 test)');
    console.log('- Cars: 4');
    console.log('- Messages: 3');
    console.log('- Bookings: 2');
    console.log('- Assistance: 2');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

cleanAndSeed();
