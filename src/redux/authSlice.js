import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLogin: JSON.parse(localStorage.getItem("user")) ? true : false,
    balance: 0,
    otherUserData: JSON.parse(localStorage.getItem("otherUserInfo")) || null,
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem(
        "otherUserInfo",
        JSON.stringify(action.payload.otherUserInfo)
      );
      state.user = action.payload.user;
      state.otherUserData = action.payload.otherUserInfo;
      state.balance = action.payload.balance;
      state.isLogin = true;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("otherUserInfo");
      state.user = null;
      state.otherUserData = null;
      state.isLogin = false;
    },

    fillOtherUserData: (state, action) => {
      localStorage.setItem("otherUserInfo", JSON.stringify(action.payload));
      state.otherUserData = action.payload;
      state.balance = action.payload.balance;
    },

    increaseBalance: (state, action) => {
      state.balance = action.payload;
    },

    // decreaseBalance: (state, action) => {
    //   state.balance -= action.payload;
    // },
  },
});

export const {
  login,
  logout,
  increaseBalance,
  decreaseBalance,
  fillOtherUserData,
} = authSlice.actions;
export default authSlice.reducer;
