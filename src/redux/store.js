import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./adminSlice";
import userReducer from "./userSlice";
import adminMngUserReducer from "./adminManageUser";
import adminMngTrxReducer from "./adminManageTransactions";

export default configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    getuser: adminMngUserReducer,
    transactions: adminMngTrxReducer,
  },
});
