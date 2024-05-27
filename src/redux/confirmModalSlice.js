import { createSlice } from "@reduxjs/toolkit";

export const confirmModalSlice = createSlice({
  name: "confirmModal",
  initialState: {
    label: "",
    transaction: "",
    process: "",
    id: "",
  },
  reducers: {
    defineConfirmModal: (state, action) => {
      state.label = action.payload.label;
      state.transaction = action.payload.transaction;
      state.process = action.payload.process;
      state.id = action.payload.id;
    },

    resetConfirmation: (state) => {
      state.label = "";
      state.transaction = "";
      state.process = "";
      state.id = "";
    },
  },
});

export const { confirmAction, resetConfirmation, defineConfirmModal } =
  confirmModalSlice.actions;

export default confirmModalSlice.reducer;
