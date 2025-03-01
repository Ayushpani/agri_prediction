import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/dashboard.css";

const App = () => {
  const [selectedCommodity, setSelectedCommodity] = useState("Onion");
  const [selectedCentres, setSelectedCentres] = useState(["Delhi", "Mumbai"]);
  const [dateRange, setDateRange] = useState({
    start: "2023-10-01",
    end: "2023-10-07",
  });
  const [filters, setFilters] = useState({
    festivalIndicator: false,
    bufferReleaseIndicator: false,
  });

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Sidebar
          selectedCommodity={selectedCommodity}
          setSelectedCommodity={setSelectedCommodity}
          selectedCentres={selectedCentres}
          setSelectedCentres={setSelectedCentres}
          dateRange={dateRange}
          setDateRange={setDateRange}
          filters={filters}
          setFilters={setFilters}
        />
        <Dashboard
          selectedCommodity={selectedCommodity}
          selectedCentres={selectedCentres}
          dateRange={dateRange}
          filters={filters}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;