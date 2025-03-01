import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    surface: isDark ? "#1E293B" : "#FFFFFF",
    background: isDark ? "#0F172A" : "#F8FAFC",
    text: isDark ? "#E2E8F0" : "#1E293B",
    textSecondary: isDark ? "#94A3B8" : "#64748B",
    primary: isDark ? "#3B82F6" : "#2563EB",
    border: isDark ? "#334155" : "#E2E8F0",
    warning: isDark ? "#F59E0B" : "#D97706",
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);