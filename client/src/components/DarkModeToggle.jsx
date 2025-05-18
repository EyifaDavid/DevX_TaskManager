import React, { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Ensure dark mode is applied correctly on page load
  useEffect(() => {
    console.log("Dark mode is now:", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full transition-all duration-300 bg-gray-200 dark:bg-gray-800"
    >
      {darkMode ? <BsSun className="text-yellow-400" /> : <BsMoon />}
    </button>
  );
};

export default DarkModeToggle;
