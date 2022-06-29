import { createSlice } from "@reduxjs/toolkit";

export const manageUserSlice = createSlice({
  name: "adminMngUser",
  initialState: {
    users: [],
    user: [],
  },
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    getUserById: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { getUsers, getUserById } = manageUserSlice.actions;
export default manageUserSlice.reducer;
