// utils/sampleData.js
export const generateSampleData = (commodity, centres, dateRange) => {
    const data = [];
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    const days = (end - start) / (1000 * 60 * 60 * 24);
  
    for (let i = 0; i <= days; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const entry = { date: date.toISOString().split("T")[0] };
      centres.forEach((centre) => {
        entry[centre] = 20 + Math.random() * 50; // Random price between 20-70
      });
      data.push(entry);
    }
    return data;
  };
  
  export const generateForecastData = (commodity, centres) => {
    const data = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) { // 7-day forecast
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const entry = { date: date.toISOString().split("T")[0] };
      centres.forEach((centre) => {
        entry[centre] = 20 + Math.random() * 60; // Random forecast price
      });
      data.push(entry);
    }
    return data;
  };
