import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("e-user")
    ? JSON.parse(localStorage.getItem("e-user"))
    : null,
  isLoggedIn: JSON.parse(localStorage.getItem("e-user")) ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.userInfo = action.payload;
      localStorage.setItem("e-user", JSON.stringify(action.payload));
    },
    removeCredentials(state) {
      state.userInfo = null;
      localStorage.removeItem("e-user");
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
