import { configureStore } from "@reduxjs/toolkit";

// slices
import modal from "./modal";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import shoppingCartSlice from "./shoppingCartSlice";
import commentSlice from "./commentSlice";
import wishListSlice from "./wishListSlice";
import confirmModalSlice from "./confirmModalSlice";

export const store = configureStore({
  reducer: {
    modal,
    authSlice,
    productSlice,
    shoppingCartSlice,
    commentSlice,
    wishListSlice,
    confirmModalSlice,
  },
});
