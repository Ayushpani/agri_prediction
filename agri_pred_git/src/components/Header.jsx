import { motion } from "framer-motion";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "../styles/header.css";

const Header = ({ toggleSidebar }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <motion.header
      className="header"
      style={{ backgroundColor: theme.surface, color: theme.text }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-left">
        <motion.button
          className="menu-button"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={24} color={theme.text} />
        </motion.button>
        <motion.div
          className="logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img src="/logo.svg" alt="Agri Price Forecast Logo" className="logo-img" />
          <h1 style={{ color: theme.text }}>Agri Price Forecast</h1>
        </motion.div>
      </div>
      <motion.button
        className="theme-toggle"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? <Sun size={20} color={theme.text} /> : <Moon size={20} color={theme.text} />}
      </motion.button>
    </motion.header>
  );
};

export default Header;