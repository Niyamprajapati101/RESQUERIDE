import brezza from "../assets/CARS/brezaa.jpeg";
import ertiga from "../assets/CARS/ertiga.jpeg";
import hondaCity from "../assets/CARS/honda city.jpeg";
import i20 from "../assets/CARS/i20.jpeg";
import innovaHycross from "../assets/CARS/innvo hycros.jpeg";
import swift from "../assets/CARS/swift.jpeg";
import nexonEv from "../assets/CARS/tata nexon EV.jpeg";
import thar from "../assets/CARS/thar.jpeg";
import wagonr from "../assets/CARS/wagonar.jpeg";

const carImageByName = {
  "Maruti Suzuki Brezza": brezza,
  "Maruti Suzuki Ertiga": ertiga,
  "Honda City": hondaCity,
  "Hyundai i20": i20,
  "Toyota Innova Hycross": innovaHycross,
  "Maruti Suzuki Swift Dzire": swift,
  "Tata Nexon EV": nexonEv,
  "Mahindra Thar": thar,
  "Maruti Suzuki WagonR": wagonr,
};

export function getCarImage(name, fallback) {
  return carImageByName[name] || fallback || "https://via.placeholder.com/400x250?text=Car";
}



