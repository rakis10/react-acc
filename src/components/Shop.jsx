import React, { useState } from "react";

const Shop = ({ car, setCash ,cash,inventory, setInventory, addToLog }) => {
  const [modalMessage, setModalMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true); // Toggle for collapsing the shop

  // Prices for cases and cars
  const prices = {
    cases: { green: 50, blue: 100, red: 200 },
    cars: [
      { name: "Speedster", price: 500, stats: { speed: 7, handling: 5, stability: 5 } },
      { name: "Road King", price: 800, stats: { speed: 5, handling: 7, stability: 6 } },
      { name: "Beast", price: 1000, stats: { speed: 6, handling: 6, stability: 8 } },
      { name: "Drift Legend", price: 1200, stats: { speed: 7, handling: 8, stability: 5 } },
      { name: "Racer X", price: 1500, stats: { speed: 9, handling: 6, stability: 6 } },
    ],
  };

  // Handle case purchase
  const handleCasePurchase = (type) => {
    if (cash >= prices.cases[type]) {
      setCash((prev) => prev - prices.cases[type]);
      setInventory((prev) => ({
        ...prev,
        cases: [...prev.cases, type],
      }));
      addToLog(`Bought a ${type} case for $${prices.cases[type]}.`);
      setModalMessage(`Successfully bought a ${type} case!`);
    } else {
      setModalMessage("Not enough cash to buy this case.");
    }
  };

  // Handle car purchase
  const handleCarPurchase = (carToBuy) => {
    if (car.cash >= carToBuy.price) {
      car.cash -= carToBuy.price;
      setInventory((prev) => ({
        ...prev,
        cars: [...prev.cars, carToBuy],
      }));
      addToLog(`Bought a new car: ${carToBuy.name} for $${carToBuy.price}.`);
      setModalMessage(`Successfully bought the ${carToBuy.name}!`);
    } else {
      setModalMessage("Not enough cash to buy this car.");
    }
  };

  return (
    <div className="w-full mt-4 max-w-md p-4 bg-gray-800 rounded-lg shadow-lg text-center">
      {/* Collapsible Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Shop</h2>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Hide" : "Show"}
        </button>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <>
          {/* Case Shop */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Cases</h3>
            <div className="flex justify-around">
              {Object.keys(prices.cases).map((type) => (
                <div key={type} className="text-center">
                  <h4 className="text-lg text-green-300 capitalize">{type} Case</h4>
                  <p className="text-sm text-gray-300">Price: ${prices.cases[type]}</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mt-2"
                    onClick={() => handleCasePurchase(type)}
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Car Shop */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Cars</h3>
            <div className="grid grid-cols-1 gap-4">
              {prices.cars.map((carOption) => (
                <div key={carOption.name} className="bg-gray-700 p-3 rounded">
                  <h4 className="text-lg font-bold text-yellow-300">{carOption.name}</h4>
                  <p className="text-sm text-gray-300">
                    Speed: {carOption.stats.speed}, Handling: {carOption.stats.handling}, Stability: {carOption.stats.stability}
                  </p>
                  <p className="text-sm text-gray-300">Price: ${carOption.price}</p>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mt-2"
                    onClick={() => handleCarPurchase(carOption)}
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal for success or error messages */}
          {modalMessage && (
            <div className="mt-4 bg-gray-900 p-2 rounded text-white">
              <p>{modalMessage}</p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mt-2"
                onClick={() => setModalMessage("")}
              >
                Close
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
