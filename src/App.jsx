import { useState, useEffect } from "react";
import TaskAdd from "./components/TaskAdd";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSpentFor, setShowSpentFor] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.setAttribute(
      "data-theme",
      !isDarkMode ? "dark" : "light"
    );
  };

  useEffect(() => {
    let interval;
    if (isRunning && activeTaskId !== null) {
      interval = setInterval(() => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === activeTaskId && task.isRunning
              ? { ...task, timeSpent: task.timeSpent + 1 }
              : task
          )
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, activeTaskId]);

  const handleAdd = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleStart = (id) => {
    setActiveTaskId(id);
    setIsRunning(true);
    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        isRunning: task.id === id,
      }))
    );
  };

  const handlePause = () => {
    setIsRunning(false);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === activeTaskId ? { ...task, isRunning: false } : task
      )
    );
  };
  // FIXED: handleResume now takes an id parameter and works properly
  const handleResume = (id) => {
    setActiveTaskId(id);
    setIsRunning(true);
    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        isRunning: task.id === id,
      }))
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white  dark:bg-slate-900 text-gray-500 dark:text-gray-100 w-full min-h-screen">
      <button onClick={toggleTheme} className="absolute top-3 left-4">
        {isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        )}
      </button>
      <h1 className="text-2xl text-center font-bold mb-4">Add a New Task</h1>
      {errors && <p className="text-red-600 font-semibold">{errors}</p>}
      <TaskAdd onAdd={handleAdd} setErrors={setErrors} />
      <div className="mt-8">
        {tasks.length === 0 ? (
          <p className="text-center  mt-8">📝 No tasks yet.</p>
        ) : (
          <TaskList
            tasks={tasks}
            activeTaskId={activeTaskId}
            showSpentFor={showSpentFor}
            handleStart={handleStart}
            handleResume={handleResume}
            handlePause={handlePause}
            setShowSpentFor={setShowSpentFor}
          />
        )}
      </div>
    </div>
  );
}

export default App;
