import React from "react";

const Car = ({ car }) => {
  const upgradeColors = {
    Green: "text-green-400",
    Blue: "text-blue-400",
    Red: "text-red-400",
  };

  return (
    <div className="mt-4 w-full max-w-md bg-gray-800 rounded-lg p-4 shadow-lg">
      <h3 className="text-xl font-bold mb-2">Your Car</h3>
      <p className="text-lg mb-2">{car.name}</p>
      <div className="mb-2">
        {Object.entries(car.stats).map(([stat, value]) => (
          <p key={stat} className="text-sm text-gray-300 capitalize">
            {stat}: <span className="text-white font-bold">{value}</span>
          </p>
        ))}
      </div>
      <h4 className="text-lg font-bold mb-2">Upgrades:</h4>
      <ul>
        {Object.entries(car.upgrades).length > 0 ? (
          Object.entries(car.upgrades).map(([type, rarity]) => (
            <li key={type} className="text-sm">
              {type}: <span className={`${upgradeColors[rarity]} font-bold`}>{rarity}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No upgrades applied yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Car;
