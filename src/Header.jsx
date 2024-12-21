function Header({ tasksByCity }) {
  const totalCities = Object.keys(tasksByCity).length;
  const completedCities = Object.values(tasksByCity).filter((tasks) =>
    tasks.every((task) => task.completed)
  ).length;
  const progress = (completedCities / totalCities) * 100;

  return (
    <header className="w-full p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">City Task Tracker</h1>
      <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2">
        {completedCities} / {totalCities} cities completed
      </p>
    </header>
  );
}
export default Header;
