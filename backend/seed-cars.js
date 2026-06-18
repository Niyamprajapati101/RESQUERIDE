import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from './models/Car.js';

dotenv.config();

const indianCars = [
  {
    name: "Maruti Suzuki Swift Dzire",
    price: 1800,
    fuel: "Petrol",
    seats: 5,
    status: "Available",
    image: "/cars/swift.jpeg",
    description: "India's most popular sedan for city rides and outstation trips. Fuel-efficient and comfortable.",
    transmission: "Manual",
    mileage: "23.26 km/l"
  },
  {
    name: "Toyota Innova Crysta",
    price: 4500,
    fuel: "Diesel",
    seats: 7,
    status: "Available",
    image: "/cars/C1.jpg",
    description: "The ultimate Indian MPV. Spacious, powerful, and the king of highway travel.",
    transmission: "Automatic",
    mileage: "15.1 km/l"
  },
  {
    name: "Hyundai Creta",
    price: 3200,
    fuel: "Petrol",
    seats: 5,
    status: "Available",
    image: "/cars/C2.png",
    description: "Premium compact SUV with sunroof, ADAS features, and a bold design.",
    transmission: "Automatic",
    mileage: "17.4 km/l"
  },
  {
    name: "Mahindra Thar",
    price: 3800,
    fuel: "Diesel",
    seats: 4,
    status: "Available",
    image: "/cars/thar.jpeg",
    description: "Adventure-ready off-roader. Perfect for mountain trips and rough terrain.",
    transmission: "Manual",
    mileage: "15.2 km/l"
  },
  {
    name: "Maruti Suzuki Ertiga",
    price: 2500,
    fuel: "CNG",
    seats: 7,
    status: "Available",
    image: "/cars/ertiga.jpeg",
    description: "Budget-friendly 7-seater MPV. Great for family trips with excellent CNG mileage.",
    transmission: "Manual",
    mileage: "26.1 km/kg (CNG)"
  },
  {
    name: "Toyota Fortuner",
    price: 6500,
    fuel: "Diesel",
    seats: 7,
    status: "Available",
    image: "/cars/C3.jpg",
    description: "Dominating premium SUV with 4x4 capability. Built for power and luxury.",
    transmission: "Automatic",
    mileage: "14.4 km/l"
  },
  {
    name: "Hyundai i20",
    price: 1500,
    fuel: "Petrol",
    seats: 5,
    status: "Available",
    image: "/cars/i20.jpeg",
    description: "Stylish premium hatchback with connected car tech and sporty looks.",
    transmission: "Manual",
    mileage: "20.35 km/l"
  },
  {
    name: "Kia Seltos",
    price: 3000,
    fuel: "Petrol",
    seats: 5,
    status: "Available",
    image: "/cars/C4.jpg",
    description: "Feature-loaded compact SUV with panoramic sunroof and turbocharged engine.",
    transmission: "Automatic",
    mileage: "17.7 km/l"
  },
  {
    name: "Maruti Suzuki WagonR",
    price: 1200,
    fuel: "CNG",
    seats: 5,
    status: "Available",
    image: "/cars/wagonar.jpeg",
    description: "India's best-selling tall-boy hatchback. Incredibly affordable and spacious for its size.",
    transmission: "Manual",
    mileage: "34.05 km/kg (CNG)"
  },
  {
    name: "Tata Nexon",
    price: 2200,
    fuel: "Petrol",
    seats: 5,
    status: "Available",
    image: "/cars/C5.jpg",
    description: "5-star safety rated compact SUV. Bold design with strong build quality.",
    transmission: "Manual",
    mileage: "17.4 km/l"
  },
  {
    name: "Tata Nexon EV",
    price: 2800,
    fuel: "Electric",
    seats: 5,
    status: "Available",
    image: "/cars/tata nexon EV.jpeg",
    description: "India's best-selling electric SUV. 312 km range with fast charging support.",
    transmission: "Automatic",
    mileage: "312 km range"
  },
  {
    name: "Mahindra XUV700",
    price: 4000,
    fuel: "Diesel",
    seats: 7,
    status: "Available",
    image: "/cars/C6.jpg",
    description: "Tech-loaded premium SUV with ADAS, panoramic sunroof, and powerful engine.",
    transmission: "Automatic",
    mileage: "16 km/l"
  },
  {
    name: "Honda City",
    price: 2400,
    fuel: "Petrol",
    seats: 5,
    status: "Available",
    image: "/cars/honda city.jpeg",
    description: "India's premium sedan with Honda's legendary reliability. Smooth and refined.",
    transmission: "Automatic",
    mileage: "18.4 km/l"
  },
  {
    name: "Maruti Suzuki Brezza",
    price: 2000,
    fuel: "Petrol",
    seats: 5,
    status: "Available",
    image: "/cars/brezaa.jpeg",
    description: "Best-selling compact SUV with sunroof and heads-up display. Great value for money.",
    transmission: "Manual",
    mileage: "19.8 km/l"
  },
  {
    name: "Toyota Innova Hycross",
    price: 5500,
    fuel: "Petrol",
    seats: 7,
    status: "Available",
    image: "/cars/innvo hycros.jpeg",
    description: "Next-gen hybrid MPV with self-charging technology. Premium comfort with low running cost.",
    transmission: "Automatic",
    mileage: "21.1 km/l (Hybrid)"
  }
];

async function seedCars() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not configured');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update the known fleet without deleting cars created through the admin.
    const operations = indianCars.map((car) => ({
      updateOne: {
        filter: { name: car.name },
        update: { $set: { ...car, updatedAt: new Date() } },
        upsert: true
      }
    }));
    console.log(`Preparing ${operations.length} car records`);

    // Insert missing cars and refresh existing records.
    const result = await Car.bulkWrite(operations);
    console.log(`Upserted ${result.upsertedCount} and updated ${result.modifiedCount} car records`);
    console.log(`Seeded ${indianCars.length} Indian cars:`);
    indianCars.forEach((car, i) => {
      console.log(`   ${i + 1}. ${car.name} - Rs ${car.price}/day - ${car.fuel} - ${car.seats} seats`);
    });

    await mongoose.connection.close();
    console.log('\nDatabase seeded and connection closed');
    process.exit(0);
  } catch (error) {
    await mongoose.connection.close().catch(() => {});
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

seedCars();
