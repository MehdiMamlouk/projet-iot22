import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate for navigation
import "./UserAdminPage.css";
import { db } from '../service/Firebase'; // Assuming Firebase is initialized in firebase.js
import { collection, getDocs } from "firebase/firestore"; // Firestore imports

const UserPage = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [notifications, setNotifications] = useState([]); // State to hold notifications data
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    // Fetch the plant watering history from Firestore
    const fetchNotifications = async () => {
      const querySnapshot = await getDocs(collection(db, "plantHistory"));
      const fetchedNotifications = [];

      querySnapshot.forEach((doc) => {
        fetchedNotifications.push(doc.data()); // Adding each document data to the notifications array
      });

      setNotifications(fetchedNotifications);
    };

    fetchNotifications(); // Fetch data when the component mounts
  }, []);

  const handleNavigation = (section) => {
    if (section === "historypage") {
      navigate("/historypage");
    }
  };

  const handleNotificationClick = () => {
    // Display all notifications when the button is clicked
    if (notifications.length > 0) {
      notifications.forEach((notification) => {
        alert(`Your plant has been watered on: ${notification.timestamp} \nReason: ${notification.reason}`);
      });
    } else {
      alert("No watering history available.");
    }
  };

  const styles = {
    page: {
      textAlign: "center",
      padding: "20px",
    },
    container: {
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      marginTop: "50px",
    },
    circle: (isHovered) => ({
      width: "150px",
      height: "150px",
      backgroundColor: isHovered ? "#45a049" : "#4caf50",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.3s, background-color 0.3s",
    }),
  };

  return (
    <div className="user-page" style={styles.page}>
      <h1 className="welcome-title">Welcome</h1>
      <div style={styles.container}>
        <div
          style={styles.circle(hoveredSection === "historypage")}
          onClick={() => handleNavigation("historypage")} // Trigger navigation to the history page
          onMouseEnter={() => setHoveredSection("historypage")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <p>History Page</p>
        </div>
        <div
          style={styles.circle(hoveredSection === "notifications")}
          onClick={handleNotificationClick} // Handle notification click
          onMouseEnter={() => setHoveredSection("notifications")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <p>Notifications</p>
        </div>
        <div
          style={styles.circle(hoveredSection === "irrigation")}
          onClick={() => handleNavigation("irrigation")}
          onMouseEnter={() => setHoveredSection("irrigation")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <p>Irrigation</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;