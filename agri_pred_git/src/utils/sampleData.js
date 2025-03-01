export const generateSampleData = (commodity, centres, dateRange) => {
    const data = [];
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
  
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const entry = { date: d.toISOString().split("T")[0] };
      centres.forEach((centre) => {
        entry[centre] = Math.random() * 100 + 50; // Random price between 50 and 150
      });
      data.push(entry);
    }
  
    return data;
  };
  
  export const generateForecastData = (commodity, centres) => {
    const data = [];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
  
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const entry = { date: d.toISOString().split("T")[0] };
      centres.forEach((centre) => {
        entry[centre] = Math.random() * 100 + 50; // Random price between 50 and 150
      });
      data.push(entry);
    }
  
    return data;
  };