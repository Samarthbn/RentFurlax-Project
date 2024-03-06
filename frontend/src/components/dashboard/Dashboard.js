import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/categories/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Browse by category</h1>
      <div className="categories">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <Link to={`/${category.type}`}>
              <img
                src={`http://localhost:8000${category.image}`}
                alt={category.type}
              />
              <button>{category.type}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
