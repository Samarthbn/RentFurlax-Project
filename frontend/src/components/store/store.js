import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../products/productSlice";
import cartReducer from "../slices/CartSlice";
import authReducer from '../slices/authSlice';



export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
