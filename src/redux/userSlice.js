import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user_id: "",
    username: "",
    email: "",
    is_active: ""
  },
  reducers: {
    login: (state, action) => {
      state.user_id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.is_active = action.payload.is_active;
    },
    logout: (state) => {
      state.user_id = "";
      state.username = "";
      state.email = "";
      state.is_active = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
