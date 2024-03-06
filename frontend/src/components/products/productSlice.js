import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    selectedProduct: null, // Initialize selectedProduct as null
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.error = null; // Reset error state upon successful fetch
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
//   console.log(productSlice)

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (categoryName) => {
    try {
      console.log(categoryName);
      const response = await fetch(`/${categoryName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products for category ${categoryName}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching products:", error);
    }
  }
);

export default productSlice.reducer;
