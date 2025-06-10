// TaskAdd.jsx
import { useRef } from "react";

function TaskAdd({ onAdd, setErrors }) {
  const taskName = useRef(null);
  const category = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.current.value.trim() || category.current.value == "") {
      setErrors("The task name and category are required");
      return;
    }
    const newTask = {
      id: Date.now(),
      taskName: taskName.current.value,
      category: category.current.value,
      timeSpent: 0,
      isRunning: false,
    };
    onAdd(newTask);
    taskName.current.value = "";
    category.current.value = "";
    setErrors("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md mx-auto">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Task Name
        </label>
        <input
          ref={taskName}
          type="text"
          className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
          placeholder="What do you need to do?"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Category
        </label>
        <select
          ref={category}
          defaultValue=""
          className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer">
          <option value="" disabled className="text-gray-400">
            Select a category
          </option>
          <option value="Work" className="text-gray-700">
            💼 Work
          </option>
          <option value="Study" className="text-gray-700">
            📚 Study
          </option>
          <option value="Chill" className="text-gray-700">
            🎯 Chill
          </option>
          <option value="Health" className="text-gray-700">
            💪 Health
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300">
        Add Task
      </button>
    </form>
  );
}

export default TaskAdd;
