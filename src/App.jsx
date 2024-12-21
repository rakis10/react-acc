import { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";

export default App;

function CityTasks({ city, tasks, onTaskComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const completedTasks = tasks.filter((task) => task.completed).length;
  const allTasksCompleted = completedTasks === tasks.length;

  return (
    <div className="w-full h-full max-w-md mx-auto p-2 bg-white ">
      <div
        className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{city}</span>
        <span>
          {allTasksCompleted ? (
            <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
              Success
            </span>
          ) : (
            `Tasks (${completedTasks}/${tasks.length})`
          )}
        </span>
        <svg
          className={`w-5 h-5 text-purple-500 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="px-4 pt-4 pb-2 text-sm text-gray-500">
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="mb-4">
                <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
                  <img
                    src={task.image}
                    alt={task.title}
                    className="w-16 h-16 mr-4 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                  <button
                    className={`ml-4 px-4 py-2 text-sm font-medium text-white rounded ${
                      task.completed ? "bg-green-500" : "bg-blue-500"
                    }`}
                    onClick={() => onTaskComplete(city, task.id)}
                  >
                    {task.completed ? "Completed" : "Complete Task"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  const [tasksByCity, setTasksByCity] = useState({
    "New York": [
      {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        completed: true,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        completed: false,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        title: "Task 3",
        description: "Description 3",
        completed: true,
        image: "https://via.placeholder.com/150",
      },
    ],
    "Los Angeles": [
      {
        id: 4,
        title: "Task 4",
        description: "Description 4",
        completed: false,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 5,
        title: "Task 5",
        description: "Description 5",
        completed: true,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 6,
        title: "Task 6",
        description: "Description 6",
        completed: false,
        image: "https://via.placeholder.com/150",
      },
    ],
    Chicago: [
      {
        id: 7,
        title: "Task 7",
        description: "Description 7",
        completed: true,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 8,
        title: "Task 8",
        description: "Description 8",
        completed: false,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 9,
        title: "Task 9",
        description: "Description 9",
        completed: true,
        image: "https://via.placeholder.com/150",
      },
    ],
  });

  const handleTaskComplete = (city, taskId) => {
    setTasksByCity((prevTasksByCity) => {
      const updatedTasks = prevTasksByCity[city].map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      );
      return { ...prevTasksByCity, [city]: updatedTasks };
    });
  };

  return (
    <div>
      <Header tasksByCity={tasksByCity} />
      {Object.entries(tasksByCity).map(([city, tasks]) => (
        <CityTasks
          key={city}
          city={city}
          tasks={tasks}
          onTaskComplete={handleTaskComplete}
        />
      ))}
      <Footer />
    </div>
  );
}
