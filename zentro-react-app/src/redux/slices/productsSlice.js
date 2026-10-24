
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL =
  "https://dummyjson.com/c/fc12-7c29-4e82-9cdf";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      const products = Array.isArray(data)
        ? data
        : Array.isArray(data.products)
        ? data.products
        : Array.isArray(data.data)
        ? data.data
        : null;

      if (!products) {
        throw new Error("Invalid products API response");
      }

      return products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.items = [];
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.items = [];
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default productsSlice.reducer;
