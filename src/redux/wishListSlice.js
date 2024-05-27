import { createSlice } from "@reduxjs/toolkit";

export const wishListSlice = createSlice({
  name: "wishListSlice",
  initialState: {
    products: [],
  },
  reducers: {
    toggleProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      } else {
        state.products.push(action.payload);
      }
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.productId
      );
    },

    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const { toggleProduct, clearProducts, removeProduct } =
  wishListSlice.actions;
export default wishListSlice.reducer;
