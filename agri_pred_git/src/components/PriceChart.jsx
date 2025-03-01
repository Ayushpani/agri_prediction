"use client"

import { useRef, useEffect } from "react"
import { Chart, registerables } from "chart.js"
import { useTheme } from "../context/ThemeContext"

// Register all Chart.js components
Chart.register(...registerables)

const PriceChart = ({ data, centres, getColorForCentre, showFestivalIndicator }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Prepare data for Chart.js
    const labels = data.map((item) => {
      const date = new Date(item.date)
      return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" })
    })

    const datasets = centres.map((centre) => ({
      label: centre,
      data: data.map((item) => item[centre]),
      borderColor: getColorForCentre(centre),
      backgroundColor: `${getColorForCentre(centre)}33`, // Add transparency
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 6,
    }))

    // Add festival indicator if enabled
    if (showFestivalIndicator) {
      datasets.push({
        label: "Festival Indicator",
        data: data.map((item) => item.festivalIndicator || null),
        borderColor: "#FF0000",
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
      })
    }

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
            title: {
              display: true,
              text: "Price (₹/kg)",
              color: isDarkMode ? "#E2E8F0" : "#333333",
              font: {
                size: 12,
                weight: "normal",
              },
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
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
  }, [data, centres, getColorForCentre, showFestivalIndicator, isDarkMode])

  return (
    <div className="chart-canvas-container">
      <canvas ref={chartRef} height="400"></canvas>
    </div>
  )
}

export default PriceChart