import React from "react";
import "./HistoryPage.css";
import ImgHero from "../images/back2.jpg"; // Import the image
import "../App.css";

function HistoryPage() {
  return (
    <div className="history-page">
      <div className="hero" style={{ backgroundImage: `url(${ImgHero})` }}>
        <div className="content">
          <h1>
            <span className="history-icon">🌱</span>
            Watering History
          </h1>
          <p>
            View your plant's watering history and adjust settings for optimal care.
          </p>
          <button 
          className="btn" 
          onClick={() => (window.location.href = '/remote')}
        >
          Next
        </button>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
