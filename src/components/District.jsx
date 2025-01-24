import React, { useState } from "react";
import Modal from "./Modal";

const District = ({ district, onComplete, car, addToLog }) => {
  const [race, setRace] = useState(1); // Track current race
  const [completed, setCompleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Modal content

  const bossRewards = [
    { cash: 200, items: ["green"] },
    { cash: 300, items: ["green", "blue"] },
    { cash: 400, items: ["blue"] },
    { cash: 600, items: ["blue", "red"] },
    { cash: 800, items: ["red"] },
  ];

  const handleRace = () => {
    const carPerformance = car.stats.speed + car.stats.handling + car.stats.stability;
    const trackDifficulty = district * 5 + Math.random() * 10; // Add randomness
    const success = carPerformance > trackDifficulty;

    if (success) {
      setRace((prev) => prev + 1);
      addToLog(`Race ${race} in District ${district} won!`);
      if (race === 5) setCompleted(true);
    } else {
      setModalMessage("You lost this race! Upgrade your car or try again.");
      setModalOpen(true);
      addToLog(`Race ${race} in District ${district} lost.`);
    }
  };

  const handleBossFight = () => {
    const rewards = bossRewards[district - 1];
    setModalMessage(`You defeated the boss! Rewards: $${rewards.cash}, Items: ${rewards.items.join(", ")}`);
    setModalOpen(true);
    addToLog(`Boss fight in District ${district} won!`);
    onComplete(rewards);
  };

  return (
    <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-lg text-center">
      {modalOpen && <Modal message={modalMessage} onClose={() => setModalOpen(false)} />}
      {race <= 5 && !completed ? (
        <>
          <h3 className="text-xl font-bold mb-2">Race {race}</h3>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
            onClick={handleRace}
          >
            Start Race
          </button>
        </>
      ) : (
        completed && (
          <div>
            <h3 className="text-xl font-bold mb-2">Boss Fight!</h3>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
              onClick={handleBossFight}
            >
              Start Boss Fight
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default District;
