import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotRestPassReducer from "./slices/forgotRestPassSlice";
import messageReducer from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotRestPassReducer,
    messages: messageReducer
  },
});
