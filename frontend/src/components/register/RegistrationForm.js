import React, { useState } from "react";
import "./RegistrationForm.css";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setShowWarning(true);
      return; // Stop form submission if username or password is missing
    }

    try {
      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // Handle success response
      setTimeout(() => {
        navigate("/signIn");
      }, 2000);
    } catch (error) {
      console.error("Error:", error); // Handle error response
    }
  };

  return (
    <div>
      <div className="registration-form">
        <h2>Please Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input type="text" id="username" onChange={handleChange} required />
          {showWarning && !formData.username && (
            <p className="warning">Please enter a username.</p>
          )}

          <label htmlFor="first_name">First Name</label>
          <input type="text" id="first_name" onChange={handleChange} />

          <label htmlFor="last_name">Last Name</label>
          <input type="text" id="last_name" onChange={handleChange} />

          <label htmlFor="address">Address</label>
          <input type="text" id="address" onChange={handleChange} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            required
          />
          {showWarning && !formData.password && (
            <p className="warning">Please enter a password.</p>
          )}

          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" onChange={handleChange} />

          <button type="submit">REGISTER</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
