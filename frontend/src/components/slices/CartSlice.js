import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array to store items in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, rentaloptions } = action.payload;
      const existingItem = state.items.find((item) => parseInt(item.id) === id);
      if (existingItem) {
        // If the item is already in the cart, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item is not in the cart, add it
        state.items.push({
          ...action.payload,
          quantity: 1,
          rentaloptions: rentaloptions,
        });
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => parseInt(item.id) === itemId
      );
      if (itemIndex !== -1) {
        // If the item is found, remove it from the cart
        state.items.splice(itemIndex, 1);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
