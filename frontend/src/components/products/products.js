import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "./productSlice";
import "./product.css";

function ProductPage() {
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const products = useSelector((state) => state.product.products);
  // console.log("Products in Redux store:", products);

  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    dispatch(fetchProducts(categoryName));
  }, [dispatch, categoryName]);

  // console.log(fetchProducts)
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // console.log(categoryName)

  return (
    <div className="container">
      <br></br>
      <h1>Products for {categoryName}</h1>
      <div className="product-cards">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.options.image_url} alt={product.name} />

            <div>
              <h2>{product.name}</h2>
              <p>{product.rentaloptions[0].tenure} months</p>
              <p>{product.rentaloptions[0].rate_per_month} per month </p>
              <Link
                to={{
                  pathname: `/details/${categoryName}/${product.id}`,
                  state: { product: product },
                }}
              >
                <button>Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
