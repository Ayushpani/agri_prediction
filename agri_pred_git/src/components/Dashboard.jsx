"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, AlertTriangle, Info } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import InfoCards from "./InfoCards"
import PriceChart from "./PriceChart"
import ForecastSummary from "./ForecastSummary"
import { generateSampleData, generateForecastData } from "../utils/sampleData"
import "../styles/dashboard.css"

const Dashboard = ({ selectedCommodity, selectedCentres, dateRange, filters }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [forecastData, setForecastData] = useState([])
  const { theme } = useTheme()

  useEffect(() => {
    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setData(generateSampleData(selectedCommodity, selectedCentres, dateRange))
      setForecastData(generateForecastData(selectedCommodity, selectedCentres))
      setIsLoading(false)
    }, 1000)
  }, [selectedCommodity, selectedCentres, dateRange])

  const getColorForCentre = (centre) => {
    const colors = {
      Delhi: "#FF6B35",
      Mumbai: "#004E89",
      Kolkata: "#7A9E7E",
      Chennai: "#F7B801",
      Bangalore: "#8A4FFF",
      Hyderabad: "#3BCEAC",
      Lucknow: "#EE4266",
      Patna: "#540D6E",
    }
    return colors[centre] || "#999999"
  }

  if (isLoading) {
    return (
      <div className="loading-container" style={{ color: theme.text }}>
        <motion.div
          className="loader"
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
          style={{ borderColor: theme.border, borderTopColor: theme.primary }}
        />
        <p>Loading dashboard data...</p>
      </div>
    )
  }

  return (
    <div className="dashboard" style={{ color: theme.text }}>
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: theme.text }}>{selectedCommodity} Price Analysis</h2>
        <div className="dashboard-subtitle" style={{ color: theme.textSecondary }}>
          <p>Showing data for {selectedCentres.join(", ")}</p>
          <p className="date-range">
            {new Date(dateRange.start).toLocaleDateString("en-IN")} -{" "}
            {new Date(dateRange.end).toLocaleDateString("en-IN")}
          </p>
        </div>
      </motion.div>

      <InfoCards commodity={selectedCommodity} data={data} forecastData={forecastData} />

      <motion.div
        className="chart-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ backgroundColor: theme.surface, boxShadow: `0 2px 8px ${theme.textSecondary}22` }}
      >
        <div className="chart-header">
          <h3 style={{ color: theme.text }}>Historical Price Trends</h3>
          <div className="chart-legend-info" style={{ color: theme.textSecondary }}>
            <Info size={16} />
            <span>Click on legend to toggle visibility</span>
          </div>
        </div>

        <div className="chart-wrapper">
          <PriceChart
            data={data}
            centres={selectedCentres}
            getColorForCentre={getColorForCentre}
            showFestivalIndicator={filters.festivalIndicator}
          />
        </div>
      </motion.div>

      <ForecastSummary
        commodity={selectedCommodity}
        forecastData={forecastData}
        selectedCentres={selectedCentres}
        getColorForCentre={getColorForCentre}
      />

      <motion.div
        className="market-insights"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ backgroundColor: theme.surface, boxShadow: `0 2px 8px ${theme.textSecondary}22` }}
      >
        <h3 style={{ color: theme.text }}>Market Insights</h3>
        <div className="insights-content">
          <div className="insight-card" style={{ backgroundColor: theme.background, borderColor: theme.primary }}>
            <div className="insight-icon">
              <TrendingUp size={24} color={theme.primary} />
            </div>
            <div className="insight-text">
              <h4 style={{ color: theme.text }}>Price Trend Analysis</h4>
              <p style={{ color: theme.textSecondary }}>
                {selectedCommodity} prices are expected to {Math.random() > 0.5 ? "increase" : "decrease"} by{" "}
                {(Math.random() * 10).toFixed(2)}% in the next month due to
                {Math.random() > 0.5 ? " seasonal demand fluctuations" : " changes in supply chain dynamics"}.
              </p>
            </div>
          </div>

          <div className="insight-card" style={{ backgroundColor: theme.background, borderColor: theme.warning }}>
            <div className="insight-icon warning">
              <AlertTriangle size={24} color={theme.warning} />
            </div>
            <div className="insight-text">
              <h4 style={{ color: theme.text }}>Market Volatility Alert</h4>
              <p style={{ color: theme.textSecondary }}>
                High price volatility detected in {selectedCentres[Math.floor(Math.random() * selectedCentres.length)]}
                market. Consider diversifying procurement sources to mitigate risk.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard