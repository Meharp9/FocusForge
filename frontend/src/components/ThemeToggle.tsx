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
      className="p-1.5 cursor-pointer rounded-full transition hover:bg-primary/10 text-heading"
    >
      {darkMode ? 
        <Sun size={23}/> : 
        <Moon size={23}/>
      }
    </button>
  );
}