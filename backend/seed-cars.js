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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130583/dzire-2024-exterior-right-front-three-quarter-2.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/140809/innova-crysta-exterior-right-front-three-quarter-2.png",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-5.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-front-three-quarter-76.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/115777/ertiga-exterior-right-front-three-quarter-2.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-20.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/150603/i20-exterior-right-front-three-quarter-2.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/174323/seltos-exterior-right-front-three-quarter-2.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/159099/wagonr-exterior-right-front-three-quarter.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-ev-exterior-right-front-three-quarter-3.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter-3.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-2.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/132427/brezza-exterior-right-front-three-quarter-2.jpeg",
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
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/112207/innova-hycross-exterior-right-front-three-quarter-2.jpeg",
    description: "Next-gen hybrid MPV with self-charging technology. Premium comfort with low running cost.",
    transmission: "Automatic",
    mileage: "21.1 km/l (Hybrid)"
  }
];

async function seedCars() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Remove existing cars
    await Car.deleteMany({});
    console.log('🗑️  Cleared existing cars');

    // Insert new cars
    const inserted = await Car.insertMany(indianCars);
    console.log(`✅ Successfully added ${inserted.length} Indian cars:`);
    inserted.forEach((car, i) => {
      console.log(`   ${i + 1}. ${car.name} — ₹${car.price}/day — ${car.fuel} — ${car.seats} seats`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database seeded and connection closed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
}

seedCars();
