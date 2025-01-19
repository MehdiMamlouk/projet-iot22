import React from 'react'; 
import ImgHero from "../images/back2.jpg"; // Import the image
import "./NotifcationPage.css" ; 

function NotificationPage() {
  return (
    <div className="notification-page" style={{ backgroundImage: `url(${ImgHero})` }}>
      <div className="content-container">
        <h1 className="notification-title">
          <span role="img" aria-label="notification">🔔</span> Notification
        </h1>
        <p className="notification-text">
          You will receive a notification when the water level is low or dry.
        </p>
        <button 
          className="btn" 
          onClick={() => (window.location.href = '/history')}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default NotificationPage;
