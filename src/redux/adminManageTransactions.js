import { createSlice } from "@reduxjs/toolkit";

export const manageTransactionsSlice = createSlice({
  name: "adminMngTrx",
  initialState: {
    transactionsList: [],
  },
  reducers: {
    getTransactions: (state, action) => {
      state.transactionsList = action.payload;
    },
  },
});

export const { getTransactions } = manageTransactionsSlice.actions;
export default manageTransactionsSlice.reducer;
