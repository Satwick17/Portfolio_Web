import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotRestPassReducer from "./slices/forgotRestPassSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotRestPassReducer,
  },
});
