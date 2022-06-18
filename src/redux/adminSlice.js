import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin_id: "",
    username: "",
    email: "",
  },
  reducers: {
    login: (state, action) => {
      state.admin_id = action.payload.admin_id;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.admin_id = "";
      state.username = "";
      state.email = "";
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;
