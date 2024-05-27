import { createSlice } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
  name: "shoppingCartSlice",
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
        (product) => product.id !== action.payload
      );
    },

    clearProducts: (state) => {
      state.products = [];
    },

    transferProducts: (state, action) => {
      state.products = [...state.products, action.payload];
    },
  },
});

export const { toggleProduct, clearProducts, removeProduct, transferProducts } =
  shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
