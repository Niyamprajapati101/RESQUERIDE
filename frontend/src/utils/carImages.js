const imageByCarName = {
  "Maruti Suzuki Swift Dzire": "/cars/swift.jpeg",
  "Toyota Innova Crysta": "/cars/C1.jpg",
  "Hyundai Creta": "/cars/C2.png",
  "Mahindra Thar": "/cars/thar.jpeg",
  "Maruti Suzuki Ertiga": "/cars/ertiga.jpeg",
  "Toyota Fortuner": "/cars/C3.jpg",
  "Hyundai i20": "/cars/i20.jpeg",
  "Kia Seltos": "/cars/C4.jpg",
  "Maruti Suzuki WagonR": "/cars/wagonar.jpeg",
  "Tata Nexon": "/cars/C5.jpg",
  "Tata Nexon EV": "/cars/tata nexon EV.jpeg",
  "Mahindra XUV700": "/cars/C6.jpg",
  "Honda City": "/cars/honda city.jpeg",
  "Maruti Suzuki Brezza": "/cars/brezaa.jpeg",
  "Toyota Innova Hycross": "/cars/innvo hycros.jpeg",
};

export const CAR_IMAGE_FALLBACK = "/cars/C1.jpg";

export function getCarImage(name, image) {
  return image || imageByCarName[name] || CAR_IMAGE_FALLBACK;
}

