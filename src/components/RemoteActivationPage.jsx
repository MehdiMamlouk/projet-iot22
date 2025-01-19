import React from 'react';
import ImgHero from "../images/back2.jpg"; // Import the image
import "./RemoteActivationPage.css"; 

function RemoteActivationPage() {
  return (
    <div className="remote-activation-page" style={{ backgroundImage: `url(${ImgHero})` }}>
      <div className="content-container">
        <h1 className="activation-title">
          <span role="img" aria-label="water">💧</span> Remote Activation
        </h1>
        <p className="activation-text">
          Activate the sprinkler remotely and ensure your plants stay healthy.
        </p>
        <button 
          className="btn" 
          onClick={() => (window.location.href = '/login')}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RemoteActivationPage;
