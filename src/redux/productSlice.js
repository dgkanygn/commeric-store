import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getProductsData = createAsyncThunk("data/fetch", async () => {
  const querySnapshot = await getDocs(collection(db, "products"));

  const productList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return productList;
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },

    filterProducts: (state, action) => {
      const filters = action.payload;
      state.filteredProducts = state.products.filter((product) => {
        if (
          filters.category.length > 0 &&
          !filters.category.includes(product.category)
        ) {
          return false;
        }

        if (filters.price > 0 && product.price > filters.price) {
          return false;
        }

        if (
          filters.isSecondHand !== undefined &&
          product.isSecondHand !== filters.isSecondHand
        ) {
          return false;
        }

        return true;
      });
    },

    clearFilteredProducts: (state) => {
      state.filteredProducts = [];
    },

    markProduct: (state, action) => {
      const itemId = action.payload;
      const itemToUpdate = state.products.find((item) => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.isSold = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addProduct,
  filterProducts,
  clearFilteredProducts,
  markProduct,
} = productSlice.actions;
export default productSlice.reducer;
