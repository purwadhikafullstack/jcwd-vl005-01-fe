import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./adminSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer
  },
});
