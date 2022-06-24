import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./adminSlice";
import adminMngUserReducer from "./adminManageUser";

export default configureStore({
  reducer: {
    admin: adminReducer,
    getuser: adminMngUserReducer,
  },
});
