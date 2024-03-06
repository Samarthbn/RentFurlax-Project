import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../slices/CartSlice";
import "./CheckoutPage.css";

function CheckoutPage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate("/orders");
  };

  const handleRemoveItem = (itemId) => {
    // Dispatch an action to remove the item from the cart
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className="checkout-container">
      {isAuthenticated ? (
        <>
          <h2>Items in Cart:</h2>
          <div>
            <ul>
              {items.length > 0 ? (
                items.map((item) => (
                  <li key={item.id} className="item-card">
                    <div className="item-image">
                      <img src={item.options.image_url} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>Condition: {item.condition}</p>
                      <p>{item.noofdays} days</p>
                      {item.selectedTenure && (
                        <p>
                          Selected Rental Option: {item.selectedTenure} months -
                          ${" "}
                          {
                            item.rentaloptions.find(
                              (option) => option.tenure === item.selectedTenure
                            ).rate_per_month
                          }{" "}
                          per month
                        </p>
                      )}
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <div className="empty-cart">
                  <img
                    src="https://i.ibb.co/wyJBz3t/cart.png"
                    alt="Empty Cart"
                  />
                  <p>Your cart is empty.</p>
                </div>
              )}
            </ul>
          </div>
          {items.length > 0 && (
            <button
              className="btn btn-primary btn-sm"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          )}
        </>
      ) : (
        <div className="login-message">
          <p className="bold">Please log in to view your cart.</p>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
