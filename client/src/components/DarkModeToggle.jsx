import React, { useEffect, useState } from 'react'
import { BsMoon, BsSun } from "react-icons/bs";

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
      );
    
      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }, [darkMode]);
    
      return (
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full transition-all duration-300"
        >
          {darkMode ? <BsSun className="text-yellow-400" /> : <BsMoon />}
        </button>
      );
    };

export default DarkModeToggle