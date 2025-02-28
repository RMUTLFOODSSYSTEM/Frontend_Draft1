import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // External CSS for styling

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">Home</Link>
    </nav>
  );
}

export default Navbar;
