import React from "react";

const Inventory = ({ inventory, openBox }) => {
  const boxColors = {
    green: "bg-green-500 hover:bg-green-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
  };

  return (
    <div className="mt-4 w-full max-w-md bg-gray-800 rounded-lg p-4 shadow-lg">
      <h3 className="text-xl font-bold mb-2">Inventory</h3>
      {inventory.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {inventory.map((box, index) => (
            <button
              key={index}
              className={`${boxColors[box]} text-white font-bold py-2 px-4 rounded transition`}
              onClick={() => openBox(box)}
            >
              {box.charAt(0).toUpperCase() + box.slice(1)} Box
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No reward boxes available.</p>
      )}
    </div>
  );
};

export default Inventory;
