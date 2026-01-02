import { useState, useEffect } from "react";

export default function ThemeToggle() {
  // Inicializa desde localStorage o preferencia del sistema
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    console.log("Dark mode:", darkMode); // 👈 para verificar
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((s) => !s)}
      className="px-4 py-2 rounded bg-blue-500 text-white dark:bg-blue-700"
    >
      {darkMode ? "Modo Claro" : "Modo Oscuro"}
    </button>
  );
}

