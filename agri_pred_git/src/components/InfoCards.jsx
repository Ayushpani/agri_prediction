"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, BarChart2, AlertTriangle } from "lucide-react"
import "../styles/infoCards.css"

const InfoCards = ({ commodity, data, forecastData }) => {
  // Calculate current price (average of last data point across all centres)
  const lastDataPoint = data[data.length - 1]
  const centres = Object.keys(lastDataPoint).filter((key) => key !== "date")
  const currentPrice = centres.reduce((sum, centre) => sum + lastDataPoint[centre], 0) / centres.length

  // Calculate forecasted price (average of first forecast point)
  const firstForecastPoint = forecastData[0]
  const forecastedPrice = centres.reduce((sum, centre) => sum + firstForecastPoint[centre], 0) / centres.length

  // Calculate percentage change
  const percentageChange = ((forecastedPrice - currentPrice) / currentPrice) * 100

  // Calculate volatility (standard deviation of prices)
  const allPrices = data.flatMap((point) => centres.map((centre) => point[centre]))
  const mean = allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length
  const squaredDiffs = allPrices.map((price) => Math.pow(price - mean, 2))
  const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / squaredDiffs.length
  const volatility = Math.sqrt(variance)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const cards = [
    {
      title: "Current Price",
      value: `₹${currentPrice.toFixed(2)}`,
      subtitle: "Per Kilogram",
      icon: <BarChart2 size={24} />,
      color: "blue",
    },
    {
      title: "Forecasted Price",
      value: `₹${forecastedPrice.toFixed(2)}`,
      subtitle: "Next 7 Days",
      icon: <BarChart2 size={24} />,
      color: "green",
    },
    {
      title: "Price Change",
      value: `${percentageChange.toFixed(2)}%`,
      subtitle: "Projected",
      icon: percentageChange >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />,
      color: percentageChange >= 0 ? "red" : "green",
    },
    {
      title: "Volatility Index",
      value: volatility.toFixed(2),
      subtitle: volatility > 10 ? "High" : volatility > 5 ? "Medium" : "Low",
      icon: <AlertTriangle size={24} />,
      color: volatility > 10 ? "red" : volatility > 5 ? "orange" : "green",
    },
  ]

  return (
    <div className="info-cards">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          className={`info-card ${card.color}`}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
        >
          <div className="card-icon">{card.icon}</div>
          <div className="card-content">
            <h3>{card.title}</h3>
            <p className="card-value">{card.value}</p>
            <p className="card-subtitle">{card.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default InfoCards