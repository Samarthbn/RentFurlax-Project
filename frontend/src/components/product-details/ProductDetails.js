import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../products/productSlice";
import { addToCart } from "../slices/CartSlice";
import "./ProductDetails.css";

function ProductDetailsPage() {
  const { categoryName, productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const [selectedTenure, setSelectedTenure] = useState(null); // State for selected tenure
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts(categoryName));
    }
  }, [dispatch, categoryName, status]);

  const handleAddToCart = () => {
    if (!selectedTenure) {
      alert("Please select an option");
      return;
    }
    dispatch(addToCart({ ...product, selectedTenure })); // Pass the product with selected tenure to the cart
    navigate("/checkout");
  };

  const handleOptionChange = (event) => {
    setSelectedTenure(parseInt(event.target.value)); // Update selected tenure state
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-container">
      {product ? (
        <>
          <div className="product-image">
            <img src={product.options.image_url} alt={product.name} />
          </div>

          <div className="product-description">
            <h2>{product.name.toUpperCase()}</h2>
            <p>{product.description}</p>
            <p>Condition: {product.condition}</p>
            <p>Color : black</p>
            {/* Render a dropdown menu for selecting options */}
            <select
              value={selectedTenure ? selectedTenure : ""}
              onChange={handleOptionChange}
            >
              <option value="">Select rental option</option>
              {product.rentaloptions.map((option) => (
                <option key={option.tenure} value={option.tenure}>
                  {option.tenure} months - ${option.rate_per_month} per month
                </option>
              ))}
              
            </select>

            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
