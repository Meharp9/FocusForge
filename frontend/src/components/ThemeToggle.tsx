"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-1.5 cursor-pointer rounded-xl border border-gray-300 dark:border-primary transition hover:bg-primary/50"
    >
      {darkMode ? 
        <Moon size={23}/> : 
        <Sun size={23}/>
      }
    </button>
  );
}