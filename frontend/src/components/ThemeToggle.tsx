"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const currTheme = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState(currTheme === "dark");

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
      className="p-1.5 cursor-pointer rounded-full transition hover:bg-primary/10 text-heading"
    >
      {darkMode ? 
        <Sun className='w-5 h-5 md:w-5.5 md:h-5.5'/> : 
        <Moon className='w-5 h-5 md:w-5.5 md:h-5.5'/>
      }
    </button>
  );
}