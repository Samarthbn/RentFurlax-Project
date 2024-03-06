import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUsername, selectIsAuthenticated } from "../slices/authSlice";
import "./OrderPage.css";

function OrderPage() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const username = useSelector(selectUsername);
  const products = useSelector((state) => state.cart.items); // Access products from the Redux store

  const [loading, setLoading] = useState(true);
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0); // State to hold the total amount

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        setLoading(true);

        // Map products to include selected rental option
        const selectedItems = products.map((product) => ({
          name: product.name,
          rentalOption: product.rentaloptions.find(
            (option) => option.tenure === product.selectedTenure
          ),
        }));

        // Calculate total amount based on selected rental option
        const total_amount = selectedItems.reduce(
          (total, item) => total + parseInt(item.rentalOption.rate_per_month),
          0
        );
        setTotalAmount(total_amount); // Set total amount in state

        // Fetch invoice details
        const response = await fetch("http://127.0.0.1:8000/invoice/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            status: "ORDERED",
            selectedItems: selectedItems,
            total_amount: total_amount,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch invoice details");
        }

        const invoiceData = await response.json();
        setInvoiceDetails(invoiceData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (isAuthenticated && username && products.length > 0) {
      fetchInvoiceDetails();
    }
  }, [isAuthenticated, username, products]);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/invoices/${username}/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch invoice details");
        }

        const invoiceDetailsData = await response.json();
        setInvoiceDetails(invoiceDetailsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (username) {
      fetchInvoiceData();
    }
  }, [username]);

  return (
    <div className="order-page">
      {loading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <div>
          <h1>YOUR ORDERS</h1>

          {/* <h2>Welcome, {username}!</h2> */}

          {error && <p>Error: {error}</p>}
          {invoiceDetails && (
            <div className="invoice-details">
              <h3>Invoice Details</h3>
              <p>Invoice ID: {invoiceDetails.id}</p>
              <p>Product Name : {invoiceDetails.selectedItems}</p>
              <p>Status: {invoiceDetails.status}</p>
              <p>Total Amount $: {totalAmount}</p>{" "}
              {/* Display total amount here */}
              <p>Date Ordered: {invoiceDetails.generated}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
}
export default OrderPage;
