"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Chart, registerables } from "chart.js"
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import "../styles/forecastSummary.css"

// Register all Chart.js components
Chart.register(...registerables)

const ForecastSummary = ({ commodity, forecastData, selectedCentres, getColorForCentre }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const { isDarkMode } = useTheme()

  // Calculate average forecasted price for each centre
  const centreTrends = selectedCentres.map((centre) => {
    const firstPrice = forecastData[0][centre]
    const lastPrice = forecastData[forecastData.length - 1][centre]
    const change = ((lastPrice - firstPrice) / firstPrice) * 100

    return {
      centre,
      firstPrice,
      lastPrice,
      change,
    }
  })

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Prepare data for Chart.js
    const labels = forecastData.map((item) => {
      const date = new Date(item.date)
      return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" })
    })

    const datasets = selectedCentres.map((centre) => ({
      label: centre,
      data: forecastData.map((item) => item[centre]),
      borderColor: getColorForCentre(centre),
      backgroundColor: `${getColorForCentre(centre)}33`, // Add transparency
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointRadius: 2,
      pointHoverRadius: 5,
    }))

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: isDarkMode ? "#E2E8F0" : "#333333",
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: isDarkMode ? "#1E293B" : "#FFFFFF",
            titleColor: isDarkMode ? "#E2E8F0" : "#333333",
            bodyColor: isDarkMode ? "#E2E8F0" : "#333333",
            borderColor: isDarkMode ? "#334155" : "#E2E8F0",
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (context) => `${context.dataset.label}: ₹${context.parsed.y}`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: isDarkMode ? "#334155" : "#E2E8F0",
              drawBorder: false,
            },
            ticks: {
              color: isDarkMode ? "#E2E8F0" : "#333333",
              font: {
                size: 12,
              },
            },
          },
          y: {
            grid: {
              color: isDarkMode ? "#334155" : "#E2E8F0",
              drawBorder: false,
            },
            ticks: {
              color: isDarkMode ? "#E2E8F0" : "#333333",
              font: {
                size: 12,
              },
              callback: (value) => `₹${value}`,
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [forecastData, selectedCentres, getColorForCentre, isDarkMode])

  return (
    <motion.div
      className="forecast-summary"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3>Price Forecast</h3>

      <div className="forecast-content">
        <div className="forecast-chart">
          <div className="chart-canvas-container">
            <canvas ref={chartRef} height="300"></canvas>
          </div>
        </div>

        <div className="forecast-trends">
          <h4>Centre-wise Forecast</h4>

          <div className="trends-list">
            {centreTrends.map((trend, index) => (
              <motion.div
                key={trend.centre}
                className="trend-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <div className="trend-header">
                  <h5>{trend.centre}</h5>
                  <div className={`trend-indicator ${trend.change >= 0 ? "up" : "down"}`}>
                    {trend.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{Math.abs(trend.change).toFixed(2)}%</span>
                  </div>
                </div>

                <div className="trend-prices">
                  <div className="price-point">
                    <span className="price-label">Current</span>
                    <span className="price-value">₹{trend.firstPrice.toFixed(2)}</span>
                  </div>
                  <div className="price-arrow">→</div>
                  <div className="price-point">
                    <span className="price-label">Forecast</span>
                    <span className="price-value">₹{trend.lastPrice.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="forecast-note">
            <AlertCircle size={16} />
            <p>Forecast is based on historical data patterns and may change with market conditions.</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ForecastSummary