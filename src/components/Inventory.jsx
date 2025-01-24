import React from "react";
import { use } from "react";

const Inventory = ({ inventory, openBox, applyUpgrade }) => {
  const boxColors = {
    green: "bg-green-500 hover:bg-green-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
  };

  const upgradeColors = {
    Green: "text-green-400",
    Blue: "text-blue-400",
    Red: "text-red-400",
  };

  return (
    <div className="mt-4 w-full max-w-md bg-gray-800 rounded-lg p-4 shadow-lg">
      <h3 className="text-xl font-bold mb-2">Inventory</h3>
      {inventory?.cases?.length > 0 ? (
        <div className="grid grid-cols-1 gap-2">
          {inventory.cases.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-700 rounded-lg p-2"
            >
              {["green", "blue", "red"].includes(item) ? (
                <button
                  className={`${boxColors[item]} text-white font-bold py-1 px-3 rounded transition`}
                  onClick={() => openBox(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)} Box
                </button>
              ) : (
                <>
                  <span
                    className={`font-bold ${upgradeColors[item.split(" ")[0]]}`}
                  >
                    {item}
                  </span>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded transition"
                    onClick={() => applyUpgrade(item)}
                  >
                    Apply
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No items in inventory.</p>
      )}
      {inventory?.items?.length > 0 ? (
        <div className="grid grid-cols-1 gap-2">
          {inventory.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-700 rounded-lg p-2"
            >
              <>
                <span
                  className={`font-bold ${upgradeColors[item.split(" ")[0]]}`}
                >
                  {item}
                </span>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded transition"
                  onClick={() => applyUpgrade(item)}
                >
                  Apply
                </button>
              </>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No items in inventory.</p>
      )}
    </div>
  );
};

export default Inventory;
