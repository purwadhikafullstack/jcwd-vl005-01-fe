import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user_id: "",
    username: "",
    email: "",
    status: "inactive"
  },
  reducers: {
    login: (state, action) => {
      state.user_id = action.payload.user_id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.status = action.payload.status;
    },
    logout: (state) => {
      state.user_id = "";
      state.username = "";
      state.email = "";
      state.status = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
