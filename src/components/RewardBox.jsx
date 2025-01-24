import React from "react";

const RewardBox = ({ type, openBox }) => {
  const colors = {
    green: "bg-green-500 hover:bg-green-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      className={`${colors[type]} text-white font-bold py-2 px-4 rounded transition`}
      onClick={() => openBox(type)}
    >
      Open {type.charAt(0).toUpperCase() + type.slice(1)} Box
    </button>
  );
};

export default RewardBox;
