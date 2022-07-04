import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./adminSlice";
import adminMngUserReducer from "./adminManageUser";
import adminMngTrxReducer from "./adminManageTransactions";

export default configureStore({
  reducer: {
    admin: adminReducer,
    getuser: adminMngUserReducer,
    transactions: adminMngTrxReducer,
  },
});
