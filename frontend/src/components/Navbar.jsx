import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logozenvita.png";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </div>

      {/* Hamburger Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/hospitals">Hospitals</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/blood">Blood</Link>
      </div>

    </nav>
  );
}


export default Navbar;