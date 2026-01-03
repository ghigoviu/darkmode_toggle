import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-pressed={darkMode}
      className="px-4 py-2 rounded bg-blue-500 text-white dark:bg-blue-700"
    >
      {darkMode ? "Modo Claro" : "Modo Oscuro"}
    </button>
  );
}

