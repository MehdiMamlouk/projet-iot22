import React from "react";
import "../App.css";
import ImgHero from "../images/fond2.jpeg"; // Make sure the image is in the `public/images` folder
import { Link } from "react-router-dom";

function App() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${ImgHero})` }}>
      <div className="content">
        <h1>Welcome to our Plant Universe</h1>
        <p>
          Discover the best practices to grow and take care of your plants. Transform your space with nature!
        </p>
        <Link to="/notifications" className="btn"> {/* Using Link to navigate */}
          Start
        </Link>
      </div>
    </section>
  );
}

export default App;
