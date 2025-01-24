import React from "react";

const Log = ({ log }) => {
  return (
    <div className="mt-4 w-full max-w-md bg-gray-800 rounded-lg p-4 shadow-lg">
      <h3 className="text-xl font-bold mb-2">Log</h3>
      <div className="h-48 overflow-y-auto">
        {log.map((entry, index) => (
          <p key={index} className="text-sm text-gray-300">
            {entry}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Log;
