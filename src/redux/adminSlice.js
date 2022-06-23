import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin_id: "",
    username: "",
    email: "",
    status: "",
  },
  reducers: {
    login: (state, action) => {
      state.admin_id = action.payload.admin_id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.status = action.payload.status;
    },
    logout: (state) => {
      state.admin_id = "";
      state.username = "";
      state.email = "";
      state.status = "";
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;
