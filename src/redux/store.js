import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./adminSlice";

export default configureStore({
  reducer: {
    admin: adminReducer,
  },
});
