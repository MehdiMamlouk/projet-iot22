import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../service/Firebase"; // Firestore instance
import "./PlantHistoryPage.css"; // Updated styles
import ImgHero from "../images/back2.jpg"; // Background image

function PlantHistoryPage() {
  const [distanceData, setDistanceData] = useState([]); // `distance` data
  const [soilMoistureData, setSoilMoistureData] = useState([]); // `soilMoisture` data
  const [historyData, setHistoryData] = useState([]); // Watering history
  const [loadingSensor, setLoadingSensor] = useState(true); // Loading state for sensors
  const [loadingHistory, setLoadingHistory] = useState(true); // Loading state for history

  // Fetch `distance` and `soilMoisture` sensor data
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        // Fetch last 10 `distance` data
        const distanceRef = collection(db, "sensor_data", "distance", ":commit");
        const distanceQuery = query(distanceRef, orderBy("timestamp", "desc"), limit(10));
        const distanceSnapshot = await getDocs(distanceQuery);
        const distanceValues = distanceSnapshot.docs.map((doc) => doc.data().value);

        // Fetch last 10 `soilMoisture` data
        const soilMoistureRef = collection(db, "sensor_data", "soilMoisture", ":commit");
        const soilMoistureQuery = query(soilMoistureRef, orderBy("timestamp", "desc"), limit(10));
        const soilMoistureSnapshot = await getDocs(soilMoistureQuery);
        const soilMoistureValues = soilMoistureSnapshot.docs.map((doc) => doc.data().value);

        // Set data
        setDistanceData(distanceValues);
        setSoilMoistureData(soilMoistureValues);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      } finally {
        setLoadingSensor(false);
      }
    };

    fetchSensorData();
  }, []);

  // Fetch watering history data
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const historyRef = collection(db, "plantHistory");
        const historyQuery = query(historyRef, orderBy("timestamp", "desc"), limit(10)); // Fetch last 10 history entries
        const historySnapshot = await getDocs(historyQuery);
        const historyValues = historySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHistoryData(historyValues);
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistoryData();
  }, []);

  return (
    <div className="history-page">
      {/* Hero Section */}
      <div className="hero" style={{ backgroundImage: `url(${ImgHero})` }}>
        <div className="content">
          <h1>
            <span className="history-icon">🌱</span> Plant Monitoring Dashboard
          </h1>

          {/* Sensor Data Section */}
          <div className="sensor-data-section">
            <h2>Sensor Data</h2>
            {loadingSensor ? (
              <p>Loading sensor data...</p>
            ) : distanceData.length > 0 || soilMoistureData.length > 0 ? (
              <div className="table-container">
                <table className="sensor-data-table">
                  <thead>
                    <tr>
                      <th>Distance (cm)</th>
                      <th>Soil Moisture (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {distanceData.map((distance, index) => (
                      <tr key={index}>
                        <td>{distance}</td>
                        <td>{soilMoistureData[index] || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No sensor data available.</p>
            )}
          </div>

          <hr />

          {/* Watering Events Section */}
          <div className="watering-events-section">
            <h2>Watering Events</h2>
            {loadingHistory ? (
              <p>Loading watering events...</p>
            ) : historyData.length > 0 ? (
              <div className="table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((entry) => (
                      <tr key={entry.id}>
                        <td>{entry.timestamp}</td>
                        <td>{entry.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No watering history available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantHistoryPage;