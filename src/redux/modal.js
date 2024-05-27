import { createSlice } from "@reduxjs/toolkit";

export const modal = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    modalName: "",
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalName = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalName = "";
    },
  },
});

export const { openModal, closeModal } = modal.actions;
export default modal.reducer;
