import React from "react";
import "./App.css"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="links" style={{ backgroundColor: "seagreen" }, { display: "flex" }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
};

export default Navbar;
