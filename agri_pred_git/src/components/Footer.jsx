"use client"

import { motion } from "framer-motion"
import { Mail, Phone, FileText, Github } from "lucide-react"
import "../styles/footer.css"

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="footer-content">
        <div className="footer-section">
          <h4>Agri Price Forecast</h4>
          <p>A comprehensive dashboard for agricultural commodity price analysis and forecasting.</p>
        </div>

        <div className="footer-section">
          <h4>Made by:</h4>
          <div className="contact-links">
            TEAM 0 Error
          </div>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <div className="resource-links">
            
            <a href="https://github.com/Ayushpani/agri_prediction">
              <Github size={16} />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Agri Price Forecast. All rights reserved.</p>
        <p>Made with ❤️ for Indian farmers</p>
      </div>
    </motion.footer>
  )
}

export default Footer
