import React, { useState } from "react";
import District from "./components/District";
import Log from "./components/Log";
import Inventory from "./components/Inventory";
import Car from "./components/Car";
import Shop from "./components/Shop";
import IMAGES from "./Images";

const App = () => {
  const [district, setDistrict] = useState(1); // Current district
  const [cash, setCash] = useState(1000); // Player's cash
  // const [inventory, setInventory] = useState([]); // Inventory items
  const [inventory, setInventory] = useState({
    cases: [],
    items: [],
    cars: [],
  });

  const [car, setCar] = useState({
    name: "Starter Car",
    stats: {
      speed: 5,
      acceleration: 4,
      handling: 6,
      stability: 5,
      toughness: 5,
    },
    upgrades: {}, // Tracks applied upgrades
  });
  const [log, setLog] = useState([]); // Log messages

  const handleDistrictComplete = (rewards, isBossFight) => {
    setCash((prev) => prev + rewards.cash);
    console.log(rewards);
    console.log([...inventory.cases]);
    console.log([...inventory.cases, ...rewards.items]);

    // console.log([...inventory.cases, ...rewards.items])
    setInventory((prev) => ({
      ...prev,
      cases: [...prev.cases, ...rewards.items],
      // tuto oprav ak chces aby vyhral auto
      // cars: [...prev.cars, ...rewards.items.filter(item => item !== 'green' && item !== 'blue' && item !== 'red')],
    }));
    setLog((prev) => [
      ...prev,
      isBossFight
        ? `Boss defeated in District ${district}! Earned $${
            rewards.cash
          } and items: ${rewards.items.join(", ")}`
        : `Race completed! Earned $${
            rewards.cash
          } and items: ${rewards.items.join(", ")}`,
    ]);

    if (isBossFight) {
      setDistrict((prev) => prev + 1); // Move to the next district after the boss
    }
  };

  const addToLog = (message) => setLog((prev) => [...prev, message]);

  const openBox = (type) => {
    const rewards = {
      green: ["Green Tire Upgrade", "Green Engine Upgrade"],
      blue: ["Blue Turbo Upgrade", "Blue Suspension Upgrade"],
      red: ["Red Engine Upgrade", "Red Nitro Booster"],
    };
    const item =
      rewards[type][Math.floor(Math.random() * rewards[type].length)];

    // setInventory((prev) => ); // Remove box
    // console.log([...inventory.items, item]);

    setInventory((prev) => {
      const casesCopy = [...prev.cases];
      const index = casesCopy.indexOf(type);
      if (index !== -1) {
        casesCopy.splice(index, 1); // Remove only one instance of the box
      }
      return {
        ...prev,
        cases: casesCopy,
        items: [...(prev.items || []), item],
      };
    });
    setLog((prev) => [...prev, `Opened a ${type} box and received: ${item}`]);
  };

  const applyUpgrade = (upgrade) => {
    console.log(upgrade);
    const [rarity, type] = upgrade.split(" ");

    const statMap = {
      Tire: "handling",
      Engine: "speed",
      Turbo: "acceleration",
      Suspension: "stability",
      Nitro: "toughness",
    };

    const statToUpgrade = statMap[type];
    if (!statToUpgrade) {
      addToLog(`Upgrade type "${type}" is not recognized.`);
      return;
    }

    const currentUpgrade = car.upgrades[type];
    const currentUpgradeLevel = currentUpgrade
      ? { Green: 1, Blue: 2, Red: 3 }[currentUpgrade]
      : 0;
    const newUpgradeLevel = { Green: 1, Blue: 2, Red: 3 }[rarity];

    // Prevent applying if the new upgrade is worse or identical
    if (currentUpgrade && newUpgradeLevel <= currentUpgradeLevel) {
      addToLog(
        `Upgrade "${upgrade}" is not better than the installed "${currentUpgrade} ${type}".`
      );
      return;
    }

    // If a better upgrade is installed, return the old upgrade to inventory
    if (currentUpgrade) {
      const oldUpgrade = `${currentUpgrade} ${type}`;
      // setInventory((prev) => ({...prev, oldUpgrade}));
      addToLog(`Replaced "${oldUpgrade}" with "${upgrade}".`);
    }

    // Apply the new upgrade
    const statIncrease = newUpgradeLevel - currentUpgradeLevel;
    setCar((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [statToUpgrade]: prev.stats[statToUpgrade] + statIncrease,
      },
      upgrades: { ...prev.upgrades, [type]: rarity },
    }));
    setInventory((prev) => {
      const itemsCopy = [...prev.items];
      const index = itemsCopy.indexOf(upgrade);
      if (index !== -1) {
      itemsCopy.splice(index, 1); // Remove only one instance of the upgrade
      }
      return {
      ...prev,
      items: itemsCopy,
      };
    });
    addToLog(
      `Applied "${upgrade}" to your car. Increased ${statToUpgrade} by ${statIncrease}.`
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">District {district}</h1>
      <h2 className="text-xl mb-2">
        Cash: <span className="text-green-400">${cash}</span>
      </h2>
      <District
        district={district}
        onComplete={(rewards, isBossFight) =>
          handleDistrictComplete(rewards, isBossFight)
        }
        car={car}
        addToLog={addToLog}
      />
      <Car car={car} />
      <Inventory
        inventory={inventory}
        openBox={openBox}
        applyUpgrade={applyUpgrade}
      />
      <Shop
        car={car}
        inventory={inventory}
        setCar={setCar}
        cash={cash}
        setCash={setCash}
        setInventory={setInventory}
        addToLog={addToLog}
      />
      <Log log={log} />
    </div>
  );
};

export default App;
