import React, { useState } from "react";
import District from "./components/District";
import Log from "./components/Log";
import Inventory from "./components/Inventory";

const App = () => {
  const [district, setDistrict] = useState(1); // Track current district
  const [cash, setCash] = useState(0); // Player's cash
  const [inventory, setInventory] = useState([]); // Reward boxes
  const [car, setCar] = useState({ name: "Starter Car", stats: { speed: 5, acceleration: 4, handling: 6, stability: 5, toughness: 5 }, upgrades: {} });
  const [log, setLog] = useState([]); // Log messages

  const handleDistrictComplete = (rewards) => {
    setCash((prev) => prev + rewards.cash);
    setInventory((prev) => [...prev, ...rewards.items]);
    setLog((prev) => [...prev, `District ${district} completed! Won $${rewards.cash} and items: ${rewards.items.join(", ")}`]);
    setDistrict((prev) => prev + 1);
  };

  const addToLog = (message) => setLog((prev) => [...prev, message]);

  const openBox = (type) => {
    const rewards = {
      green: ["Green Tire Upgrade", "Green Engine Upgrade"],
      blue: ["Blue Turbo Upgrade", "Blue Suspension Upgrade"],
      red: ["Red Engine Upgrade", "Red Nitro Booster"],
    };

    const item = rewards[type][Math.floor(Math.random() * rewards[type].length)];
    setInventory((prev) => prev.filter((box) => box !== type)); // Remove the box
    setLog((prev) => [...prev, `Opened a ${type} box and received: ${item}`]);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">District {district}</h1>
      <h2 className="text-xl mb-2">Cash: <span className="text-green-400">${cash}</span></h2>
      <h3 className="text-lg mb-4">Current Car: <span className="text-blue-300">{car.name}</span></h3>
      <District district={district} onComplete={handleDistrictComplete} car={car} addToLog={addToLog} />
      <Inventory inventory={inventory} openBox={openBox} />
      <Log log={log} />
    </div>
  );
};

export default App;
