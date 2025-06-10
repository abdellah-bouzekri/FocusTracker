// TaskList.jsx - Simple and easy to read version

import { useState } from "react";

function TaskList({
  tasks,
  activeTaskId,
  showSpentFor,
  handleStart,
  handlePause,
  setShowSpentFor,
  handleResume,
}) {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const toggleTheme = () => {
  //   setIsDarkMode((prev) => !prev);
  //   document.documentElement.setAttribute(
  //     "data-theme",
  //     !isDarkMode ? "dark" : "light"
  //   );
  // };

  return (
    <div
      className={`overflow-hidden rounded-xl shadow-lg border border-gray-200 text-gray-700 dark:text-gray-300
  `}>
      {/* <button onClick={toggleTheme}>
        {isDarkMode ? "🌙 Dark" : "☀️ Light"}
      </button> */}

      <table className="w-full bg-white dark:bg-gray-900">
        {/* Table Header */}
        <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
              Task
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
              Category
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
              Time Tracking
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700">
          {tasks.map((task, index) => {
            const isRunning = activeTaskId === task.id;
            const isPaused = !isRunning && task.timeSpent > 0;
            const notStarted = task.timeSpent === 0;

            return (
              <tr
                key={task.id}
                className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                  isRunning
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500"
                    : ""
                } ${
                  index % 2 === 0
                    ? "bg-gray-50/50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                }`}>
                {/* Task Name */}
                <td className="px-6 py-5">
                  <div className="flex items-center">
                    {isRunning && (
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    )}
                    <span
                      className={`font-medium ${
                        isRunning ? "text-green-400" : "text-gray-400"
                      }`}>
                      {task.taskName}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-700 to-purple-700 text-indigo-200 border border-indigo-600">
                    {task.category === "Work" && "💼"}
                    {task.category === "Study" && "📚"}
                    {task.category === "Chill" && "🎯"}
                    {task.category === "Health" && "💪"}
                    <span className="ml-1">{task.category}</span>
                  </span>
                </td>

                {/* Time Tracking */}
                <td className="px-6 py-5">
                  <div className="flex flex-col space-y-1">
                    {isRunning && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-green-300 font-mono font-semibold text-sm bg-green-700 px-2 py-1 rounded-md">
                          {task.timeSpent}s
                        </span>
                      </div>
                    )}

                    {task.timeSpent > 0 && (
                      <button
                        onClick={() =>
                          setShowSpentFor(
                            showSpentFor === task.id ? null : task.id
                          )
                        }
                        className="text-xs text-blue-400 hover:text-blue-600 font-medium transition-colors duration-200 text-left hover:underline">
                        {showSpentFor === task.id
                          ? `✓ ${task.timeSpent}s total spent`
                          : "📊 Show time spent"}
                      </button>
                    )}

                    {notStarted && !isRunning && (
                      <span className="text-gray-400 text-xs italic">
                        ⏱️ No time logged yet
                      </span>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex space-x-2">
                    {!isRunning && (
                      <button
                        onClick={() => handleStart(task.id)}
                        className="px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg">
                        ▶️ Start
                      </button>
                    )}

                    {isRunning && (
                      <>
                        <button
                          onClick={() => handlePause()}
                          className="px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-md hover:shadow-lg">
                          ⏸️ Pause
                        </button>

                        <button
                          onClick={() => handleResume(task.id)}
                          className="px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg">
                          ⏯️ Resume
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
