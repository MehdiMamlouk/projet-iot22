import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Importation du fichier CSS pour le style

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home page</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">Connexion</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
