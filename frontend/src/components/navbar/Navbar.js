// Navbar.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { logout } from "../slices/authSlice";
import "./Navbar.css";

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Navigate to the home page
  };

  const renderNavbarLinks = () => {
    if (!isAuthenticated) {
      return (
        <div className="navbar-right">
          <Link to="/signup" className="navbar-link">
            Sign Up
          </Link>
          <Link to="/signin" className="navbar-link">
            Login
          </Link>
        </div>
      );
    } else {
      return (
        <div className="navbar-right">
          <Link to="/orders" className="navbar-link">
            Orders
          </Link>
          <Link to="/checkout" className="navbar-link">
            Checkout
          </Link>
          <button className="navbar-link" onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">
          <Link to="/">Rentfurlax</Link>
        </h1>
      </div>
      {renderNavbarLinks()}
    </nav>
  );
}

export default Navbar;
