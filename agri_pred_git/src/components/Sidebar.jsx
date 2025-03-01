import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "../styles/sidebar.css";

const Sidebar = ({
  selectedCommodity,
  setSelectedCommodity,
  selectedCentres,
  setSelectedCentres,
  dateRange,
  setDateRange,
  filters,
  setFilters,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme } = useTheme();

  const commodities = ["Onion", "Potato", "Tomato", "Rice", "Wheat", "Pulses"];
  const centres = ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Lucknow", "Patna"];

  const toggleCentre = (centre) => {
    if (selectedCentres.includes(centre)) {
      setSelectedCentres(selectedCentres.filter((c) => c !== centre));
    } else {
      setSelectedCentres([...selectedCentres, centre]);
    }
  };

  return (
    <motion.div
      className="sidebar"
      style={{ backgroundColor: theme.surface, color: theme.text }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sidebar-header">
        <h2 style={{ color: theme.text }}>Filter Options</h2>
        <Filter size={20} color={theme.text} />
      </div>

      <div className="filter-section">
        <h3 style={{ color: theme.text }}>Commodity</h3>
        <motion.div className="select-wrapper" whileTap={{ scale: 0.98 }}>
          <select
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
            className="commodity-select"
            style={{ backgroundColor: theme.background, color: theme.text, borderColor: theme.border }}
          >
            {commodities.map((commodity) => (
              <option key={commodity} value={commodity}>
                {commodity}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      <div className="filter-section">
        <h3 style={{ color: theme.text }}>Reporting Centres</h3>
        <motion.div
          className="dropdown-header"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          whileHover={{ backgroundColor: theme.primary + "22" }}
          style={{ backgroundColor: theme.background, color: theme.text, borderColor: theme.border }}
        >
          <span>{selectedCentres.length} centres selected</span>
          {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </motion.div>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="centres-dropdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: theme.background, borderColor: theme.border }}
            >
              {centres.map((centre) => (
                <motion.div
                  key={centre}
                  className="centre-option"
                  whileHover={{ backgroundColor: theme.primary + "22" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <label style={{ color: theme.text }}>
                    <input
                      type="checkbox"
                      checked={selectedCentres.includes(centre)}
                      onChange={() => toggleCentre(centre)}
                    />
                    <span>{centre}</span>
                  </label>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="filter-section">
        <h3 style={{ color: theme.text }}>Date Range</h3>
        <div className="date-inputs">
          <div className="date-input-wrapper">
            <label style={{ color: theme.textSecondary }}>Start Date</label>
            <div className="date-field" style={{ backgroundColor: theme.background, borderColor: theme.border }}>
              <Calendar size={16} color={theme.text} />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                style={{ color: theme.text }}
              />
            </div>
          </div>

          <div className="date-input-wrapper">
            <label style={{ color: theme.textSecondary }}>End Date</label>
            <div className="date-field" style={{ backgroundColor: theme.background, borderColor: theme.border }}>
              <Calendar size={16} color={theme.text} />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                style={{ color: theme.text }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3 style={{ color: theme.text }}>Additional Filters</h3>
        <div className="toggle-filters">
          <div className="toggle-option">
            <label style={{ color: theme.text }}>
              <span>Festival Indicator</span>
              <motion.div
                className={`toggle-switch ${filters.festivalIndicator ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, festivalIndicator: !filters.festivalIndicator })}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: filters.festivalIndicator ? theme.primary : theme.textSecondary }}
              >
                <motion.div
                  className="toggle-handle"
                  animate={{ x: filters.festivalIndicator ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{ backgroundColor: theme.surface }}
                />
              </motion.div>
            </label>
          </div>

          <div className="toggle-option">
            <label style={{ color: theme.text }}>
              <span>Buffer Release Indicator</span>
              <motion.div
                className={`toggle-switch ${filters.bufferReleaseIndicator ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, bufferReleaseIndicator: !filters.bufferReleaseIndicator })}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: filters.bufferReleaseIndicator ? theme.primary : theme.textSecondary }}
              >
                <motion.div
                  className="toggle-handle"
                  animate={{ x: filters.bufferReleaseIndicator ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{ backgroundColor: theme.surface }}
                />
              </motion.div>
            </label>
          </div>
        </div>
      </div>

      <motion.button
        className="apply-filters-btn"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{ backgroundColor: theme.primary, color: theme.surface }}
      >
        Apply Filters
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;