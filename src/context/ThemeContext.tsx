import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeCtx = {
  darkMode: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const s = localStorage.getItem("theme");
      if (s) return s === "dark";
      return (
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
      );
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      document.documentElement.classList.toggle("dark", darkMode);
    } catch (e) {}
    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch (e) {}
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggle: () => setDarkMode((s) => !s) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
