import { createSlice } from "@reduxjs/toolkit";

export const manageUserSlice = createSlice({
  name: "adminMngUser",
  initialState: {
    users: [],
  },
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { getUsers } = manageUserSlice.actions;
export default manageUserSlice.reducer;
